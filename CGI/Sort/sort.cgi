#!/usr/bin/env ruby

require 'cgi'
require './sort'
require './html'

cgi = CGI.new('html3')
file = cgi['file'].to_s
up = cgi['up'].to_s
top = cgi['top'].to_s

s = SortLines.new(file)
if top != '' then
  s.top(top.to_i)
end
if up != '' then
  s.up(up.to_i)
end

script = <<END
<script type="text/javascript">
var tdown = 0;
var tup = 0;

function mousedown(){
  d = new Date;
  tdown = d.getTime();
}
function mouseup(){
  d = new Date;
  tup = d.getTime();
}
function cclick(n){
  if(tup-tdown > 500){
    document.location.href = "sort.cgi?file=text&top=" + n
  }
  else {
    document.location.href = "sort.cgi?file=text&up=" + n
  }
}

</script>
END

description = <<EOF
長押しするとトップに移動 / クリックするとひとつ上に移動
EOF

cgi.out {
  sh = SimpleHtmlGenerator.new
  sh.html {
    sh.head {
      sh.meta('HTTP-EQUIV' => 'Content-Type', 'CONTENT' => 'text/html; charset=EUC-JP') +
      sh.title { 'title' } +
      script
    } +
    sh.body {
      description +
      sh.p +
      (0...s.lines.length).collect { |i|
        line = s.lines[i]
        sh.span('onMouseDown' => "mousedown()", 'onMouseUp' => "mouseup()", 'onClick' => "cclick(#{i})", 'class' => "button"){
          '↑' +
          line +
          sh.br
        }
      }.join
    }
  }
}
