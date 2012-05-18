var debug = new debug();

function debug(){
  this.html = "";
  this.hWin = null;
  this.bDebug = true;

  this.print = new Function("html","this.html += html + '<br>\\n';");
  this.refresh = dbgRefresh;
  this.clear = new Function("","this.html = '';this.refresh();");
  this.setDebug = new Function("flag","this.bDebug = flag;");

}

function dbgRefresh() {
  if (false == this.bDebug) return;
  if (null == this.hWin || this.hWin.closed) {
    this.hWin = window.open("","debug",
      "height=200,width=400,menubar=yes,scrollbars=yes,resizable=yes");
  }
  with (this.hWin.document) {
    open("text/html","replace");    write(this.html);    close();
  }
  this.hWin.focus();
}

