import React from 'react';
import axios from 'axios';

import styled from 'styled-components';



const SearchInput = styled.input`
display: inline-block;
border: none;
border-radius: 20px;
padding: 5px 8px;
color: #333;
box-shadow: 
  inset 0 2px 0 rgba(0,0,0,.2), 
  0 0 4px rgba(0,0,0,0.1);

`;

const Buttom = styled.input`
display: inline-block;
margin: 10px;
padding: 8px 15px;
background: #08C;
border: 1px solid rgba(0,0,0,0.15);
border-radius: 4px;
transition: all 0.3s ease-out;
box-shadow:
  inset 0 1px 0 rgba(255,255,255,0.5),
  0 2px 2px rgba(0,0,0,0.3),
  0 0 4px 1px rgba(0,0,0,0.2);

/* Font styles */
text-decoration: none;
color:white;
`;
class SearchRestaurantForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        term: '',
        name: '',
        category: '',
        price: '$',
        location: '',
        foodlist:  '',
        url: '',
        imageurl: '',
        phone: '',
        searched: false,
    }
    this.handleChange = this.handleChange.bind(this);
   
    this.handleSearch = this.handleSearch.bind(this);
    this.addRestaurant = this.addRestaurant.bind(this);
  }
  handleChange(event) {
    //console.log('handling change of', event.target.name);
    this.setState({[event.target.name]: event.target.value});
  }

  handleSearch(event) {
    event.preventDefault();
    //alert('Thank you for adding! ' + this.state.name);
    var term = this.state.term;
    //console.log(term);
    
    axios.get('/yelp',{params: {
        term: term
      }}).then((response)=> {
        var yelpResult = response.data;
        
       
        this.setState({ 
            term: '',
            name: yelpResult.name,
            category: yelpResult.categories[0].title,
            price: yelpResult.price,
            location: yelpResult.location.display_address.join(' '),
            url: yelpResult.url,
            imageurl: yelpResult.image_url,
            phone:yelpResult.display_phone,
            searched:true
        });
        
  
      }).catch((error) => {
  
        console.log(error);
        
  
      })
         
  }

  addRestaurant() {
      this.props.addRestaurant(this.state);
     
  }


  render () {
      if (this.state.searched) {

        return (
          <div id="restaurantSearchform">
            <div style={{float:'left', padding:'10px'}}>
            <form onSubmit={this.handleSearch}>
                <b>Find:</b> <SearchInput type="text" name="term" value={this.state.term} onChange={this.handleChange}/>
                <Buttom type="submit" value="Search" />
            </form>

            <form onSubmit={this.addRestaurant}>
            <label>
            <a href={this.state.url} target="_blank" >{this.state.name}</a>
            </label> <br/>
            <label>
              <b>Category:</b> <span>{this.state.category}</span>
            </label><br/>
            <label>
              <b>Price:</b> <span>{this.state.price}</span>
            </label><br/>
            <label>
              <b>Phone:</b> <span>{this.state.phone}</span>
            </label><br/>
            <label>
              <b>Location:</b> <span>{this.state.location}</span>
            </label><br/>
           
         
            <label>
              <b>Must eat:</b><br/><textarea name="foodlist" value={this.state.foodlist} onChange={this.handleChange} rows="8" cols="15"/>
            </label><br/>
            <Buttom type="submit" value="Add Restaurant" />
          </form>
          </div>
          <div>
          <img src={this.state.imageurl}height="150" width="150"/> 
            <br/>
            </div>
          </div>
        );

      } else {
          return (
            <form onSubmit={this.handleSearch}>
                <b>Find:</b> <SearchInput type="text" name="term" value={this.state.term}  onChange={this.handleChange}/>
                <Buttom type="submit" value="Search" />
            </form>
          );
      }

  }
}

export default SearchRestaurantForm;