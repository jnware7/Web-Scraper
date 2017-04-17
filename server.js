var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res){

  url = 'http://www.thebroad.org/art/jean%E2%80%90michel-basquiat';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);
      var title, image;
      var json = { title: "", image: ""}
    }
  })

})

app.listen('8081')
console.log('Guess the artist');
exports = module.exports = app;
