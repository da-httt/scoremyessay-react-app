import React from 'react';

import Header from './HomePage/HeaderComponent';
import Footer from './HomePage/FooterComponent';
import Team from "./HomePage/TeamComponent"

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