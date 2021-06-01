import './Student.css';
import { React, } from 'react';
import { Breadcrumb } from 'antd';
import GlobalHeader from './GlobalHeaderComponent';
import Stepp from './Step';
import { withRouter } from 'react-router-dom';


const AddNewWriting = (props) => {
    const url = window.location.href.split('=');
    const orderID = Number(url[1]);
    return (
        <div className="student-page" style={{marginBottom: "50px"}}>
            <GlobalHeader username="Canh Ngo" />
                <div className="row">
                    <div className="container-fluid centerCol ">
                        <div className=" padding gradient-background-student">
                            <div className="row bg-row margin padding "  >
                                <Breadcrumb className="mt-1" style={{ fontSize: "large", color:"white" }}>
                                    <Breadcrumb.Item>
                                        <a  href="/Home">Trang chủ</a>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item >
                                        <a   href="/HomeStudentPage">Quản lý bài viết</a>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item  style={{color:"white" }} >Thêm bài viết</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <div className="row bg-row padding" >
                                <br />
                                <h3  style={{color:"white", fontWeight:"700"}}>THÊM BÀI VIẾT MỚI</h3>
                            </div>
                        </div>
                        <Stepp orderID={orderID} />
                    </div>
                </div>

        </div>


    );
}

export default withRouter(AddNewWriting);


