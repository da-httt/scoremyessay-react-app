import React from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';
import infoSys from '../img/infoSys1.jpg';
import pmd from "../img/pmd.jpg";
import ntc from "../img/ntc1.jpg";
import tdn from "../img/tdn.png";
import Header from './HomePage/HeaderComponent';
import Footer from './HomePage/FooterComponent';

const CardMember = (props) =>{
    const {
        image,
        nameCard,
        msv,
        mission,
      } = props;
    return(
        <Card  className="card">
            <CardImg top width="100%" src={image} alt={nameCard}></CardImg>
            <CardBody>
                <CardTitle tag="h5" >{nameCard}</CardTitle>
                <CardText className="card-text"> 
                {msv}<br/>
                {mission}
                </CardText>
            </CardBody>
        </Card>
    );
}
const AboutUs = (props) =>{
    return(
        <React.Fragment>
            <Header/>
            <div className="container content">
                <div className="row ">
                    <h3 className="row-title mr-auto ml-auto">THÔNG TIN VỀ DỰ ÁN</h3>
                </div>
                <div className="row mt-2 mb-4">
                    <div className="col-0 col-md-6">
                        <img src={infoSys} alt="Infomation System" width="100%"></img>
                    </div>
                    <div className="col-12 col-md-6 ">
                        <h4 >Đồ án chuyên ngành hệ thống thông tin</h4>
                        <p className="textContent">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        
                        </p>
                    </div>
                </div>
                <hr/>
                <div className="row mt-1">
                    <h3 className="row-title mr-auto ml-auto">THÀNH VIÊN</h3>
                </div>
                <div className="row mt-2">
                    <div className="col-12 col-md-4">
                        <CardMember image={pmd} nameCard="PHẠM MẠNH DŨNG" msv="102170149" mission="Backend Developer"/>
                    </div>
                    <div className="col-12 col-md-4">
                        <CardMember image={ntc} nameCard="NGÔ THỊ CẢNH" msv="102170006" mission="Frontend Developer" />
                    </div>
                    <div className="col-12 col-md-4">
                        <CardMember image={tdn}nameCard="TRẦN ĐÌNH NAM" msv="102170172" mission="Mobile Developer" />
                    </div>
                </div>
            </div>
            <Footer/>
        </React.Fragment>
    );

}
export default AboutUs;