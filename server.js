var express = require('express');
var fs = require('fs');
var request = require('request-promise');
var cheerio = require('cheerio');
var app = express();

app.use(express.static('public'))

app.set('views', './views')
app.set('view engine', 'pug')

// THE BROAD
var scrapTheBoard = function(artist){
  var url = "http://www.thebroad.org/art/"+encodeURIComponent(artist)
  return request(url)
    .then(extractArt)
}
var extractArt = function(html){
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
  return paintings
}
app.get('/scrape', function(req, res){
  scrapTheBoard('jean‐michel-basquiat')
  .then(function(paintings){
    //  res.json(paintings)

       res.render('index', {paintings})
       console.log(paintings)
  })
  .catch(function(err){
    res.status(500).send(err.message)
  })

  //   fs.writeFile('output.json', JSON.stringify(paintings, null, 2), function(err){
  //     if (err) throw err
  //     console.log('File successfully written! - Check your project directory for output.json file');
  //   })
  //   res.send(paintings)
  // })
})

// app.get('/scrape', function(req, res){

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
//



app.listen('8081');
console.log('Guess the artist!');
module.exports = app;
