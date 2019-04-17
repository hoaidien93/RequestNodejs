var express = require('express');
var router = express.Router();
var path = require("path");
var request = require("request");
var download = require('download-file')
const destURL = 'https://toidicodedao.com';
var zlib = require('zlib');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/libs', function (req, res, next) {
  console.log(__dirname);
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  return res.sendFile(path.join(__dirname + '/Libs.js'));
});
function downdloadImage(body){
  var fullImg = [];
  // Get all img tag
  fullImg = body.match(/<img.+?\/?>/g);
  var fullSrc = [];
  fullImg.forEach((element)=>{
    var src = element.match(/src.+?".+?"/g);
    if(src !== null && src.length > 0){
      var convert = src[0].slice(5,src[0].length - 1);
      fullSrc.push(convert);
    }
  });
  console.log(fullSrc);
  // Download it
  fullSrc.forEach((item, index) => {
    var url = item;
    var options = {
      directory: "./file",
      filename: index + '.jpg'
    }
    download(url, options, function (err) {
      if (err) console.log(err);
      console.log("done!");
    });
  });
}
router.get('/request', (req, res) => {
  //Gzip: add field {encoding: null} in request
  request(destURL,function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response.statusCode);
    if(response.headers['content-encoding'] == 'gzip'){
      zlib.gunzip(body, function(err, dezipped) {
        body = dezipped.toString();
        downdloadImage(body);
      });
    }
    else 
      downdloadImage(body);
    
  });
});

module.exports = router;
