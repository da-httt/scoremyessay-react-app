import React from 'react';

const WhyBox = (props) =>{
    return(
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col align-self-center">
                        <h4 className="row-title"> Vì sao chọn ScoreMyEssay?</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-6 ">
                        <div className="row">
                            <div className="col-3 col-sm-2 align-self-center offset-sm-1">
                                <span className="fa fa-clock-o fa-4x fa-why"></span> 
                            </div>
                            <div className="col-9">
                                <h5 className="title-why">Nhanh chóng</h5>
                                <p className="content-why"> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>    
                            </div>
                        </div>
        
                        <div className="row ">
                            <div className="col-3 col-sm-2 align-self-center offset-sm-1">
                                <span className="fa fa-usd fa-4x fa-why"></span> 
                            </div>
                            <div className="col-9">
                                <h5 className="title-why">Tiết kiệm chi phí</h5>
                                <p className="content-why"> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>    
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6">
                        <div className="row">
                            <div className="col-3 col-sm-2 align-self-center offset-sm-1">
                                <span className="fa fa-pencil fa-4x fa-why"></span> 
                            </div>
                            <div className="col-9">
                                <h5 className="title-why">Đáng tin cậy</h5>
                                <p className="content-why"> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>    
                            </div>
                        </div>
                        <div className="row">
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