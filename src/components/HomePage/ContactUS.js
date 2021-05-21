import { Button } from 'reactstrap';
import React from 'react';
const ContactUs = (props) => {
    return (
        <React.Fragment>
            <div className="container justify-content-center">
                <div className="col justify-content-center ">
                        <h4 className="row justify-content-center" style={{color: "white"}}>Bạn đã sẵn sàng để trở thành học viên? </h4>
                        <h1 className="row justify-content-center" style={{color: "white", fontSize: "70px"}}>Đăng ký ngay!</h1>
                        <div className="row justify-content-center">
                            <button className="btn outlined btn-block btn-lg btn-primary" style={{maxWidth: 300}} type="submit">Register!</button></div>
                </div>
            </div>
        </React.Fragment>
    );
}
export default ContactUs;