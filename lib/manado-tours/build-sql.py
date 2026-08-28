#!/usr/bin/env python3
"""
Membangun SQL terjemahan manado.tours dari translations/<locale>.json.

Pemakaian:  python3 build-sql.py en ko zh          (atau tanpa argumen = semua)
Hasil:      sql/<locale>.sql — siap diimpor lewat phpMyAdmin.

Dua hal yang membuat SQL ini aman dijalankan berulang:

  1. ON DUPLICATE KEY UPDATE, bukan INSERT polos. Baris `en` sudah dibuat
     `intl:seed-english-tours` di production, jadi INSERT polos akan berhenti
     dengan duplicate key di tengah jalan dan menyisakan impor separuh.

  2. Hanya kolom yang benar-benar ada di JSON yang ditulis. Kolom yang tidak
     diterjemahkan tidak ikut disentuh, sehingga `description` hasil cermin
     dari `description_ko`/`description_zh` tidak tertimpa NULL.
"""
import json, os, sys

MORPH = 'App\\Models\\ManadoTour'
TOUR_FIELDS = ['title', 'description', 'inclusions', 'exclusions']
ITIN_FIELDS = ['title', 'description']


def q(v):
    """Kutip nilai untuk MySQL. Backslash ikut di-escape — deskripsi berisi HTML."""
    if v is None:
        return 'NULL'
    s = str(v)
    for a, b in (('\\', '\\\\'), ("'", "\\'"), ('\n', '\\n'), ('\r', '\\r'), ('\x00', '')):
        s = s.replace(a, b)
    return "'" + s + "'"


def upsert(table, key_cols, key_vals, fields, data):
    cols = list(key_cols)
    vals = [q(v) for v in key_vals]
    upd = []
    for f in fields:
        if f in data and data[f] is not None:
            cols.append(f)
            vals.append(q(data[f]))
            upd.append(f'`{f}` = VALUES(`{f}`)')
    if not upd:
        return None
    cols += ['created_at', 'updated_at']
    vals += ['NOW()', 'NOW()']
    upd.append('`updated_at` = NOW()')
    return (f"INSERT INTO `{table}` (" + ', '.join(f'`{c}`' for c in cols) + ")\n"
            f"VALUES (" + ', '.join(vals) + ")\n"
            f"ON DUPLICATE KEY UPDATE " + ', '.join(upd) + ";")


def build(locale, src, tr):
    tours = {t['id']: t for t in src['tours']}
    itins = {i['id']: i for i in src['itineraries']}
    hari_per_paket = {}
    for i in src['itineraries']:
        hari_per_paket.setdefault(i['tour_id'], []).append(i['id'])

    out, masalah = [], []

    for sid, data in sorted(tr.get('tours', {}).items(), key=lambda kv: int(kv[0])):
        tid = int(sid)
        if tid not in tours:
            masalah.append(f'paket id {tid} tidak ada di source.json'); continue
        stmt = upsert('tour_translations',
                      ['translatable_type', 'translatable_id', 'locale'],
                      [MORPH, tid, locale], TOUR_FIELDS, data)
        if stmt:
            out.append(f"-- paket {tid}: {tours[tid]['slug']}\n{stmt}")

    for sid, data in sorted(tr.get('itineraries', {}).items(), key=lambda kv: int(kv[0])):
        iid = int(sid)
        if iid not in itins:
            masalah.append(f'itinerary id {iid} tidak ada di source.json'); continue
        stmt = upsert('itinerary_translations', ['itinerary_id', 'locale'],
                      [iid, locale], ITIN_FIELDS, data)
        if stmt:
            it = itins[iid]
            out.append(f"-- paket {it['tour_id']} hari {it['day']} (itinerary {iid})\n{stmt}")

    # Paket mana yang BENAR-BENAR lolos gerbang terbit setelah SQL ini dijalankan.
    # Gerbangnya: title+description+inclusions+exclusions PLUS seluruh hari itinerary.
    siap, belum = [], []
    for tid, t in sorted(tours.items()):
        td = tr.get('tours', {}).get(str(tid), {})
        punya = {f for f in TOUR_FIELDS if (td.get(f) or '').strip()}
        if locale == 'en':
            punya |= set(TOUR_FIELDS)          # sudah diisi intl:seed-english-tours
        elif locale in ('ko', 'zh'):
            punya.add('description')           # sudah dipindahkan cermin
        kurang = [f for f in TOUR_FIELDS if f not in punya]
        hilang_hari = [i for i in hari_per_paket.get(tid, [])
                       if not (tr.get('itineraries', {}).get(str(i), {}).get('title') or '').strip()
                       or not (tr.get('itineraries', {}).get(str(i), {}).get('description') or '').strip()]
        if kurang or hilang_hari:
            belum.append((tid, t['slug'], kurang, len(hilang_hari)))
        else:
            siap.append((tid, t['slug']))
    return out, siap, belum, masalah


def main():
    src = json.load(open('source.json'))
    locales = sys.argv[1:] or [f[:-5] for f in sorted(os.listdir('translations')) if f.endswith('.json')]
    os.makedirs('sql', exist_ok=True)
    for locale in locales:
        p = f'translations/{locale}.json'
        if not os.path.exists(p):
            print(f'{locale}: translations/{locale}.json belum ada — dilewati'); continue
        tr = json.load(open(p))
        stmts, siap, belum, masalah = build(locale, src, tr)
        if masalah:
            print(f'{locale}: BERHENTI, ada rujukan tidak sah:')
            for m in masalah: print('   -', m)
            sys.exit(1)
        head = (f"-- manado.tours — terjemahan `{locale}`\n"
                f"-- Dibuat build-sql.py dari source.json + translations/{locale}.json\n"
                f"-- {len(stmts)} pernyataan. Aman dijalankan berulang (ON DUPLICATE KEY UPDATE).\n"
                f"-- Setelah impor, {len(siap)} dari {len(src['tours'])} paket lolos gerbang terbit `{locale}`.\n\n"
                "SET NAMES utf8mb4;\nSET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';\nSTART TRANSACTION;\n\n")
        tail = ("\nCOMMIT;\n\n"
                "-- Periksa hasilnya:\n"
                f"-- SELECT COUNT(*) FROM tour_translations WHERE locale = '{locale}';\n"
                f"-- SELECT COUNT(*) FROM itinerary_translations WHERE locale = '{locale}';\n")
        open(f'sql/{locale}.sql', 'w').write(head + '\n\n'.join(stmts) + tail)
        print(f"sql/{locale}.sql — {len(stmts)} pernyataan, {len(siap)}/{len(src['tours'])} paket siap terbit")
        if belum:
            print(f"   belum lengkap ({len(belum)}):")
            for tid, slug, kurang, nhari in belum[:5]:
                bagian = []
                if kurang: bagian.append('kolom ' + '+'.join(kurang))
                if nhari:  bagian.append(f'{nhari} hari itinerary')
                print(f"   - {tid} {slug}: kurang " + ', '.join(bagian))
            if len(belum) > 5: print(f"   ... dan {len(belum)-5} paket lain")


if __name__ == '__main__':
    main()
