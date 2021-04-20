import './Student.css';
import { React, useState} from 'react';
import {  Button,  Table, Input, Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import GlobalHeader from './GlobalHeaderComponent';
import { Breadcrumb, Tabs } from 'antd';

const {TabPane} =Tabs;

const TabComponent=(props)=>{
    const {statusWriting} =props;
    const [status, setStatus] = useState(true);
    return(
        <Tabs defaultActiveKey="1">
            <TabPane tab="Điểm số và đánh giá" disable={status} key="1">
            Tab 1
            </TabPane>
            <TabPane tab="Sửa lỗi" disable={status} key="2">
            Tab 2
            </TabPane>
            <TabPane tab="Phản hồi" disable={status} key="3">
            Tab 3
            </TabPane>
        </Tabs>
    );
}

const DetailWriting = (props) =>{
    return (
        <div style={{height: window.innerHeight + 'px'}} >         
            <GlobalHeader username="Canh Ngo"/>
            <div className="container-fluid detailPage"  >
            <div className="row">
                <div className="container-fluid centerCol ">
                    <div className="row bg-row margin padding " >
                        <Breadcrumb  className="mt-1" style={{fontSize: "large"}}>
                            <Breadcrumb.Item>
                            <a href="/Home">Trang chủ</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item >
                            <a href="/HomeStudentPage">Quản lý bài viết</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item >Xem bài viết</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="row bg-row padding" >
                        <br/>
                        <Button color="primary" style={{margin:'0px 10px '}}>Quay lại</Button>
                        <h3 className="mt-auto mb-auto"> Tên của bài viết để ở đây</h3>
                    </div>
                    <div className="bg">
                        <div className="row bg-row margin padding">
                            <TabComponent statusWriting={1}/>
                        </div>
                    </div>
                    
                
                    
                    
                        
                   
                </div>
            </div>
            </div>    
    
        </div>
    );
    }

export default DetailWriting;