
import React from 'react';
import "./team.css"
import pmd from "../../img/pmd.jpg";
import ntc from "../../img/ntc1.jpg";
import tdn from "../../img/tdn.png";

const Team = () => {

    return (
        <>
            <div className="container py-5">
                <div className="row text-center text-white">
                    <div className="col-lg-8 mx-auto">
                        <h2 className="row-title" style={{color: "#2596be", fontWeight: 600}}>Đội ngũ phát triển</h2>
                        <p className="lead mb-0 subtitle">Đồ án chuyên ngành HTTT - Học phần: 17N10 </p>

                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row text-center justify-content-center" >
                    <div className="col-xl-3 col-sm-6 mb-5">
                        <div className="py-5 px-4">
                            <img src={pmd} alt="" width="200" className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                            <h5 className="mb-0">Phạm Mạnh Dũng</h5><span className="small text-uppercase text-muted">Back-End Developer</span>
                            <ul className="social mb-0 list-inline mt-3">
                                <li className="list-inline-item"><a href="https://www.facebook.com/renzapmd"  className="social-link"><i className="fa fa-facebook-f"></i></a></li>
                                <li className="list-inline-item"><a href="https://www.facebook.com/renzapmd" className="social-link"><i className="fa fa-twitter"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 mb-5">
                        <div className="py-5 px-4">
                            <img src={ntc} alt="" width="200" className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                            <h5 className="mb-0">Ngô Thị Cảnh</h5><span className="small text-uppercase text-muted">Front-End Developer</span>
                            <ul className="social mb-0 list-inline mt-3">
                                <li className="list-inline-item"><a href="https://www.facebook.com/canhngo225" className="social-link"><i className="fa fa-facebook-f"></i></a></li>
                                <li className="list-inline-item"><a href="https://www.facebook.com/canhngo225" className="social-link"><i className="fa fa-twitter"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 mb-5">
                        <div className=" py-5 px-4">
                            <img src={tdn} alt="" width="200" className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                            <h5 className="mb-0">Trần Đình Nam</h5><span className="small text-uppercase text-muted">Android Developer</span>
                            <ul className="social mb-0 list-inline mt-3">
                                <li className="list-inline-item"><a href="https://www.facebook.com/Namdinh99.tran" className="social-link"><i className="fa fa-facebook-f"></i></a></li>
                                <li className="list-inline-item"><a href="https://www.facebook.com/Namdinh99.tran" className="social-link"><i className="fa fa-twitter"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )

}


export default Team;