const Pool = require('pg').Pool;

const postgresDb = new Pool( {
  user: 'marbocheng',
  host: 'localhost',
  database: 'foodie',
  password: 'mapo',
  port: 5432,
});




var selectAll = function(callback) {
    console.log('postgres selectAll');
    postgresDb.query('SELECT * FROM restaurants', function(err, results) {
      if(err) {
        callback(err, null);
      } else {
        callback(null, results.rows);
      }
    });
  };

var selectCategory = function(category,callback){
    console.log('postgres category');
    console.log(category);
    postgresDb.query(`SELECT * FROM restaurants WHERE category='${category}'`, function(err, results) {
        if(err) {
          callback(err, null);
        } else {
          callback(null, results.rows);
        }
      });
    };



var addRestaurant = function(restaurantObject, callback) {
    console.log('inside db postgrest addResutant', restaurantObject);
    var name= restaurantObject.name;
    var category= restaurantObject.category;
    var price = restaurantObject.price;
    var location =  restaurantObject.location.split("'").join(' ');
    var url = restaurantObject.url;
    var imageurl = restaurantObject.imageurl;
    var phone = restaurantObject.phone;
    var foodlist = restaurantObject.foodlist;
    

    postgresDb.query(`INSERT INTO restaurants (name,category,price,location,url,imageurl,phone,foodlist) VALUES ('${name}', 
   '${category}','${price}','${location}','${url}','${imageurl}','${phone}','${foodlist}')`, function(err,results) {
        if (err){
          console.log(err);
            callback(err,null);
        } else {
            callback(null,results);
        }
    });
  }

  var deleteRestaurant = function(restaurantId, callback) {
    console.log('inside db postgrest deleteResutant',restaurantId);
    
    postgresDb.query(`DELETE from restaurants WHERE id =${restaurantId}` , function(err,results) {
        if (err){
          console.log(err);
            callback(err,null);
        } else {
            callback(null,results);
        }
    });
  }
  var getAllCategory = function(callback){
    console.log('postgres getAllcategory');
   
    postgresDb.query(`SELECT DISTINCT category FROM restaurants ORDER BY category ASC`, function(err, results) {
        if(err) {
          callback(err, null);
        } else {
          callback(null, results.rows);
        }
      });
    };

  var getRecommendation = function(category, callback){
    console.log(category);
    postgresDb.query(`SELECT * FROM restaurants WHERE category= '${category}' ORDER BY RANDOM() LIMIT 1`, function(err, results) {
      if(err) {
        callback(err, null);
      } else {
        console.log('results', results.rows)
        callback(null, results.rows);
      }
    });
  };
  
  
  module.exports ={
      selectAll,
      addRestaurant,
      selectCategory,
      getAllCategory,
      getRecommendation,
      deleteRestaurant,

  }