(function(designWidth) {
  'use strict';
  var docEl = document.documentElement;
  var dpr = Math.min(Math.floor(window.devicePixelRatio), 3);
  var scale = 1 / dpr;
  var $viewport = document.querySelector('meta[name="viewport"]');
  var setDpr = function() {
    docEl.setAttribute('data-dpr',dpr);
      // viewport
    var content = 'initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale + ',user-scalable=no,width=device-width';
    if ($viewport) {
      $viewport.setAttribute('content', content);
    } else {
      var metaViewport = '<meta name="viewport" content="' + content + '"/>';
      document.write(metaViewport);
    }
      // font
    var width = docEl.clientWidth;
    if (width / dpr > 450) {
      width = dpr * 450;
      docEl.querySelector('body').style.width = 450;
      docEl.querySelector('body').style.margin = '0 auto';
    }
    var fontSize = width / designWidth * 100;
    docEl.style.fontSize = fontSize + 'px';
  };

  setDpr();
  window.addEventListener('resize', setDpr);
  // document.addEventListener('DOMContentLoaded', setDpr);
})(640);