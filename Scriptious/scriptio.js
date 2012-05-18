//  Scriptio - Version 0.1 - 2006-02-06
//  Copyright ©2006 Matthew Clark. All Rights Reserved.
//  See http://www.scriptio.us for licensing restrictions.

function scriptio_glue(name, method, arg) {
  var obj, result = true;
  eval('try {scriptio_get_element("' + name + '").scriptio.' + method + '(arg)} finally {}');
  return result;
}
Scriptio = function() {
  this.script = null;
  this.soundtrack = null;
  this.auto_start = true;
  this.loop = false;
  this.name = 'scriptio';
  this.path = '';
  this.controller = true;
  this.width = 400;
  this.height = 300;
  this.background_color = 'cream';
  this.background_image = null;
  this.skin = '';
  this.border_width = 1;
  this.border_color = '#3A3A3A';
  this.overlay_value = 50;
  this.continue_margin = 10;
  this.rewind_seconds = 5;
  this.arrow_head = 12;
  this.arrow_angle = 30;
  this.nocache = true;
  this.style = '';
  this.font_sans = 'Arial, Helvetica, sans-serif';
  this.font_serif = 'Times, Times New Roman, New York, serif';
  this.font_fixed = 'Courier, Monaco, monospace';
  this.font_default = this.font_sans;
  this.font_size = 14;
  this.font_color = '#000000';
  this.text_width = 400;
  this.text_height = 300;
  this.timer_interval = 50;
  this.rewind_interval = 200;
  this.onload_interval = 1000;
  this.silence_extra = 3;
  this.author_mode = false;
  this.author_height = 120;
  this.author_margin = 20;
  this.last_left = null;
  this.last_top = null;
  this.last_color = null;
  this.last_size = null;
  this.last_face = null;
  this.last_time = null;
  this.last_script = null;
  this.audio = null;
  this.at_left = 0;
  this.at_top = 0;
  this.paused = true;
  this.expo = null;
  this.onload = false;
  this.time = 0;
  this.started = false;
  this.scripts = null;
  this.source_script = null;
  this.global = { button_selected:'' };
  this.init_parse();
  this.init_cache();
  if (arguments.length == 1)
    for (var option in arguments[0])
      if ((option == 'loop') || (option == 'auto_start') || (option == 'controller') || (option == 'author_mode'))
        eval('this.' + option + ' = ' + scriptio_bool(arguments[0][option]) + ';');
      else
        eval('this.' + option + ' = \'\' + arguments[0][option];');
  if (this.name) {
    var width = parseInt(this.width),
        height = parseInt(this.height),
        border_width = parseInt(this.border_width);
    document.write(
      "<div name=\"" + this.name + "\" id=\"" + this.name + "\"" + (this.style.length ? " style=\"" + this.style + "\"" : '') + ">\n" +
      "  <form name=\"" + this.name + "_form\" action=\"\" method=\"post\">\n" +
      "    <table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"width:" + (width + 2 * border_width) + "px\">\n" +
      (border_width
         ? "      <tr><td><table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"width:100%;height:" + border_width + "px\"><tr>\n" +
           "        <td class=\"scriptio-border\" style=\"height:" + border_width + "px;background-color:" + this.border_color + "\"></td>\n" +
           "      </tr></table></td></tr>\n"
         : '') +
      "      <tr><td style=\"width:" + (width + 2 * border_width) + "px\"><table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\"><tr>\n" +
      (border_width
         ? "        <td class=\"scriptio-border\" style=\"width:" + border_width + "px;background-color:" + this.border_color + "\"></td>\n"
         : '') +
      "        <td class=\"scriptio-expo-container\" style=\"width:" + width + "px;height:" + height + "px\">\n" +
      "          <div id=\"" + this.name + "_area\" class=\"scriptio-expo\" " +
                  "style=\"width:" + width + "px;height:" + height + "px;background-color:" + scriptio_get_color(this.background_color) + ";" +
                         (this.background_image ? "background-image:url(" + this.background_image + ");" : '') +
                         "clip:rect(0px " + width + "px " + height + "px 0px);" +
                         "font-family:" + this.font_default + ";font-size:" + this.font_size + "px\"></div>\n" +
      "        </td>\n" +
      (border_width
        ? "        <td class=\"scriptio-border\" style=\"width:" + border_width + "px;background-color:" + this.border_color + "\"></td>\n"
        : '') +
      "      </tr></table></td></tr>\n" +
      (this.controller
         ? "      <tr><td>\n" +
           "        <table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tr>\n" +
           "          <td><div id=\"" + this.name + "_speaker\" class=\"scriptio-icon scriptio-speaker\" onMouseDown=\"return scriptio_glue('" + this.name + "', 'speaker_down')\" onMouseUp=\"return scriptio_glue('" + this.name + "', 'speaker_up')\"></div></td>\n" +
           "          <td><div id=\"" + this.name + "_play\" class=\"scriptio-icon scriptio-play\" onMouseDown=\"return scriptio_glue('" + this.name + "', 'play_down')\" onMouseUp=\"return scriptio_glue('" + this.name + "', 'play_up')\"></div></td>\n" +
           "          <td id=\"" + this.name + "_progress\" style=\"width:" + (width + 2 * border_width - 75) + "px\">\n" +
           "            <div class=\"scriptio-thumb2\" style=\"width:" + (width + 2 * border_width - 88) + "px\"><div id=\"" + this.name + "_thumb\" class=\"scriptio-thumb\"></div></div>\n" +
           "            <table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tr>\n" +
           "              <td><div id=\"" + this.name + "_left\" class=\"scriptio-icon scriptio-left\"></div></td>\n" +
           "              <td><div id=\"" + this.name + "_center\" class=\"scriptio-icon scriptio-center\" style=\"width:" + (width + 2 * border_width - 87) + "px\"></div></td>\n" +
           "              <td><div id=\"" + this.name + "_right\" class=\"scriptio-icon scriptio-right\"></div></td>\n" +
           "            </tr></table>\n" +
           "          </td>\n" +
           "          <td><div id=\"" + this.name + "_rewind\" class=\"scriptio-icon scriptio-rewind\" onMouseDown=\"return scriptio_glue('" + this.name + "', 'rewind_down')\" onMouseUp=\"return scriptio_glue('" + this.name + "', 'rewind_up')\"></div></td>\n" +
           "          <td><div id=\"" + this.name + "_forward\" class=\"scriptio-icon scriptio-forward\" onMouseDown=\"return scriptio_glue('" + this.name + "', 'forward_down')\" onMouseUp=\"return scriptio_glue('" + this.name + "', 'forward_up')\"></div></td>\n" +
           "          <td><div id=\"" + this.name + "_menu\" class=\"scriptio-icon scriptio-menu\" onClick=\"return scriptio_glue('" + this.name + "', 'menu_click')\"></div></td>\n" +
           "        </tr></table>\n" +
           "      </td></tr>\n"
         : (border_width
              ? "      <tr><td><table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"width:100%;height:1px\"><tr>\n" +
                "        <td class=\"scriptio-border\" style=\"height:" + border_width + "px;background-color:" + this.border_color + "\"></td>\n" +
                "      </tr></table></td></tr>\n"
              : '')) +
      (this.author_mode
         ? "<tr><td><div class=\"scriptio-console\" id=\"" + this.name + "_console\" " +
           "style=\"height:" + parseInt(this.author_height) + "px;" +
           "margin-top:" + parseInt(this.author_margin) + "px\"></div></td></tr>\n" +
           "<tr><td class=\"scriptio-status\"><table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tr>\n" +
             "<td class=\"scriptio-timing\" id=\"" + this.name + "_timing\">+0</td>\n" +
             "<td class=\"scriptio-cursor\" id=\"" + this.name + "_cursor\">&nbsp;</td>\n" +
             "<td class=\"scriptio-message\" id=\"" + this.name + "_message\"></td>\n" +
           "</tr></table></td></tr>\n"
         : '') +
      "    </table>\n" +
      "  </form>\n" +
      "</div>");
    if (this.skin && this.skin.length) {
      var items = Array('speaker', 'silence', 'play', 'pause', 'rewind', 'forward', 'menu', 'left', 'center', 'right', 'thumb', 'volume', 'slider');
      for (var i = 0;  i < items.length;  i++) {
        var obj = scriptio_get_element(this.name + '_' + items[i]);
        if (obj)
          obj.style.backgroundImage = 'url(' + this.path + 'scriptio/images/' + items[i] + '-' + this.skin + '.gif)';
      }
    }
    if (this.soundtrack) {
      var trackname = this.soundtrack.toLowerCase();
      if (trackname.indexOf('.mov') > 0)
        this.init_audio(new scriptio_quicktime(this, this.soundtrack));
      else if (trackname.indexOf('.swf') > 0)
        this.init_audio(new scriptio_flash(this, this.soundtrack));
      else if ((trackname.indexOf('.ogg') > 0) || (trackname.indexOf('.au') > 0) || (trackname.indexOf('.wav') > 0))
        this.init_audio(new scriptio_java(this, this.soundtrack));
      else
        this.author('Cannot identify soundtrack type for "' + this.soundtrack + '"');
    }
  } else
    this.author("Missing target identifier for where to place exposition");
  setTimeout('scriptio_post_load("' + this.name + '")', this.timer_interval);
  setTimeout('scriptio_onload("' + this.name + '")', this.onload_interval);
}
scriptio_onload = function(name) {
  if (!name)
    name = 'scriptio';
  eval(name + '.onload = true;');
}
scriptio_post_load = function(name) {
  var onload = false;
  onload = eval(name + '.onload');
  if (onload) {
    var container = scriptio_get_element(name);
    var expo = scriptio_get_element(name + '_area');
    if (container && expo) {
      eval(name + '.container = container;');
      eval(name + '.container.scriptio = ' + name + ';');
      eval(name + '.expo = expo;');
      eval(name + '.expo.scriptio = ' + name + ';');
      eval(name + '.post_load()');
      return;
    }
  }
  setTimeout('scriptio_post_load("' + name + '")', eval(name + '.timer_interval'));
}
Scriptio.prototype.post_load = function() {
  if (this.script) {
    var request = null;
    if (window.XMLHttpRequest)
      request = new XMLHttpRequest();
    else if (window.ActiveXObject)
      request = new ActiveXObject("Microsoft.XMLHTTP");
    if (request) {
      var name = this.name;
      request.onreadystatechange = function() { scriptio_glue(name, 'load_request', request); };
      request.open('GET', this.script + ((this.author_mode || this.nocache) ? '?' + Math.random() : ''), true);
      request.send(null);
    }
  } else if (this.source_script)
    this.set_script('' + this.source_script);
  if (this.audio) {
    this.audio.controller = window.document[this.name + '_audio'];
    if (!this.audio.controller)
      this.audio.controller = scriptio_get_element(this.name + '_audio');
  }
  if (this.audio && !this.audio.has_volume()) {
    var obj = scriptio_get_element(this.name + '_speaker');
    if (obj)
      obj.style.backgroundImage = 'url(' + this.path + 'scriptio/images/silence' + (this.skin ? '-' + this.skin : '') + '.gif)';
  }
  if (this.author_mode && this.expo) {
    var name = this.name;
    this.expo.onmouseover = function(e) { scriptio_glue(name, 'expo_move', e); return true; };
    this.expo.onmousemove = function(e) { scriptio_glue(name, 'expo_move', e); return true; };
    this.expo.onmousedown = function(e) { scriptio_glue(name, 'expo_down', e); return true; };
  }
  setTimeout('scriptio_glue("' + this.name + '", "timer_trigger")', this.timer_interval);
}
Scriptio.prototype.load_request = function(request) {
  if (request.readyState == 4) {  //  "complete" state
    if (request.status == 200)  //  "OK" status
      this.set_script(request.responseText);
    else if (request.status == 404)
      this.author('Unable to load script "' + this.script + '"');
    else
      this.author('Error "' + request.status + '" while fetching script "' + this.script + '"');
  }
}
Scriptio.prototype.set_script = function(text) {
  this.scripts = this.parse_script(text);
  if (!this.audio) {
    var max_time = (this.scripts.length > 0) ? this.scripts[this.scripts.length - 1].getAttribute('time') : 0;
    this.init_audio(new scriptio_silence(this, parseInt(max_time) + parseInt(this.silence_extra)));
  }
  this.cache_preload();
}
Scriptio.prototype.author = function() {
  if (this.author_mode && arguments.length) {
    var console = scriptio_get_element(this.name + '_console');
    if (console) {
      var item = document.createElement('div');
      item.className = 'scriptio-console-item';
      var string = '';
      for (var i = 0;  i < arguments.length;  i++)
        string += arguments[i] + ' ';
      item.appendChild(document.createTextNode(string));
      if (console.childNodes.length % 2)
        item.style.backgroundColor = '#EEEEEE';
      console.appendChild(item);
    }
  }
}
Scriptio.prototype.xrecolor = function() {
  if (arguments.length == 3) {
    if (arguments[1] == 'to') {
      var objs = this.get(arguments[0]);
      if (objs) {
        this.last_color = scriptio_get_color(arguments[2]);
        for (var i = 0;  i < objs.length;  i++) {
          objs[i].style.color = this.last_color;
          var type = objs[i].getAttribute('xtype');
          if ((type == 'rectangle') || (type == 'frame') || (type == 'line') ||
              (type == 'arrow') || (type == 'circle') || (type == 'ellipse')) {
            var elements = objs[i].childNodes;
            for (var j = 0;  j < elements.length;  j++)
              elements[j].style.backgroundColor = this.last_color;
          }
        }
      }
    } else
      this.author('Missing "to" parameter in "recolor" command');
  } else
    this.author('Incorrect number of arguments for "recolor" command');
}
Scriptio.prototype.xrestyle = function() {
  if (arguments.length == 3) {
    if (arguments[1] == 'to') {
      var objs = this.get(arguments[0]);
      if (objs)
        for (var i = 0;  i < objs.length;  i++) {
          objs[i].style.fontStyle = (arguments[2] == 'italic') ? 'italic' : 'normal';
          objs[i].style.fontWeight = (arguments[2] == 'bold') ? 'bold' : 'normal';
        }
    } else
      this.author('Missing "to" parameter in "restyle" command');
  } else
    this.author('Incorrect number of arguments for "restyle" command');
}
Scriptio.prototype.xrename = function() {
  if (arguments.length == 3) {
    if (arguments[1] == 'to') {
      var objs = this.get(arguments[0]);
      if (objs)
        for (var i = 0;  i < objs.length;  i++)
          objs[i].setAttribute('label', arguments[2]);
    } else
      this.author('Missing "to" parameter in "rename" command');
  } else
    this.author('Incorrect number of arguments for "rename" command');
}
Scriptio.prototype.xrecenter = function() {
  if ((arguments.length % 2) == 1) {
    var horz = true;
    for (var i = 1;  i < arguments.length;  i += 2) {
      if ((arguments[i] == 'horizontal') && scriptio_bool(arguments[i + 1]))
        horz = true;
      else if ((arguments[i] == 'vertical') && scriptio_bool(arguments[i + 1]))
        horz = false;
    }
    var objs = this.get(arguments[0]);
    if (objs)
      for (var i = 0;  i < objs.length;  i++) {
        if (horz)
          objs[i].style.left = '' + (this.expo.offsetWidth - objs[i].offsetWidth) / 2 + 'px';
        else
          objs[i].style.top = '' + (this.expo.offsetHeight - objs[i].offsetHeight) / 2 + 'px';
      }
  } else
    this.author('Incorrect number of arguments for "recenter" command');
}
Scriptio.prototype.xresize = function() {
  if (arguments.length == 3) {
    if (arguments[1] == 'to') {
      if ((typeof(arguments[2]) == 'object') && (arguments[2].length > 0))
        this.at('size', arguments[2]);
      var objs = this.get(arguments[0]);
      if (objs)
        for (var i = 0;  i < objs.length;  i++) {
          var obj = objs[i];
          var type = obj.getAttribute('xtype');
          if (type == 'picture') {
            var pct = parseInt(arguments[2]);
            var width_orig = parseInt(obj.getAttribute('orig_width')),
                height_orig = parseInt(obj.getAttribute('orig_height')),
                width_new = Math.round(pct * width_orig / 100),
                height_new = Math.round(pct * height_orig / 100);
            obj.style.width = '' + width_new + 'px';
            obj.style.height = '' + height_new + 'px';
            obj.style.marginLeft = '' + (width_orig - width_new) / 2 + 'px';
            obj.style.marginRight = '' + (width_orig + 1 - width_new) / 2 + 'px';
            obj.style.marginTop = '' + (height_orig - height_new) / 2 + 'px';
            obj.style.marginBottom = '' + (height_orig + 1 - height_new) / 2 + 'px';
          } else if (type != 'display') {
            obj.style.height = '' + this.at_top + 'px';
            obj.style.width = '' + this.at_left + 'px';
          } else
            obj.style.fontSize = '' + parseInt(arguments[2]) + 'px';
        }
    } else
      this.author('Missing "to" parameter in "resize" command');
  } else
    this.author('Incorrect number of arguments for "resize" command');
}
Scriptio.prototype.xlayer = function() {
  if ((arguments.length == 1) || (arguments.length == 3)) {
    var objs = this.get(arguments[0]);
    if (objs) {
      var i, objs2;
      if (arguments.length == 1) {
        for (i = 0;  i < objs.length;  i++)
          objs[i].parentNode.appendChild(objs[i]);
      } else if (arguments[1] == 'before') {
        if ((objs2 = this.get(arguments[2])) && (objs2.length > 0)) {
          var obj = objs2[objs2.length - 1].nextSibling;
          for (i = 0;  i < objs.length;  i++)
            if (obj)
              objs[i].parentNode.insertBefore(objs[i], obj);
            else
              objs[i].parentNode.appendChild(objs[i]);
        }
      } else if (arguments[1] == 'after') {
        if ((objs2 = this.get(arguments[2])) && (objs2.length > 0)) {
          for (i = 0;  i < objs.length;  i++)
            objs[i].parentNode.insertBefore(objs[i], objs2[0]);
        }
      } else if (arguments[1] == 'behind') {
        if (scriptio_bool(arguments[2])) {
          var elements = this.expo.childNodes;
          if (elements && (elements.length > 0))
            for (i = 0;  i < objs.length;  i++)
              this.expo.insertBefore(objs[i], elements[0]);
        }
      } else
        this.author('Invalid argument "' + arguments[1] + '" in "layer" command');
    } else
      this.author('Missing "to" parameter in "rename" command');
  } else
    this.author('Incorrect number of arguments for "layer" command');
}
Scriptio.prototype.xrepict = function() {
  if (arguments.length == 3) {
    if (arguments[1] == 'to') {
      var objs = this.get(arguments[0]);
      if (objs)
        for (var i = 0;  i < objs.length;  i++)
          objs[i].setAttribute('src', arguments[2]);
    } else
      this.author('Missing "to" parameter in "repict" command');
 } else
    this.author('Incorrect number of arguments for "repict" command');
}
Scriptio.prototype.xfocus = function() {
  if (arguments.length == 1) {
    var objs = this.get(arguments[0]);
    if (objs && (objs.length > 0))
      objs[0].focus();
  } else
    this.author('Incorrect number of arguments for "focus" command');
}
Scriptio.prototype.init_audio = function(audio) {
  this.audio = audio;
  this.duration = -1;
  this.was_playing = false;
  this.in_thumb = false;
  this.timer_rewind = null;
  var obj, name = this.name;
  if (obj = scriptio_get_element(this.name + '_progress'))
    obj.onmousedown = function(e) { return scriptio_glue(name, 'thumb_down', e); };
  if (obj = scriptio_get_element(this.name + '_area')) {
    obj.onclick = function(e) { return scriptio_glue(name, 'expo_click', e); };
    obj.ondblclick = function(e) { return scriptio_glue(name, 'expo_dblclick', e); };
  }
  this.counter = 0;
}
Scriptio.prototype.is_audio_ready = function() {
  if (this.duration < 0) {
    if (this.audio) {
      if (this.audio.is_ready())
        this.duration = this.audio.get_duration();
    } else
      this.duration = 0;
  }
  return (this.duration >= 0);
}
Scriptio.prototype.get_duration = function() {
  return Math.max(0, this.duration);
}
Scriptio.prototype.set_duration = function(new_duration) {
  if (this.audio && (typeof(this.audio.set_duration) == 'function'))
    this.duration = this.audio.set_duration(new_duration);
}
Scriptio.prototype.is_playing = function() {
  return this.audio ? this.audio.is_playing() : false;
}
Scriptio.prototype.get_time = function() {
  return this.audio ? this.audio.get_time() : 0;
}
Scriptio.prototype.check_icon = function() {
  if (this.audio) {
    var obj = scriptio_get_element(this.name + '_play');
    if (obj) {
      var play = this.audio.is_playing() ? 'pause' : 'play';
      obj.className = 'scriptio-icon scriptio-' + play;
      if (this.skin && this.skin.length)
      obj.style.backgroundImage = 'url(' + this.path + 'scriptio/images/' + play + '-' + this.skin + '.gif)';
    }
  }
}
Scriptio.prototype.play = function() {
  var children = scriptio_get_children(this.expo);
  if (children)
    for (var i = children.length;  i--;  )
      if (children[i].getAttribute('xtype') == 'button')
        this.remove(children[i]);
  if (this.audio)
    this.audio.play();
  this.check_icon();
}
Scriptio.prototype.pause = function() {
  if (this.audio)
    this.audio.pause();
  this.check_icon();
}
Scriptio.prototype.audio_timer = function() {
  if (this.audio)
    this.audio.trigger();
}
Scriptio.prototype.speaker_down = function() {
  if (this.audio && this.audio.has_volume()) {
    var obj = scriptio_get_element(this.name + '_speaker');
    if (obj)
      obj.style.backgroundPosition = 'top right';
    if (!scriptio_get_element(this.name + '_volume')) {
      obj = document.createElement('div');
      obj.className = 'scriptio-volume';
      obj.id = this.name + '_volume';
      obj.style.top = '' + (this.expo.offsetHeight - 100) + 'px';
      if (this.skin && this.skin.length)
        obj.style.backgroundImage = 'url(' + this.path + 'scriptio/images/volume-' + this.skin + '.gif)';
      var name = this.name;
      obj.onmousedown = function(e) { scriptio_glue(name, 'volume_down', e); return false; };
      var obj2 = document.createElement('div');
      obj2.className = 'scriptio-slider2';
      obj.appendChild(obj2);
      var obj3 = document.createElement('div');
      obj3.className = 'scriptio-slider';
      obj3.id = this.name + '_slider';
      obj3.style.top = '' + (100 - this.audio.get_volume()) + '%';
      if (this.skin && this.skin.length)
        obj3.style.backgroundImage = 'url(' + this.path + 'scriptio/images/slider-' + this.skin + '.gif)';
      obj2.appendChild(obj3);
      this.expo.appendChild(obj);
    } else if (!this.in_thumb)
      this.audio_unhilite(obj);
  }
  return true;
}
Scriptio.prototype.speaker_up = function() {
  return true;
}
Scriptio.prototype.volume_down = function(e) {
  if (typeof(e) == 'undefined')
    e = window.event;
  var name = this.name;
  document.onmousemove = function(e) { scriptio_glue(name, 'volume_drag', e); return false; };
  document.onmouseup = function(e) { scriptio_glue(name, 'volume_up', e); return false; };
  var obj = scriptio_get_element(this.name + '_slider');
  if (obj)
    obj.style.backgroundPosition = 'top right';
  this.in_thumb = true;
  this.volume_drag(e);
  return true;
}
Scriptio.prototype.volume_drag = function(e) {
  if (typeof(e) == 'undefined')
    e = window.event;
  if (this.in_thumb) {
    var volume = scriptio_get_element(this.name + '_volume'),
        slider = scriptio_get_element(this.name + '_slider');
    if (volume && slider) {
      var value = 100 - Math.round(100 * ((e.clientY - slider.offsetHeight / 2) - scriptio_get_top(volume)) / (volume.offsetHeight - slider.offsetHeight));
      value = Math.min(Math.max(value, 0), 100);
      this.audio.set_volume(value);
      slider.style.top = '' + (100 - value) + '%';
    }
  }
  return true;
}
Scriptio.prototype.volume_up = function() {
  document.onmousemove = null;
  document.onmouseup = null;
  this.audio_unhilite(scriptio_get_element(this.name + '_slider2'));
  this.in_thumb = false;
  return true;
}
Scriptio.prototype.play_down = function() {
  var obj = scriptio_get_element(this.name + '_play');
  if (obj)
    obj.style.backgroundPosition = 'top right';
  if (this.audio) {
    if (this.audio.is_playing())
      this.pause();
    else
      this.play();
  }
  return true;
}
Scriptio.prototype.play_up = function(obj) {
  this.audio_unhilite(scriptio_get_element(this.name + '_play'));
  return true;
}
Scriptio.prototype.restart = function() {
  if (this.audio) {
    this.audio.pause();
    this.audio.set_time(0);
  }
}
Scriptio.prototype.rewind_down = function() {
  var obj = scriptio_get_element(this.name + '_rewind');
  if (obj)
    obj.style.backgroundPosition = 'top right';
  if (this.audio) {
    var new_time = Math.min(Math.max(this.audio.get_time() - this.rewind_seconds, 0), this.duration);
    if (this.get_time() != new_time)
      this.audio.set_time(new_time);
  } 
  this.timer_rewind = setTimeout('scriptio_glue("' + this.name + '", "rewind_down")', this.rewind_interval);
  return true;
}
Scriptio.prototype.rewind_up = function() {
  this.audio_unhilite(scriptio_get_element(this.name + '_rewind'));
  return true;
}
Scriptio.prototype.forward_down = function() {
  var obj = scriptio_get_element(this.name + '_forward');
  if (obj)
    obj.style.backgroundPosition = 'top right';
  if (this.audio) {
    var new_time = Math.min(Math.max(this.audio.get_time() + this.rewind_seconds, 0), this.duration);
    if (this.get_time() != new_time)
      this.audio.set_time(new_time);
  } 
  this.timer_rewind = setTimeout('scriptio_glue("' + this.name + '", "forward_down")', this.rewind_interval);
  return true;
}
Scriptio.prototype.forward_up = function() {
  this.audio_unhilite(scriptio_get_element(this.name + '_forward'));
  return true;
}
Scriptio.prototype.thumb_down = function(e) {
  var name = this.name;
  document.onmousemove = function(e) { scriptio_glue(name, 'thumb_drag', e); return false; };
  document.onmouseup = function(e) { scriptio_glue(name, 'thumb_up', e); return false; };
  var obj = scriptio_get_element(this.name + '_thumb');
  if (obj)
    obj.style.backgroundPosition = 'top right';
  if (this.audio)
    if (this.was_playing = this.audio.is_playing())
      this.pause();
  this.in_thumb = true;
  this.thumb_drag(e);
  return true;
}
Scriptio.prototype.thumb_drag = function(e) {
  if (typeof(e) == 'undefined')
    e = window.event;
  if (this.in_thumb) {
    var progress = scriptio_get_element(this.name + '_progress'),
        thumb = scriptio_get_element(this.name + '_thumb');
    if (progress && thumb) {
      var pct = ((e.clientX - thumb.offsetWidth / 2) - scriptio_get_left(progress)) / parseFloat(progress.offsetWidth - thumb.offsetWidth);
      if (this.audio)
        this.audio.set_time(this.duration * Math.max(Math.min(pct, 1), 0));
    }
  }
  return true;
}
Scriptio.prototype.thumb_up = function(e) {
  document.onmousemove = null;
  document.onmouseup = null;
  this.audio_unhilite(scriptio_get_element(this.name + '_thumb'));
  if (this.was_playing) {
    if (this.audio)
      this.audio.play();
    this.check_icon();
    this.was_playing = false;
  }
  this.in_thumb = false;
  return true;
}
Scriptio.prototype.audio_unhilite = function(obj) {
  if (obj)
    obj.style.backgroundPosition = 'top left';
  this.check_icon();
  if (obj = scriptio_get_element(this.name + '_volume')) {
    obj.parentNode.removeChild(obj);
    if (obj = scriptio_get_element(this.name + '_speaker'))
      obj.style.backgroundPosition = 'top left';
  }
  if (this.timer_rewind) {
    clearTimeout(this.timer_rewind);
    this.timer_rewind = null;
  }
  if (obj = scriptio_get_element(this.name + '_menu_box')) {
    obj.parentNode.removeChild(obj);
    if (obj = scriptio_get_element(this.name + '_menu'));
      obj.style.backgroundPosition = 'top left';
  }
}
Scriptio.prototype.expo_click = function(e) {
  if (typeof(e) == 'undefined')
    e = window.event;
  var src = e ? e.SrcElement : null;
  if (src) {
    var xtype = src.getAttribute('xtype');
    if ((xtype == 'button') || (xtype == 'picture'))
      return true;
  }
  if (this.audio)
    if (this.audio.is_playing())
      this.pause();
  this.audio_unhilite();
  return true;
}
Scriptio.prototype.expo_dblclick = function(e) {
  if (typeof(e) == 'undefined')
    e = window.event;
  var src = e ? e.SrcElement : null;
  if (src) {
    var xtype = src.getAttribute('xtype');
    if ((xtype == 'button') || (xtype == 'checkbox') || (xtype == 'radio') || (xtype == 'picture'))
      return true;
  }
  if (this.audio)
    if (!this.audio.is_playing())
      this.play();
  return false;
}
Scriptio.prototype.init_cache = function() {
  this.cache_data = Array();
  this.cache_counter = 0;
}
Scriptio.prototype.cache_preload = function() {
  this.cache_data = Array();
  if (this.scripts)
    for (var i = 0;  i < this.scripts.length;  i++) {
      var code = this.scripts[i].getAttribute('code');
      if (code) {
        var lines = code.split("\n");
        for (var j = 0;  j < lines.length;  j++) {
          var line = lines[j];
          if ((line.substr(0, 13) == 'this.xpicture') || (line.substr(0, 13) == 'this.xpreload'))
            eval('this.cache_' + line.substr(5));
        }
      }
    }
}
Scriptio.prototype.cache_xpicture = function() {
  if (arguments.length > 0) {
    var path = arguments[0];
    if ((path.indexOf('.gif') > 0) || (path.indexOf('.jpg') > 0) || (path.indexOf('.png') > 0)) {
      for (var i = 0;  i < this.cache_data.length;  i++)
        if (this.cache_data[i].path == path)
          return;
      var item = { path:path };
      this.cache_data[this.cache_data.length] = item;
      var request = null;
      if (window.XMLHttpRequest)
        request = new XMLHttpRequest();
      else if (window.ActiveXObject)
        request = new ActiveXObject('Microsoft.XMLHTTP');
      if (request) {
        var name = this.name;
        request.onreadystatechange = function() { scriptio_glue(name, 'cache_request', request); };
        request.open('GET', path, true);
        request.send(null);
      }
    }
  }
}
Scriptio.prototype.cache_request = function(request) {
  if (request.readyState == 4) {  //  "complete" state
    this.cache_counter++;
    if (request.status == 200) {
    }
  }
}
Scriptio.prototype.cache_xpreload = function() {
  if (arguments.length > 0) {
    var arg = arguments[0];
    if ((typeof(arg) == 'object') && (arg.length > 0)) {
      for (var i = 0;  i < arg.length;  i++)
        this.cache_xpicture(arg[i]);
    } else
      this.cache_xpicture(arg);
  }
}
Scriptio.prototype.cache_progress = function() {
  return (this.cache_data.length > 0) ? this.cache_counter / this.cache_data.length : 1;
}
Scriptio.prototype.is_cache_ready = function() {
  return (this.cache_data.length == this.cache_counter);
}
var scriptio_color_list = {
  white : '#FFFFFF',
  cream : '#FFFFCC',
  yellow : '#FFFF00',
  pink : '#FFBBFF',
  hotpink : '#F660AB',
  red : '#FF3F4E',
  dkred : '#CC0000',
  orange : '#FF6666',
  dkorange : '#F88017',
  green : '#00EE00',
  dkgreen : '#336600',
  ltblue : '#CCCCFF',
  blue : '#5DB9FF',
  dkblue : '#0000A0',
  violet : '#D866FF',
  dkviolet : '#842DCe',
  olive : '#A0C544',
  brown : '#EfB27E',
  dkbrown : '#7E3517',
  ltgray : '#DDDDDD',
  gray : '#AAAAAA',
  dkgray : '#777777',
  black : '#000000'
  /*
  red : '#FF0000',
  yellow : '#FFFF00',
  cyan : '#00FFFF',
  blue : '#0000FF',
  magenta : '#FF00FF',
  white : '#FFFFFF',
  whitesmoke : '#F5F5F5',
  gainsboro : '#DCDCDC',
  lightgrey : '#D3D3D3',
  lightgray : '#D3D3D3',
  silver : '#C0C0C0',
  darkgray : '#A9A9A9',
  gray : '#808080',
  dimgray : '#696969',
  black : '#000000',
  darkslategray : '#2F4F4F',
  slategray : '#708090',
  lightslategray : '#778899',
  steelblue : '#4682B4',
  royalblue : '#4169E1',
  cornflowerblue : '#6495ED',
  ightsteelblue : '#B0C4DE',
  mediumslateblue : '#7B68EE',
  slateblue : '#6A5ACD',
  darkslateblue : '#483D8B',
  midnightblue : '#191970',
  navy : '#000080',
  darkblue : '#00008B',
  mediumblue : '#0000CD',
  dodgerblue : '#1E90FF',
  deepskyblue : '#00BFFF',
  lightskyblue : '#87CEFA',
  skyblue : '#87CEEB',
  lightblue : '#ADD8E6',
  powderblue : '#B0E0E6',
  azure : '#F0FFFF',
  lightcyan : '#E0FFFF',
  paleturquoise : '#AFEEEE',
  darkturquoise : '#00CED1',
  cadetblue : '#5F9EA0',
  mediumturquoise : '#48D1CC',
  aqua : '#00FFFF',
  turquoise : '#40E0D0',
  lightseagreen : '#20B2AA',
  darkcyan : '#008B8B',
  teal : '#008080',
  aquamarine : '#7FFFD4',
  mediumaquamarine : '#66CDAA',
  darkseagreen : '#8FBC8F',
  mediumseagreen : '#3CB371',
  seagreen : '#2E8B57',
  darkgreen : '#006400',
  green : '#00FF00',
  forestgreen : '#228B22',
  limegreen : '#32CD32',
  lime : '#00FF00',
  chartreuse : '#7FFF00',
  lawngreen : '#7CFC00',
  greenyellow : '#ADFF2F',
  palegreen : '#98FB98',
  lightgreen : '#90EE90',
  springgreen : '#00FF7F',
  mediumspringgreen : '#00FA9A',
  darkolivegreen : '#556B2F',
  olivedrab : '#6B8E23',
  olive : '#808000',
  darkkhaki : '#BDB76B',
  darkgoldenrod : '#B8860B',
  goldenrod : '#DAA520',
  gold : '#FFD700',
  khaki : '#F0E68C',
  palegoldenrod : '#EEE8AA',
  blanchedalmond : '#FFEBCD',
  moccasin : '#FFE4B5',
  wheat : '#F5DEB3',
  navajowhite : '#FFDEAD',
  burlywood : '#DEB887',
  tan : '#D2B48C',
  rosybrown : '#BC8F8F',
  sienna : '#A0522D',
  saddlebrown : '#8B4513',
  chocolate : '#D2691E',
  peru : '#CD853F',
  sandybrown : '#F4A460',
  darkred : '#8B0000',
  maroon : '#800000',
  brown : '#A52A2A',
  firebrick : '#B22222',
  indianred : '#CD5C5C',
  lightcoral : '#F08080',
  salmon : '#FA8072',
  darksalmon : '#E9967A',
  lightsalmon : '#FFA07A',
  coral : '#FF7F50',
  tomato : '#FF6347',
  darkorange : '#FF8C00',
  orange : '#FFA500',
  orangered : '#FF4500',
  crimson : '#DC143C',
  red : '#FF0000',
  deeppink : '#FF1493',
  fuchsia : '#FF00FF',
  hotpink : '#FF69B4',
  lightpink : '#FFB6C1',
  pink : '#FFC0CB',
  palevioletred : '#DB7093',
  mediumvioletred : '#C71585',
  purple : '#800080',
  darkmagenta : '#8B008B',
  mediumpurple : '#9370DB',
  blueviolet : '#8A2BE2',
  indigo : '#4B0082',
  darkviolet : '#9400D3',
  darkorchid : '#9932CC',
  mediumorchid : '#BA55D3',
  orchid : '#DA70D6',
  violet : '#EE82EE',
  plum : '#DDA0DD',
  thistle : '#D8BFD8',
  lavender : '#E6E6FA',
  ghostwhite : '#F8F8FF',
  aliceblue : '#F0F8FF',
  mintcream : '#F5FFFA',
  honeydew : '#F0FFF0',
  lightgoldenrodyellow : '#FAFAD2',
  lemonchiffon : '#FFFACD',
  cornsilk : '#FFF8DC',
  lightyellow : '#FFFFE0',
  ivory : '#FFFFF0',
  floralwhite : '#FFFAF0',
  linen : '#FAF0E6',
  oldlace : '#FDF5E6',
  antiquewhite : '#FAEBD7',
  bisque : '#FFE4C4',
  peachpuff : '#FFDAB9',
  papayawhip : '#FFEFD5',
  seashell : '#FFF5EE',
  lavenderblush : '#FFF0F5',
  mistyrose : '#FFE4E1',
  snow : '#FFFAFA',
  cream : '#FCFFD3'
  */
};
function scriptio_is_color(color) {
  if ((color.charAt(0) >= 'a') && (color.charAt(0) <= 'z'))
    return eval('typeof(scriptio_color_list.' + color + ') != \'undefined\'');
  return false;
}
function scriptio_get_color(color) {
  if ((color.charAt(0) >= 'a') && (color.charAt(0) <= 'z'))
    eval('if (scriptio_color_list.' + color + ') color = scriptio_color_list.' + color + ';');
  return color;
}
function scriptio_button_down() {
  this.id = 'scriptio-button-hilite';
  return true;
}
function scriptio_button_up() {
  this.id = '';
  return true;
}
Scriptio.prototype.button_click = function(obj) {
  this.global.button_selected = '';
  if (obj) {
    var label = obj.getAttribute('label');
    if (label && (typeof(label) == 'string') && label.length)
      this.global.button_selected = label;
    else {
      var elements = obj.childNodes;
      if (elements && (elements.length > 0) && (elements[0].nodeType == 3))
        this.global.button_selected = elements[0].nodeValue;
    }
  }
  if (!this.is_playing())
    this.play();
  return true;
}
function scriptio_nothing_dblclick() {
  return true;
}
function scriptio_checkbox_over() {
  this.id = 'xcheckbox_hilite';
  return true;
}
function scriptio_checkbox_out() {
  this.id = '';
  return true;
}
function scriptio_checkbox_click() {
  this.checked = !this.checked;
  scriptio_stop_propagation(e);
  return true;
}
Scriptio.prototype.checkbox_click  = function(obj) {
  this.author('checkbox_click before: obj=' + obj + ' checked=' + obj.checked);
  if (obj)
    obj.checked = !obj.checked;
  this.author('checkbox_click after: obj=' + obj + ' checked=' + obj.checked);
  return true;
}
function scriptio_checkbox_label_click() {
  var parent = this.parentNode;
  if (parent) {
    var input = parent.childNodes ? parent.childNodes[0] : null;
    if (input && (typeof(input.checked) != 'undefined'))
      input.checked = !input.checked;
  }
  return true;
}
Scriptio.prototype.radio_click  = function(e) {
  if (!e)
    e = window.event;
  if (e)
    this.radio_on(e.SrcElement);
  return true;
}
Scriptio.prototype.radio_label_click = function(e) {
  if (!e)
    e = window.event;
  if (e && e.SrcElement) {
    var parent = e.SrcElement.parentNode;
    if (parent && parent.childNodes && parent.childNodes[0])
      radio_on(parent.childNodes[0]);
  }
  return true;
}
Scriptio.prototype.radio_on = function(obj) {
  if (obj) {
    var name = obj.getAttribute('name'),
        value = obj.getAttribute('value');
    for (var i = 0;  i < this.expo.childNodes.length;  i++)
      if (this.expo.childNodes[i].getAttribute('xtype') == 'radio') {
        var radio = this.expo.childNodes[i].childNodes[0];
        if (radio)
          if (radio.getAttribute('name') == name)
            if (radio.getAttribute('value') != value)
              radio.checked = false;
      }
    obj.checked = true;
  }
}
function scriptio_picture_over() {
  var hilited = this.getAttribute('src_hilited');
  if (hilited && (typeof(hilited) == 'string') && hilited.length)
    this.src = hilited;
  return true;
}
function scriptio_picture_out() {
  var orig = this.getAttribute('src_orig'),
      hilited = this.getAttribute('src_hilited');
  if (orig && (typeof(orig) == 'string') && orig.length &&
      hilited && (typeof(hilited) == 'string') && hilited.length)
    this.src = orig;
  return true;
}
function scriptio_picture_down() {
  var selected = this.getAttribute('src_selected');
  if (selected && (typeof(selected) == 'string') && selected.length)
    this.src = selected;
  return true;
}
function scriptio_picture_up() {
  var orig = this.getAttribute('src_orig'),
      selected = this.getAttribute('src_selected');
  if (orig && (typeof(orig) == 'string') && orig.length &&
      selected && (typeof(selected) == 'string') && selected.length)
    this.src = orig;
  return true;
}
Scriptio.prototype.picture_click = function(e) {
  scriptio_stop_propagation(e);
  this.global.button_selected = '';
  var label = this.getAttribute('label');
  if (label && (typeof(label) == 'string') && label.length)
    this.global.button_selected = label;
  if (!this.is_playing())
    this.play();
  return true;
}
Scriptio.prototype.expo_move = function(e) {
  if (typeof(scriptio_get_scroll_x) != 'undefined') {
    if (!e)
      e = window.event;
    var x = e.clientX + scriptio_get_scroll_x(),
        y = e.clientY + scriptio_get_scroll_y();
    scriptio_set_inner(this.name + '_cursor', '{' + x + ',' + y + '}');
  }
  return true;
}
Scriptio.prototype.expo_down = function(e) {
  if (typeof(scriptio_get_scroll_x) != 'undefined') {
    var text = '';
    if (!e)
      e = window.event;
    var x = e.clientX + scriptio_get_scroll_x() - this.expo.offsetLeft,
        y = e.clientY + scriptio_get_scroll_y() - this.expo.offsetTop;
    var objects = scriptio_get_children(this.expo);
    if (objects && objects.length)
      for (i = objects.length;  i--;  ) {
        var obj = objects[i];
        if ((x >= obj.offsetLeft) && (x < obj.offsetLeft + obj.offsetWidth) &&
            (y >= obj.offsetTop) && (y < obj.offsetTop + obj.offsetHeight)) {
          text = 'at {' + obj.offsetLeft + ',' + obj.offsetTop + '}  ' +
                 'to {' + (obj.offsetLeft + obj.offsetWidth) + ',' + (obj.offsetTop + obj.offsetHeight) + '}  ' +
                 'size {' + obj.offsetWidth + ',' + obj.offsetHeight + '}  ';
          var label = obj.getAttribute('label');
          if (label && (label.length > 0))
            text += 'label "' + label + '"';
          break;
        }
      }
    scriptio_set_inner(this.name + '_message', text);
  }
  return true;
}
function scriptio_show(obj) {
  var string = '';
  for (var prop in obj)
    string += prop + '=' + obj[prop] + '   ';
  alert(string);
}
Scriptio.prototype.timer_trigger = function() {
  if (this.expo && this.is_audio_ready() && this.is_cache_ready()) {
    if (this.auto_start && !this.started) {
      this.play();
      this.started = true;
      this.xinitialize();
      this.last_time = this.last_script = -1;
    }
    var time = this.get_time();
    var obj = scriptio_get_element(this.name + '_thumb');
    if (obj && (this.get_duration() > 0))
      obj.style.left = '' + Math.round((1000 * time) / this.get_duration()) / 10 + '%';
    var is_playing = this.is_playing();
    if (is_playing)
      this.paused = false;
    else if (!this.paused) {
      if (this.loop && (time >= this.get_duration())) {
        this.xinitialize();
        this.restart();
        this.play();
        this.time = time = 0;
        this.last_time = this.last_script = -1;
      } else {
        var obj = scriptio_get_element(this.name + '_play');
        if (obj)
          obj.className = 'scriptio-icon scriptio-play';
        this.paused = true;
      }
    }
    if (this.author_mode) {
      var timing = '+' + Math.round(10 * time) / 10;
      if (timing != scriptio_get_inner(this.name + '_timing'))
        scriptio_set_inner(this.name + '_timing', '+' + Math.round(10 * time) / 10);
    }
    if ((this.time != time) && this.scripts) {
      if (this.last_time > time) {
        this.xinitialize();
        while (this.last_script >= 0)  //  look for last 'clear'
          if (this.scripts[this.last_script--].getAttribute('clear') == 'true')
            break;
        this.last_time = -1;
      };
      var was_paused = this.paused;
      for (var last_script = this.last_script;  last_script + 1 < this.scripts.length;  last_script++) {
        script = this.scripts[last_script + 1];
        var script_time = script.getAttribute('time');
        if (script_time < time) {
          this.time = script_time;
          this.last_script++;
          var code = script.getAttribute('code');
          if (code && (code.length > 0)) {
            try {
              eval(code);
            }
            catch (e) {
              this.author(code);
              this.author(e.message);
            }
          }
          if (!was_paused && this.paused && this.audio) {
            this.audio.set_time(this.last_time = time = script_time);
            break;
          }
        } else
          break;
      }
      this.last_time = time;
    }
    this.time = time = this.get_time();
    this.process_all();
  }
  setTimeout('scriptio_glue("' + this.name + '", "timer_trigger")', this.timer_interval);
}
Scriptio.prototype.xbutton = function() {
  var obj = this.create('div', 'button');
  obj.className = 'scriptio-button';
  obj.appendChild(document.createTextNode(((arguments.length > 0) && (arguments.length % 2)) ? arguments[0] : 'Continue'));
  var auto = false, enabled = true;
  for (var i = arguments.length % 2;  i < arguments.length;  i += 2) {
    var arg = arguments[i],
        value = arguments[i + 1];
    if (arg == 'color')
      obj.style.color = value;
    else if (arg == 'background')
      obj.style.background = value;
    else if (arg == 'default')
      obj.className = obj.className + ' scriptio-button-default';
    else if (arg == 'auto')
      auto = true;
    else if (arg == 'enabled')
      enabled = scriptio_bool(value);
    else if (arg == 'size') {
      this.at(arguments[i], arguments[i + 1]);
      obj.style.width = '' + Math.max(this.at_left, 1) + 'px';
      obj.style.height = '' + Math.max(this.at_top, 1) + 'px';
    } else if (!this.arg(obj, arguments[i], arguments[i + 1]))
      this.author('Unknown argument "' + arguments[i] + '" for "button" command');
  }
  if (enabled) {
    obj.onmousedown = scriptio_button_down;
    obj.onmouseup = scriptio_button_up;
    var name = this.name;
    obj.onclick = function() { scriptio_glue(name, 'button_click', this); return true; };
    obj.ondblclick = scriptio_nothing_dblclick;
  }
  this.insert(obj);
  if (auto) {
    obj.style.left = '' + (this.expo.offsetWidth - (obj.offsetWidth + this.continue_margin)) + 'px';
    obj.style.top = '' + (this.expo.offsetHeight - (obj.offsetHeight + this.continue_margin)) + 'px';
  }
  this.post(obj);
}
Scriptio.prototype.xcheckbox = function() {
  var obj = this.create('div', 'checkbox'),
      checkbox = document.createElement('input'),
      label = ((arguments.length > 0) && (arguments.length % 2) && arguments[0].length)
                ? document.createElement('span')
                : null;
  checkbox.className = 'scriptio-checkbox';
  checkbox.type = 'checkbox';
  obj.ondblclick = scriptio_nothing_dblclick;
  obj.appendChild(checkbox);
  if (label) {
    label.className = 'scriptio-checkbox-label';
    label.appendChild(document.createTextNode(arguments[0]));
    label.onmouseover = scriptio_checkbox_over;
    label.onmouseout = scriptio_checkbox_out;
    label.onclick = scriptio_checkbox_label_click;
    obj.appendChild(label);
  }
  for (var i = arguments.length % 2;  i < arguments.length;  i += 2) {
    var arg = arguments[i],
        value = arguments[i + 1];
    if (arg == 'color') {
      if (label)
        label.style.color = value;
    } else if (arg == 'background')
      obj.style.background = value;
    else if (arg == 'checked') {
      if (value)
        checkbox.defaultChecked = true;
    } else if (!this.arg(obj, arg, value))
      this.author('Unknown argument "' + arg + '" for "checkbox" command');
    else if (arg == 'label') {
      obj.name = value;
      obj.id = value;
      obj.setAttribute('name', value);
    }
  }
  this.insert(obj);
  this.post(obj);
}
Scriptio.prototype.xradio = function() {
  var obj = this.create('div', 'radio'),
      radio = document.createElement('input'),
      label = ((arguments.length > 0) && (arguments.length % 2) && arguments[0].length)
                ? document.createElement('span')
                : null;
  obj.ondblclick = scriptio_nothing_dblclick;
  radio.className = 'scriptio-radio';
  radio.type = 'radio';
  radio.name = 'radio';
  var name = this.name;
  radio.onclick = function(e) { scriptio_glue(name, 'radio_click', e); return true; };
  obj.appendChild(radio);
  if (label) {
    label.className = 'scriptio-radio-label';
    label.appendChild(document.createTextNode(arguments[0]));
    label.onmouseover = scriptio_checkbox_over;
    label.onmouseout = scriptio_checkbox_out;
    label.onclick = function(e) { scriptio_glue(name, 'radio_label_click', e); return true; };
    obj.appendChild(label);
    radio.setAttribute('value', arguments[0]);
  }
  for (var i = arguments.length % 2;  i < arguments.length;  i += 2) {
    var arg = arguments[i],
        value = arguments[i + 1];
    if (arg == 'color') {
      if (label)
        label.style.color = value;
    } else if (arg == 'group')
      radio.name = 'value';
    else if (arg == 'background')
      obj.style.background = value;
    else if (arg == 'checked') {
      if (value)
        radio.defaultChecked = true;
    } else if (!this.arg(obj, arg, value))
      this.author('Unknown argument "' + arg + '" for "radio" command');
  }
  this.insert(obj);
  this.post(obj);
}
function scriptio_flash(scriptio, source) {
  this.scriptio = scriptio;
  if (scriptio.author_mode || scriptio.nocache)
    source += '?' + Math.random();
  document.write(
    '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" id="' + scriptio.name + '_audio" width="1" height="1">\n' +
    '  <param name="movie" value="' + source + '">\n' +
    '  <param name="quality" value="high">\n' +
    '  <param name="play" value="false">\n' +
    '  <param name="allowScriptAccess" value="sameDomain" />\n' +
    '  <param name="wmode" value="Transparent" />\n' +
    '  <embed name="' + scriptio.name + '_audio" src="' + source + '" swliveconnect="true" quality="high" play="false" width="1" height="1" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />\n' +
    '</object>\n');
  this.scale = 10;    //  # of frames per second
  this.frames = null;
}
scriptio_flash.prototype.is_ready = function() {
  if (typeof(this.controller) != 'undefined') {
    if (typeof(this.controller.ReadyState) != 'undefined') {
      if (this.controller.ReadyState == 4) {
        this.frames = (typeof(this.controller.TotalFrames) == 'function') ? this.controller.TotalFrames() : this.controller.TotalFrames;
        return true;
        }
    } else if (typeof(this.controller.PercentLoaded) != 'undefined')
      if (this.controller.PercentLoaded() == 100) {
        this.frames = (typeof(this.controller.TotalFrames) == 'function') ? this.controller.TotalFrames() : this.controller.TotalFrames;
        return true;
      }
  }
  return false;
}
scriptio_flash.prototype.is_playing = function() {
  return (this.controller && (typeof(this.controller.IsPlaying) != 'undefined')) ? this.controller.IsPlaying() : false;
}
scriptio_flash.prototype.play = function() {
  if (this.controller && (typeof(this.controller.Play) != 'undefined'))
    this.controller.Play();
}
scriptio_flash.prototype.pause = function() {
  if (this.controller && (typeof(this.controller.StopPlay) != 'undefined'))
    this.controller.StopPlay();
}
scriptio_flash.prototype.get_duration = function() {
  return (this.frames > 0) ? this.frames / this.scale : 0;
}
scriptio_flash.prototype.get_time = function() {
  return (this.controller && (typeof(this.controller.TCurrentFrame) != 'undefined')) ? this.controller.TCurrentFrame('/') / this.scale : 0;
}
scriptio_flash.prototype.set_time = function(new_time) {
  if (this.controller && (typeof(this.controller.GotoFrame) != 'undefined'))
    this.controller.GotoFrame(Math.round(new_time * this.scale));
}
scriptio_flash.prototype.has_volume = function() {
  return false;
}
scriptio_flash.prototype.get_volume = function() {
  return 0;
}
scriptio_flash.prototype.set_volume = function(new_volume) {
}
Scriptio.prototype.xinitialize = function() {
  while (this.expo.childNodes.length > 0)
    this.remove(this.expo.childNodes[this.expo.childNodes.length - 1]);
  this.last_left = this.last_top = 0;
  this.last_face = this.font_default;
  this.last_size = this.font_size;
  this.last_color = this.font_color;
}
Scriptio.prototype.xpause = function() {
  if (!this.paused) {
    this.pause();
    this.paused = true;
    var text = (arguments.length % 2) ? arguments[0] : 'Continue', button = true;
    for (var i = arguments.length % 2;  i < arguments.length;  i += 2) {
      var arg = arguments[i];
      if (arg == 'button')
        button = scriptio_bool(arguments[i + 1]);
      else
        this.author('Unknown argument "' + arg + '" for "pause" command');
    }
    if (button)
      this.xbutton(text, 'default', '1', 'auto', '1', 'color', 'black');
  } else {
    var children = scriptio_get_children(this.expo);
    if (children)
      for (var i = children.length;  i--;  )
        if (children[i].getAttribute('xtype') == 'button')
          this.remove(children[i]);
  }
}
Scriptio.prototype.xask = function() {
  var obj = this.create('input', 'ask');
  var name = this.name;
  obj.ondblclick = scriptio_nothing_dblclick;
  obj.className = 'scriptio-ask';
  obj.type = 'text';
  var focus = false;
  for (var i = arguments.length % 2;  i < arguments.length;  i += 2) {
    var arg = arguments[i],
        value = arguments[i + 1];
    if (arg == 'color') {
      if (label)
        label.style.color = value;
    } else if (arg == 'background')
      obj.style.background = value;
    else if (arg == 'default')
      obj.setAttribute('value', value);
    else if (arg == 'focus')
      focus = value;
    else if (arg == 'width')
      obj.style.width = '' + value + 'px';
    else if (arg == 'password') {
      if (value)
        obj.type = 'password';
    } else if (!this.arg(obj, arg, value))
      this.author('Unknown argument "' + arg + '" for "ask" command');
  }
  this.insert(obj);
  this.post(obj);
  if (focus)
    obj.focus();
}
Scriptio.prototype.xgoto = function() {
  if (!this.paused) {
    if (arguments.length == 1) {
      for (var i = 0;  i < this.scripts.length;  i++)
        if (arguments[0] == this.scripts[i].getAttribute('label')) {
          this.pause();
          this.paused = true;
          if (this.audio)
            this.audio.set_time(this.last_time = this.scripts[i].getAttribute('time'));
          this.last_script = i - 1;
          this.play();
          return;
        }
      this.author('Unable to find label "' + arguments[0] + '" for "goto" command');
    } else
      this.author('Invalid number of arguments for "goto" command');
  }
}
Scriptio.prototype.Absolute = function() {
  if (arguments.length == 1)
    return Math.abs((typeof(arguments[0]) != 'number') ? parseFloat(arguments[0]) : arguments[0]);
  else
    this.author('Invalid number of arguments for "Absolute" function');
}
Scriptio.prototype.Cos = function() {
  if (arguments.length == 1)
    return Math.cos((typeof(arguments[0]) != 'number') ? parseFloat(arguments[0]) : arguments[0]);
  else
    this.author('Invalid number of arguments for "Cos" function');
}
Scriptio.prototype.Random = function() {
  if (arguments.length == 1)
    return Math.random((typeof(arguments[0]) != 'number') ? parseFloat(arguments[0]) : arguments[0]);
  else
    this.author('Invalid number of arguments for "Random" function');
}
Scriptio.prototype.Round = function() {
  if (arguments.length == 1)
    return Math.round((typeof(arguments[0]) != 'number') ? parseFloat(arguments[0]) : arguments[0]);
  else
    this.author('Invalid number of arguments for "Sqrt" function');
}
Scriptio.prototype.Sin = function() {
  if (arguments.length == 1)
    return Math.sin((typeof(arguments[0]) != 'number') ? parseFloat(arguments[0]) : arguments[0]);
  else
    this.author('Invalid number of arguments for "Sin" function');
}
Scriptio.prototype.Sqrt = function() {
  if (arguments.length == 1)
    return Math.sqrt((typeof(arguments[0]) != 'number') ? parseFloat(arguments[0]) : arguments[0]);
  else
    this.author('Invalid number of arguments for "Sqrt" function');
}
Scriptio.prototype.Length = function() {
  if (arguments.length == 1)
    return ((typeof(arguments[0]) != 'string') ? '' + arguments[0] : arguments[0]).length;
  else
    this.author('Invalid number of arguments for "Length" function');
}
Scriptio.prototype.Answer = function() {
  var result = false;
  if (arguments.length == 1) {
    var objs = this.get(arguments[0]);
    for (var i = 0;  i < objs.length;  i++) {
      var obj = objs[i],
          type = obj.getAttribute('xtype');
      if (type == 'entry') {
      } else if (type == 'checkbox') {
        if (obj.childNodes && obj.childNodes.length && obj.childNodes[0].checked)
          result = obj.childNodes[0].checked;
      } else if (type == 'radio') {
      }
    }
  } else if (arguments.length == 0)
    result = this.global.button_selected;
  else
    this.author('Invalid number of arguments for "Answer" function');
  return result;
}
Scriptio.prototype.StringWidth = function() {
  if (arguments.length == 1) {
    var text = scriptio_clean_text(arguments[0]);
    var obj = document.createElement('span');
    obj.style.position = 'absolute';
    obj.style.visibility = 'hidden';
    obj.style.fontFamily = this.last_face;
    obj.style.fontSize = '' + this.last_size + 'px';
    /*
    if (text.indexOf('<br>') >= 0) {
      var lines = text.split('<br>');
      for (var i = 0;  i < lines.length;  i++) {
        if (i > 0)
          obj.appendChild(document.createElement('br'));
        obj.appendChild(document.createTextNode(lines[i]));
      }
    } else
    */
      obj.appendChild(document.createTextNode(text));
    this.expo.appendChild(obj);
    var result = obj.offsetWidth;
    this.expo.removeChild(obj);
    return result;
  } else
    this.author('Invalid number of arugments for "StringWidth" function');
}
Scriptio.prototype.object_extent = function(arg) {
  var result = new Object();
  var any = false;
  var objs = this.get(arg);
  for (var i = 0;  i < objs.length;  i++) {
    var obj = objs[i];
    if (obj.getAttribute('xtype') != 'group') {
      var slide = obj.getAttribute('slide'),
          grow = obj.getAttribute('grow'),
          left = slide ? parseInt(obj.getAttribute('end_left')) : (obj.offsetLeft - (obj.style.marginLeft ? parseInt(obj.style.marginLeft) : 0)),
          top = slide ? parseInt(obj.getAttribute('end_top')) : (obj.offsetTop - (obj.style.marginTop ? parseInt(obj.style.marginTop) : 0)),
          right = left + (grow ? parseInt(obj.getAttribute('orig_width')) : obj.offsetWidth),
          bottom = top + (grow ? parseInt(obj.getAttribute('orig_height')) : obj.offsetHeight);
      if (any) {
        if (result.left > left)
          result.left = left;
        if (result.right < right)
          result.right = right;
        if (result.top > top)
          result.top = top;
        if (result.bottom < bottom)
          result.bottom = bottom;
      } else {
        result.left = left;
        result.top = top;
        result.right = right;
        result.bottom = bottom;
        any = true;
      }
    }
  }
  if (!any)
    result.left = result.top = result.right = result.bottom = 0;
  return result;
}
Scriptio.prototype.Left = function() {
  if (arguments.length == 1) {
    var extent = this.object_extent(arguments[0]);
    return extent.left;
  } else
    this.author('Invalid number of arguments for "Left" function');
}
Scriptio.prototype.Top = function() {
  if (arguments.length == 1) {
    var extent = this.object_extent(arguments[0]);
    return extent.top;
  } else
    this.author('Invalid number of arguments for "Top" function');
}
Scriptio.prototype.Right = function() {
  if (arguments.length == 1) {
    var extent = this.object_extent(arguments[0]);
    return extent.right;
  } else
    this.author('Invalid number of arguments for "Right" function');
}
Scriptio.prototype.Bottom = function() {
  if (arguments.length == 1) {
    var extent = this.object_extent(arguments[0]);
    return extent.bottom;
  } else
    this.author('Invalid number of arguments for "Bottom" function');
}
Scriptio.prototype.Width = function() {
  if (arguments.length == 1) {
    var extent = this.object_extent(arguments[0]);
    return extent.right - extent.left;
  } else
    this.author('Invalid number of arguments for "Width" function');
}
Scriptio.prototype.Height = function() {
  if (arguments.length == 1) {
    var extent = this.object_extent(arguments[0]);
    return extent.bottom - extent.top;
  } else
    this.author('Invalid number of arguments for "Height" function');
}
Scriptio.prototype.xrectangle = function() {
  this.geometry('rectangle', arguments);
}
Scriptio.prototype.xframe = function() {
  this.geometry('frame', arguments);
}
Scriptio.prototype.xline = function() {
  this.geometry('line', arguments);
}
Scriptio.prototype.xarrow = function() {
  this.geometry('arrow', arguments);
}
Scriptio.prototype.xcircle = function() {
  this.geometry('circle', arguments);
}
Scriptio.prototype.xellipse = function() {
  this.geometry('ellipse', arguments);
}
Scriptio.prototype.geometry = function(geom_type, args) {
  if (!(args.length % 2)) {
    var obj = this.create('div', geom_type);
    var width = 0, height = 0, to = false, thickness = 1;
    for (var i = 0;  i < args.length;  i += 2) {
      var arg = args[i],
          value = args[i + 1];
      if (!this.arg(obj, arg, value))
        switch (arg) {
          case 'size':
            this.at(arg, value);
            width = this.at_left;
            height = this.at_top;
            break;
          case 'to':
            this.at(arg, value);
            to = true;
            width = this.at_left;
            height = this.at_top;
            break;
          case 'thickness':
          case 'width':
            thickness = Math.max(parseInt(value), 1);
            break;
          case 'head':
            this.arrow_head = Math.max(parseFloat(value), 1);
            break;
          case 'angle':
            this.arrow_angle = parseFloat(value);
            break;
          default:
            this.author('Unknown argument "' + arg + '" for "' + geom_type + '" command');
            break;
        }
    }
    if (to) {
      width -= parseInt(obj.style.left);
      height -= parseInt(obj.style.top);
    }
    if (width < 0)
      obj.style.left = '' + (parseInt(obj.style.left) + width) + 'px';
    if (height < 0)
      obj.style.top = parseInt(obj.style.top) + height;
    obj.style.width = '' + (Math.abs(width) + thickness - ((geom_type != 'line') && (geom_type != 'arrow'))) + 'px';
    obj.style.height = '' + (Math.abs(height) + thickness - ((geom_type != 'line') && (geom_type != 'arrow'))) + 'px';
    obj.style.clip = 'rect(0px ' + obj.style.width + ' ' + obj.style.height + ' 0px)';
    switch (geom_type) {
      case 'frame':
        if ((width > 2 * thickness) || (height > 2 * thickness)) {
          this.rect(obj, 0, 0, width + thickness - 1, thickness);
          this.rect(obj, 0, thickness, thickness, height - (thickness + 1));
          this.rect(obj, 0, height - 1, width + thickness - 1, thickness);
          this.rect(obj, width - 1, thickness, thickness, height - (thickness + 1));
          break;
        }
      case 'rectangle':
        this.rect(obj, 0, 0, width + thickness - 1, height + thickness - 1);
        break;
      case 'line':
        if ((width != 0) && (height != 0))
          this.line(obj, (width >= 0) ? 0 : -width, (height >= 0) ? 0 : -height,
                         (width >= 0) ? width : 0, (height >= 0) ? height : 0, thickness);
        else
          this.rect(obj, 0, 0, (width != 0) ? Math.abs(width) : thickness, (height != 0) ? Math.abs(height) : thickness);
        break;
      case 'arrow':
        var x1 = (width >= 0) ? 0 : -width,
            y1 = (height >= 0) ? 0 : -height,
            x2 = (width >= 0) ? width : 0,
            y2 = (height >= 0) ? height : 0;
        var angle = Math.atan2(-height, -width);
        var arrow_angle = (3.14159265359 * this.arrow_angle) / 180;
        var x3 = x2 + Math.round(this.arrow_head * Math.cos(angle + arrow_angle)),
            y3 = y2 + Math.round(this.arrow_head * Math.sin(angle + arrow_angle)),
            x4 = x2 + Math.round(this.arrow_head * Math.cos(angle - arrow_angle)),
            y4 = y2 + Math.round(this.arrow_head * Math.sin(angle - arrow_angle));
        var x_min = Math.min(Math.min(x1, x2), Math.min(x3, x4)),
            y_min = Math.min(Math.min(y1, y2), Math.min(y3, y4));
        if (x_min < 0) {
          x1 -= x_min;  x2 -= x_min;  x3 -= x_min;  x4 -= x_min;
          obj.style.left = '' + (parseInt(obj.style.left) + x_min) + 'px';
        }
        if (y_min < 0) {
          y1 -= y_min;  y2 -= y_min;  y3 -= y_min;  y4 -= y_min;
          obj.style.top = parseInt(obj.style.top) + y_min;
        }
        var x_max = Math.max(Math.max(x1, x2), Math.max(x3, x4)),
            y_max = Math.max(Math.max(y1, y2), Math.max(y3, y4));
        if (x_max + 1 > Math.abs(width))
          obj.style.width = '' + (x_max + 1) + 'px';
        if (y_max + 1 > Math.abs(height))
          obj.style.height = '' + (y_max + 1) + 'px';
        obj.style.clip = 'rect(0px ' + obj.style.width + ' ' + obj.style.height + ' 0px)';
        if ((width != 0) && (height != 0))
          this.line(obj, x1, y1, x2, y2, thickness);
        else
          this.rect(obj, Math.min(x1, x2), Math.min(y1, y2), (width != 0) ? Math.abs(width) : thickness, (height != 0) ? Math.abs(height) : thickness);
        this.line(obj, x2, y2, x3, y3, thickness);
        this.line(obj, x2, y2, x4, y4, thickness);
        break;
      case 'circle':
        this.circle(obj, 0, 0, width, height);
        break;
      case 'ellipse':
        this.ellipse(obj, 0, 0, width, height, thickness);
        break;
    }
    this.insert(obj);
    this.post(obj);
  } else
    this.author('Invalid number of arguments for "' + geom_type + '" command');
}
Scriptio.prototype.rect = function(parent, x, y, width, height) {
  if ((width > 0) && (height > 0)) {
    var obj = document.createElement('div');
    obj.style.position = 'absolute';
    obj.style.left = '' + x + 'px';
    obj.style.top = '' + y + 'px';
    obj.style.width = '' + width + 'px';
    obj.style.height = '' + height + 'px';
    obj.style.backgroundColor = this.last_color;
    obj.style.overflow = 'hidden';
    obj.style.clip = 'rect(0,' + width + 'px,' + height + 'px,0)';
    parent.appendChild(obj);
  }
}
Scriptio.prototype.line = function(obj, x, y, x2, y2, thickness) {
  var steep = 0;
  var dx = Math.abs(x2 - x);
  var sx = ((x2 - x) > 0) ? 1 : -1;
  var dy = Math.abs(y2 - y);
  var sy = ((y2 - y) > 0) ? 1 : -1;
  if (dy > dx) {  //  swap 'em
    steep = x;  x = y;  y = steep;
    steep = dx;  dx = dy;  dy = steep;
    steep = sx;  sx = sy;  sy = steep;
    steep = 1;
  }
  var e = 2 * dy - dx;
  for (var i = 0;  i < dx;  i++) {
    if (steep)
      this.rect(obj, y, x, 1, 1);
    else
      this.rect(obj, x, y, 1, 1);
    while (e >= 0) {
      y += sy;
      e -= 2 * dx;
    }
    x += sx;
    e += 2 * dy;
  }
  this.rect(obj, x2, y2, 1, 1);
}
Scriptio.prototype.circle = function(obj, x, y, width, height) {
  width--;   height--;
  var xc = x + width / 2, yc = y + height / 2;
  var rx = (width - 1) / 2, ry = (height - 1) / 2;
  var rx2 = rx * rx, ry2 = ry * ry;
  var tworx2 = 2 * rx2, twory2 = 2 * ry2;
  x = 0;  y = height / 2;
  var px = 0, py = tworx2 * y;
  if (width > height) {
    this.rect(obj, xc - x, yc + y, 2 * x, 1);
    this.rect(obj, xc - x, yc - y, 2 * x, 1);
  } else {
    this.rect(obj, xc + x, yc - y, 1, 2 * y);
    this.rect(obj, xc - x, yc - y, 1, 2 * y);
  }
  this.rect(obj, xc + x, yc + y, 1, 1);
  this.rect(obj, xc + x, yc - y, 1, 1);
  this.rect(obj, xc - x, yc + y, 1, 1);
  this.rect(obj, xc - x, yc - y, 1, 1);
  var p = Math.round(ry2 - (rx2 * ry) + (0.25 * rx2));
  while (px < py) {
    x++;
    px += twory2;
    if (p < 0)
      p += ry2 + px;
    else {
      y--;
      py -= tworx2;
      p += ry2 + px - py;
    }
    if (width > height) {
      this.rect(obj, xc - x, yc + y, 2 * x, 1);
      this.rect(obj, xc - x, yc - y, 2 * x, 1);
    } else {
      this.rect(obj, xc + x, yc - y, 1, 2 * y);
      this.rect(obj, xc - x, yc - y, 1, 2 * y);
    }
  }
  p = Math.round(ry2 * (x + 0.5) * (x + 0.5) + rx2* (y - 1) * (y - 1) - rx2 * ry2);
  while (y > 0) {
    y--;
    py -= tworx2;
    if (p > 0) 
      p += rx2 - py;
    else {
      x++;
      px += twory2;
      p += rx2 - py + px;
    }
    if (width > height) {
      this.rect(obj, xc - x, yc + y, 2 * x, 1);
      this.rect(obj, xc - x, yc - y, 2 * x, 1);
    } else {
      this.rect(obj, xc + x, yc - y, 1, 2 * y);
      this.rect(obj, xc - x, yc - y, 1, 2 * y);
    }
  }
}
Scriptio.prototype.ellipse = function(obj, x, y, width, height, thickness) {
  width--;   height--;
  var xc = x + width / 2, yc = y + height / 2;
  var rx = (width - 1) / 2, ry = (height - 1) / 2;
  var rx2 = rx * rx, ry2 = ry * ry;
  var tworx2 = 2 * rx2, twory2 = 2 * ry2;
  x = 0;  y = height / 2;
  var px = 0, py = tworx2 * y;
  this.rect(obj, xc + x, yc + y, 1, 1);
  this.rect(obj, xc + x, yc - y, 1, 1);
  this.rect(obj, xc - x, yc + y, 1, 1);
  this.rect(obj, xc - x, yc - y, 1, 1);
  var p = Math.round(ry2 - (rx2 * ry) + (0.25 * rx2));
  while (px < py) {
    x++;
    px += twory2;
    if (p < 0)
      p += ry2 + px;
    else {
      y--;
      py -= tworx2;
      p += ry2 + px - py;
    }
    this.rect(obj, xc + x, yc + y, 1, 1);
    this.rect(obj, xc + x, yc - y, 1, 1);
    this.rect(obj, xc - x, yc + y, 1, 1);
    this.rect(obj, xc - x, yc - y, 1, 1);
  }
  p = Math.round(ry2 * (x + 0.5) * (x + 0.5) + rx2* (y - 1) * (y - 1) - rx2 * ry2);
  while (y > 0) {
    y--;
    py -= tworx2;
    if (p > 0) 
      p += rx2 - py;
    else {
      x++;
      px += twory2;
      p += rx2 - py + px;
    }
    this.rect(obj, xc + x, yc + y, 1, 1);
    this.rect(obj, xc + x, yc - y, 1, 1);
    this.rect(obj, xc - x, yc + y, 1, 1);
    this.rect(obj, xc - x, yc - y, 1, 1);
  }
}
function scriptio_java(scriptio, source) {
  this.scriptio = scriptio;
  document.write(
    '<applet' +
    '  name="' + scriptio.name + '_audio" id="' + scriptio.name + '_audio"' +
    '  archive="' + scriptio.path + 'scriptio/scriptio.jar"' +
    '  code="us.scriptio.audio.Scriptio.class"' +
    '  codebase="."' +
    '  width="1" height="1">' +
    '  <param name="type" value="application/x-java-applet;version=1.4">' +
    '  <param name="audio" value="' + source + '">' +
    '  <c>No J2SE 1.4 support</c>' +
    '  mayscript' +
    '</applet>');
}
scriptio_java.prototype.is_ready = function() {
  return this.controller ? this.controller.is_ready() : false;
}
scriptio_java.prototype.is_playing = function() {
  return this.controller ? this.controller.is_playing() : false;
}
scriptio_java.prototype.play = function() {
  if (this.controller)
    this.controller.play();
}
scriptio_java.prototype.pause = function() {
  if (this.controller)
    this.controller.pause();
}
scriptio_java.prototype.get_duration = function() {
  return this.controller ? this.controller.get_duration() : 0;
}
scriptio_java.prototype.get_time = function() {
  return this.controller ? this.controller.get_time() : 0;
}
scriptio_java.prototype.set_time = function(new_time) {
  if (this.controller)
    this.controller.set_time(new_time);
}
scriptio_java.prototype.has_volume = function() {
  return this.controller ? this.controller.has_volume() : false;
}
scriptio_java.prototype.get_volume = function() {
  return this.controller ? this.controller.get_volume() : 0;
}
scriptio_java.prototype.set_volume = function(new_volume) {
  if (this.controller)
    this.controller.set_volume(new_volume);
}
Scriptio.prototype.menu_click = function() {
  var menu = scriptio_get_element(this.name + '_menu');
  if (menu) {
    menu.style.backgroundPosition = 'top right';
    var obj = scriptio_get_element(this.name + '_menu_box');
    if (!obj) {
      obj = document.createElement('div');
      obj.className = 'scriptio-menu-box';
      obj.id = this.name + '_menu_box';
      obj.style.left = '' + (scriptio_get_left(menu) + menu.offsetWidth) + 'px';
      if (this.author_mode) {
        this.menu_item(obj, 'Restart', 'menu_restart');
        this.menu_item(obj, 'Display Script', 'menu_display');
        this.menu_item(obj, 'Clear Console', 'menu_clear');
        this.menu_item(obj, 'Show Variables', 'menu_variables');
      }
      this.menu_item(obj, 'View Text', 'menu_text');
      this.menu_item(obj, 'About Scriptio', 'menu_about');
      menu.parentNode.appendChild(obj);
      obj.style.left = '' + (scriptio_get_left(menu) - (obj.offsetWidth - menu.offsetWidth)) + 'px';
      obj.style.top = '' + (scriptio_get_top(menu) - obj.offsetHeight) + 'px';
    } else {
      obj.parentNode.removeChild(obj);
      menu.style.backgroundPosition = 'top left';
    }
  }
}
Scriptio.prototype.menu_item = function(menu, label, action) {
  var item = document.createElement(action ? 'a' : 'div');
  item.className = 'scriptio-menu-item' + (action ? '' : ' scriptio-menu-disabled');
  item.appendChild(document.createTextNode(label));
  item.setAttribute('href', '#');
  var name = this.name;
  item.onclick = function() { scriptio_glue(name, action); scriptio_glue(name, 'menu_dismiss'); return true; };
  menu.appendChild(item);
}
Scriptio.prototype.menu_dismiss = function() {
  var obj = scriptio_get_element(this.name + '_menu_box');
  if (obj) {
    obj.parentNode.removeChild(obj);
    var menu = scriptio_get_element(this.name + '_menu');
    if (menu)
      menu.style.backgroundPosition = 'top left';
  }
}
Scriptio.prototype.menu_restart = function() {
  this.restart();
  this.xinitialize();
  this.started = false;
}
Scriptio.prototype.menu_display = function() {
  var win = window.open('', this.name, 'width=' + this.text_width + ',height=' + this.text_height + ',resizable=true,scrollbars=yes,location=no,status=no,menubar=no')
  if (win) {
    win.document.open();
    win.document.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\n" +
                       "<html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en\">\n" +
                       "  <meta http-equiv=\"content-type\" content=\"application/xhtml+xml; charset=utf-8\" />\n" +
                       "  <title>Script Source</title>\n" +
                       "</head>\n" +
                       "<body>\n" +
                       "  <div class=\"scriptio-source\"><pre>");
    if (this.source_script)
      win.document.write(this.source_script);
    win.document.write("</pre></div>\n" +
                       "</body>\n" +
                       "</html>");
    win.document.close();
    win.focus();
  }
}
Scriptio.prototype.menu_clear = function() {
  var console = scriptio_get_element(this.name + '_console');
  if (console)
    while (console.childNodes.length > 0)
      console.removeChild(console.childNodes[console.childNodes.length - 1]);
}
Scriptio.prototype.menu_variables = function() {
  var win = window.open('', this.name + ' Variables', 'width=' + this.text_width + ',height=' + this.text_height + ',resizable=true,scrollbars=yes,location=no,status=no,menubar=no')
  if (win) {
    win.document.open();
    win.document.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\n" +
                       "<html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en\">\n" +
                       "  <meta http-equiv=\"content-type\" content=\"application/xhtml+xml; charset=utf-8\" />\n" +
                       "  <title>Script Variables</title>\n" +
                       "</head>\n" +
                       "<body>\n" +
                       "  <table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" class=\"scriptio-variables\">\n" +
                       "    <tr>\n" +
                       "      <th>Variable</th>\n" +
                       "      <th>Value</th>\n" +
                       "    </tr>\n");
    for (variable in this.global)
      win.document.write("    <tr><td>" + variable + "</td><td>" + escape(this.global[variable]) + "</td></tr>\n");
    win.document.write("  </table>\n" +
                       "</body>\n" +
                       "</html>");
    win.document.close();
    win.focus();
  }
}
Scriptio.prototype.menu_text = function() {
  var win = window.open('', this.name, 'width=' + this.text_width + ',height=' + this.text_height + ',resizable=true,scrollbars=yes,location=no,status=no,menubar=no')
  if (win) {
    win.document.open();
    win.document.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\n" +
                       "<html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en\">\n" +
                       "  <meta http-equiv=\"content-type\" content=\"application/xhtml+xml; charset=utf-8\" />\n" +
                       "  <title>Script Text</title>\n" +
                       "</head>\n" +
                       "<body>\n" +
                       "  <div class=\"scriptio-source\">");
    if (this.scripts && (typeof(this.scripts.length) == 'number')) {
      var last_source = '';
      for (var i = 0;  i < this.scripts.length;  i++) {
        var new_source = this.scripts[i].getAttribute('source');
        if (new_source && (new_source.length > 0)) {
          if ((last_source.length > 4) && (last_source.substr(last_source.length - 4) != '<br>'))
            win.document.write(' ');
          win.document.write(new_source);
          last_source = new_source;
        }
      }
    }
    win.document.write("</div>\n" +
                       "</body>\n" +
                       "</html>");
    win.document.close();
    win.focus();
  }
}
Scriptio.prototype.menu_about = function() {
  document.location='http://www.scriptio.us';
}
Scriptio.prototype.create = function(elementType, objType) {
  var obj = document.createElement(elementType);
  obj.style.position = 'absolute';
  if (objType)
    obj.setAttribute('xtype', objType);
  obj.style.color = this.last_color;
  obj.style.visibility = 'hidden';
  obj.style.left = '' + this.last_left + 'px';
  obj.style.top = '' + this.last_top + 'px';
  obj.style.overflow = 'hidden';
  return obj;
}
Scriptio.prototype.insert = function(obj) {
  this.expo.appendChild(obj);
}
Scriptio.prototype.post = function(obj) {
  obj.setAttribute('orig_width', obj.offsetWidth);
  obj.setAttribute('orig_height', obj.offsetHeight);
  this.last_left = parseInt(obj.style.left) + obj.offsetWidth;
  this.last_top = parseInt(obj.style.top);
  if (obj.getAttribute('center')) {
    obj.style.left = '' + ((this.expo.offsetWidth - obj.offsetWidth) / 2) + 'px';
    obj.removeAttribute('center'); 
  }
  this.process(obj);
  obj.style.visibility = '';
}
Scriptio.prototype.xdisplay = function() {
  if (arguments.length % 2) {
    var obj = this.create('span', 'display');
    var text = scriptio_clean_text(arguments[0]);
    obj.style.fontFamily = this.last_face;
    obj.style.fontSize = '' + this.last_size + 'px';
    for (var i = 1;  i < arguments.length;  i += 2) {
      var arg = arguments[i],
          value = arguments[i + 1];
      if (!this.arg(obj, arg, value)) {
        if (arg == 'face') {
          if (value == 'sans')
            value = this.font_sans;
          else if (value == 'serif')
            value = this.font_serif;
          else if (value == 'fixed')
            value = this.font_fixed;
          obj.style.fontFamily = (this.last_face = value);
        } else if (arg == 'size')
          obj.style.fontSize = '' + (this.last_size = value) + 'px';
        else if (arg == 'style') {
          if ((value == 'italic') || (value == 'plain'))
            obj.style.fontStyle = (value == 'italic') ? 'italic' : 'normal';
          if ((value == 'bold') || (value == 'plain'))
            obj.style.fontWeight = (value == 'bold') ? 'bold' : 'normal';
          if ((value == 'underline') || (value == 'plain'))
            obj.style.textDecoration = (value == 'underline') ? 'underline' : 'none';
        } else if (arg == 'bullet')
          text = String.fromCharCode(8226) + ' ' + text;
        else
          this.author('Unknown argument "' + arg + '" for "display" command');
      }
    }
    if (text.indexOf('<br>') >= 0) {
      var lines = text.split('<br>');
      for (var i = 0;  i < lines.length;  i++) {
        if (i > 0)
          obj.appendChild(document.createElement('br'));
        obj.appendChild(document.createTextNode(lines[i]));
      }
    } else
      obj.appendChild(document.createTextNode(text));
    this.insert(obj);
    obj.setAttribute('orig_size', parseInt(obj.style.fontSize));
    this.post(obj);
    if ((text.length > 4) && (text.substr(text.length - 4) == '<br>')) {
      this.last_left = parseInt(obj.style.left);
      this.last_top = parseInt(obj.style.top) + obj.offsetHeight;
    }
  } else
    this.author('Invalid number of arguments for "display" command');
}
Scriptio.prototype.xpicture = function() {
  if (arguments.length % 2) {
    if (document.all && (arguments[0].indexOf('.png') > 0)) {    //  check for IE & PNG
      var obj = this.create('span', 'picture');
      obj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + arguments[0] + "', sizingMethod='scale')";
    } else {
      obj = this.create('img', 'picture');
      obj.setAttribute('src', arguments[0]);
    }
    var size_set = false, enabled = false;
    for (var i = 1;  i < arguments.length;  i += 2) {
      var arg = arguments[i],
          value = arguments[i + 1];
      if (!this.arg(obj, arg, value)) {
        if (arg == 'size') {
          this.at(arg, value);
          obj.style.width = '' + this.at_left + 'px';
          obj.style.height = '' + this.at_top + 'px';
          size_set = true;
        } else if (arg == 'width') {
          obj.style.width = '' + parseInt(value) + 'px';
          size_set = true;
        } else if (arg == 'height') {
          obj.style.height = '' + parseInt(value) + 'px';
          size_set = true;
        } else if (arg == 'enabled')
          enabled = (parseInt(value) != 0);
        else if (arg == 'hilited')
          obj.setAttribute('src_hilited', value);
        else if (arg == 'selected')
          obj.setAttribute('src_selected', value);
        else
          this.author('Unknown argument "' + arg + '" for "picture" command');
      }
    }
    if (enabled) {
      obj.style.cursor = 'pointer';
      obj.setAttribute('src_orig', arguments[0]);
      obj.onmouseover = scriptio_picture_over;
      obj.onmouseout = scriptio_picture_out;
      obj.onclick = function(e) { return scriptio_glue(name, 'scriptio_picture_click', e); };
    }
    if (!size_set)
      this.author('Please specify the "size" or "width"/"height" of the picture "' + arguments[0] + '" for best performance');
    this.insert(obj);
    this.post(obj);
  } else
    this.author('Invalid number of arguments for "picture" command');
}
Scriptio.prototype.xgroup = function() {
  if (arguments.length == 3) {
    if (arguments[1] == 'as') {
      if (this.author_mode && (this.get(arguments[2]).length > 0))
        this.author('One or more objects are already labeled "' + arguments[2] + '" in "group" command');
      var obj = this.create('span', 'group');
      obj.setAttribute('label', arguments[2]);
      obj.setAttribute('labels', arguments[0]);
      this.insert(obj);
      this.post(obj);
    } else
      this.author('Missing "as" argument for "group" command');
  } else
    this.author('Invalid number of arguments for "group" command');
}
Scriptio.prototype.init_parse = function() {
  this.DEFAULT = 0;
  this.NUMBER = 1;
  this.TEXT = 2;
  this.LITERAL = 3;
  this.OPERATORS = '+-*/<>|&^!=';
  this.ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_';
  this.ALPHANUM = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_';
  this.NOTALPHA = ' !"#$%&\'()*+,-./0123456789:;<=>?@[\\]^_`{|}~';
}
Scriptio.prototype.parse_script = function(text) {
    this.source_script = text;
  var result = Array();
  var lines = (text.replace(/\r/g, '\n') + '\n+\n').split('\n');
  var time = 0, label = '', clear = false;
  var script = '', source = '', pos;
  for (var i = 0;  i < lines.length;  i++) {
    var line = lines[i];
    if (line.length > 0) {
      var ch = line.charAt(0);
      if (ch == ':')
        script += line.substr(1) + '\n';
      else if (ch == '+') {
        if (script.length > 0) {
          var block = document.createElement('block');
          block.setAttribute('time', time);
          block.setAttribute('label', label);
          block.setAttribute('clear', clear ? 'true' : 'false');
          block.setAttribute('code', this.parse_block(script));
          block.setAttribute('source', source);
          result[result.length] = block;
          script = source = '';
        }
        time = parseFloat(line.substr(1));
        label = '';
        if ((pos = line.indexOf('label')) > 0) {
          label = scriptio_trim(line.substr(pos + 5));
          if ((pos = label.indexOf(',')) > 0)
            label = label.substr(0, pos);
        }
        clear = (line.indexOf('clear') > 0);
      } else if ((ch != '-') && (ch != '~'))
        source += (((source.length > 0) && (source.substr(source.length - 4) != '<br>')) ? ' ' : '') + line;
    }
  }
  return result;
}
Scriptio.prototype.parse_block = function(text) {
  var result = '';
  var lines = text.split('\n');
  for (var i = 0;  i < lines.length;  i++) {
    var line = lines[i] + ' ';
    var status = { state : this.DEFAULT,
                   tokens : Array(),
                   string : '' };
    for (var offset = 0;  offset < line.length;  offset++) {
      var ch = line.charAt(offset);
      if (ch == '"') {      //  literal
        if (status.state != this.LITERAL) {
          this.parse_token(status, this.LITERAL);
          status.string += ch;    //  start next token
        } else {
          status.string += ch;    //  add closing double-quote
          this.parse_token(status);
        }
      } else if (((ch >= '0') && (ch <= '9')) || (ch == '.')) {    //  number
        if (status.state == this.DEFAULT) {
          this.parse_token(status);
          if (status.state == this.DEFAULT)
            status.state = this.NUMBER;
        }
        status.string += ch;
      } else if ((ch == '-') && (status.state == this.DEFAULT) &&
                 (((line.charAt(offset + 1) >= '0') && (line.charAt(offset + 1) <= '9')) || (line.charAt(offset + 1) == '.'))) {
        status.state = this.NUMBER;
        status.string += ch;
      } else if (this.ALPHA.indexOf(ch) >= 0) {            //  text
        if (status.state == this.NUMBER)
          this.parse_token(status);
        status.string += ch;
        if (status.state == this.DEFAULT)
          status.state = this.TEXT;
      } else if ((ch == ' ') || (ch == '\t')) {             //  whitespace
        if ((status.state == this.NUMBER) || (status.state == this.TEXT))
          this.parse_token(status, this.DEFAULT);
        else if (status.state == this.LITERAL)
          status.string += ch;
      } else if ((ch == '\n') || (ch == '\r')) {            //  newline
        if (status.state != this.DEFAULT)
          this.parse_token(status);
        status.string += ch;
        this.parse_token(status);
      } else {                                              //  text continuation
        if ((status.state != this.DEFAULT) && (status.state != this.LITERAL))
          this.parse_token(status);
        status.string += ch;
        if (status.state == this.DEFAULT)
          status.state = this.TEXT;
        if ((status.state == this.TEXT) & (this.ALPHA.indexOf(ch) < 0)) {
          if (status.string.length == 1) {
            var chNext = line.charAt(offset + 1);
            if (((ch == '<') && ((chNext == '=') || (chNext == '<'))) ||
                ((ch == '>') && ((chNext == '=') || (chNext == '>'))) ||
                ((ch == '!') && (chNext == '=')) ||
                ((ch == '&') && (chNext == '&')) ||
                ((ch == '|') && (chNext == '|'))) {
              status.string += chNext;
              offset++;
            }
          }
          this.parse_token(status);
        }
      }
    }
    if (status.tokens.length > 0) {
      for (var j = 1;  j < status.tokens.length;  j++) {
        var string = status.tokens[j].string;
        if ((string == 'true') || (string == 'false')) {
          status.tokens[j].string = (string == 'true') ? '1' : '0';
          status.tokens[j].state = this.NUMBER;
        } else if ((status.tokens[j].state == this.NUMBER) && (string.charAt(0) == '-'))
          status.tokens[j].string = '(' + string + ')';
      }
      var depth = 0;
      var args = Array();
      var string = '';
      for (var j = 1;  j < status.tokens.length;  j++) {
        var token = status.tokens[j];
        if (token.string == '{') {
          if (string.length)
            args[args.length] = string;
          string = 'Array(';
          depth++;
        } else if (token.string == '(') {
          if (!depth && string.length && (this.OPERATORS.indexOf(string.substr(string.length - 1)) < 0)) {
            args[args.length] = string;
            string = '';
          }
          string += '(';
          depth++;
        } else if ((token.string == '}') || (token.string == ')')) {
          if (depth--) {
            string += ')';
            if (!depth && (j < status.tokens.length - 1) && (this.OPERATORS.indexOf(status.tokens[j + 1].string.charAt(0)) < 0)) {
              args[args.length] = string;
              string = '';
            }
          } else
            this.author('Invalid "' + token.string + '" character');
        } else if (this.OPERATORS.indexOf(token.string.charAt(0)) >= 0) {
          string += token.string;
        } else {
          if ((token.state == this.TEXT) &&
              (this.ALPHA.indexOf(token.string.substr(0, 1)) >= 0)) {
            if (scriptio_is_token(token.string)) {
              if (!depth)
                token.string = '"' + token.string + '"';
            } else if (scriptio_is_color(token.string))
              token.string = '"' + scriptio_get_color(token.string) + '"';
            else if ((j < status.tokens.length - 1) && (status.tokens[j + 1].string == '('))
              token.string = 'this.' + token.string;
            else
              token.string = 'this.global.' + token.string;
          }
          string += token.string;
          if (!depth && (j < status.tokens.length - 1) && (this.OPERATORS.indexOf(status.tokens[j + 1].string.charAt(0)) < 0)) {
            args[args.length] = string;
            string = '';
          }
        }
      }
      if (string.length > 0)
        args[args.length] = string;
      string = status.tokens[0].string;
      var ending = ';';
      var comma_char = ', ';
      switch (string) {
        case 'if':
          if (args.length == 2) {
            if (args[1] == '"then"') {
              ending = ' {';
              comma_char = '';
              args[1] = '';		// skip 'then'
            } else
              this.author('Missing "then" for "if" statement');
          } else {
            this.author(line);
            this.author('Invalid number of arguments for "if" statement');
          }
          break;
        case 'else':
          if (!args.length) {
            result += '} else {\n';
            string = '';
          } else
            this.author('Invalid arguments for "else" statement');
          break;
        case 'elseif':
          if (args.length == 1) {
            string = '} else if';
            ending = ' {';
          } else
            this.author('Invalid number of arguments for "elseif" statement');
          break;
        case 'repeat':
          if (!args.length) {
            result += 'while (1) {\n';
            string = '';
          } else if ((args.length == 2) && (args[0] == '"until"')) {
            string = 'while (!';
            comma_char = '';
            args[0] = '';
            ending = ') {';
          } else if ((args.length == 2) && (args[0] == '"while"')) {
            string = 'while ';
            comma_char = '';
            args[0] = '';
            ending = ' {';
          } else if ((args.length == 4) && (args[0] == '"with"') && (args[2] == '"in"')) {
            string = 'for ';
            args[0] = '';
            args[2] = 'in';
            comma_char = ' ';
            ending = ' {';
          } else if ((args.length == 6) && (args[0] == '"with"') && (args[2] == '"from"') && (args[4] == '"to"')) {
            string = 'for ';
            args[0] = '';
            args[2] = '=';
            args[4] = '; ' + args[1] + '<=';
            args[6] = '; ' + args[1] + '++';
            comma_char = ' ';
            ending = ' {';
          } else if ((args.length == 8) && (args[0] == '"with"') && (args[2] == '"from"') && (args[4] == '"to"') && (args[6] == '"step"')) {
            string = 'for ';
            args[0] = '';
            args[2] = '=';
            args[4] = '; ' + args[1] + '<=';
            args[6] = '; ' + args[1] + '+=';
            comma_char = ' ';
            ending = ' {';
          } else
            this.author('Invalid "repeat" statement');
          break;
        case 'end':
          if (args.length == 1) {
            if ((args[0] == '"if"') || (args[0] == '"repeat"')) {
              result += '}\n';
              string = '';
            } else
              this.author('Invalid argument "' + args[0] + '" for "end" statement');
          } else
            this.author('Invalid number of arguments for "end" statement');
          break;
        case 'set':
          if (args.length > 0)
            args[0] = '"' + args[0] + '"';
        default:
          string = 'this.x' + string;
          break;
      }
      if (string.length > 0) {
        result += string + '(';
        for (var j = 0;  j < args.length;  j++) {
          var arg = args[j];
          if (j > 0)
            result += comma_char;
          if (((arg == '"with"') || (arg == '"without"')) && (j < args.length - 1)) {
            var temp = args[j + 1];
            args[j + 1] = (arg == '"with"') ? '1' : '0';
            arg = temp;
          }
           result += arg;
        }
        result += ')' + ending + '\n';
      }
    }
  }
  return result;
}
Scriptio.prototype.parse_token = function(status, new_state) {
  if (status.state != this.DEFAULT) {
    status.tokens[status.tokens.length] = { state:status.state, string:status.string };
    status.string = '';
  }
  status.state = new_state ? new_state : this.DEFAULT;
}
Scriptio.prototype.process_all = function() {
  var elements = this.expo.childNodes;
  for (var i = 0;  i < elements.length;  this.process(elements[i++]));
}
Scriptio.prototype.process = function(obj) {
  var xtype = obj.getAttribute('xtype'),
      value;
  var fade = obj.getAttribute('fade');
  if (fade) {
    if ((value = (this.time - obj.getAttribute('fade_time')) / Math.abs(fade)) >= 1) {
      if (fade > 0) {
        scriptio_set_opacity(obj, 1);
        obj.removeAttribute('fade');
      } else
        this.remove(obj);
    } else
      scriptio_set_opacity(obj, Math.round(100 * ((fade < 0) ? 1 - value : value)) / 100);
  }
  var grow = obj.getAttribute('grow');
  if (grow) {
    if ((value = (this.time - obj.getAttribute('grow_time')) / Math.abs(grow)) >= 1) {
      if (grow > 0) {
        if (xtype == 'display') {
          obj.style.fontSize = '' + obj.getAttribute('orig_size') + 'px';
          obj.style.width = 'auto';
          obj.style.height = 'auto';
          obj.style.textAlign = 'left';
          obj.style.verticalAlign = 'top';
        } else {
          obj.style.width = '' + obj.getAttribute('orig_width') + 'px';
          obj.style.height = '' + obj.getAttribute('orig_height') + 'px';
          obj.style.margin = '0';
        }
        obj.removeAttribute('grow');
      } else
        this.remove(obj);
    } else {
      if (grow < 0)
        value = 1 - value;
      if (xtype == 'display') {
        obj.style.width = '' + obj.getAttribute('orig_width') + 'px';
        obj.style.height = '' + obj.getAttribute('orig_height') + 'px';
        obj.style.textAlign = 'center';
        obj.style.verticalAlign = 'middle';
        obj.style.fontSize = '' + Math.max(Math.round(100 * value * obj.getAttribute('orig_size')) / 100, 1) + 'px';
      } else {
        var orig_width = obj.getAttribute('orig_width'),
            width = Math.max(Math.round(value * orig_width), 1),
            orig_height = obj.getAttribute('orig_height'),
            height = Math.max(Math.round(value * orig_height), 1);
        obj.style.height = '' + height + 'px';    //  set before width to reduce flickering
        obj.style.width = '' + width + 'px';
        obj.style.marginLeft = '' + Math.round((orig_width - width) / 2) + 'px';
        obj.style.marginRight = '' + (orig_width - parseInt(obj.style.marginLeft)) + 'px';
        obj.style.marginTop = '' + Math.round((orig_height - height) / 2) + 'px';
        obj.style.marginBottom = '' + (orig_height - parseInt(obj.style.marginTop)) + 'px';
      }
    }
  }
  var wipe = obj.getAttribute('wipe');
  if (wipe) {
    if ((value = (this.time - obj.getAttribute('wipe_time')) / Math.abs(wipe)) >= 1) {
      if (wipe > 0) {
        obj.style.clip = 'rect(0px ' + obj.offsetWidth + 'px ' + obj.offsetHeight + 'px 0px)';
        obj.removeAttribute('wipe');
        obj.removeAttribute('direction');
      } else
        this.remove(obj);
    } else {
      if (wipe < 0)
        value = 1 - value;
      var direction = obj.getAttribute('direction');
      if (direction == null)
        direction = 'right';
      var left = 0, right = obj.offsetWidth,
          top = 0, bottom = obj.offsetHeight;
      if (direction == 'left')
        left = Math.round(right * (1 - value));
      else if (direction == 'right')
        right = Math.round(value * right);
      else if (direction == 'up')
        top = Math.round(bottom * (1 - value));
      else if (direction == 'down')
        bottom = Math.round(value * bottom);
      else if (direction == 'iris') {
        left = Math.round(right * (1 - value) / 2);
        right = Math.round(right * ((1 + value) / 2));
        top = Math.round(bottom * (1 - value) / 2);
        bottom = Math.round(bottom * ((1 + value) / 2));
      } else if (direction == 'squeeze') {
        top = Math.round(bottom * (1 - value) / 2);
        bottom = Math.round(bottom * ((1 + value) / 2));
      } else if (direction == 'stretch') {
        left = Math.round(right * (1 - value) / 2);
        right = Math.round(right * ((1 + value) / 2));
      }
      obj.style.clip = 'rect(' + top + 'px ' + right + 'px ' + bottom + 'px ' + left + 'px)';
    }
  }
  var slide = obj.getAttribute('slide');
  if (slide != null) {
    if ((value = (this.time - obj.getAttribute('slide_time')) / Math.abs(slide)) >= 1) {
      obj.style.left = '' + (obj.getAttribute('end_left')) + 'px';
      obj.style.top = '' + (obj.getAttribute('end_top')) + 'px';
      obj.removeAttribute('slide');
    } else {
      obj.style.left = '' + (Math.round(parseInt(obj.getAttribute('start_left')) + value * (parseInt(obj.getAttribute('end_left')) - parseInt(obj.getAttribute('start_left'))))) + 'px';
      obj.style.top = '' + (Math.round(parseInt(obj.getAttribute('start_top')) + value * (parseInt(obj.getAttribute('end_top')) - parseInt(obj.getAttribute('start_top'))))) + 'px';
    }
  }
}
function scriptio_quicktime(scriptio, source) {
  this.scriptio = scriptio;
  document.write(
    '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" width=1 height=1 autoplay=false id="' + scriptio.name + '_audio">\n' +
    '  <param name="src" value="' + source + '">\n' +
    '  <param name="autoplay" value="false">\n' +
    '  <embed width=1 height=1 src="' + source + '" type="video/quicktime" controller="true" name="' + scriptio.name + '_audio" enablejavascript="true" autoplay="false">\n' +
    '</object>\n');
  this.qt_length = null;
  this.qt_scale = null;
}
scriptio_quicktime.prototype.is_ready = function() {
  if (this.controller && (typeof(this.controller.GetPluginStatus) != 'undefined')) {
    var status = this.controller.GetPluginStatus();
    if ((status == 'Playable') || (status == 'Complete')) {
      this.qt_length = this.controller.GetDuration();
      this.qt_scale = this.controller.GetTimeScale();
      return true;
    }
  }
  return false;
}
scriptio_quicktime.prototype.is_playing = function() {
  var rate = this.controller ? this.controller.GetRate() : 0;
  return (rate > 0);
}
scriptio_quicktime.prototype.play = function() {
  if (this.controller)
    this.controller.Play();
}
scriptio_quicktime.prototype.pause = function() {
  if (this.controller)
    this.controller.Stop();
}
scriptio_quicktime.prototype.get_duration = function() {
  return (this.qt_scale > 0) ? this.qt_length / this.qt_scale : 0;
}
scriptio_quicktime.prototype.get_time = function() {
  return (this.controller && (this.qt_scale > 0)) ? this.controller.GetTime() / this.qt_scale : 0;
}
scriptio_quicktime.prototype.set_time = function(new_time) {
  if (this.controller)
    this.controller.SetTime(new_time * this.qt_scale);
}
scriptio_quicktime.prototype.has_volume = function() {
  return true;
}
scriptio_quicktime.prototype.get_volume = function() {
  return this.controller ? Math.round((this.controller.GetVolume() * 100) / 255) : 0;
}
scriptio_quicktime.prototype.set_volume = function(new_volume) {
  if (this.controller)
    this.controller.SetVolume(Math.round((255 * new_volume) / 100));
}
scriptio_trim = function(text) {
  if (text.length > 0) {
    var ch;
    for (ch = text.substring(0, 1);
         (ch == ' ') || (ch == '\t') || (ch == '\r') || (ch == '\n');
         ch = text.substring(0, 1))
      text = text.substring(1, text.length);
    for (ch = text.substring(text.length - 1, text.length);
         (ch == ' ') || (ch == '\t') || (ch == '\r') || (ch == '\n');
         ch = text.substring(text.length - 1, text.length))
      text = text.substring(0, text.length - 1);
  }
  return text;
}
scriptio_get_element = function(id) {
  if (id) {
    if (document.getElementById)
      return document.getElementById(id);
    else if (document.all)
      return document.all[id];
  }
  return null;
}
scriptio_get_inner = function(obj) {
  if (typeof(obj) == 'string')
    obj = scriptio_get_element(obj);
  return obj ? (document.all ? obj.innerText : obj.innerHTML) : '';
}
scriptio_set_inner = function(obj, text) {
  if (typeof(obj) == 'string')
    obj = scriptio_get_element(obj);
  if (obj) {
    if (document.all)
      obj.innerText = text;
    else
      obj.innerHTML = text;
  }
}
scriptio_get_children = function(obj) {
  return obj ? (obj.all ? obj.all : obj.getElementsByTagName('*')) : null;
}
scriptio_set_opacity = function(obj, value) {
  if (document.all)
    obj.style.filter = (value < 1) ? 'alpha(opacity=' + (100 * (.75 * value)) + ')' : null;
  else if (typeof(obj.style.MozOpacity) != 'undefined')
    obj.style.MozOpacity = value;
  else
    obj.style.opacity = value;
}
scriptio_get_scroll_x = function() {
  if (document.all) {
    if (document.documentElement.scrollLeft)
      return document.documentElement.scrollLeft;
    else
      return document.body.scrollLeft;
  } else if (window.scrollX)
    return window.scrollX;
  else if (window.pageXOffset)
    return window.pageXOffset;
  else
    return 0;
}
scriptio_get_scroll_y = function() {
  if (document.all) {
    if (document.documentElement.scrollTop)
      return document.documentElement.scrollTop;
    else
      return document.body.scrollTop;
  } else if (window.scrollY)
    return window.scrollY;
  else if (window.pageYOffset)
    return window.pageYOffset;
  else
    return 0;
}
scriptio_get_left = function(obj) {
  var result = -scriptio_get_scroll_x();
  while (obj) {
    result += obj.offsetLeft;
    obj = obj.offsetParent;
  }
  return result;
}
scriptio_get_top = function(obj) {
  var result = -scriptio_get_scroll_y();
  while (obj) {
    result += obj.offsetTop;
    obj = obj.offsetParent;
  }
  return result;
}
scriptio_bool = function(arg) {
  return (arg == true) || (arg == "true") || (parseInt(arg) > 0);
}
scriptio_stop_propagation = function(e) {
  if (!e)
    e = window.event;
  e.cancelBubble = true;
  if (e.stopPropagation)
    e.stopPropagation();
}
scriptio_clean_text = function(text) {
  if (typeof(text) != 'string')
    text = '' + text;
  return eval('text.replace("&nbsp;", String.fromCharCode(160)).replace(/ /gi, String.fromCharCode(160));');
}
scriptio_get_properties = function(obj) {
  var result = '';
  if (obj)
    for (var prop in obj)
      result = ((result.length > 0) ? result + ',' : '') + prop + obj[prop];
  return result;
}
scriptio_get_class = function(obj) {
  if (obj && obj.constructor && obj.constructor.toString) {
    var arr = obj.constructor.toString().match(/function\s*(\w+)/);
    return arr && arr.length == 2 ? arr[1] : undefined;
  } else
    return undefined;
}
Scriptio.prototype.xset = function() {
  if (arguments.length == 3) {
    if (arguments[1] == 'to') {
      var parm = arguments[0],
          value = arguments[2];
      if (parm == 'this.global.title')
        document.title = value;
      else if (parm == 'this.global.background')
        this.expo.style.backgroundColor = value;
      else if (parm == 'this.global.audio_duration')
        this.set_duration(value);
      else {
        var type = typeof(value),
            clss = scriptio_get_class(value);
        eval(parm + ' = ' + ((typeof(value) == 'string') ? '"' + value + '"' : ((clss == 'Array') ? 'new Array(' + value + ')' : value)) + ';');
      }
    } else
      this.author('Missing "to" parameter in "set" command');
  } else
    this.author('Incorrect number of arguments for "set" command');
}
function scriptio_silence(scriptio, source) {
  this.scriptio = scriptio;
  this.duration = parseFloat(source);
  this.current = 0;
  this.timer = null;
}
scriptio_silence.prototype.is_ready = function() {
  return true;
}
scriptio_silence.prototype.is_playing = function() {
  return (this.timer != null) && (this.current < this.duration);
}
scriptio_silence.prototype.play = function() {
  if (!this.timer && (this.current < this.duration))
    this.timer = setTimeout('scriptio_glue("' + this.scriptio.name + '", "audio_timer")', this.scriptio.timer_interval);
}
scriptio_silence.prototype.pause = function() {
  if (this.timer) {
    clearTimeout(this.timer);
    this.timer = null;
  }
}
scriptio_silence.prototype.get_duration = function() {
  return this.duration;
}
scriptio_silence.prototype.set_duration = function(new_duration) {
  return (this.duration = new_duration);
}
scriptio_silence.prototype.get_time = function() {
  return this.current;
}
scriptio_silence.prototype.set_time = function(new_time) {
  new_time = parseFloat(new_time);
  this.current = (new_time <= this.duration) ? new_time : this.duration;
}
scriptio_silence.prototype.has_volume = function() {
  return false;
}
scriptio_silence.prototype.get_volume = function() {
  return 0;
}
scriptio_silence.prototype.set_volume = function(new_volume) {
}
scriptio_silence.prototype.trigger = function() {
  if ((this.current += parseFloat(this.scriptio.timer_interval) / 1000) > this.duration) {
    this.current = this.duration;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  } else
    this.timer = setTimeout('scriptio_glue("' + this.scriptio.name + '", "audio_timer")', this.scriptio.timer_interval);
}
function scriptio_sound() {
}
scriptio_sound.prototype.is_ready = function() {
  return false;
}
scriptio_sound.prototype.is_playing = function() {
  return false;
}
scriptio_sound.prototype.play = function() {
}
scriptio_sound.prototype.pause = function() {
}
scriptio_sound.prototype.get_duration = function() {
  return 0;
}
scriptio_sound.prototype.get_time = function() {
  return 0;
}
scriptio_sound.prototype.set_time = function(new_time) {
}
scriptio_sound.prototype.has_volume = function() {
  return false;
}
scriptio_sound.prototype.get_volume = function() {
  return 0;
}
scriptio_sound.prototype.set_volume = function(new_volume) {
}
scriptio_sound.prototype.trigger = function() {
}
var scriptio_token_list = {
  xafter : null,
  xangle : null,
  xas : null,
  xat : null,
  xbefore : null,
  xbehind : null,
  xbold : null,
  xbottom : null,
  xbullet : null,
  xbutton : null,
  xby : null,
  xcenter : null,
  xchecked : null,
  xclear : null,
  xcolor : null,
  xdefault : null,
  xdirection : null,
  xdisplay : null,
  xdown : null,
  xduration : null,
  xenabled : null,
  xexcept : null,
  xface : null,
  xfade : null,
  xfixed : null,
  xfocus : null,
  xfrom : null,
  xgrow : null,
  xhead : null,
  xheight : null,
  xhilited : null,
  xhorizontal : null,
  xif : null,
  xin : null,
  xiris : null,
  xitalic : null,
  xlabel : null,
  xleft : null,
  xoverlay : null,
  xplain : null,
  xrepeat : null,
  xright : null,
  xsans : null,
  xselected : null,
  xserif : null,
  xsize : null,
  xsqueeze : null,
  xstep : null,
  xstretch : null,
  xstyle : null,
  xthen : null,
  xthickness : null,
  xto : null,
  xtop : null,
  xtransparency : null,
  xunder : null,
  xunderline : null,
  xup : null,
  xvertical : null,
  xwidth : null,
  xwipe : null,
  xwith : null,
  xwithout : null,
  xAbsolute : null,
  xAnswer : null,
  xBottom : null,
  xCos : null,
  xHeight : null,
  xLeft : null,
  xLength : null,
  xRandom : null,
  xRight : null,
  xSin : null,
  xSqrt : null,
  xTop : null,
  xWidth : null
};
function scriptio_is_token(string) {
  if ((string.charAt(0) >= 'a') && (string.charAt(0) <= 'z'))
    return eval('typeof(scriptio_token_list.x' + string + ') != \'undefined\'');
  return false;
}
Scriptio.prototype.xclear = function() {
  var objs = (arguments.length % 2) ? this.get(arguments[0]) : scriptio_get_children(this.expo);
  var fade = null, grow = null, wipe = null, direction = null;
  var excepts = null;
  for (var i = arguments.length % 2;  i < arguments.length;  i += 2) {
    if (arguments[i] == 'fade')
      fade = arguments[i + 1];
    else if (arguments[i] == 'grow')
      grow = arguments[i + 1];
    else if (arguments[i] == 'wipe')
      wipe = arguments[i + 1];
    else if (arguments[i] == 'direction')
      direction = arguments[i + 1];
    else if (arguments[i] == 'except')
      excepts = this.get(arguments[i + 1]);
    else
      this.author("Unknown argument '" + arguments[i] + "' for 'clear' command");
  }
  if (objs)
    for (i = objs.length;  i--;  ) {
      obj = objs[i];
      if (excepts)
        for (var j = 0;  j < excepts.length;  j++)
          if (excepts[j] === obj) {
            obj = null;
            break;
          }
      if (obj) {
        if (fade) {
          obj.setAttribute('fade', -fade);
          obj.setAttribute('fade_time', this.time);
        }
        if (grow) {
          obj.setAttribute('grow', -grow);
          obj.setAttribute('grow_time', this.time);
        }
        if (wipe) {
          obj.setAttribute('wipe', -wipe);
          obj.setAttribute('wipe_time', this.time);
          if (direction)
            obj.setAttribute('direction', direction);
        }
        if (!fade && !grow && !wipe)
          this.remove(obj);
      }
    }
}
Scriptio.prototype.xslide = function() {
  var objs = (arguments.length % 2) ? this.get(arguments[0]) : scriptio_get_children(this.expo);
  var at = false, by = false, duration = 0, left = 0, top = 0;
  for (var i = arguments.length % 2;  i < arguments.length;  i += 2) {
    if (arguments[i] == 'by') {
      this.at(arguments[i], arguments[i + 1]);
      left += this.at_left;
      top += this.at_top;
      by = true;
    } else if ((arguments[i] == 'to') || (arguments[i] == 'after') || (arguments[i] == 'under')) {
      this.at(arguments[i], arguments[i + 1]);
      left = this.at_left;
      top = this.at_top;
      at = true;
    } else if (arguments[i] == 'duration')
      duration = parseFloat(arguments[i + 1]);
    else
      this.author("Unknown argument '" + arguments[i] + "' for 'xslide' command");
  }
  if (at)
    by = false;
  if (objs)
    for (i = 0;  i < objs.length;  i++) {
      var obj = objs[i];
      var slide = obj.getAttribute('slide');
      if (slide) {
        obj.style.left = '' + obj.getAttribute('end_left') + 'px';
        obj.style.top = '' + obj.getAttribute('end_top') + 'px';
      }
      if (duration > 0) {
        obj.setAttribute('slide', duration);
        obj.setAttribute('slide_time', this.time);
        obj.setAttribute('start_left', parseInt(obj.style.left));
        obj.setAttribute('start_top', parseInt(obj.style.top));
        obj.setAttribute('end_left', left + (by ? parseInt(obj.style.left) : 0));
        obj.setAttribute('end_top', top + (by ? parseInt(obj.style.top) : 0));
      } else {
        obj.style.left = '' + (left + (by ? parseInt(obj.style.left) : 0)) + 'px'; 
        obj.style.top = '' + (top + (by ? parseInt(obj.style.top) : 0)) + 'px';
      }
    }
}
Scriptio.prototype.xmove = Scriptio.prototype.xslide;
Scriptio.prototype.remove = function(obj) {
  var parent = obj.parentNode;
    parent.removeChild(obj);
}
Scriptio.prototype.at = function(arg, value) {
  this.at_left = this.at_top = 0;
  var xtype = typeof(value);
  if (xtype == 'object') {
    if (typeof(value.length) == 'number') {
      if (value.length == 2) {
        this.at_left = parseInt(value[0]);
        this.at_top = parseInt(value[1]);
      } else
        this.author('Invalid array size for point for "' + arg + '" command');
    } else
      this.author('Trouble interpreting argument "' + value + '" for "' + arg + '" command');
  } else if (xtype == 'number') {
    this.at_left = -1;
    this.at_top = value;
  } else {
    if (xtype != 'string')
      value = '' + value;
    var ch = value.charAt(0);
    if ((ch != '-') && ((ch < '0') || (ch > '9'))) {
      var extent = this.object_extent(value);
      switch (arg) {
        case 'size':
          this.at_left = extent.right - extent.left;
          this.at_top = extent.bottom - extent.top;
          break;
        case 'at':
        case 'to':
          this.at_left = extent.left;
          this.at_top = extent.top;
          break;
        case 'after':
          this.at_left = extent.right;
          this.at_top = extent.top;
          break;
        case 'under':
          this.at_left = extent.left;
          this.at_top = extent.bottom;
          break;
      }
    } else {
      this.at_left = -1;
      this.at_top = parseInt(value);
    }
  }
}
Scriptio.prototype.arg = function(obj, arg, value) {
  switch (arg) {
    case 'at':
    case 'after':
    case 'under':
      this.at(arg, value);
      if (this.at_left == -1)
        obj.setAttribute('center', 'true');
      obj.style.left = '' + this.at_left + 'px';
      obj.style.top = '' + this.at_top + 'px';
      break;
    case 'by':
     {this.at(arg, value);
      var slide = obj.getAttribute('slide');
      obj.style.left = '' + (parseInt(slide ? obj.getAttribute('end_left') : obj.style.left) + this.at_left) + 'px';
      obj.style.top = '' + (parseInt(slide ? obj.getAttribute('end_top') : obj.style.top) + this.at_top) + 'px';
     }break;
    case 'grow':
      if (value > 0) {
        obj.setAttribute('grow', value);
        obj.setAttribute('grow_time', this.time);
      }
      break;
    case 'fade':
      if (value > 0) {
        obj.setAttribute('fade', value);
        obj.setAttribute('fade_time', this.time);
      }
      break;
    case 'wipe':
      if (value > 0) {
        obj.setAttribute('wipe', value);
        obj.setAttribute('wipe_time', this.time);
      }
      break;
    case 'direction':
    case 'label':
      obj.setAttribute(arg, value);
      break;
    case 'color':
      obj.style.color = (this.last_color = scriptio_get_color(value));
      break;
    case 'center':
      if (scriptio_bool(value))
        obj.setAttribute('center', 'true');
      break;
    case 'transparency':
      var transparency = parseInt(value);
      if ((transparency >= 0) && (transparency <= 100))
        scriptio_set_opacity(obj, (100 - transparency) / 100);
      break;
    case 'overlay':
      scriptio_set_opacity(obj, this.overlay_value / 100);
      break;
    default:
      return false;
  }
  return true;
}
Scriptio.prototype.get = function(label) {
  var result = new Array(), i, j, more;
  if ((typeof(label) == 'object') && (label.length > 0)) {
    for (i = 0;  i < label.length;  i++) {
      more = this.get(label[i]);
      for (j = 0;  j < more.length;  j++)
        result[result.length] = more[j];
    }
  } else {
    var children = scriptio_get_children(this.expo);
    if (children && children.length)
      for (i = 0;  i < children.length;  i++) {
        var child = children[i];
        var label2 = child.getAttribute('label');
        if (label2 && (label2 == label)) {
          if (child.getAttribute('xtype') == 'group') {
            var labels = child.getAttribute('labels');
            if ((typeof(labels) == 'string') && (labels.indexOf(',') > 0))
              labels = labels.split(',');
            more = this.get(labels);
            for (j = 0;  j < more.length;  j++)
              result[result.length] = more[j];
          }
          result[result.length] = children[i];
        }
      }
  }
  return result;
}
