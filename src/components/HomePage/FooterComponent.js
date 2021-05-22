import React from 'react';
import logo from '../../img/logo.png';
import { Link, Route } from 'react-router-dom';
const Footer = (props) => {
    return (
        <React.Fragment>
            {/*<div classNameName="container mt-3" >
                <div classNameName="row" style={{ marginTop: 50, marginBottom: 50 }}>
                    <div classNameName="col-0 col-sm-3">
                        <i classNameName="d-none d-sm-block left" ><img src={logo} alt="Score My Essay" height="100%" width="100%"></img></i>
                    </div>
                    <div classNameName="col-8 col-sm-5 offset-sm-1 ">
                        <h5>Liên lạc</h5>
                        <address>
                            <i classNameName="fa fa-envelope "></i> <a href="mailto:scoremyessay@gmail.com">scoremyessay@gmail.com</a><br />
                            <i classNameName="fa fa-phone "></i> (+84) 915 469 728 <br />
                            <i classNameName="fa fa-home"></i> Danang, Vietnam<br />
                        </address>
                    </div>
                    <div classNameName="col-4 col-sm-3 ">
                        <h5>Liên kết</h5>
                        <Route>
                            <ul classNameName="list-unstyled">
                                <li><Link to="/Home">Trang chủ</Link></li>
                                <li><Link to="/AboutUs">Về chúng tôi</Link></li>
                                <li><Link to="/Function">Tính năng</Link></li>
                            </ul>
                        </Route>
                    </div>
                </div>
    </div> */}

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
                                <p> (+84) 0915469728</p>
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