import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, CardBody, CardText, Alert } from 'reactstrap';
import DishDetail from './DishDetail';

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null
        };
    }

    onDishSelected(dish) {
        this.setState({ selectedDish: dish });
    }

    renderDish(dish) {
        if (dish != null)
            return (
                <DishDetail selected={this.state.selectedDish}></DishDetail>
            );
        else
            return (
                <div></div>
            );
    }

    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={() => this.onDishSelected(dish)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                        <CardImgOverlay>{dish.name}</CardImgOverlay>
                    </Card>
                </div>
            );
        });
        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <div className="row">
                    {this.renderDish(this.state.selectedDish)}
                </div>
            </div>
        );

    }
}
export default Menu;