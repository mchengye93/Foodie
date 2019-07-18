var express = require('express');
var bodyParser = require('body-parser');

var restaurants = require('../database-postgres');
var cors = require('cors');
var app = express();


const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'vilsC_dxi8j0B-zlZe5mJ4ia3E_12HK4-Q4xeOnYQchP8671Q2iFRFcCD3KhgA70UidkPlRUkbI0TyQSsUGzPm3D_pity25C9mcFpRpFpDmGJ_HqkE_yewIVkWQOXXYx';



app.use(express.static(__dirname + '/../react-client/dist'));

app.use(bodyParser.urlencoded({ extended: true })); // parse application/json
app.use(bodyParser.json());

app.get('/restaurant/:category', function (req, res) {
  
  restaurants.selectCategory(req.params.category,function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/category', function (req, res) {
  
  restaurants.getAllCategory(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/recommendation', function (req, res) {
  //console.log(req.query);
  var category = req.query.category;
  console.log('inside server recommendation',category);
  restaurants.getRecommendation(category,function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});


app.post('/restaurant', function (req,res) {

  var restaurantObject = req.body;
  console.log('inside restaurant post server')
  console.log(restaurantObject);
  restaurants.addRestaurant( restaurantObject, function(err,data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  })
});

app.delete('/restaurant', function (req,res) {
  var restaurantId = req.body.id;
  console.log('inside restaurant delete server')
  console.log(restaurantId);
  restaurants.deleteRestaurant( restaurantId, function(err,data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  })
});


app.get('/yelp', (req,res)=> {
  var term = req.query.term;

  const searchRequest = {
    term:term,
    location: 'san francisco, ca',
   
  };
  
  const client = yelp.client(apiKey);
  
  client.search(searchRequest).then(response => {
    const firstResult = response.jsonBody.businesses[0];
    const prettyJson = JSON.stringify(firstResult, null, 4);
    console.log(prettyJson);
    res.status(200);
    res.send(prettyJson);
  }).catch(e => {
    res.status(400);
    res.send(e);
  });
  

});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

