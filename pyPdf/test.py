#!/usr/bin/env python
# -*- coding: utf-8 -*-

from pyPdf import PdfFileWriter, PdfFileReader

import sys

def main():
    """ファイル を 1ページごとに分割する"""
    div = 1
    src = PdfFileReader(file(sys.argv[1],'rb'))
    items = [ range(i, min(i + div, src.numPages))
              for i in xrange(0, src.numPages, div) ]
    
    for i, lst  in enumerate(items):
        print i, lst
        dst = PdfFileWriter()
        for j in lst:
            dst.addPage(src.getPage(j))
        out = file('%03d.pdf' % i, 'wb')
        dst.write(out)
        out.close()

if __name__ == '__main__':
    main()
