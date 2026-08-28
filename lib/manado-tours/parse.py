"""Parser INSERT MySQL: kembalikan list of tuple nilai (str|None)."""
import io, re

def parse_inserts(path):
    s = io.open(path, encoding="utf-8", errors="replace").read()
    cols, rows = None, []
    i = 0
    n = len(s)
    while True:
        m = re.compile(r"INSERT INTO `[^`]+` \(([^)]*)\) VALUES", re.I).search(s, i)
        if not m:
            break
        c = [x.strip().strip('`') for x in m.group(1).split(',')]
        if cols is None:
            cols = c
        assert c == cols, "kolom berbeda antar INSERT"
        j = m.end()
        # baca tuple-tuple sampai ';' di level luar
        while j < n:
            while j < n and s[j] in " \t\r\n,":
                j += 1
            if j >= n or s[j] == ';':
                j += 1
                break
            assert s[j] == '(', repr(s[j-20:j+20])
            j += 1
            vals, cur, inq = [], [], False
            while j < n:
                ch = s[j]
                if inq:
                    if ch == '\\':
                        nxt = s[j+1]
                        cur.append({'n':'\n','t':'\t','r':'\r','0':'\0','\\':'\\',"'":"'",'"':'"','Z':'\x1a'}.get(nxt, nxt))
                        j += 2
                        continue
                    if ch == "'":
                        if s[j+1] == "'":
                            cur.append("'"); j += 2; continue
                        inq = False; j += 1; continue
                    cur.append(ch); j += 1; continue
                if ch == "'":
                    inq = True; cur.append('\x00STR'); j += 1; continue
                if ch == ',':
                    vals.append(''.join(cur).strip()); cur = []; j += 1; continue
                if ch == ')':
                    vals.append(''.join(cur).strip()); j += 1; break
                cur.append(ch); j += 1
            out = []
            for v in vals:
                if v.startswith('\x00STR'):
                    out.append(v[4:])
                elif v.upper() == 'NULL':
                    out.append(None)
                else:
                    out.append(v)
            rows.append(dict(zip(cols, out)))
        i = j
    return cols, rows
