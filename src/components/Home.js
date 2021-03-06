import React from 'react';
import { Card, CardImg, CardSubtitle, CardBody, CardTitle, CardText } from 'reactstrap';
import { Loading } from './Loading';
import {baseUrl} from '../shared/baseUrl';

function RenderCard({item, isLoading, errorMessage}) {
    if (isLoading) {
        return (
            <Loading></Loading>
        )
    } else if (errorMessage) {
        return (
            <h4>{errorMessage}</h4>
        );
    } else {
        return (
            <Card>
                <CardImg src={baseUrl + item.image} alt={item.name}></CardImg>
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        );
    }
}

function Home(props) {
    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish} isLoading={props.dishesLoading} errorMessage={props.dishesErrorMessage}></RenderCard>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion} isLoading={props.promosLoading} errorMessage={props.promosErrorMessage}></RenderCard>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} isLoading={props.dishesLoading} errorMessage={props.errorMessage}></RenderCard>
                </div>
            </div>
        </div>
    );
}
export default Home;