import { Button } from 'reactstrap';
import React from 'react';

const ContactUs = (props) =>{
    return(
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col align-self-center">
                        <h4 className="row-title"> Liên hệ</h4>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col align-self-center">
                        <p className="subtitle">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-8 col-sm-4 offset-2 offset-sm-4 mt-2">
                        <Button outline color="primary" block>Liên hệ với chúng tôi!</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
export default ContactUs;