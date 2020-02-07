import React, { Component } from 'react';
import Menu from './Menu';
import DishDetail from './DishDetail';
import Header from './Header';
import Footer from './Footer';
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
        return (
            <div>
                <Header></Header>
                <Menu
                    dishes={this.state.dishes}
                    onClick={(dishId) => this.onDishSelected(dishId)}>
                </Menu>
                <DishDetail
                    selected={(this.state.dishes.filter((dish) => dish.id === this.state.selected))[0]}>
                </DishDetail>
                <Footer></Footer>
            </div>
        );
    }
}
export default Main;
