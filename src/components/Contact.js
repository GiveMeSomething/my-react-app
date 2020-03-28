import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Form, FormGroup, Label, Input, Button, Col, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';

class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            telNum: '',
            email: '',
            agree: false,
            contactType: '',
            message: '',
            touched: {
                firstName: false,
                lastName: false,
                telNum: false,
                email: false
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    validate(firstName, lastName, telNum, email) {

        const errors = {
            firstName: '',
            lastName: '',
            telNum: '',
            email: ''
        };

        if (this.state.touched.firstName && firstName.length < 3) {
            errors.firstName = 'First Name should be >= 3 characters';
        }
        else if (this.state.touched.firstName && firstName.length > 10) {
            errors.firstName = 'First Name should be <= 10 characters';
        }

        if (this.state.touched.lastName && lastName.length < 3) {
            errors.lastName = 'Last Name should be >= 3 characters';
        }
        else if (this.state.touched.lastName && lastName.length > 10) {
            errors.lastName = 'Last Name should be <= 10 characters';
        }

        const reg = /^\d+$/;
        if (this.state.touched.telNum && !reg.test(telNum)) {
            errors.telNum = 'Tel. Number should contain only numbers';
        }

        if (this.state.touched.email && email.split('').filter(x => x === '@').length !== 1) {
            errors.email = 'Email should contain a @';
        }

        return errors;
    }

    render() {
        const errors = this.validate(this.state.firstName, this.state.lastName, this.state.telNum, this.state.email);

        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/home">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            Menu
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                    </div>
                </div>

                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us Your Feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="firstName" md={2}>
                                    First Name
                                </Label>
                                <Col md={10}>
                                    <Input type="text" id="firstName" name="firstName"
                                        placeholder="First Name" value={this.state.firstName}
                                        valid={errors.firstName === ''}
                                        invalid={errors.firstName !== ''}
                                        onBlur={this.handleBlur('firstName')}
                                        onChange={this.handleInputChange}>
                                    </Input>
                                    <FormFeedback>
                                        {errors.firstName}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastName" md={2}>
                                    Last Name
                                </Label>
                                <Col md={10}>
                                    <Input type="text" id="lastName" name="lastName"
                                        placeholder="Last Name" value={this.state.lastName}
                                        valid={errors.lastName === ''}
                                        invalid={errors.lastName !== ''}
                                        onBlur={this.handleBlur('lastName')}
                                        onChange={this.handleInputChange}>
                                    </Input>
                                    <FormFeedback>
                                        {errors.lastName}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="telNum" md={2}>
                                    Tel.
                                </Label>
                                <Col md={10}>
                                    <Input type="tel" id="telNum" name="telNum"
                                        placeholder="Tel. Num" value={this.state.telNum}
                                        valid={errors.telNum === ''}
                                        invalid={errors.telNum !== ''}
                                        onBlur={this.handleBlur('telNum')}
                                        onChange={this.handleInputChange}>
                                    </Input>
                                    <FormFeedback>
                                        {errors.telNum}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>
                                    Email
                                </Label>
                                <Col md={10}>
                                    <Input type="email" id="email" name="email"
                                        placeholder="Email" value={this.state.email}
                                        valid={errors.email === ''}
                                        invalid={errors.email !== ''}
                                        onBlur={this.handleBlur('email')}
                                        onChange={this.handleInputChange}>
                                    </Input>
                                    <FormFeedback>
                                        {errors.email}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{ size: 6, offset: 2 }}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" name="agree" checked={this.state.agree}
                                                onChange={this.handleInputChange}>
                                            </Input>
                                            <strong>May we contact you ?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={{ size: 3, offset: 1 }}>
                                    <Input type="select" name="contactType" value={this.state.contactType}
                                        onChange={this.handleInputChange}>
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="message" md={2}>
                                    Message
                                </Label>
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Input type="textarea" id="message" name="message"
                                        rows={12} value={this.state.message}
                                        onChange={this.handleInputChange}>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Button type="submit" color="primary">
                                    Send Feedback
                                </Button>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Contact;