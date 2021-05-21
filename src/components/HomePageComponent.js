
import React from 'react';
import CardLogin from './HomePage/CardLogin';
import ContactUs from './HomePage/ContactUS';
import IntroVideo from './HomePage/IntroVideo';
import WhyBox from './HomePage/WhyComponent';
import imgStudent from '../img/student1.jpg';
import imgTeacher from '../img/teacher1.jpg';
import Header from './HomePage/HeaderComponent';
import Footer from './HomePage/FooterComponent';
import { withRouter } from 'react-router-dom';
import { CardDeck } from 'reactstrap';
import Team from "./HomePage/TeamComponent"
import "./homepage.css"
const HomePage = (props) => {
    return (

        <React.Fragment>

            
            <div className="back"  id="homepage">
                <div className="container">
                    <Header />
                    <div className="col align-self-center" style={{ marginTop: 100, marginBottom: 20 }}>
                        <h4 className="row-title"> <span style={{ color: '#2596be', fontWeight: 600 }} >Đã có tài khoản?</span></h4>
                        <h6 className="subtitle">Truy cập ứng dụng ngay bây giờ </h6>
                    </div>
                    <div className="" >
                        <CardDeck className="row justify-content-center" style={{ display: 'flex', flexDirection: 'row' }}>
                            <CardLogin style={{ flex: 1 }}
                                image={imgStudent}
                                nameCard="Học sinh"
                                contentCard="Cải thiện kỹ năng viết bài và nhận điểm số từ ScoreMyEssay!"
                                linkSignUp="/RegisterforStudent">
                            </CardLogin>
                            <CardLogin style={{ flex: 1 }}
                                image={imgTeacher}
                                nameCard="Giáo viên"
                                contentCard="Trở thành người đóng góp cho sự phát triễn của ScoreMyEssay!"
                                linkSignUp="/RegisterforTeacher">
                            </CardLogin>
                        </CardDeck>
                    </div>
                </div>  
                <section id="discover">
                <div >
                    <div className="container" style={{ marginTop: 100}}>
                        <div className="row justify-content-center">
                            <div className="col-lg-8 text-center">
                                <h2 className="row-title" style={{ color: '#2596be', fontWeight: 600 }}>Score My Essay là gì ? </h2>
                                <hr className="divider my-4" />
                                <h5 className=" mb-5" style={{ lineHeight: 2 }}>Hệ thống hướng đến những học viên có mong muốn cải thiện, phát triển các kỹ năng Writing và Speaking để chinh phục cho các kỳ thi Tiếng Anh như Ielts, TOEFL, bằng cách tạo ra môi trường kết nối online giữa học viên và các chuyên gia, giảng viên Tiếng Anh có kinh nghiệm trong lĩnh vực. Thông qua hệ thống học viên sẽ được các chuyên gia đánh giá, góp ý và cho điểm theo tiêu chuẩn của từng kỳ thi.</h5>
                            </div>
                        </div>

                    </div>
                </div>
                </section>
                <div style={{ marginTop: 80 }}>
                    <WhyBox />
                </div>
                <div style={{ marginTop: 90 }}>
                    <IntroVideo />
                </div>
                <div style={{ marginTop: 90 }} id="aboutus">
                    <Team />
                </div>
            </div>
            <div style={{ backgroundColor: "#e6f9ff" }}>
            </div>
            <div>
            </div>
            <Footer />
        </React.Fragment>

    );
}
export default withRouter(HomePage);