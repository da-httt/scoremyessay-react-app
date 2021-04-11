import React from 'react';

const ContactUs = (props) =>{
    return(
        <React.Fragment>
            <div class="container">
                <div class="row">
                    <div class="col align-self-center">
                        <h4 class="row-title"> Liên hệ</h4>
                    </div>
                </div>
                <div class="row align-items-center">
                    <div class="col align-self-center">
                        <p class="subtitle">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-8 col-sm-4 offset-2 offset-sm-4 mt-2">
                        <a role="button" class="btn btn-block btn-primary">Liên hệ với chúng tôi!</a>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
export default ContactUs;