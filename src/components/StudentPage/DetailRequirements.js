import './Student.css';
import React, { useEffect, useState }  from 'react';
import {Card, Input} from 'reactstrap';
import GlobalHeader from './GlobalHeaderComponent';
import { Breadcrumb } from 'antd';
import { withRouter } from 'react-router-dom';
import { getBaseURL, getToken } from '../../Utils/Common';

const api = getBaseURL();
const DetailRequirement = (props) =>{
    const url = window.location.href.split('=');
    const orderID=Number(url[1]);


    const [title, setTitle] = useState();
    const [titleSub, setTitleSub] = useState();
    const [base64Image, setBase64Image] = useState("");
    const [content, setContent] = useState();
    const [level, setLevel] = useState(0);
    const [type, setType] = useState(0);
    const [optionsTotal, setOptionsTotal] = useState([]);

    const [sentDate, setSentdate] = useState();
    const [totalPrice, setTotalPrice] = useState("0 VNĐ");

    const [options,setOptions] = useState();
    const [types,setTypes] = useState();

   
    useEffect( () => {
        async function fetchData() {
            api.get('/orders/'+orderID,{
                headers: {Authorization: 'Bearer ' + getToken()}
              }
              ).then(response => {
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

            api.get('/options',
              ).then(response => {
                  setOptions(response.data.data);
            })

            api.get('/types',
              ).then(response => {
                  setTypes(response.data.data);
            })

         
        
         
        }
        fetchData();
        
    },[orderID]);
    const ShowType= ()=>{
        return(
            <div className="row" style={{marginBottom:'20px'}}>
                <div className="col col-7">{types? types[type].type_name: ""}:</div>
                <div className="col" style={{textAlign:'right'}}>{types? types[type].type_price: 0} VNĐ</div>
            </div>
        );
    }
    const showOptions= optionsTotal.map((option)=>(
            <div className="row" style={{marginBottom:'20px'}}>
                <div className="col col-7">{options? options[option].option_name: ""}:</div>
                <div className="col" style={{textAlign:'right'}}>{options? options[option].option_price: ""} VNĐ</div>
            </div>
        
    )
    )


    
    
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
                            <a href="/HomeStudentPage">Quản lý bài viết</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item >Xem chi tiết bài viết</Breadcrumb.Item>
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
                </div>
                <hr />
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
                    <Card style={{ minHeight: '280px', padding: "10px 30px ", marginTop:'5px'}}>
                        <strong>YÊU CẦU BÀI</strong> 
                        <div className="ml-auto" style={{color:'grey', marginBottom:'5px'}}>Cập nhật lúc: {sentDate}</div>
                        <Card style={{ minHeight: '220px', marginTop:'5px'}}>
                            <div className="container">
                                <ShowType/>
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

export default withRouter(DetailRequirement);