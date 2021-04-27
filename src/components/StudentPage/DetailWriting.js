import './Student.css';
import React  from 'react';
import {  Button,   Card} from 'reactstrap';
import GlobalHeader from './GlobalHeaderComponent';
import { Breadcrumb, Tabs } from 'antd';

const {TabPane} =Tabs;

const sentenceList = [
    {
        id: 1,
        content: 'Câu 1 Lorem Ipsum is simply dummy text of the printing and typesetting industry 1',
        comment: "1There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form,There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour:Lorem -- Ipsumor randomised words which don't look even slightly believable.If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful There are many variations of passages of Lorem Ipsum available"
    },
    {
        id: 2,
        content: 'Overaill It isLorem Ipsum is simply dummy text of the printing and typesetting industry 2',
        comment: "2There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour:Lorem -- Ipsumor randomised words which don't look even slightly believable.If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful There are many variations of passages of Lorem Ipsum available"
    },
    {
        id: 3,
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry 3',
        comment: "3There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour:Lorem -- Ipsumor randomised words which don't look even slightly believable.If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful There are many variations of passages of Lorem Ipsum available"
    },
    {
        id: 4,
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry 4',
        comment: "4There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour:Lorem -- Ipsumor randomised words which don't look even slightly believable.If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful There are many variations of passages of Lorem Ipsum available"
    },
]


const TabComponent=(props)=>{
    const {statusWriting} =props;
    
    const [current, setCurrent] = React.useState(0);

    const next = () => {
        setCurrent(current + 1);
    };
    
    const prev = () => {
        setCurrent(current - 1);
    };

    const nameOfTeacher=<>Người chấm: <Button color="link">CELED MAR</Button></>;
    
    return(
        //Khi bài chưa chấm-1 đang chờ chấm -2 chấm rồi -3 
        <div className="container-fluid">
        { statusWriting === 3 &&(
            <Tabs defaultActiveKey="1" tabBarExtraContent={nameOfTeacher}>
            <TabPane tab="Điểm số và đánh giá"  key="1">
            <div className="container-fluid mt-2" style={{fontSize: "medium", textAlign:"justify"}}>
                <div className="row ">
                <div className="col-7">
                    <strong>Đánh Giá</strong>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type 
                    specimen book. 
                    </p>
                    <br/>
                    <strong>Nhận xét</strong>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type 
                    specimen book. 
                    
                    It has survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged. It was popularised 
                    in the 1960s with the release of Letraset sheets containing Lorem Ipsum 
                    passages, and more recently with desktop publishing software like Aldus 
                    PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>
                <div className="col-5">
                    <Card style={{ minHeight: '150px', padding: "10px 30px "}}>
                        <strong>Điểm số</strong>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-5" style={{color:"green", paddingTop:"0px", fontSize:"75px"}}>7.5</div>
                                <div className="col-7" >
                                    <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    </p> 
                                </div>
                            </div>
                        </div>
                        
                        <strong>Điểm thành phần</strong>
                        <p>Grammar     : 8.0</p>
                        <p>Vocabulary  : 8.0</p>
                        <p>Coherence   : 8.0</p>
                        <p>4th Criteria: 8.0</p>
                        
                    </Card>
                </div>
                </div>
            </div>
            </TabPane>
            <TabPane tab="Sửa lỗi"  key="2">
            <div className="container-fluid mt-2" style={{fontSize: "medium", textAlign:"justify"}}>
                <div className="row ">
                <div className="col-7">
                    <strong>Đề bài</strong>
                    <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type 
                    specimen book. </p>
                    
                    <br/>
                    <strong>Nôi dung bài viết</strong>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
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
                    <div style={{marginBottom: "10px"}}>
                        {current===0 &&(
                            <>
                            <Button outline disabled>
                            Câu trước đó
                            </Button>
                            <Button outline onClick={() => next()} style={{margin:'0px 0px 0px 138px'}}>
                            Câu tiếp theo
                            </Button>
                            </>
                            )}
                        {current < sentenceList.length - 1&& current >0 &&(
                            <>
                            <Button outline onClick={() => prev()}>
                            Câu trước đó
                            </Button>
                            <Button outline onClick={() => next()} style={{margin:'0px 0px 0px 138px'}}>
                            Câu tiếp theo
                            </Button>
                            </>
                            )}
                        {current === sentenceList.length - 1 &&(
                            <>
                            <Button outline onClick={() => prev()}>
                            Câu trước đó
                            </Button>
                            <Button outline disabled style={{margin:'0px 0px 0px 138px'}}>
                            Câu tiếp theo
                            </Button>
                            </>
                            )}
                        
                    </div>

                    <Card style={{ minHeight: '450px'}} >
                        <strong style={{ padding: "10px 10px"}} >
                                #{sentenceList.id}: {sentenceList[current].content}
                        </strong>
                            
                        <p  class=" force-overflow scrollbar" id="style-default">
                            {sentenceList[current].comment}
                        </p> 
                    </Card>
                </div>
                </div>
            </div>
            </TabPane>
            <TabPane tab="Phản hồi" key="3">
            Tab 3
            </TabPane>
            </Tabs>
        ) }
        { statusWriting === 2 &&(
            <Tabs defaultActiveKey="1" tabBarExtraContent={nameOfTeacher}>
            <TabPane tab="Điểm số và đánh giá"  key="1">
            <div className="container-fluid mt-2" style={{fontSize: "medium"}}>
                <div className="row ">
                <div className="col-7">
                    <strong>Đánh Giá</strong>
                    <p>Bài viết đang chấm</p>
                    <br/>
                    <br/>
                    <strong>Nhận xét</strong>
                    <p>Bài viết đang chấm</p>
                </div>
                <div className="col-5">
                    <Card style={{ minHeight: '150px', padding: "30px 10px "}}>
                        <strong>Điểm số</strong>
                        <p>Bài viết đang chấm</p>
                    </Card>
                </div>
                </div>
            </div>
            </TabPane>
            <TabPane tab="Sửa lỗi"  disabled key="2"/>

            <TabPane tab="Phản hồi" disabled key="3"/>
        </Tabs>
        ) }
        { statusWriting === 1 &&(
            <Tabs defaultActiveKey="1">
            <TabPane tab="Điểm số và đánh giá"  key="1">
            <div className="container-fluid mt-2" style={{fontSize: "medium"}}>
                <div className="row ">
                <div className="col-7">
                    <strong>Đánh Giá</strong>
                    <p>Bài viết chưa chấm</p>
                    <br/>
                    <br/>
                    <strong>Nhận xét</strong>
                    <p>Bài viết chưa chấm</p>
                </div>
                <div className="col-5">
                    <Card style={{ minHeight: '150px', padding: "30px 10px "}}>
                        <strong>Điểm số</strong>
                        <p>Bài viết chưa chấm</p>
                    </Card>
                </div>
                </div>
            </div>
    
            </TabPane>
            <TabPane tab="Sửa lỗi" disabled key="2"/>
            <TabPane tab="Phản hồi" disabled key="3"/>
        </Tabs>
        ) }
        
        
        </div>
        
        
    );
}

const DetailWriting = (props) =>{
    //const {
      //  statusEssay,
    //}=props;

    return (
        <>         
            <GlobalHeader username="Canh Ngo"/>
            <div className="container-fluid detailPage"  >
            <div className="row" style={{height: window.innerHeight + 'px'}} >
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
                        <h3 className="mt-auto mb-auto"> Tên của bài viết để ở đây</h3>
                    </div>
                    <div className="bg">
                        <div className="row bg-row margin padding">
                            <TabComponent statusWriting={3}/>
                        </div>
                    </div>
                    
                
                    
                    
                        
                   
                </div>
            </div>
            </div>    
    
        </>
    );
    }

export default DetailWriting;