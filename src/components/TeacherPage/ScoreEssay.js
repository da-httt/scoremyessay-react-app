import './Teacher.css';
import React  from 'react';
import {  Button,   Card, Col, FormGroup, Input, Label, Form} from 'reactstrap';
import GlobalHeader from './GlobalHeaderComponent';
import { Breadcrumb, Tabs } from 'antd';

const {TabPane} =Tabs;

const sentenceList = [
    {
        id: 1,
        content: 'Câu 1 Lorem Ipsum is simply dummy text of the printing and typesetting industry 1',
    },
    {
        id: 2,
        content: 'Overaill It isLorem Ipsum is simply dummy text of the printing and typesetting industry 2',
    },
    {
        id: 3,
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry 3',
    },
    {
        id: 4,
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry 4',
    },
]


const TabComponent=(props)=>{
    
    const [current, setCurrent] = React.useState(0);

    const next = () => {
        setCurrent(current + 1);
    };
    
    const prev = () => {
        setCurrent(current - 1);
    };

    const nameOfTeacher=<>Người viết: <Button color="link">CELED MAR</Button></>;
    
    return(
        <div className="container-fluid">
            <Tabs defaultActiveKey="1" tabBarExtraContent={nameOfTeacher}>
            <TabPane tab="Sửa lỗi"  key="1">
            <div className="container-fluid mt-2" style={{fontSize: "medium", textAlign:"justify"}}>
                <div className="row ">
                <div className="col-7">
                    <strong>Đề bài</strong>
                    <Button outline color="primary" style={{margin:'0px 10px 0px 310px', padding:'0px 5px'}}>Lưu lại</Button>
                    <Button outline color="primary" style={{padding:'0px 5px'}} > Kết thúc chấm</Button>
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
                            <Button outline disabled style={{padding:'0px 5px'}}>Câu trước đó</Button>
                            <Button outline style={{margin:'0px 55px 0px 55px', padding:'0px 5px'}}>Đặt lại</Button>
                            <Button outline style={{padding:'0px 5px'}} onClick={() => next()} >
                            Câu tiếp theo
                            </Button>
                            </>
                            )}
                        {current < sentenceList.length - 1&& current >0 &&(
                            <>
                            <Button outline style={{padding:'0px 5px'}} onClick={() => prev()} >Câu trước đó</Button>
                            <Button outline style={{margin:'0px 55px 0px 55px', padding:'0px 5px'}}>Đặt lại</Button>
                            <Button outline style={{padding:'0px 5px'}} onClick={() => next()} >
                            Câu tiếp theo
                            </Button>
                            </>
                            )}
                        {current === sentenceList.length - 1 &&(
                            <>
                            <Button outline style={{padding:'0px 5px'}} onClick={() => prev()}>Câu trước đó</Button>
                            <Button outline style={{margin:'0px 55px 0px 55px', padding:'0px 5px'}}>Đặt lại</Button>
                            <Button outline disabled style={{padding:'0px 5px'}}>
                            Câu tiếp theo
                            </Button>
                            </>
                            )}
                        
                    </div>

                    <Card style={{ padding: "10px 10px"}} id={sentenceList.id}>
                        <strong>
                                #{sentenceList.id}: {sentenceList[current].content}
                        </strong>
                        <br/>
                        <Input type="textarea" rows="12" name="fix" id={sentenceList.id} 
                        placeholder="Nhập lỗi cần chỉnh sửa và gợi ý câu mang tính học thuật hơn"
                        ></Input> 
                        <div className="ml-auto" style={{color:'grey', marginBottom:'5px'}}>Tên người chấm</div>       
                        <div className="ml-auto" style={{color:'grey', marginBottom:'5px'}}>Cập nhật lúc: 12/4/2021</div>
                    </Card>
                </div>
                </div>
            </div>
            </TabPane>
            
            <TabPane tab="Chấm điểm và đánh giá"  key="2">
            <div className="container-fluid mt-2" style={{fontSize: "medium", textAlign:"justify"}}>
                <div className="row ">
                <div className="col-7">
                    <strong >Đánh giá bài làm</strong>
                    <Input type="textarea" id="review" rows={4} alt="Nhập đánh giá chung cho bài viết"></Input>
                    <br/>
                    <strong>Nhận xét về bài làm</strong>
                    <Input type="textarea" id="generalComment" rows={4} alt="Nhập nhận xét chung cho bài viết"></Input>
                </div>
                <div className="col-5">
                <div className="mb-1">
                        <Button outline color="primary" style={{marginRight:'8px', padding:'0px 20px'}}>Đặt lại</Button>
                        <Button outline color="primary" style={{padding:'0px 20px'}}>Lưu lại</Button>
                        <Button outline color="primary" style={{marginLeft:'50px', padding:'0px 20px'}}>Kết thúc chấm</Button>
                    </div>
                    <Card style={{ padding: "10px 30px "}}>
                        <Form>
                            <FormGroup row>
                                <strong>Điểm số</strong><br />
                                <Input type="text" name="grade" id="grade" placeholder="Nhập điểm"/>    
                            </FormGroup> 
                            <FormGroup row>
                                <strong>Nhận xét về điểm</strong><br />
                                <Input type="textarea" rows='3' name="commentGrade" id="commentGrade" placeholder="Nhập Nhận xét"/>    
                            </FormGroup>  
                            <FormGroup row>
                                <strong>Điểm thành phần</strong><br />
                            </FormGroup>  
                            <FormGroup row>
                                <Label for="task" sm={8}>Task Achivement</Label>
                                <Col sm={4}>
                                <Input type="number" name="task" id="task" />
                                </Col>
                            </FormGroup>   
                            <FormGroup row>
                                <Label for="grammar" sm={8}>Grammartical Range</Label>
                                <Col sm={4}>
                                <Input type="number" name="grammar" id="grammar" />
                                </Col>
                            </FormGroup>   
                            <FormGroup row>
                                <Label for="vocabulary" sm={8}>Lexical Resource</Label>
                                <Col sm={4}>
                                <Input type="number" name="vocabulary" id="vocabulary" />
                                </Col>
                            </FormGroup>   
                            <FormGroup row>
                                <Label for="coherence" sm={8}>Coherence</Label>
                                <Col sm={4}>
                                <Input type="number" name="coherence" id="coherence" />
                                </Col>
                            </FormGroup> 
                            
                        </Form>
                        
                        
                    </Card>
                </div>
                </div>
            </div>
            </TabPane>
            
            </Tabs>
        </div>
        
        
    );
}

const ScoreEssay = (props) =>{

    return (
        <>         
            <GlobalHeader username="Teacher"/>
            <div className="container-fluid detailPage"  >
            <div className="row" style={{height: window.innerHeight + 'px'}} >
                <div className="container-fluid centerCol ">
                    <div className="row bg-row margin padding " >
                        <Breadcrumb  className="mt-1" style={{fontSize: "large"}}>
                            <Breadcrumb.Item>
                            <a href="/Home">Trang chủ</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item >
                            <a href="/HomeTeacherPage">Quản lý bài viết</a>
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
                            <TabComponent/>
                        </div>
                    </div>
                    
                
                    
                    
                        
                   
                </div>
            </div>
            </div>    
    
        </>
    );
    }

export default ScoreEssay;