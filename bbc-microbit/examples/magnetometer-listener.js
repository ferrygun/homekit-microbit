// subscribes to the magnetometer service and prints out values

var BBCMicrobit = require('../index'); // or require('bbc-microbit')

var period = 160; // ms

console.log('Scanning for microbit');
BBCMicrobit.discover(function(microbit) {
  console.log('\tdiscovered microbit: id = %s, address = %s', microbit.id, microbit.address);

  microbit.on('disconnect', function() {
    console.log('\tmicrobit disconnected!');
    process.exit(0);
  });

  microbit.on('magnetometerChange', function(x, y, z) {
    console.log('\ton -> magnetometer change: magnetometer = %d %d %d', x.toFixed(1), y.toFixed(1), z.toFixed(1));
  });

  console.log('connecting to microbit');
  microbit.connectAndSetUp(function() {
    console.log('\tconnected to microbit');

    console.log('setting magnetometer period to %d ms', period);
    microbit.writeMagnetometerPeriod(period, function() {
      console.log('\tmagnetometer period set');

      console.log('subscribing to magnetometer');
      microbit.subscribeMagnetometer(function() {
        console.log('\tsubscribed to magnetometer');
      });
    });
  });
});
