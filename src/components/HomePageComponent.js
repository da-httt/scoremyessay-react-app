
import React from 'react';
import CardLogin from './HomePage/CardLogin';
import ContactUs from './HomePage/ContactUS';
import IntroVideo from './HomePage/IntroVideo';
import WhyBox from './HomePage/WhyComponent';
import imgStudent from '../img/student1.jpg';
import imgTeacher from '../img/teacher1.jpg';
import Header from './HomePage/HeaderComponent';
import Footer from './HomePage/FooterComponent';

const HomePage = (props) =>{
    return(
        
        <React.Fragment>
        <Header/>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-3 offset-md-3">
                        <CardLogin 
                            image={imgStudent} 
                            nameCard="Học sinh" 
                            contentCard="Cải thiện những kỹ năng viết bài và nhận điểm số từ ScoreMyEssay!"
                            linkSignUp="/RegisterforStudent">
                        </CardLogin>
                    </div>
                    <div className="col-12 col-md-3">
                        <CardLogin 
                            image={imgTeacher}
                            nameCard="Giáo viên" 
                            contentCard="Trở thành người đóng góp cho sự phát triễn của ScoreMyEssay!"
                            linkSignUp="/RegisterforTeacher">
                        </CardLogin>
                    </div>       
                </div>
            </div>

            <div className="row-why">
                <WhyBox/>
            </div>
                <IntroVideo/>
            <div className="row-why">
                <ContactUs/>
            </div>
        <Footer/>
        </React.Fragment>
        
    );
}
export default HomePage;