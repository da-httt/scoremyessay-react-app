import React from 'react';
import video from '../../video/introVideo.mp4';
import "./home.css"
const IntroVideo = (props) => {
    return (
        <React.Fragment>
            <div className="container"  >
                <div className="row" style={{marginBottom: 15}}>
                    <div className="col align-self-center">
                        
                        <h3 className="row-title" style={{color: "#2596be", fontWeight: 600, marginBottom: 15}}> Khám phá tính năng </h3>
                        <h5 className="subtitle"> Tìm hiểu các tính năng của ScoreMyEssay và cách sử dụng chỉ trong vài phút!</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col align-self-center">
                        <video controls autoPlay muted loop width="70%" id="introVideo" className="video mr-auto ml-auto" >
                            <source src={video} type="video/mp4" />
                        </video>
                    </div>

                </div>
            </div>
        </React.Fragment>
    );
}
export default IntroVideo;