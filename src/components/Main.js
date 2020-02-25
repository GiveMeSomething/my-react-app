import React, { Component } from 'react';
import Menu from './Menu';
import DishDetail from './DishDetail';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Contact from './Contact';
import About from './AboutUs';
import { Switch, Route, Redirect } from 'react-router-dom';
import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { COMMENTS } from '../shared/comments';

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS
        }
    }

    render() {
        const HomePage = () => {
            return (
                <Home
                    dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                    promotion={this.state.promotions.filter((promotion) => promotion.featured)[0]}
                    leader={this.state.leaders.filter((leader) => leader.featured)[0]}
                ></Home>
            );
        };

        const DishWithId = ({ match }) => {
            return (
                <DishDetail
                    dish={
                        this.state.dishes.filter(
                            (dish) => dish.id === parseInt(match.params.dishId, 10))[0]
                    }
                    comments={this.state.comments.filter(
                        (comment) => comment.dishId === parseInt(match.params.dishId, 10))
                    }>
                </DishDetail>
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
                    <Route path="/menu/:dishId" component={DishWithId}>
                    </Route>
                    <Route path="/contactus">
                        <Contact></Contact>
                    </Route>
                    <Route path="/aboutus">
                        <About leaders={this.state.leaders}></About>
                    </Route>
                    <Redirect to="/home"></Redirect>
                </Switch>
                <Footer></Footer>
            </div >
        );
    }
}
export default Main;
