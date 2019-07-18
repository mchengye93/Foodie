import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import RestaurantItem from './components/RestaurantItem.jsx';


import RecommendationForm from './components/RecommendationForm.jsx';
import SearchRestaurantForm from './components/SearchRestaurantForm.jsx';

import styled from 'styled-components';

const Title = styled.h2`
color: #08C;
font-family: 'Rouge Script' cursive; 
font-size: 40px; 
font-weight: normal; 
line-height: 48px;
margin: 0 0 15px; 
text-shadow: 1px 1px 2px #082b34;

`;

const Button = styled.button`
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

const CenterDiv = styled.div`
margin: auto;
width: 650px;
height: 500px;
border: 3px solid #08C;
padding: 10px;
`

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      recommended: '',
      categoryList: [],
      addRestaurant: false,
    }
    //this.addFood = this.addFood.bind(this);
    this.getCategoryList = this.getCategoryList.bind(this);
    this.showRecommendation  = this.showRecommendation.bind(this);
    this.addRestaurantForm = this.addRestaurantForm.bind(this);
    this.addRestaurant = this.addRestaurant.bind(this);
    this.deleteRestaurant = this.deleteRestaurant.bind(this);
  }
  componentWillMount(){
  console.log('component will mount!');
  this.getCategoryList();
  

  }
  // addFood(restaurantObject){
  //   console.log(restaurantObject);
    
  //   axios.post('/restaurant', restaurantObject).then((response)=> {
  //     console.log(response);
  //   }).catch((error)=> {
  //     console.log(error);
  //   });
    
  // }
  getCategoryList(){
    console.log("inside getCategoryList!");
    axios.get('/category')
    .then((response) => {
      // handle success
      console.log(response.data);
      this.setState({categoryList: response.data});
    })
    .catch((error) =>{
      // handle error
      console.log(error);
    })
  }
  showRecommendation(category){
   
    console.log('show recommendaiton client', category)
    axios.get('/recommendation',  {params: {
      category: category
    }}).then((response)=> {
      var recommendation = response.data[0];
      console.log(response.data[0]);
      this.setState({recommended: recommendation});
    

    }).catch((error) => {

      console.log(error);

    })
  }

  addRestaurantForm(){
    this.setState({addRestaurant: true});
    
    console.log('this.state.addResForm',this.state.addRestaurant);
  }

  addRestaurant(restaurantObject){
      axios.post('/restaurant',restaurantObject).then((response)=> {
          console.log(response);
          this.setState({addRestaurant:false});
          this.getCategoryList();
      }).catch((err)=>{
          console.log(err);
      })
      
  }
  deleteRestaurant(restaurantId) {
    console.log('Delete restaurant id:', restaurantId);
    axios.delete('/restaurant', {
      data: { id: restaurantId}
     }).catch((err)=> {
       console.log(err);
     })
  }
  





  componentDidMount() {
  }

  render () {
    console.log('this.state.addRestaurant', this.state.addRestaurant);
    console.log('this.state.recommended', this.state.recommended);
    if(this.state.recommended !== '' && !this.state.addRestaurant) {
      return(
        <CenterDiv>
        <Title>Food Recommender</Title>
        <Button onClick={this.addRestaurantForm}>Add Restaurant</Button>
        <RecommendationForm categoryList={this.state.categoryList} showRecommendation={this.showRecommendation}/>
        <RestaurantItem restaurant={this.state.recommended} deleteRestaurant={this.deleteRestaurant}/>
      </CenterDiv>
        );
    }
    
   
    if (this.state.addRestaurant) {
      return(
        <CenterDiv>
        <Title>Food Recommender</Title>
        <SearchRestaurantForm addRestaurant={this.addRestaurant}/>
  
       
      </CenterDiv>
        );
    }
    if(!this.state.addRestaurant) {
      return(
        <CenterDiv>
          <Title>Food Recommender</Title>
      
        <Button onClick={this.addRestaurantForm}>Add Restaurant</Button>
        <RecommendationForm categoryList={this.state.categoryList} showRecommendation={this.showRecommendation}/>
      </CenterDiv>
        );
    }

    
    
    // else {
    //   return (
    //     <div>
    //       <h1>Food Recommender</h1>
    //       <button onClick={this.addRestaurant}>Add Restaurant</button>
    //       <RestaurantItem restaurant={this.state.recommended}/>
    //     </div>
    //     )

    // }
    
  }
}

ReactDOM.render(<App />, document.getElementById('app'));