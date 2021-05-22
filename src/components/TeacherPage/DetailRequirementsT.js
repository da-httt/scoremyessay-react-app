import './Teacher.css';
import React, { useEffect, useState }  from 'react';
import {Card, Button, Alert, Input} from 'reactstrap';
import GlobalHeader from './GlobalHeaderComponentT';
import ProfileStudent from '../ModalProfile/ProfileStudent';
import { Breadcrumb } from 'antd';
import { withRouter } from 'react-router-dom';
import { getBaseURL, getToken, getTokenType } from '../../Utils/Common';

const api = getBaseURL();
const DetailReq = (props) =>{
    const url = window.location.href.split('=');
    const orderID=Number(url[1]);

    const [show, setShow] = useState(false);
    const [error, setError] = useState(null);
    const [colorAlert, setColorAlert] = useState("warning");
    const [loading, setLoading] =useState(false);
    const [teacherID, setTeacherID] = useState();

    const [title, setTitle] = useState();
    const [titleSub, setTitleSub] = useState();
    const [base64Image, setBase64Image] = useState("");
    const [content, setContent] = useState();
    const [level, setLevel] = useState(0);
    const [type, setType] = useState(0);
    const [optionsTotal, setOptionsTotal] = useState([]);

    const [student, setStudent] = useState(" Không xác định");
    const [studentID, setStudentID] = useState();
    const [sentDate, setSentdate] = useState();
    const [totalPrice, setTotalPrice] = useState("0 VNĐ");

    const [options,setOptions] = useState([]);
    const [types,setTypes] = useState([]);

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    function handleChange(newValue){
        setModal(newValue);
    }

    useEffect( () => {
        async function fetchData() {
            await api.get('/orders/waiting/'+orderID,{
                headers: {Authorization: 'Bearer ' + getToken()}
              }
              ).then(response => {
                  setStudentID(response.data.student_id);
                  api.get('/users/'+response.data.student_id,{
                    headers: {Authorization: getTokenType() + ' ' + getToken()}
                    }).then(response => {
                    setStudent(response.data.name);
                }) 
                  setSentdate(response.data.sent_date);
                  setTotalPrice(response.data.total_price+ " VNĐ");
                  const essay= response.data.essay;
                  const options = response.data.option_list;
                  setOptionsTotal(options);
                  setTitle(essay.title);
                  setTitleSub(essay.title.slice(0,50));
                  setContent(essay.content);
                  setType(essay.type_id);
                  if(essay.type_id===0){
                      setLevel(0);
                  }
                  else{
                      setLevel(1);
                  }
                
            })
            
            api.get('/orders/image/'+orderID,{
                headers: {Authorization: 'Bearer ' + getToken()}
              }).then(response =>{
                setBase64Image(response.data.image_base64);
            })

            await api.get('/options',
              ).then(response => {
                  setOptions(response.data.data);
            })

            await api.get('/types',
              ).then(response => {
                  setTypes(response.data.data);
            })


            
          await api.get('/users/me',{
            headers: {Authorization: 'Bearer ' + getToken()}
          }
          ).then(response => {
              setTeacherID(response.data.info.user_id);
          })
         
        
         
        }
        fetchData();
        
    },[orderID]);
    function showType(id) {
        return types.map((type) => (
          type.type_id ==id &&(
            <div className="row" style={{marginBottom:'20px'}}>
            <div className="col col-7">{type.type_name}:</div>
            <div className="col" style={{textAlign:'right'}}>{type.type_price} VNĐ</div>
          </div>
          )
        ))
      }
    const showOptions= optionsTotal.map((id)=>{
        return options.map((option) => (
            option.option_id ===id &&(
              <div className="row" style={{marginBottom:'20px'}}>
              <div className="col col-7">{option.option_name}:</div>
              <div className="col" style={{textAlign:'right'}}>{option.option_price} VNĐ</div>
            </div>
            )
          ))
        } )


    const handleReceive = (e) =>{
        setLoading(true);
        api.put('/orders/assign/'+orderID+'?teacher_id='+teacherID,{},{
            headers: {Authorization: 'Bearer ' + getToken()}
          }
          ).then(response => {
            setLoading(false);
            alert("Bài viết của bạn đã được lưu về chấm!");
            props.history.push("/HomeTeacherPage");
          }).catch((error) => {
            if(error.response){
                setLoading(false);
                if(error.response.status === 401 || error.response.status === 400){
                    setShow(true);
                    setColorAlert("danger");
                    setError(error.response.data.detail);
                }
                else{
                    setShow(true);
                    setColorAlert("danger");
                    setError("Something went wrong. Please try again later!");
                }
                
            } 
        })

    }
    
    return (
        <>         
            <GlobalHeader />
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
                            <Breadcrumb.Item>
                            <a href="/HomeTeacherPage/AddNewWriting">Danh sách bài viết mới</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item >Nhận chấm bài mới</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="row bg-row padding" >
                        <br/>
                        <h3 className="mt-auto mb-auto"> #{orderID} {titleSub}...</h3>
                    </div>
                    <div className="bg">
                        <div className="row bg-row margin padding">
                        <div className="container-fluid mt-2" style={{fontSize: "medium", textAlign:"justify"}}>
                <div className="row ">
                    <div className="ml-auto mr-3">Người viết: <Button color="link" onClick={toggle}>{student}</Button></div>
                    <ProfileStudent modal={modal} id={studentID} onClick={handleChange} />
                </div>
                <hr />
                <div className="row ">
                    {error && <Alert color={colorAlert} isOpen={show} style={{marginTop:'10px'}}>{error}</Alert>}
                </div>
                <div className="row ">
                <div className="col-7">
                    <strong>Đề bài</strong>
                    <Input  style={{fontSize:'20px', textAlign:'justify'}} type="textarea" name="title" id="title" disabled rows='4' defaultValue={title} />
                    {base64Image && <img src={`data:image/jpeg;base64,${base64Image}`} width="563px"  alt="Title or Content"></img>}<br/>
                    <strong >Nội dung bài viết</strong>
                    <Input  style={{marginTop:'10px', textAlign:'justify'}} type="textarea" name="title" id="title" disabled rows='10'
                                        defaultValue={content} />
                    
                </div>
                <div className="col-5">
                    <div className="ml-auto">
                        <Button outline color="primary" block style={{padding:'0px 20px'}} 
                        onClick={handleReceive}
                        >
                            {loading? "Đang xử lý...": "Nhận chấm"}
                            </Button>
                    </div>
                    <Card style={{ minHeight: '250px', padding: "10px 30px ", marginTop:'5px'}}>
                        <strong>YÊU CẦU BÀI</strong> 
                        <div className="ml-auto" style={{color:'grey', marginBottom:'5px'}}>Cập nhật lúc: {sentDate}</div>
                        <Card style={{ minHeight: '220px', marginTop:'5px'}}>
                            <div className="container">
                                {showType(type)}
                                {showOptions}
                                <hr/>
                                <div className="row" style={{marginBottom:'20px'}}>
                                    <strong className="ml-auto mr-3">Tổng tiền: {totalPrice}</strong>
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

export default withRouter(DetailReq);