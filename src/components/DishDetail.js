import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardBody, CardText, ListGroup, ListGroupItem } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);
    }

    renderDish(dish) {
        if (dish != null) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <Card>
                                <CardImg src={dish.image} alt="dish.name"></CardImg>
                                <CardBody>
                                    <CardTitle>{dish.name}</CardTitle>
                                    <CardText>{dish.description}</CardText>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <div className="row">
                                <div className="col-12">
                                    <h4>Comments</h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    {this.renderComment(dish)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }

    renderComment(dish) {
        const view = dish.comments.map((comment) => {
            return (
                <ListGroupItem key={comment.id}>
                    <div className="row">
                        <div className="col-12">
                            <p>" Rating : {comment.rating} "</p>
                        </div>
                        <div className="col-12">
                            <p>" {comment.comment} "</p>
                        </div>
                        <div className="col-12">
                            <p>
                                by {comment.author}
                                at {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                            </p>
                        </div>
                    </div>
                </ListGroupItem>
            );
        });
        return (
            <ListGroup>
                {view}
            </ListGroup>
        );
    }

    render() {
        const view = this.renderDish(this.props.selected);
        return (view);
    }
}
export default DishDetail