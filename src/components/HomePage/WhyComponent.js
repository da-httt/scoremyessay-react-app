import React from 'react';
const WhyBox = (props) => {
    return (
        <React.Fragment>
            <div className="container" >
                <div className="row" style={{ marginBottom: 30 }}>
                    <div className="col align-self-center">
                        <h1 className="row-title" style={{  marginBottom: 30 }} > <span style={{ color: '#2596be', fontWeight: 600 }} >Vì sao chọn Score My Essay?</span></h1>
                        <h5 className="subtitle">ScoreMyEssay mang đến cho bạn những trải nghiệm mới với những lợi ích không thể tìm thấy ở nơi nào khác!</h5>
                    </div>
                </div>
                <div className="row mx-n5 ">
                    <div className="col-md-6 px-5" >
                        <div className=" row why" style={{ marginBottom: 50 }}>
                            <div className="col-3 col-sm-2 align-self-center offset-sm-1">
                                <span className="fa fa-clock-o fa-5x fa-why"></span>
                            </div>
                            <div className="col-9">
                                <h5 className="title-why">Nhanh chóng</h5>
                                <p className="content-why"> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>
                        <div className="row why " style={{ marginBottom: 50 }}>
                            <div className="col-3 col-sm-2 align-self-center offset-sm-1">
                                <span className="fa fa-usd fa-4x fa-why"></span>
                            </div>
                            <div className="col-9">
                                <h5 className="title-why">Tiết kiệm chi phí</h5>
                                <p className="content-why"> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 px-5">
                        <div className="row why" style={{ marginBottom: 50 }}>
                            <div className="col-3 col-sm-2 align-self-center offset-sm-1">
                                <span className="fa fa-pencil fa-4x fa-why"></span>
                            </div>
                            <div className="col-9">
                                <h5 className="title-why">Đáng tin cậy</h5>
                                <p className="content-why"> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>
                        <div className="row why">
                            <div className="col-3 col-sm-2 align-self-center offset-sm-1">
                                <span className="fa fa-user-circle-o fa-4x fa-why"></span>
                            </div>
                            <div className="col-9">
                                <h5 className="title-why">Đội ngũ giáo viên chất lượng</h5>
                                <p className="content-why"> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
export default WhyBox;