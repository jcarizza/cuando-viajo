var BUENOSAIRES_CHASCOMUS = 'BA-Chascomus',
    CHASCOMUS_BUENOSAIRES = 'Chascomus-BA';

var page = require('webpage').create(),
    ricchiery = 'http://ricchieritours.com.ar/schedule.php',
    system = require('system'),
    data = false;

    page.onError = function(msg, trace) {
      //console.log(msg);
      //console.log(trace);
    };


    if (system.args[1] === BUENOSAIRES_CHASCOMUS){
        var data = "trips=2";
    }

    if (system.args[1] === CHASCOMUS_BUENOSAIRES){
        var data = "trips=1";
    }

    if (system.args[1] === "-h" || data === false) {
        console.log("\n\nEscribe el origen y destino del viaje: \n-> BA-Chascomus \n-> Chascomus-BA\n");
        phantom.exit();
    }

    page.viewportSize = { width: 1440, height: 900 };
    page.open(ricchiery, 'post', data, function (status) {
        if (status !== 'success') {
            console.log('Caramba! No se puede hacer post =(');
        } else {
            var clipRect = page.evaluate(function(){
              return document.querySelector('#schedule').getBoundingClientRect();
            });
            page.clipRect = {
              top: clipRect.top,
              left: clipRect.left,
              width: clipRect.width,
              height: clipRect.height
            };
            page.render('ricchieri-' + system.args[1] + '.png');
            phantom.exit();
        }
        phantom.exit();
    });
