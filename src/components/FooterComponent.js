import React from 'react';
import logo from '../img/logo.png';

const Footer =(props) =>{
    return (
        <React.Fragment>
            <div className="container">
                <div class="row">
                    <div class="col-0 col-sm-3">
                            <a class="d-none d-sm-block left" ><img src={logo}  alt="Score My Essay" height="100%" width="100%"></img></a>
                    </div>
                    <div class="col-8 col-sm-5 offset-sm-1 ">
                        <h5>Liên lạc</h5>
                        <address>
                            <i class="fa fa-envelope "></i> <a href="mailto:scoremyessay@gmail.com">scoremyessay@gmail.com</a><br/>
                            <i class="fa fa-phone "></i> (+84) 915 469 728 <br/>
                            <i class="fa fa-home"></i> Danang, Vietnam<br/>
                        </address>
                    </div>
                    <div class="col-4 col-sm-3 ">
                        <h5>Liên kết</h5>
                        <ul class="list-unstyled">
                            <li><a href="/">Trang chủ</a></li>
                            <li><a href="/">Giới thiệu</a></li>
                            <li><a href="/">Truy cập</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </React.Fragment>
      );
}
export default Footer;