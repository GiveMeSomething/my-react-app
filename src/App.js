import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './components/Menu';
import './App.css';
import { DISHES } from './shared/dishes';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES
    }
  }
  
  render(){
    return(
      <div>
          <Navbar dark color="primary">
            <div className="container">
              <NavbarBrand href="/">
                Hoang Tien Minh
            </NavbarBrand>
            </div>
          </Navbar>
          <Menu dishes={this.state.dishes}></Menu>
        </div>
    );
  }
}

export default App;
