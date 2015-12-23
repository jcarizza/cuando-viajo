var BUENOSAIRES_CHASCOMUS = 'BA-Chascomus',
    CHASCOMUS_BUENOSAIRES = 'Chascomus-BA';

var page = require('webpage').create(),
    url = 'http://www.sateliteferroviario.com.ar/horarios/amba_diferenciales.htm',
    system = require('system'),
    data = false,
    selector = false;

    page.onError = function(msg, trace) {
      //console.log(msg);
      //console.log(trace);
    };




    page.viewportSize = { width: 1440, height: 900 };
    page.open(url, 'get', data, function (status) {
        if (status !== 'success') {
            console.log('Unable to post!');
        } else {
            var selector = selector;
            switch (system.args[1]){
              case BUENOSAIRES_CHASCOMUS:
                var clipRect = page.evaluate(function (selector){
                      return document.querySelector('body > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > p:nth-child(31) > table:nth-child(2)').getBoundingClientRect();
                });
                break;
              case CHASCOMUS_BUENOSAIRES:
                var clipRect = page.evaluate(function (selector){
                      return document.querySelector('body > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > p:nth-child(32) > table:nth-child(2)').getBoundingClientRect();
                });
                break;
              default:
                phantom.exit();
                break;
            }
            page.clipRect = {
              top: clipRect.top,
              left: clipRect.left,
              width: clipRect.width,
              height: clipRect.height
            };
            page.render('tren-' + system.args[1] + '.png');
            phantom.exit();
        }
        phantom.exit();
    });
