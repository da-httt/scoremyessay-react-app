import './Teacher.css';
import React  from 'react';
import {Card, Button} from 'reactstrap';
import GlobalHeader from './GlobalHeaderComponent';
import { Breadcrumb } from 'antd';
import titleImg from '../../img/title.png';
const DetailReq = (props) =>{

    return (
        <>         
            <GlobalHeader username="Teacher"/>
            <div className="container-fluid detailPage"  >
            <div className="row" >
                <div className="container-fluid centerCol ">
                    <div className="row bg-row margin padding " >
                        <Breadcrumb  className="mt-1" style={{fontSize: "large"}}>
                            <Breadcrumb.Item>
                            <a href="/Home">Trang chủ</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item >
                            <a href="/HomeTeacherPage">Quản lý bài viết</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item >Nhận chấm bài mới</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="row bg-row padding" >
                        <br/>
                        <h3 className="mt-auto mb-auto"> Tên của bài viết để ở đây</h3>
                    </div>
                    <div className="bg">
                        <div className="row bg-row margin padding">
                        <div className="container-fluid mt-2" style={{fontSize: "medium", textAlign:"justify"}}>
                <div className="row ">
                    <div className="ml-auto mr-3">Người viết:<a href="#/"> CELED MAR</a></div>
                </div>
                <hr />
                <div className="row ">
                <div className="col-7">
                    <strong>Đề bài</strong>
                    <p style={{marginTop:'10px'}}>
                    The table below shows the percentage of main types of dwelling in Victoria, the Northern Territory and Tasmania.
                     Summarize the information by selecting and reporting the main features and make comparison where relevant.
                    </p>
                    <img src={titleImg} width="100%" alt="titleImage"></img>
                    <br/>
                    <strong >Nội dung bài viết</strong>
                    <p style={{marginTop:'10px'}}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type 
                    specimen book. 
                    
                    It has survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged. It was popularised 
                    in the 1960s with the release of Letraset sheets containing Lorem Ipsum 
                    passages, and more recently with desktop publishing software like Aldus 
                    PageMaker including versions of Lorem Ipsum.

                    It has survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged. It was popularised 
                    in the 1960s with the release of Letraset sheets containing Lorem Ipsum 
                    passages, and more recently with desktop publishing software like Aldus 
                    PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>
                <div className="col-5">
                    <div className="ml-auto">
                        <Button outline color="primary" block style={{padding:'0px 20px'}}>Nhận chấm</Button>
                    </div>
                    <Card style={{ minHeight: '250px', padding: "10px 30px ", marginTop:'5px'}}>
                        <strong>YÊU CẦU BÀI</strong> 
                        <div className="ml-auto" style={{color:'grey', marginBottom:'5px'}}>Cập nhật lúc: 12/4/2021</div>
                        <Card style={{ minHeight: '220px', marginTop:'5px'}}>
                            <div className="container">
                                <div className="row" style={{marginBottom:'20px'}}>
                                    <div className="col col-7">Chấm điểm và sửa lỗi  :</div>
                                    <div className="col" style={{textAlign:'right'}}>50,000 VNĐ</div>
                                </div>
                                <div className="row" style={{marginBottom:'20px'}}>
                                    <div className="col col-7">Ielts writing task 2  : </div>
                                    <div className="col " style={{textAlign:'right'}}>50,000 VNĐ</div>
                                </div>
                                <div className="row" style={{marginBottom:'20px'}}>
                                    <div className="col col-7">Thời gian chấm (12h): </div>
                                    <div className="col " style={{textAlign:'right'}}>100,000 VNĐ</div>
                                </div>
                                <hr/>
                                <div className="row" style={{marginBottom:'20px'}}>
                                    <strong className="ml-auto mr-3">Tổng tiền: 200,000 VNĐ</strong>
                                </div>
                                
                            </div>
                        </Card>
                    </Card>
                </div>
                </div>
            </div>
                        </div>
                    </div>
                    
                
                    
                    
                        
                   
                </div>
            </div>
            </div>    
    
        </>
    );
    }

export default DetailReq;