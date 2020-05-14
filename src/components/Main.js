import React, { Component } from 'react';
import Menu from './Menu';
import DishDetail from './DishDetail';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Contact from './Contact';
import About from './AboutUs';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchDishes, fetchComments, fetchPromos } from "../redux/ActionCreator";
import { actions } from 'react-redux-form';

const mapDispatchToProps = (dispatch) => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes()) },
    resetForm: () => { dispatch(actions.reset('feedback')) },
    fetchComments: () => { dispatch(fetchComments()) },
    fetchPromos: () => { dispatch(fetchPromos()) }
});

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}
class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
    }

    render() {
        const HomePage = () => {
            return (
                <Home
                    dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrorMessage={this.props.dishes.errorMessage}
                    promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
                    promosLoading={this.props.promotions.isLoading}
                    promosErrorMessage={this.props.promotions.errorMessage}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                ></Home>
            );
        };

        const DishWithId = ({ match }) => {
            return (
                <DishDetail
                    dish={
                        this.props.dishes.filter(
                            (dish) => dish.id === parseInt(match.params.dishId, 10))[0]
                    }
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errorMessage}
                    comments={this.props.comments.comments.filter(
                        (comment) => comment.dishId === parseInt(match.params.dishId, 10))
                    }
                    commentsErrorMessage={this.props.comments.errorMessage}
                    addComment={this.props.addComment}>
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
                        <Menu dishes={this.props.dishes} onClick></Menu>
                    </Route>
                    <Route path="/menu/:dishId" component={DishWithId}>
                    </Route>
                    <Route path="/contactus" component={() =>
                        <Contact resetFeedbackForm={() => this.props.resetForm()}></Contact>
                    }>
                    </Route>
                    <Route path="/aboutus">
                        <About leaders={this.props.leaders}></About>
                    </Route>
                    <Redirect to="/home"></Redirect>
                </Switch>
                <Footer></Footer>
            </div >
        );
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
