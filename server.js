var express = require('express');
var fs = require('fs');
var request = require('request-promise');
var cheerio = require('cheerio');
var app = express();

app.use(express.static(__dirname + '/public'));

app.set('views', './views')
app.set('view engine', 'pug')

// THE BROAD
var scrapTheBoard = function(artist){
  var url = "http://www.thebroad.org/art/"+encodeURIComponent(artist)
  return request(url)
    .then(extractArt)
}
var shuffleArt = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
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
  Promise.all([
    scrapTheBoard('jean‐michel-basquiat'),
    scrapTheBoard('keith-haring'),
    scrapTheBoard('mark-bradford'),
    scrapTheBoard('barbara-kruger'),
    scrapTheBoard('neo-rauch'),
    scrapTheBoard('frank-stella'),
    scrapTheBoard('robert-therrien'),
    scrapTheBoard('philip-taaffe'),
    scrapTheBoard('william-kentridge'),
    scrapTheBoard('kara-walker'),
    scrapTheBoard('glenn-ligon'),
    scrapTheBoard('takashi-murakami'),
    scrapTheBoard('albert-oehlen')
  ])
  .then(function(allPaintings){
    return allPaintings.reduce(function(a,b){
      return a.concat(b)
    })
  })
  .then(function(paintings){
       shuffleArt(paintings)
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
