import React from 'react';
import video from 'F:/scoremyessay-react-app/src/video/introVideo.mp4';

const IntroVideo = (props) =>{
    return(
        <React.Fragment>
            <div class="container">
                <div class="row">
                    <div class="col align-self-center">
                        <h4 class="row-title"> Khám phá tính năng </h4>
                        <p class="subtitle"> Tìm hiểu các tính năng của ScoreMyEssay và cách sử dụng chỉ trong vài phút!</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col align-self-center">
                        <video controls autoplay muted loop  width="70%" id="introVideo" class="video mr-auto ml-auto" >
                            <source src={video} type="video/mp4"/>
                        </video>
                    </div>
                    
                </div>
            </div>
        </React.Fragment>
    );
}
export default IntroVideo;