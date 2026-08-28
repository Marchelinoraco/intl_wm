"""Pembangun HTML description paket dari komponen berstruktur."""

def h2(t): return f'<h2><strong>{t}</strong></h2>'
def para(t, style=False): return f'<p{" style=\"text-align:justify;\"" if style else ""}>{t}</p>'
def h3(t): return f'<h3><strong>{t}</strong></h3>'
def ul(items): return '<ul>' + ''.join(f'<li>{i}</li>' for i in items) + '</ul>'
