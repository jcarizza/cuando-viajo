var BUENOSAIRES_CHASCOMUS = 'BA-Chascomus',
    CHASCOMUS_BUENOSAIRES = 'Chascomus-BA';

var page = require('webpage').create(),
    ricchiery = 'http://ricchieritours.com.ar/schedule.php',
    system = require('system'),
    tripId = false;

    page.onError = function(msg, trace) {
      console.log(msg);
      console.log(trace);
    };

    switch (system.args[1]) {
      case BUENOSAIRES_CHASCOMUS:
        tripId = "2";
        break;
      case CHASCOMUS_BUENOSAIRES:
        tripId = "1";
        break
      default:
        phantom.exit();
        break;
    }

    page.viewportSize = { width: 1440, height: 900 };
    page.open(ricchiery, 'get', function (status) {

        if (status !== 'success') {
            console.log('Caramba! No se puede hacer post =(');
        } else {
            page.evaluate(function(tripId) {
							$.ajax({
									type: "POST",
									url: "scheduleService.php",
									data: {tripid: tripId},
									dataType: "html",
									async: false,
									success: function (data) {
											$("#tbody_table_schedule").html(data);
									}
							});
            }, tripId);

            var clipRect = page.evaluate(function(){
              return document.querySelector('#table_schedule').getBoundingClientRect();
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
