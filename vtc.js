var BUENOSAIRES_CHASCOMUS = 'BA-Chascomus',
    CHASCOMUS_BUENOSAIRES = 'Chascomus-BA';

var page = require('webpage').create(),
    vtc = 'http://www.vtcviajesyturismo.com/',
    system = require('system'),
    data = false,
    selector = false;

    page.onError = function(msg, trace) {
      //console.log(msg);
      //console.log(trace);
    };




    page.viewportSize = { width: 1440, height: 900 };
    page.open(vtc, 'get', data, function (status) {
        if (status !== 'success') {
            console.log('Unable to post!');
        } else {
            var selector = selector;
            switch (system.args[1]){
              case BUENOSAIRES_CHASCOMUS:
                var clipRect = page.evaluate(function (selector){
                      return document.querySelector('div:nth-child(5) > table > tbody > tr > td:nth-child(3) > table').getBoundingClientRect();
                });
                break;
              case CHASCOMUS_BUENOSAIRES:
                var clipRect = page.evaluate(function (selector){
                      return document.querySelector('div:nth-child(5) > table > tbody > tr > td:nth-child(1) > table').getBoundingClientRect();
                });
                break;
              default:
                console.log('¿Dónde vas a viajar?');
                phantom.exit();
                break;
            }
            page.clipRect = {
              top: clipRect.top,
              left: clipRect.left,
              width: clipRect.width,
              height: clipRect.height
            };
            page.render('vtc-' + system.args[1] + '.png');
            console.log('Para ver los horarios abre la imagen horarios-vtc.png')
            phantom.exit();
        }
        phantom.exit();
    });
