import React, { Component } from 'react';
import Menu from './Menu';
import DishDetail from './DishDetail';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import { Switch, Route, Redirect } from 'react-router-dom';
import { DISHES } from '../shared/dishes';

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            selected: null
        }
    }

    onDishSelected(disdId) {
        this.setState({ selected: disdId });
    }

    render() {
        const HomePage = () => {
            return (
                <Home></Home>
            );
        };
        return (
            <div>
                <Header></Header>
                <Switch>
                    <Route path="/home">
                        {HomePage}
                    </Route>
                    <Route exact path="/menu">
                        <Menu dishes={this.state.dishes} onClick></Menu>
                    </Route>
                    <Redirect to="/home"></Redirect>
                </Switch>
                <Footer></Footer>
            </div>
        );
    }
}
export default Main;
