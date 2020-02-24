import React from 'react';
import { Card, CardImg, CardTitle, CardBody, CardText, ListGroup, ListGroupItem, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDish(dish, comments) {
    if (dish != null) {
        return (
            <div className="container">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/home">Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to="/menu">Menu</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        {dish.name}
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{dish.name}</h3>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg src={dish.image} alt={dish.name}></CardImg>
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
                                {RenderComment(comments)}
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

function RenderComment(comments) {
    const view = comments.map((comment) => {
        return(
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
                            at {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
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

function DishDetail(props){
    return (
        <div>
            {RenderDish(props.dish, props.comments)}
        </div>
    );
}
export default DishDetail;