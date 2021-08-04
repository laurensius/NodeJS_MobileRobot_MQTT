var Gpio = require('onoff').Gpio;
var in1 = new Gpio(17,'out');
var in2 = new Gpio(22,'out');
var in3 = new Gpio(23,'out');
var in4 = new Gpio(24,'out');

var mqtt = require('mqtt');
var client  = mqtt.connect({
        "port": 1883,
        "host": "144.217.86.1",
        "clientId": "8cadb11f56RoverRobot",
        "username": "renzcybermedia",
        "password": "laurens23",
        "keepalive": 60,
        "reconnectPeriod": 1000,
        "protocolId": "MQIsdp",
        "protocolVersion": 3,
        "clean": true,
        "encoding": "utf8"
   });

client.on('connect', function () {
  console.log('Connected');
  client.subscribe('robot/instruksi', function (err) {
    if (!err) {
      client.publish('robot/response', 'Robot Connected')
    }
  })
})

client.on('message', function (topic, message) {
  //console.log(message.toString())
  var instruksi = message.toString();
  switch(instruksi){
      case '1' : 
        maju();
  	console.log('Instruksi maju');
        break;
      case '2' :	
	kiri();
	console.log('Instruksi belok kiri');
	break;
     case '3' :
    	kanan();
	console.log('Instruksi belok kanan');
	break;
     case '4' :
	mundur();
	console.log('Instruksi mundur');
	break;
     case '5' :
	stop();
	console.log('Instruksi berhenti/stop');
	break;
  }
});

function maju(){
   in1.writeSync(1);
   in2.writeSync(0);
   in3.writeSync(1);
   in4.writeSync(0);
}

function mundur(){
   in1.writeSync(0);
   in2.writeSync(1);
   in3.writeSync(0);
   in4.writeSync(1);
}

function kiri(){
   in1.writeSync(0);
   in2.writeSync(1);
   in3.writeSync(1);
   in4.writeSync(0);
}

function kanan(){
   in1.writeSync(1);
   in2.writeSync(0);
   in3.writeSync(0);
   in4.writeSync(1);
}

function stop(){
   in1.writeSync(0);
   in2.writeSync(0);
   in3.writeSync(0);
   in4.writeSync(0);
}




