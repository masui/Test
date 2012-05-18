//
// draglay.js ��XMLHttpRequest()�������Asendposition() �� mup() �ɉ���������
//
// $Date: 2005-03-16 18:47:20 +0900 (Wed, 16 Mar 2005) $
// $Rev: 596 $
//

function getXmlHttpObject() {
    var xmlhttp;
    /*@cc_on
    @if (@_jscript_version >= 5)
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
                xmlhttp = false;
            }
        }
    @else
        xmlhttp = false;
    @end @*/
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        try {
            xmlhttp = new XMLHttpRequest();
            xmlhttp.overrideMimeType("text/xml"); 
        } catch (e) {
            xmlhttp = false;
        }
    }
    return xmlhttp;
}

var xmlhttp = getXmlHttpObject();

function sendposition() {
  xmlhttp.open("GET", "setpos.cgi?image=" + clickElement + "&x=" + getLEFT(clickElement) + "&y=" + getTOP(clickElement),true);
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4) {
      xx = xmlhttp.responseText
    }
  }
  xmlhttp.send(null)
}

///////////////////////////////////////////////////////////////////////////////

  /*********************************************************************
   * �N���X�u���E�U�h���b�O�h���b�v�̂��߂̃X�N���v�g
   * dragLay 2002.4.14
   * update  2002.4.20
   * 
   * -------------------------------------------------------------------
   * ���� : JavaScript
   * �Ώ�Browser : 
   *     Win  n4 n6 moz e4 e5 e6 o6,
   *     Mac  n4 n6 moz e4.5 e5,
   *     Linux n4 n6 moz    
   * -------------------------------------------------------------------
   * drag �z���_��K���ȏꏊ�ɃR�s�[����������
   * <script language="JavaScript" src="./drag/draglay.js"></script>
   * �ŌĂяo���Ă����p���������B
   * 
   *   ����:  
   *    dragLay['���C���[��'] = new dragLay('���C���[��',left,top,'html') 
   * 
   *   ��������:
   * 
   *   �E���C���[��    �h���b�O�h���b�v���郌�C���[�̖��O
   *   �Eleft          ���C���[�̏���left�ʒu
   *   �Etop           ���C���[�̏���top�ʒu
   *   �Ehtml          ���C���[�̒��֕\������html
   * 
   *   �g�p��:
   * 
   *   dragLay['b0'] = new dragLay('b0',10,10,'<img src="./tr2.gif" border="0">') 
   * 
   * -------------------------------------------------------------------
   * Toshirou Takahshi tato@fureai.or.jp
   * Support http://game.gr.jp/js/
   * �����͎��R�ł����o�O��u���E�U�̃o�|�W�����A�b�v�ւ̑Ή�����
   * ���ɂ͏[�����ӂ��Ă����p���������B
   * 
   */

  /*--/////////////�������牺�͂����Ȃ��Ă������܂�/////////////--*/

  function dragLay(layName,x,y,html){
    this.id      = layName   // �h���b�O�ł���悤�ɂ��郌�C���[��
    this.x       = x         // ����left�ʒu
    this.y       = y         // ����top�ʒu
    if(document.layers)      //n4�p
      this.div='<layer name="'+layName+'" left="'+x+'" top="'+y+'">\n'
              +'<a     href="javascript:void(0)" \n'
              +'       onmousedown="clickElement=\''+layName
                                    +'\';mdown(event);return false">\n'
              + html + '</a></layer>\n'
    else                     //n4�ȊO�p
      this.div='<div  id="'+layName+'" class="dragLays"\n'
              +'      onmousedown="clickElement=\''+layName
                                    +'\';mdown(event);return false"\n'
              +'      style="position:absolute;left:'+x+'px;top:'+y+'px">\n'
              + html + '</div>\n'
    document.write(this.div)
    return 
  }
  dragLay.prototype.moveLAYOJ = moveLAYOJ //���\�b�h��ǉ�����
  //--���C���[�ړ�
  function moveLAYOJ(oj,x,y){
    if(document.getElementById){  //e5,e6,n6,m1,o6�p
      oj.left = x
      oj.top  = y
    } else if(document.all){      //e4�p
      oj.pixelLeft = x
      oj.pixelTop  = y
    } else if(document.layers)    //n4�p
      oj.moveTo(x,y)
  }

  //--layName�Ŏw�肵���I�u�W�F�N�g��Ԃ�(�K��onload��Ɏ��s���邱��)
  function getLayOj(layName){  
    if(document.getElementById) 
      return document.getElementById(layName)           //e5,e6,n6,m1,o6�p
    else if(document.all)   return document.all(layName)    //e4�p
    else if(document.layers)return document.layers[layName] //n4�p
  }

  //--���s��Z���Wset 
  function zindexLAYOJ(oj,zindex){
    if(document.getElementById) oj.zIndex=zindex  //n6,m1,e5,e6,o6�p
    else if(document.all)       oj.zIndex=zindex  //e4�p
    else if(document.layers)    oj.zIndex=zindex  //n4�p
  }

  //--�C�x���g�L���v�`���[�J�n
  document.onmousemove = mmove
  document.onmouseup = mup
  if(navigator.userAgent.indexOf('Gecko')!=-1)   //m1,n6�p
    document.onmousedown = mdown
  if(document.layers){                           //n4�p
    document.captureEvents(Event.MOUSEMOVE)
    document.captureEvents(Event.MOUSEUP)
  }

  //--�}�E�XX���Wget 
  function getMouseX(e){
    if(window.opera)                            //o6�p
        return e.clientX
    else if(document.all)                       //e4,e5,e6�p
        return document.body.scrollLeft+event.clientX
    else if(document.layers||document.getElementById)
        return e.pageX                          //n4,n6,m1�p
  }

  //--�}�E�XY���Wget 
  function getMouseY(e){
    if(window.opera)                            //o6�p
        return e.clientY
    else if(document.all)                       //e4,e5,e6�p
        return document.body.scrollTop+event.clientY
    else if(document.layers||document.getElementById)
        return e.pageY                          //n4,n6,m1�p
  }

  //--���C���|����X���Wget 
  function getLEFT(layName){
    if(document.all)                            //e4,e5,e6,o6�p
      return document.all(layName).style.pixelLeft
    else if(document.getElementById)            //n6,m1�p
      return (document.getElementById(layName).style.left!="")
              ?parseInt(document.getElementById(layName).style.left):""
    else if(document.layers)                    //n4�p
      return document.layers[layName].left 
  }

  //--���C���|���Y���Wget 
  function getTOP(layName){
    if(document.all)                          //e4,e5,e6,o6�p
      return document.all(layName).style.pixelTop
    else if(document.getElementById)          //n6,m1�p
      return (document.getElementById(layName).style.top!="")
              ?parseInt(document.getElementById(layName).style.top):""
    else if(document.layers)                  //n4�p
      return document.layers[layName].top 
  }

  //--�}�E�X�J�[�\���𓮂����������C���[��moveLAYOJ�œ�����
  function mmove(e) {
    if(!window.clickElement) return
    if (getLayOj(clickElement)) {
       movetoX = getMouseX(e) - offsetX
       movetoY = getMouseY(e) - offsetY

       var oj=(!!document.layers)?getLayOj(clickElement)
                                 :getLayOj(clickElement).style
      dragLay[clickElement].moveLAYOJ(oj,movetoX,movetoY)
      return false
    }
  }

  //--�}�E�X�{�^����������������
  //  ���C���[���̃J�[�\��offset�ʒu�擾
  function mdown(e) {
    if(navigator.userAgent.indexOf('Gecko')!=-1)   //n6,m1�p
      if(e.currentTarget.className != 'dragLays') return
      else clickElement = e.currentTarget.id
    var selLay = getLayOj(clickElement)
    if (selLay){
        offsetX = getMouseX(e) - getLEFT(selLay.id)
        offsetY = getMouseY(e) - getTOP(selLay.id)
    }
    return false
  }

  //--�}�E�X�{�^�����グ�����h���b�O����
  var zcount = 0
  function mup(e) {
    if(!window.clickElement) return
    if (getLayOj(clickElement)) {
      zindexLAYOJ((!!document.layers)?getLayOj(clickElement)
                     :getLayOj(clickElement).style,zcount++)
      sendposition(); ///////////////////////////////////////////////// masui

      clickElement=null
    }
  }
  /*--/////////////�����܂�///////////////////////////////////////--*/

