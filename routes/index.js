var express = require('express');
var router = express.Router();
var data = { "Temp": 0.0, "Pressure": 0.0 };
var dgram = require('dgram');
var Dequeue = require('dequeue');
var FIFO = new Dequeue();

var PORT = 4000;
var HOST = '172.18.7.25';
var message = new Buffer("get AnnData ");

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Annealing Web Monitoring' });
  return res.end();
});

router.get("/data", function(req, res) {
  //res.setHeader(name, value)
  //res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML 
    console.log('Data sent: ' + data);
    var client = dgram.createSocket('udp4');
    client.bind(41234);

    client.on('listening', function () {
        var address = client.address();
        console.log('UDP Server listening on ' + address.address + ":" + address.port);
    });
    client.send(message, 0, message.length, PORT, HOST, function (err, bytes) {

        if (err) throw err;
        console.log('UDP message sent to ' + HOST + ':' + PORT);
        client.on('message', function (message, remote) {

            console.log("Received: " + remote.address + ':' + remote.port + ' - ' + message);
            //FIFO.push(message.toString());
            if (!message.includes("get AnnData")) {
                console.log("Message with no CMD: " + message);
                var annDataArr = message.toString().split(',');
                data["Temp"] = annDataArr[1];
                data["Pressure"] = annDataArr[3];
                res.json(data);
                client.close();
            }
        });

    });

  //res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
  //res.json(get_data(data));
  //  .then(data => res.write(data),console.log('Data sent2: ' + data.Temp))
  //.catch(err => res.status(500 + 'error: ' + err.message), console.log('error: ' + err)).end();
  console.log('Data: ' + data.Temp + ' ' + data.Pressure);
  //res.write(data); //write data from index.html
  //res.json(data)
  //.catch(err => res.status(100 + 'error: ' + err.message), console.log('error: ' + err));
  //catch(err => res.status(500));
  //return res.end();
});

function get_data(){
  data = {"Temp": globalTemp, "Pressure": globalPressure};
         // {"Pressure": }];
  return (data);
}

module.exports = router;
