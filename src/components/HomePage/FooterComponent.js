import React from 'react';
import logo from '../../img/logo.png';
import {Link, Route} from 'react-router-dom';
const Footer =(props) =>{
    return (
        <React.Fragment>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-0 col-sm-3">
                            <i className="d-none d-sm-block left" ><img src={logo}  alt="Score My Essay" height="100%" width="100%"></img></i>
                    </div>
                    <div className="col-8 col-sm-5 offset-sm-1 ">
                        <h5>Liên lạc</h5>
                        <address>
                            <i className="fa fa-envelope "></i> <a href="mailto:scoremyessay@gmail.com">scoremyessay@gmail.com</a><br/>
                            <i className="fa fa-phone "></i> (+84) 915 469 728 <br/>
                            <i className="fa fa-home"></i> Danang, Vietnam<br/>
                        </address>
                    </div>
                    <div className="col-4 col-sm-3 ">
                        <h5>Liên kết</h5>
                        <Route>
                            <ul className="list-unstyled">
                                <li><Link to="/Home">Trang chủ</Link></li>
                                <li><Link to="/AboutUs">Về chúng tôi</Link></li>
                                <li><Link to="/Function">Tính năng</Link></li>
                            </ul>
                        </Route>
                    </div>
                </div>
            </div>
        </React.Fragment>
      );
}
export default Footer;