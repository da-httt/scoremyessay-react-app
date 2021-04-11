
import React from 'react';
import CardLogin from './HomePage/CardLogin';
import ContactUs from './HomePage/ContactUS';
import IntroVideo from './HomePage/IntroVideo';
import WhyBox from './HomePage/WhyComponent';
import imgStudent from '../img/student1.jpg';
import imgTeacher from '../img/teacher1.jpg';

const HomePage = (props) =>{
    return(
        <React.Fragment>
        <div className="container-fluid content">
            <div className="row">
                <div class="col-12 col-sm-3 offset-sm-3">
                    <CardLogin 
                        image={imgStudent} 
                        nameCard="Học sinh" 
                        contentCard="Cải thiện những kỹ năng viết bài và nhận điểm số từ ScoreMyEssay!">
                    </CardLogin>
                </div>
                <div class="col-12 col-sm-3">
                    <CardLogin 
                        image={imgTeacher}
                        nameCard="Giáo viên" 
                        contentCard="Trở thành người đóng góp cho sự phát triễn của ScoreMyEssay!"
                        linkSignUp="/RegisterforTeacher">
                    </CardLogin>
                </div>       
            </div>

            <div className="row row-why">
                <WhyBox/>
            </div>
            <div className="row ">
                <IntroVideo/>
            </div>
            <div className="row row-why">
                <ContactUs/>
            </div>
        </div>
        </React.Fragment>
    );
}
export default HomePage;