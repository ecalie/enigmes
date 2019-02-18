// init project
var express = require('express');
var app = express();


app.get('/', function(request, response) {
  response.render('index.html');
});

app.get('views/p3.html', function(req, res) {
  res.render('views/p3.html', {presentation:true})
})
app.get('/affcher-question', function(req, res) {
  res.render('views/p3.html')
})


app.use(function(req, res, next){

    res.setHeader('Content-Type', 'text/plain');

    res.status(404).send('Page introuvable !');

});


app.listen(3030);
