import React from 'react';

class RestaurantItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        
    }
    this.deleteRestaurant = this.deleteRestaurant.bind(this);
  }
  deleteRestaurant() {
    if (confirm('Are you sure you want to delete '+ this.props.restaurant.name + ' ?')) {
      this.props.deleteRestaurant(this.props.restaurant.id);
    } else {
      //Do nothing;
    }
  }
  

  render() {
    var googleMap= 'https://maps.google.com/?q='+this.props.restaurant.location;
    return(
      <div id="restaurantItem">
        <div style={{float:'left', padding:'10px'}}>
        <label>
                <a href={this.props.restaurant.url} target="_blank" >{this.props.restaurant.name}</a>
                </label> <br/>
                <label>
                  <b>Category:</b> <span>{this.props.restaurant.category}</span>
                </label><br/>
                <label>
                  <b>Price:</b> <span>{this.props.restaurant.price}</span>
                </label><br/>
                <label>
                  <b>Phone:</b> <span>{this.props.restaurant.phone}</span>
                </label><br/>
                <label>
                  
                  <b>Location:</b><a href={googleMap} target="_blank">{this.props.restaurant.location}</a>
                </label><br/>
                <label>
                  <b>Must eat:</b><br/>{this.props.restaurant.foodlist}
                </label><br/>
                <button onClick={this.deleteRestaurant}>Delete</button>
        </div>
        <div >
        <img src={this.props.restaurant.imageurl}height="200" width="200"/> 
        
                <br/>
        </div>
         
             
              
      </div>
      );
  }
  
  
}

export default RestaurantItem;