import React from 'react';
import logo from '../../img/logo.png';
const Footer = (props) => {
    return (
        <React.Fragment>
            <footer className=" text-lg-start text-muted">

                <section className="">
                    <div className="container text-md-start mt-5">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <img src={logo} alt="Score My Essay" width="125%"></img>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Repositories
          </h6>
                                <p>
                                    <a href="https://github.com/da-httt/scoremyessay-api-server" className="text-reset">FastApi Server</a>
                                </p>
                                <p>
                                    <a href="https://github.com/da-httt/scoremyessay-react-app" className="text-reset">ReactJS Web Application</a>
                                </p>
                                <p>
                                    <a href="https://github.com/da-httt/scoremyessay-android-app" className="text-reset">Android Kotlin Application</a>
                                </p>

                            </div>

                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4" >
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Contact
          </h6>
                                <p>Pham Manh Dung - Team Leader</p>

                                <p>

                                    scoremyessay.dut@gmail.com
          </p>
                                <p> (+84) 915469728</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="text-center p-4" >
                    © 2021 Copyright:ScoreMyEssay.com
                </div>
            </footer>
        </React.Fragment>
    );
}
export default Footer;