var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();


// THE BROAD

app.get('/scrape', function(req, res){

  url = 'http://www.thebroad.org/art/jean%E2%80%90michel-basquiat';

  request(url, function(error, response, html){
    if (error){
      response.status(500).send(error.message)
      return
    }


    var $ = cheerio.load(html);
    var paintings = []

    $('.view-content > .views-row').each(function(){
      var painting = $(this)
      var title = painting.find('a[href]').text()
      var imageURL = painting.find('img').attr('src')
      paintings.push({
        title: title,
        imageURL: imageURL
      })
    })
    fs.writeFile('output.json', JSON.stringify(paintings, null, 2), function(err){
      if (err) throw err
      console.log('File successfully written! - Check your project directory for output.json file');
    })
    res.send(paintings)
  })
})

// app.get('/scrape', function(req, res){
//
//   url = 'http://www.thebroad.org/art/keith-haring';
//
//   request(url, function(error, response, html){
//     if (error){
//       response.status(500).send(error.message)
//       return
//     }
//
//
//     var $ = cheerio.load(html);
//     var paintings = []
//
//     $('.view-content > .views-row').each(function(){
//       var painting = $(this)
//       var title = painting.find('a[href]').text()
//       var imageURL = painting.find('img').attr('src')
//       paintings.push({
//         title: title,
//         imageURL: imageURL
//       })
//     })
//     fs.writeFile('output.json', JSON.stringify(paintings, null, 2), function(err){
//       if (err) throw err
//       console.log('File successfully written! - Check your project directory for output.json file');
//     })
//     res.send(paintings)
//     console.log('party time?', paintings)
//   })
// })




app.listen('8081');
console.log('Guess the artist!');
module.exports = app;
