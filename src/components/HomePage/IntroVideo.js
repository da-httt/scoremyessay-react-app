import React from 'react';
import video from '../../video/introVideo.mp4';

const IntroVideo = (props) =>{
    return(
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col align-self-center">
                        <h4 className="row-title"> Khám phá tính năng </h4>
                        <p className="subtitle"> Tìm hiểu các tính năng của ScoreMyEssay và cách sử dụng chỉ trong vài phút!</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col align-self-center">
                        <video controls autoPlay muted loop  width="70%" id="introVideo" className="video mr-auto ml-auto" >
                            <source src={video} type="video/mp4"/>
                        </video>
                    </div>
                    
                </div>
            </div>
        </React.Fragment>
    );
}
export default IntroVideo;