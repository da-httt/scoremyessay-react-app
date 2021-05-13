import './Student.css';
import React, { useEffect, useState }  from 'react';
import {  Button,   Card, Input} from 'reactstrap';
import GlobalHeader from './GlobalHeaderComponent';
import { Breadcrumb, Table, Tabs } from 'antd';
import { getBaseURL, getToken, getTokenType } from '../../Utils/Common';

const {TabPane} =Tabs;

const api= getBaseURL();

const DetailWriting = (props) =>{
    const url = window.location.href.split('=');
    const orderID=Number(url[1]);

    const [statusWriting, setStatusWriting] = useState();
    const [current, setCurrent] = React.useState(0);

    const [title,setTitle] = useState();
    const [titleS,setTitleS] = useState();
    const [content,setContent] = useState();
    const [grade,setGrade] = useState();
    const [gradeComment,setGradeComment] = useState();
    const [review, setReview] = useState();
    const [commentGeneral, setCommentGeneral] = useState();
    const [isCriteria, setIsCriteria] = useState();
    const [criteriaResults, setCriteriaResults] = useState([]);
    const [extraResults, setExtraResults] =useState([]); 

    const [sentences, setSentences] = useState([]);
    const [teacher, setTeacher] = useState();
    const [topic, setTopic] = useState();
    const [spelling, setSpelling] = useState([]);
    const [numSentence, setNumSentence] =useState();
    const [numErrors, setNumErrors] = useState();
    const [average, setAverage] =useState();
    

    const next = () => {
        setCurrent(current + 1);
    };
    
    const prev = () => {
        setCurrent(current - 1);
    };

    useEffect( () => {
        async function fetchData() {

            await api.get('/orders/'+orderID,{
                headers: {Authorization: getTokenType() + ' ' + getToken()}
            }).then(response => {
                setStatusWriting(response.data.status_id); 
                setTitle(response.data.essay.title);
                setContent(response.data.essay.content);
                setTitleS(response.data.essay.title.slice(0,65));
                if(response.data.status_id!==1){
                api.get('/users/'+response.data.teacher_id,{
                    headers: {Authorization: getTokenType() + ' ' + getToken()}
                }).then(response => {
                    setTeacher(response.data.name);
                }) 
            }
                
            }) 
            await api.get('/spelling_errors/'+orderID,{
                headers: {Authorization: getTokenType() + ' ' + getToken()}
            }).then(response => {
                setTopic(response.data.predicted_topic);
                setSpelling(response.data.spelling_errors);
                setNumSentence(response.data.number_of_sentences);
                setAverage(response.data.average_sentence_length);
                setNumErrors(response.data.num_errors);
            }) 

            await statusWriting===3 && api.get('/results/'+orderID,{
                headers: {Authorization: getTokenType() + ' ' + getToken()}
            }).then(response => {
                const data=response.data;
                setIsCriteria(data.isCriteria);
                setGrade(data.grade);
                setGradeComment(data.grade_comment);
                setReview(data.review);
                setCommentGeneral(data.comment);
                if(data.criteria_results!==null)
                    setCriteriaResults(data.criteria_results);
                if(data.extra_results!==null)
                    setExtraResults(data.extra_results);
            }) 

            await statusWriting===3 && api.get('/essay_comments/'+orderID,{
                headers: {Authorization: getTokenType() + ' ' + getToken()}
            }).then(response => {
                const data=response.data;
                setSentences(data.essay_comments);
                
            });   


        }
        fetchData();
        
    },[orderID,statusWriting]);
    console.log(spelling);

    const  columns = [
        {
            title: 'Vị trí câu',
            dataIndex: 'sentence_index',
            key: 'sentence_index',
            width: 100,
        },
        
          {
            title: 'Câu sai',
            dataIndex: 'sentence',
            key: 'sentence',
            width: 520,
            
          },
          {
            title: 'Từ sai',
            dataIndex:  'word',
            key:'word',
            width: 180,
           
          },
          
          {
            title: 'Gợi ý sửa',
            dataIndex: 'suggested_word',
            key: 'suggested_word',
            width: 180,
           
          },
          
    ];
    const criteriaResultsUI = criteriaResults.map((cri)=>(
        <p>{cri.criteria_name}     : {cri.criteria_score}</p>
    ));

    const sentenceList = sentences.map((sentence) =>(
        <>
        {current === sentence.sentence_index &&
        (
            <>
        <div style={{marginBottom: "10px"}}>
            {current===0 &&(
                <>
                <Button outline disabled>
                Câu trước đó
                </Button>
                <Button outline onClick={() => next()} style={{margin:'0px 0px 0px 138px'}} disabled={sentences.length-1===0?true:false}>
                Câu tiếp theo
                </Button>
                </>
                )}
            {current < sentences.length - 1&& current >0 &&(
                <>
                <Button outline onClick={() => prev()}>
                Câu trước đó
                </Button>
                <Button outline onClick={() => next()} style={{margin:'0px 0px 0px 138px'}}>
                Câu tiếp theo
                </Button>
                </>
                )}
            {current === sentences.length - 1 && current!==0 &&(
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

        <Card style={{ padding: "10px 10px", backgroundColor:'sky', height:'505px'}} >
        <div key={sentence.sentence_index}>
        <strong>
            #{sentence.sentence_index}: {sentence.sentence}
        </strong>
        <br/>
        <Input type="textarea" rows="12" name="fix" id={sentence.sentence_index} style={{backgroundColor:'white'}}
        value={sentence.comment} disabled
        ></Input> 
        </div>
            
        </Card>
        </>
            
        )}
        </>
        ))

    const extraResultsUI = extraResults.map((extra,index)=>(
        <>
        <strong>{extra.option_name}</strong>
        <Input type="textarea" id="generalComment" rows={7} 
        defaultValue={extra.content}
        onChange={e => extraResults[index].content=e.target.value}
        ></Input>
        </>
    ));
    
    const nameOfTeacher=<>Người chấm: <Button color="link">{teacher}</Button></>;
    return (
        <>         
            <GlobalHeader/>
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
                        <h3 className="mt-auto mb-auto"> #{orderID} {titleS}...</h3>
                    </div>
                    <div className="bg">
                        <div className="row bg-row margin padding">
                        <div className="container-fluid">
        { statusWriting === 3 &&(
            <Tabs defaultActiveKey="1" tabBarExtraContent={nameOfTeacher}>
            <TabPane tab="Điểm số và đánh giá"  key="1">
            <div className="container-fluid mt-2" style={{fontSize: "medium", textAlign:"justify"}}>
                <div className="row ">
                <div className="col-7">
                    <strong>Đánh Giá</strong>
                    <Input style={{textAlign:'justify',backgroundColor:'white'}}type="textarea" name="title" id="title" disabled rows='4' defaultValue={review} />
                    <br/>
                    <strong>Nhận xét</strong>
                    <Input style={{textAlign:'justify',marginBottom:'20px',backgroundColor:'white'}}type="textarea" name="title" id="title" disabled rows='4' defaultValue={commentGeneral} />
                    {extraResultsUI}
                </div>
                <div className="col-5">
                    <Card style={{ minHeight: '150px', padding: "10px 30px "}}>
                        <strong>Điểm số</strong>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-5" style={{color:"green", paddingTop:"0px", fontSize:"75px"}}>{grade}</div>
                                <div className="col-7" >
                                    <p>{gradeComment}</p> 
                                </div>
                            </div>
                        </div>
                        {isCriteria=== true && <strong>Điểm thành phần</strong> }
                        {criteriaResultsUI}
                        
                    </Card>
                </div>
                </div>
            </div>
            </TabPane>
            <TabPane tab="Sửa lỗi tự động" key="2">
            <div className="container-fluid mt-2" style={{fontSize: "medium", textAlign:"justify"}}>
                <div className="row ">
                    <div className="col-3">
                    <strong>Chủ đề: </strong>
                    <p>{topic}</p>
                    </div>
                    <div className="col-2">
                    <strong>Tổng số câu:</strong>
                    <p> {numSentence}</p>
                    </div>
                    <div className="col-5">
                    <strong>      Chiều dài trung bình mỗi câu:</strong>
                    <p>     {average}</p>
                    </div>
                    <div className="col-2">
                    <strong>     Tổng số lỗi:</strong>
                    <p>  {numErrors}</p>
                    </div>
                </div>
                
                    <Table 
                            columns={columns} 
                            dataSource={spelling} 
                            pagination={{pageSize:8}} 
                    />
                    </div>
                    
                
            </TabPane>
            
            <TabPane tab="Sửa lỗi"  key="3">
            <div className="container-fluid mt-2" style={{fontSize: "medium", textAlign:"justify"}}>
                <div className="row ">
                <div className="col-7">
                    <strong>Đề bài</strong>
                    <Input style={{fontSize:'20px', marginTop:'8px',textAlign:'justify',backgroundColor:'white'}} type="textarea" name="title" id="title" disabled rows='4' defaultValue={title} />
                                        
                    <br/>
                    <strong>Nôi dung bài viết</strong>
                    <Input style={{textAlign:'justify',backgroundColor:'white'}}type="textarea" name="title" id="title" disabled rows='14' defaultValue={content} />
                </div>
                <div className="col-5">
                    {sentenceList}
                </div>
                </div>
            </div>
            </TabPane>
            <TabPane tab="Phản hồi" key="4">
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
            <TabPane tab="Sửa lỗi tự động" key="2">
            <div className="container-fluid mt-2" style={{fontSize: "medium", textAlign:"justify"}}>
                <div className="row ">
                    <div className="col-3">
                    <strong>Chủ đề: </strong>
                    <p>{topic}</p>
                    </div>
                    <div className="col-2">
                    <strong>Tổng số câu:</strong>
                    <p> {numSentence}</p>
                    </div>
                    <div className="col-5">
                    <strong>      Chiều dài trung bình mỗi câu:</strong>
                    <p>     {average}</p>
                    </div>
                    <div className="col-2">
                    <strong>     Tổng số lỗi:</strong>
                    <p>  {numErrors}</p>
                    </div>
                </div>
                
                    <Table 
                            columns={columns} 
                            dataSource={spelling} 
                            pagination={{pageSize:8}} 
                    />
                    </div>
                    
                
            </TabPane>
            
            <TabPane tab="Sửa lỗi" disabled key="3"/>
            <TabPane tab="Phản hồi" disabled key="4"/>
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
            <TabPane tab="Sửa lỗi tự động" key="2">
            <div className="container-fluid mt-2" style={{fontSize: "medium", textAlign:"justify"}}>
                <div className="row ">
                    <div className="col-3">
                    <strong>Chủ đề: </strong>
                    <p>{topic}</p>
                    </div>
                    <div className="col-2">
                    <strong>Tổng số câu:</strong>
                    <p> {numSentence}</p>
                    </div>
                    <div className="col-5">
                    <strong>      Chiều dài trung bình mỗi câu:</strong>
                    <p>     {average}</p>
                    </div>
                    <div className="col-2">
                    <strong>     Tổng số lỗi:</strong>
                    <p>  {numErrors}</p>
                    </div>
                </div>
                
                    <Table 
                            columns={columns} 
                            dataSource={spelling} 
                            pagination={{pageSize:8}} 
                    />
                    </div>
                </TabPane>
            <TabPane tab="Sửa lỗi" disabled key="3"/>
            <TabPane tab="Phản hồi" disabled key="4"/>
        </Tabs>
        ) }
        
        
        </div>
        
                        </div>
                    </div>
                    
                
                    
                    
                        
                   
                </div>
            </div>
            </div>    
    
        </>
    );
    }

export default DetailWriting;