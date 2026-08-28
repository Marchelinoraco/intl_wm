#!/usr/bin/env python3
"""Membandingkan struktur HTML terjemahan dengan bahasa Inggris kanonik.

Yang diperiksa: jumlah <p>, <strong>, <i>, <br>, dan paragraf pemisah &nbsp;.
Jumlah yang berbeda berarti ada paragraf hilang, tergabung, atau penekanan
yang lenyap — cacat yang tidak terlihat di SQL maupun di daftar paket, dan baru
ketahuan saat seseorang membuka halaman detail dalam bahasa itu.
"""
import json, re, sys

def hitung(h):
    return {
        'p':      h.count('<p'),
        'strong': h.count('<strong>'),
        'i':      h.count('<i>'),
        'br':     h.count('<br'),
        'spacer': h.count('>&nbsp;</p>'),
    }

def main(locale):
    en = json.load(open('translations/en.json'))
    tr = json.load(open(f'translations/{locale}.json'))
    masalah = 0
    for i, v in sorted(tr['itineraries'].items(), key=lambda kv: int(kv[0])):
        a, b = hitung(en['itineraries'][i]['description']), hitung(v['description'])
        beda = {k: (a[k], b[k]) for k in a if a[k] != b[k]}
        if beda:
            masalah += 1
            print(f'  id {i}: ' + ', '.join(f'{k} en={x} {locale}={y}' for k, (x, y) in beda.items()))
    print(f'{locale}: {len(tr["itineraries"])} hari diperiksa, {masalah} berbeda struktur')
    return 1 if masalah else 0

if __name__ == '__main__':
    sys.exit(main(sys.argv[1]))
