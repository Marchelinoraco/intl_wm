#!/usr/bin/env python3
"""Bandingkan struktur description terjemahan paket dengan bahasa Inggris kanonik."""
import json, sys

def hitung(h):
    return {
        'h2': h.count('<h2'), 'h3': h.count('<h3'), 'ul': h.count('<ul>'),
        'li': h.count('<li'), 'p': h.count('<p>') + h.count('<p '), 'strong': h.count('<strong>'),
    }

def main(locale):
    src = json.load(open('source.json'))
    en = {t['id']: t['description_en'] for t in src['tours']}
    tr = json.load(open(f'translations/{locale}.json'))
    masalah = 0
    for sid, data in sorted(tr.get('tours', {}).items(), key=lambda kv: int(kv[0])):
        d = data.get('description')
        if not d:
            continue
        a, b = hitung(en[int(sid)]), hitung(d)
        beda = {k: (a[k], b[k]) for k in a if a[k] != b[k]}
        if beda:
            masalah += 1
            print(f'  paket {sid}: ' + ', '.join(f'{k} en={x} {locale}={y}' for k, (x, y) in beda.items()))
    n = sum(1 for v in tr.get('tours', {}).values() if v.get('description'))
    print(f'{locale}: {n} description diperiksa, {masalah} berbeda struktur')
    return 1 if masalah else 0

if __name__ == '__main__':
    sys.exit(main(sys.argv[1]))
