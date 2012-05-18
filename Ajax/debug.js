// ****************************** debug.js
// original from http://homepage1.nifty.com/kuraman/js/debug.html
// modified by Kouichirou Eto
// modified by Kazunobu Ichihashi
// print(variable): variable�̓��e���o�̓o�b�t�@�ɕۑ�
// flush(): �o�̓o�b�t�@�̓��e���f�o�b�O�E�B���h�E�ɏo��
// clear(): �o�̓o�b�t�@�̓��e���N���A
// setDebug(true | false): �f�o�b�O�����o�͂���(true)���o�͂��Ȃ�(false)����ݒ�
// inspect(obj): �I�u�W�F�N�g�̓��e���킩��₷��������ɂ���
// p(obj): inspect�������ʂ�\������

var debug = new debug();

function debug() {
  // �v���p�e�B ////////////////////////////////////////////////////
  this.html = "";     // �o�͂���f�o�b�O���̃o�b�t�@
  this.hWin = null;   // �f�o�b�O����\������E�B���h�E�̃n���h��
  this.bDebug = true; // �f�o�b�O���邩�ǂ����̃t���O

  this.color = "";

  // ���\�b�h //////////////////////////////////////////////////////
  
  /**
   * �f�o�b�O���o�͂��邩�ǂ���
   *
   * @param flag boolean true:�f�o�b�O���� | false:�f�o�b�O���Ȃ�
   */
  this.setDebug = function(flag) {
    this.bDebug = flag;
  }

  /**
   * �f�o�b�O���̏o�̓o�b�t�@���N���A����
   */
  this.clear = function() {
    this.html = "";
    this.flush();
  }

  /**
   * �f�o�b�O�����f�o�b�O�E�B���h�E�ɏo�͂���
   */
  this.flush = function() {
    if (false == this.bDebug) return;
    if (null == this.hWin || this.hWin.closed) {
      this.hWin = window.open("", "debug",
        "height=200,width=400,menubar=yes,scrollbars=yes,resizable=yes");
    }
    this.hWin.document.open("text/html", "replace");
    this.hWin.document.write(this.html);
    this.hWin.document.close();
    this.hWin.focus();
  }

  /**
   * �f�o�b�O�����o�b�t�@�ɒǉ�����
   *
   * @param html string �f�o�b�O����ϐ�
   */
  this.print = function(html) {
  	this.color = (this.color == "#FAF5D4") ? "#EBCC67" : "#FAF5D4";
    this.html += ("<div style='background-color:"+this.color+"'>" + this.htmlchar(html) + "</div>\n");
  }

  /**
   * �I�u�W�F�N�g�̓��e�𕶎���ɂ���
   *
   * @param obj �I�u�W�F�N�g
   */
  this.inspect = function(obj) {

    if (typeof obj == "number") {
      // ���l�̏ꍇ
      return ""+obj;

    } else if (typeof obj == "string") {
      // ������̏ꍇ
      return "\""+obj+"\"";

    } else if (typeof obj == "function") {
      // �֐��̏ꍇ
      return ""+obj;

    } else if (typeof obj == "object") {
      // �I�u�W�F�N�g�̏ꍇ
      var str = this.to_s(obj, "");
      return "{"+str+"}";
    } else {
      // ��L�ȊO�̏ꍇ
      return "<"+(typeof obj)+":"+obj+">";
    }
  }

	/**
	 * �I�u�W�F�N�g�̓��e�𕶎���ɂ���
	 *
	 * @param obj �I�u�W�F�N�g
	 */
  this.to_s = function(obj, indent){
    var delimiter = ", \n"; // ��؂蕶��

	  var str = "";
	  for (key in obj) {
	  	// ��؂蕶��
		  if (str != "") str += delimiter;
	  	str += indent;

	    var value = obj[key];
	    if (!value) {
	    	// �L�[�����邪�l���Ȃ��ꍇ
	      str += ""+key+"=>undefined";
	      continue;
	    }
	    
			if (typeof value == "number") {
			  // ���l�̏ꍇ�i key=>value �j
			  str += ""+key+"=>"+value+"";

			} else if (typeof value == "string") {
			  // ������̏ꍇ�i key=>"value" �j
			  str += ""+key+'=>"'+value+'"';

			} else if (typeof value == "function") {
			  // �֐��̏ꍇ�i key() �j
			  str += ""+key+"()";

			} else if (typeof value == "object") {
			  // �I�u�W�F�N�g�̏ꍇ�i key=>value �j
			  value = "\n" + this.to_s(value, indent+"�@�@");
			  str += ""+key+"=>"+value+"";

			} else {
			  // ��L�ȊO�̏ꍇ�i key=><type:value> �j
		  	  str += ""+key+"=><"+(typeof value)+":"+value+">";
			}
	  }
	  if (str == ""){
	  	// �I�u�W�F�N�g�Ƀv���p�e�B���Ȃ��ꍇ�͂��̂܂ܕ\��
	    str += ""+obj;
	  }
	  return str;
  }

  this.htmlchar = function(str){
  	// ���Ԃ��d�v�I
  	str = str.replace(/&/g, "&amp;");
  	str = str.replace(/</g, "&lt;");
  	str = str.replace(/>/g, "&gt;");
  	str = str.replace(/\"/g, "&quot;");
  	str = str.replace(/\n/g, "<br>\n");
  	return str;
  }

  /**
   * �I�u�W�F�N�g�̓��e�𕶎���ɂ��ĕ\������
   *
   * @param elem object �I�u�W�F�N�g
   */
  this.p = function(elem) {
    this.print(this.inspect(elem));
    this.flush();
  }
}
