import React from 'react';
import styled from 'styled-components';

const Button = styled.input`
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


class RecommendationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        category: '',
        
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
      
    this.setState({category: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    //alert('Thank you for adding! ' + this.state.name);
    var category= this.state.category;

    console.log(category);
    this.props.showRecommendation(category);
  
    
  }


  render () {
 
      var categoryList = '';
      if( this.props.categoryList !== []){
          
        categoryList = this.props.categoryList.map((category) =>
        <option value={category.category}>{category.category}</option>
      );

      }

    return (
        <form onSubmit={this.handleSubmit}>

        <label>
          <b>Category:</b>
          <select name="category" onChange={this.handleChange}>
          {categoryList}
          </select>
        </label>
        <Button type="submit" value="Submit" />
      </form>
    );
  }
}

export default RecommendationForm;