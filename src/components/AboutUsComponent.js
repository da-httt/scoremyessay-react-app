import React from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';

import Header from './HomePage/HeaderComponent';
import Footer from './HomePage/FooterComponent';
import Team from "./HomePage/TeamComponent"

const CardMember = (props) =>{
    const {
        image,
        nameCard,
        msv,
        mission,
      } = props;
    return(
        <Card  className="card">
            <CardImg top width="100%" src={image} alt={nameCard}></CardImg>
            <CardBody>
                <CardTitle tag="h5" >{nameCard}</CardTitle>
                <CardText className="card-text"> 
                {msv}<br/>
                {mission}
                </CardText>
            </CardBody>
        </Card>
    );
}
const AboutUs = (props) =>{
    return(
        <React.Fragment>
            <Header/>
            <div className="container content">
            <div style={{ marginTop: 90 }} id="aboutus">
                    <Team />
                </div>
            </div>
            <Footer/>
        </React.Fragment>
    );

}
export default AboutUs;