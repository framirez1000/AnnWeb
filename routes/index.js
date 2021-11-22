var express = require('express');
var router = express.Router();
var data = 0;
/* GET home page. */
router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Annealing Web Monitoring' });
  return res.end();
});

router.get("/data", function(req, res) {
  //res.setHeader(name, value)
  //res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML 
  console.log('Data sent: ' + data);
  //res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML 
  res.json(get_data(data));
  //  .then(data => res.write(data),console.log('Data sent2: ' + data.Temp))
  //.catch(err => res.status(500 + 'error: ' + err.message), console.log('error: ' + err)).end();
  console.log('Data ' + data.Temp + data.Pressure);
  //res.write(data); //write data from index.html
  //res.json(data)
  //.catch(err => res.status(100 + 'error: ' + err.message), console.log('error: ' + err));
  //catch(err => res.status(500));
  return res.end();
});

function get_data(){
  data = {"Temp": globalTemp, "Pressure": globalPressure};
         // {"Pressure": }];
  return (data);
}

module.exports = router;
