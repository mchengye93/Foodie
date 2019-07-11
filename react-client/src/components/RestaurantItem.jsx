import React from 'react';

const RestaurantItem = (props) => {
  var googleMap= 'https://maps.google.com/?q='+props.restaurant.location;
  return(
  <div id="restaurantItem">
    <div style={{float:'left', padding:'10px'}}>
    <label>
            <a href={props.restaurant.url} target="_blank" >{props.restaurant.name}</a>
            </label> <br/>
            <label>
              <b>Category:</b> <span>{props.restaurant.category}</span>
            </label><br/>
            <label>
              <b>Price:</b> <span>{props.restaurant.price}</span>
            </label><br/>
            <label>
              <b>Phone:</b> <span>{props.restaurant.phone}</span>
            </label><br/>
            <label>
              
              <b>Location:</b><a href={googleMap} target="_blank">{props.restaurant.location}</a>
            </label><br/>
            <label>
              <b>Must eat:</b><br/>{props.restaurant.foodlist}
            </label><br/>
    </div>
    <div >
    <img src={props.restaurant.imageurl}height="200" width="200"/> 
    
            <br/>
    </div>
     
         
          
  </div>
  );
  }

export default RestaurantItem;