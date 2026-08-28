#!/usr/bin/env python3
"""
Menyusun `inclusions` dan `exclusions` per bahasa dari kamus butir.

Alasannya ada berkas ini: 234 butir inclusions di 34 paket hanya terdiri dari
102 butir unik, dan 265 butir exclusions hanya 53 unik. Menerjemahkan per paket
berarti mengulang pekerjaan yang sama sampai 24 kali — dan yang lebih buruk,
membuka peluang "Airport tax" diterjemahkan berbeda-beda di paket berbeda.

Kamusnya memetakan HTML MENTAH isi <li> (bukan teks polos) supaya <strong>,
<i>, dan &nbsp; ikut terjaga.

  python3 bullets.py ekstrak          -> bullets/_sumber.json (daftar butir unik)
  python3 bullets.py susun ko zh      -> menulis inclusions/exclusions ke translations/<locale>.json
"""
import json, os, re, sys

LI = re.compile(r'<li([^>]*)>(.*?)</li>', re.S)


def daftar_unik(src):
    out = {'inclusions': [], 'exclusions': []}
    for f in out:
        lihat = set()
        for t in src['tours']:
            for _, isi in LI.findall(t[f] or ''):
                if isi not in lihat:
                    lihat.add(isi)
                    out[f].append(isi)
    return out


def ekstrak():
    src = json.load(open('source.json'))
    u = daftar_unik(src)
    os.makedirs('bullets', exist_ok=True)
    json.dump(u, open('bullets/_sumber.json', 'w'), ensure_ascii=False, indent=1)
    print(f"bullets/_sumber.json — inclusions {len(u['inclusions'])} unik, "
          f"exclusions {len(u['exclusions'])} unik")


def susun(locale):
    src = json.load(open('source.json'))
    p = f'bullets/{locale}.json'
    if not os.path.exists(p):
        print(f'{locale}: {p} belum ada'); return
    kamus = json.load(open(p))
    tr_path = f'translations/{locale}.json'
    tr = json.load(open(tr_path)) if os.path.exists(tr_path) else {'locale': locale, 'tours': {}, 'itineraries': {}}
    tr.setdefault('tours', {})

    hilang = set()
    n = 0
    for t in src['tours']:
        entry = tr['tours'].setdefault(str(t['id']), {})
        for f in ('inclusions', 'exclusions'):
            k = kamus.get(f, {})
            bagian, lengkap = [], True
            for atribut, isi in LI.findall(t[f] or ''):
                terjemah = k.get(isi)
                if terjemah is None:
                    hilang.add((f, isi)); lengkap = False; continue
                bagian.append(f'<li{atribut}>{terjemah}</li>')
            # Sebagian saja tidak ditulis: daftar yang bolong lolos gerbang terbit
            # tanpa terlihat rusak, dan itu justru cara paling halus untuk
            # menerbitkan halaman cacat.
            if lengkap and bagian:
                entry[f] = '<ul>' + ''.join(bagian) + '</ul>'
                n += 1
    json.dump(tr, open(tr_path, 'w'), ensure_ascii=False, indent=1)
    print(f'{locale}: {n} field tersusun ke {tr_path}')
    if hilang:
        print(f'   {len(hilang)} butir BELUM diterjemahkan:')
        for f, isi in sorted(hilang)[:8]:
            print(f'   - [{f}] {re.sub(r"<[^>]+>","",isi)[:70]}')
        if len(hilang) > 8:
            print(f'   ... dan {len(hilang)-8} lagi')


if __name__ == '__main__':
    if sys.argv[1:2] == ['ekstrak']:
        ekstrak()
    elif sys.argv[1:2] == ['susun']:
        for l in sys.argv[2:]:
            susun(l)
    else:
        print(__doc__)


def sebar(locale):
    """Menyalin terjemahan ke hari lain yang teks Inggrisnya PERSIS sama.

    Lima paket memakai hari "TRANSFER OUT – DEPARTURE" yang identik kata per
    kata. Menerjemahkannya lima kali bukan cuma boros — itu cara paling mudah
    membuat hari yang sama berbunyi berbeda di dua paket yang dijual bersebelahan.
    """
    import json
    en = json.load(open('translations/en.json'))
    tr = json.load(open(f'translations/{locale}.json'))
    kunci = {}
    for i, v in en['itineraries'].items():
        kunci.setdefault((v['title'], v['description']), []).append(i)
    n = 0
    for ids in kunci.values():
        sumber = next((i for i in ids if i in tr['itineraries']), None)
        if not sumber:
            continue
        for i in ids:
            if i not in tr['itineraries']:
                tr['itineraries'][i] = dict(tr['itineraries'][sumber])
                n += 1
    json.dump(tr, open(f'translations/{locale}.json', 'w'), ensure_ascii=False, indent=1)
    print(f'{locale}: {n} hari disebar dari duplikat persis -> {len(tr["itineraries"])}/93')
