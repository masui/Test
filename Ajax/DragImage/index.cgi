#!/usr/bin/env ruby
#
# $Date: 2005-03-16 15:35:37 +0900 (Wed, 16 Mar 2005) $
# $Rev: 595 $
#

positions = {}
File.open("db"){ |f|
  positions = Marshal.load(f)
}
#(1..4).each { |i|
#  if positions[i].nil? then
#    positions[i] = [0,0]
#  end
#}

body = <<EOF
<h2>Ajax�ˤ������ɥ�å�</h2>

<ul>
<li> MouseUp�Υ����ߥ󥰤ǥ����Ф˲������֤����Τ��Ƥ��ޤ���
<li> �����ɥ�å���<a href="http://allabout.co.jp/career/javascript/closeup/CU20020417/index2.htm">�ⶶ��μ�ˡ</a>��ȤäƤޤ���
<li> ��äȤ��ޤ������������ж����Ʋ�������
</ul>
EOF

js =
"<script>\n" +
positions.collect { |image,pos|
  "dragLay['#{image}']  = new dragLay('#{image}',#{pos[0]},#{pos[1]},'<img src=\"#{image}.jpg\" border=\"0\">')"
}.join("\n") +
"</script>\n"

require 'cgi'

cgi = CGI.new('html3')
cgi.out {
  cgi.html {
    cgi.head {
      cgi.meta('HTTP-EQUIV' => 'Content-Type', 'CONTENT' => 'text/html; charset=EUC-JP') +
      "<script language=\"JavaScript\" src=\"debug.js\"></script>" +
      "<script language=\"JavaScript\" src=\"draglay-ajax.js\"></script>" +
      js +
      "<title>Ajax�ǲ����ɥ�å�</title>"
    } +
    cgi.body {
      body
    }
  }
}
