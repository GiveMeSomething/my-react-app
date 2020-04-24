import React, { Component } from 'react';
import {
    Card, CardImg, CardTitle, CardBody, CardText,
    ListGroup, ListGroupItem,
    Breadcrumb, BreadcrumbItem,
    Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Row, Label
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

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
class DishDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            dish: this.props.dish,
            comments: this.props.comments
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        return (
            <div>
                {RenderDish(this.state.dish, this.state.comments)}
                <div className="container">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-6 offset-md-6 p-1">
                                <Button color="primary" onClick={this.toggleModal}>
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModa}>
                        <h3>Submit Comment</h3>
                    </ModalHeader>
                    <ModalBody>
                        <CommentForm></CommentForm>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="button button-primary" onClick={this.toggleModal}>Submit</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default DishDetail;

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
class CommentForm extends Component {
    render() {
        return (
            <LocalForm>
                <Row className="form-group">
                    <div className="col-12">
                        <Label htmlFor="rating">
                            Rating
                                </Label>
                        <Control.select model=".rating" name="rating" className="form-control">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Control.select>
                    </div>
                </Row>
                <Row className="form-group">
                    <div className="col-12">
                        <Label htmlFor="name">
                            Your Name
                                </Label>
                        <Control.text model=".name" id="name" name="name"
                            className="form-control"
                            placeholder="Your Name"
                            validators={{ required, maxLength: maxLength(15), minLength: minLength(3) }}>
                        </Control.text>
                        <Errors model=".name" show="touched" messages={{
                            required: "This is required",
                            maxLength: "Must be 15 characters or less",
                            minLength: "Must be greater than 2 characters"
                        }}>
                        </Errors>
                    </div>

                </Row>
                <Row className="form-group">
                    <div className="col-12">
                        <Label htmlFor="comment">
                            Comment
                        </Label>
                        <Control.textarea model=".comment" id="comment" name="comment"
                            className="form-control"
                            validators={{ required }}>
                        </Control.textarea>
                        <Errors model=".comment" show="touched"
                            messages={{
                                required: "This field is required"
                            }}>
                        </Errors>
                    </div>
                </Row>
            </LocalForm>
        );
    }
}