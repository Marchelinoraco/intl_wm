# -*- coding: utf-8 -*-
"""Terjemahan Korea untuk butir unik inclusions/exclusions.

Ditulis sebagai daftar berurutan, BUKAN peta bertuliskan kunci HTML panjang:
kunci disalin otomatis dari bullets/_sumber.json. Menyalin ulang string seperti
'<p style="text-align:justify;">...</p>' dengan tangan adalah cara paling mudah
membuat satu butir diam-diam tidak cocok lalu hilang dari daftar.
"""
import json, re

INC = [
 "그룹 인원수에 맞춘 에어컨 완비 차량",
 '<strong>부나켄 섬&nbsp;</strong>전용 보트',
 "선택하신 호텔 3박 숙박 – 트윈/더블 2인 1실",
 "숙련된 가이드 &amp; 기사",
 "관광지 입장료 &amp; 주차료",
 "일정에 따른 식사",
 "일정표에 따른 투어 서비스",
 "생수 1인 1일 1병",
 "핸들링 서비스",
 '<strong>부나켄 섬 &amp; 리하가 섬</strong> 전용 보트',
 "선택하신 호텔 4박 숙박 – 트윈/더블 2인 1실",
 "리하가 섬 전용 보트",
 "선택하신 호텔 2박 숙박 – 트윈/더블 2인 1실",
 '<strong>부나켄 섬</strong> 전용 보트',
 "전문 패러글라이딩 가이드",
 "관광지 입장료",
 "일정에 따른 투어 서비스",
 "투어 인원수에 맞춘 에어컨 완비 차량",
 "숙련된 맹그로브 가이드 및 기사",
 "카누",
 "관광지 입장료&nbsp;",
 "주차료",
 "1인당 생수 1병",
 "투어 인원수에 맞춘 에어컨 완비 차량",
 "탕코코 자연보호구역 레인저",
 "숙련된 가이드 및 기사",
 "관광지 입장료",
 "중식",
 "1인당 생수 1병",
 "숙련된 가이드 및 기사, 관광지 입장료",
 "일정에 따른 서비스",
 "래프팅 장비 일체",
 "부나켄 섬 전용 보트",
 "숙련된 투어 가이드 &amp; 선원",
 "관광지 입장료",
 "현지 레스토랑에서의 중식",
 "1인당 생수 1병",
 "일정표에 따른 투어 서비스",
 "투어 인원수에 맞춘 에어컨 차량",
 "숙련된 가이드(영어 가능) &amp; 기사",
 "입장료 &amp; 주차료",
 "일정에 따른 투어 서비스",
 "에어컨 완비 차량&nbsp;",
 "부나켄 섬 전용 보트",
 "호텔 5박 숙박, 2인 1실 기준",
 "관광지 입장권 &amp; 주차료",
 "투어 일정에 따른 식사",
 "1인 1일 생수 1병",
 "인원수에 맞춘 에어컨 완비 차량",
 "탕코코 2박 &amp; 토모혼 1박 (더블/트윈 베드)",
 "숙련된 기사 &amp; 가이드",
 "탕코코 자연보호구역 레인저",
 "관광지 입장권 &amp; 주차료",
 "투어 일정표에 따른 식사",
 "일정에 따른 투어 서비스",
 "1일 생수 2병",
 "탕코코 2박 (더블/트윈 베드)",
 "일정에 따른 식사",
 "3개 섬 전용 보트",
 "숙련된 투어 가이드 &amp; 선원",
 "일정표에 따른 투어 서비스",
 "투어 인원수에 맞춘 에어컨 완비 차량",
 "숙련된 가이드 및 기사",
 "주차료 &amp; 기부금&nbsp;",
 "1인당 생수 1병&nbsp;",
 "일정에 따른 투어 서비스",
 "공항 픽업 및 샌딩",
 "2일차 그린피",
 "2일차 골프 카트 및 캐디 요금 (캐디 팁 제외)",
 "리하가 섬 전용 보트",
 "3일차 전문 투어 가이드",
 "부나켄 섬 전용 보트",
 "2일차 &amp; 3일차 그린피",
 "골프 카트 및 캐디 요금 (캐디 팁 제외)&nbsp;",
 "공항 픽업 및 샌딩&nbsp;",
 "객실 (2인 1실 – 더블/트윈 베드)",
 "풀보드 식사",
 "풀보드 패키지 (다이빙 3일간 1일 2회 오전 다이빙 기준)",
 '<p style="text-align:justify;">풀보드 패키지 (다이빙 3일간 1일 2회 오전 다이빙 기준)</p><p><i><strong>탕코코 투어</strong></i>:&nbsp;</p>',
 "탕코코 &amp; 투난 폭포 왕복 차량",
 "현지 레스토랑 중식 1회",
 "숙련된 가이드 &amp; 기사",
 "전 관광지 입장료&nbsp;",
 "1인당 생수 1병.",
 "풀보드 패키지 (다이빙 2일간 1일 2회 오전 다이빙 기준)",
 "육상 교통편",
 "리하가 섬 전용 보트",
 "숙련된 투어 가이드",
 "기사 &amp; 선원",
 "관광지 입장료 &amp; 주차료",
 "중식 &amp; 1인당 생수 1병",
 "강가 섬 &amp; 리하가 섬 전용 보트",
 "스노클링 장비",
 "숙련된 투어 가이드, 기사 &amp; 선원",
 "전용 육상 차량&nbsp;",
 "마나도 투아 섬 - 부나켄 섬 보트",
 "숙련된 투어 가이드&nbsp;",
 "기사 &amp; 선원&nbsp;",
 "주차료, 도시락&nbsp;",
 "1인당 생수 1병&nbsp;",
 "차량&nbsp;",
 "보트 &amp; 스노클링 장비",
]

EXC = [
 "왕복 항공권", "가이드 &amp; 기사 팁", "선택 관광",
 "패키지 외 개인 경비 (추가 식사/음료 등)",
 "포터 서비스, 공항세 &amp; 초과 수하물 요금",
 "개인 경비 (세탁, 미니바, 룸서비스 등)",
 "여행자 보험", "투어 일정에 명시되지 않은 기타 비용", "항공권",
 "차량 (픽업 &amp; 드롭) 선택 사항", "공항세", "포터&nbsp;", "호텔", "가이드",
 "기사 팁", "투어 일정 외 기타 비용", "포터", "식사", "가이드 &amp; 기사 팁",
 "호텔,&nbsp;", "가이드 및 기사 팁", "투어 일정 외 일체의 기타 비용",
 "투어 일정 외 일체의 기타 비용.", "가이드 및 기사 팁", "육상 교통편 (차량)",
 "왕복 항공권", "패키지 외 추가 경비 (추가 식사/음료 등)",
 "포터, 공항세 &amp; 초과 수하물", "개인 경비 (세탁, 미니바, 룸서비스 등)",
 "여행자 보험", "투어 일정 외 기타 비용", "왕복 항공권", "기사 &amp; 가이드 팁",
 "선택 관광", "패키지 외 비용 (추가 식사/음료 등)", "포터, 공항세 &amp; 초과 수하물",
 "그 외 투어 일정 외 비용", "&nbsp;선택 관광", "육상 교통편 (차량)&nbsp;",
 "왕복 항공권", "장비 대여", "나이트록스 충전",
 "야간 다이빙 &amp; 만다린 피시 다이빙", "선택 관광 &amp; 액티비티", "개인 경비",
 "공항세 &amp; 초과 수하물", "위에 명시되지 않은 일체의 서비스",
 "다이빙 장비 대여", "항공권&nbsp;", "포터 서비스", "호텔 숙박&nbsp;",
 "가이드 &amp; 기사 팁", "선택 관광 &amp; 일정에 명시되지 않은 기타 개인 경비",
]

BUNGKUS = re.compile(r'^<p style="text-align:justify;">(.*)</p>$', re.S)

def bangun(locale, inc, exc):
    src = json.load(open('bullets/_sumber.json'))
    out = {}
    for field, terjemahan in (('inclusions', inc), ('exclusions', exc)):
        asli = src[field]
        assert len(asli) == len(terjemahan), \
            f'{field}: {len(asli)} butir sumber tapi {len(terjemahan)} terjemahan'
        peta = {}
        for a, t in zip(asli, terjemahan):
            # Kalau sumbernya dibungkus <p style="text-align:justify;">, pasang
            # kembali pembungkus yang sama — kecuali terjemahannya sudah membawa
            # strukturnya sendiri (butir dengan dua paragraf).
            m = BUNGKUS.match(a)
            if m and not t.startswith('<p'):
                t = f'<p style="text-align:justify;">{t}</p>'
            peta[a] = t
        out[field] = peta
    json.dump(out, open(f'bullets/{locale}.json', 'w'), ensure_ascii=False, indent=1)
    print(f'bullets/{locale}.json — inclusions {len(out["inclusions"])}, exclusions {len(out["exclusions"])}')

if __name__ == '__main__':
    bangun('ko', INC, EXC)
