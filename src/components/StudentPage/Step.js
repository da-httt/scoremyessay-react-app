import React, { useEffect, useState } from 'react';
import {Steps, Radio, Select} from 'antd';
import { Form, FormGroup, Input, Label, Col, CustomInput, FormText, Button, Card, CardHeader, CardBody, Alert } from 'reactstrap';
import { getBaseURL, getToken } from '../../Utils/Common';
import { withRouter } from 'react-router';

const { Step } = Steps;

const api= getBaseURL();

const steps = [
  {
    title: 'Nhập nội dung',
  },
  {
    title: 'Lựa chọn yêu cầu',
  },
];

// const First = (props) => {
//   const {
//     isFirst, 
//     titleU,
//     imageU, 
//     contentU
//   }=props;
//   const [title, setTitle] = useState();
//   const [image, setImage] = useState();
//   const [content, setContent] = useState();

//   props.title(title);
//   props.image(image);
//   props.content(content);
//   console.log(titleU);
//     return(
//       <div className="container-fluid mt-2" style={{fontSize: "large"}}>
//       <Form >
//           <FormGroup row>
//             <Label for="title" sm={2}>Đề bài</Label>
//             <Col sm={10}>
//             <Input type="textarea" name="title" id="title" placeholder="Nhập đề bài" required onChange={e => setTitle(e.target.value)} 
//             defaultValue={titleU} />
//             </Col>
//           </FormGroup> 
//           <FormGroup row>
//             <Label for="image" sm={2}>Ảnh đính kèm</Label>
//             <Col sm={10}>
//             <CustomInput type="file" name="image" id="image" accept="image/*" onChange={e => setImage(e.target.value)}/>
//             </Col>
//           </FormGroup>  
//           <FormGroup row>
//             <Label for="content" sm={2}>Nội dung</Label>
//             <Col sm={10}>
//             <Input type="textarea" name="content" id="content" placeholder="Nhập nội dung bài viết" rows="15" onChange={e => setContent(e.target.value)}
//             defaultValue={isFirst? contentU : null}/>
//             <FormText color="muted">
//               Độ dài tối đa: 1000 chữ.
//             </FormText>
//             </Col>
//           </FormGroup> 
//       </Form>
//       </div>
    
//     );
// }

// const Second = (props) => {
//   const {
//     isSecond,
//     levelU,
//     typeU,
//     optionsU
//   }=props;
//   const [level, setLevel] = useState(0);
//   const [type, setType] = useState(1);
//   const [optionScore, setOptionScore] = useState([0,1]);
//   const [optionTime, setOptionTime] = useState(4);
//   const [optionsTotal,setOptionsTotal] = useState([0,1]);
//   props.level(level);
//   props.type(type);
//   props.optionScore(optionScore);
//   props.optionTime(optionTime);
//   props.optionsTotal(optionsTotal);
  
//   const [options, setOptions] = useState([]);
//   const [levels, setLevels] = useState([]);
//   const [types, setTypes] = useState([]);
//   useEffect( () => {
//     async function fetchData() {
//         await api.get('/levels',).then(response => {
//           const level = response.data.data;
//           setLevels(level);
//       });    
//         await api.get('/options',).then(response => {
//           const option = response.data.data;
//           setOptions(option);
//       });
//         await api.get('/types',).then(response => {
//           const type = response.data.data;
//           setTypes(type);
//       });
//     }
//     fetchData();
//   },[]);

//   const levelList = levels.map((level) =>(
//       <Radio.Button value={level.level_id} key={level.level_id} style={{margin: '0px 8px'}}>{level.level_name}</Radio.Button>
//   ));

//   const typeList = types.map((type) =>(
//     type.type_id!==0 &&(
//     <option value={type.type_id}>{type.type_name}</option>
//     )
// ));

//   const optionList = options.map((option)=>(
//     option.option_type===0 && (
//     <Select.Option value={option.option_id} key={option.option_id} label={option.option_name}>
//         {option.option_name}
//     </Select.Option>
//     )
//   ));

//   const optionTimeList = options.map((option)=>(
//     option.option_type===1 && (
//       <Radio value={option.option_id} key={option.option_id}>{option.option_name} giờ</Radio>
//     )
//   ));
  
//   function handleChangeOptionScore(value) {
//     setOptionScore(value);
//     setOptionsTotal(value);
//   }
  
//   return(
//       <div className="container-fluid mt-2" style={{fontSize: "large"}}>
//         <div className="row ">
//           <div className="col-8">
//             <Form >
//                 <FormGroup row>
//                   <Label for="level" sm={3} >Trình độ</Label>
//                   <Col sm={9}>
//                   <Radio.Group value={level} onChange={e => setLevel(e.target.value)} >
//                     {levelList}
//                   </Radio.Group>
//                   </Col>
//                 </FormGroup> 
//                 <FormGroup row>
//                   <Label for="type" sm={3}>Thể loại bài viết</Label>
//                   <Col sm={9}>
//                   <Input type="select" name="type" id="type" disabled={!level} defaultValue={1} onChange={e => setType(e.target.value)}>
//                     {typeList}
//                   </Input>
//                   </Col>
//                 </FormGroup>  
//                 <FormGroup row >
//                   <Label for="optionScore" sm={3}>Lựa chọn sửa bài</Label>
//                   <Col sm={9}>
//                   <Select
//                     id="optionScore"
//                     mode="multiple"
//                     style={{ width: '100%'}}
//                     placeholder="Please select at least one options"
//                     defaultValue={[0,1]}
//                     onChange={handleChangeOptionScore}
//                     optionLabelProp="label"
                    
//                   >
//                   {optionList}
//                   </Select>
//                   </Col>
//                 </FormGroup> 
//                 <FormGroup row style={{marginTop: '30px'}}>
//                   <Label for="optionTime" sm={3}>Lựa chọn thời gian chấm</Label>
//                   <Col sm={9} style={{padding: "20px 15px"}} >
//                     <Radio.Group  defaultValue={optionTime} onChange={e => setOptionTime(e.target.value)}>
//                       {optionTimeList}
//                     </Radio.Group>
//                   </Col>
//                 </FormGroup> 
//             </Form>
//           </div>
//           <div className="col-4">
//             <Card style={{ minHeight: '250px'}}>
//             <CardHeader tag="h4" style={{ width: '100%'}}><i className="fa fa-cart-arrow-down fa-xl"/> Giỏ Hàng</CardHeader>
//               <CardBody>
//                 <CardText>
//                   Chấm điểm và sửa lỗi: 50,000 <br/>
//                   IELTS WRITING TASK 2: 50,000 <br/>
//                   <hr />
//                   <strong className="ml-auto">Tổng tiền: 100,000 VNĐ</strong>
//                 </CardText>
//               </CardBody>
//             </Card>
            
//             <Button outline color="success" block className="mb-1 mt-1">Xác nhận thanh toán</Button>
//           </div>
//         </div>
//       </div>
    
//     );
// }


const Stepp = (props) => {
  const {
    orderID
  } = props;
  let isUpdate=false;
  if(Number.isNaN(orderID)){
    isUpdate = false;
  }
  else
    isUpdate = true;
  
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [colorAlert, setColorAlert] = useState("warning");
  const [loading, setLoading] =useState(false);
  const [loadPay, setLoadPay] = useState(false);
  
  const [title, setTitle] = useState();
  const [image, setImage] = useState();
  const [content, setContent] = useState();
  const [level, setLevel] = useState(0);
  const [type, setType] = useState(0);
  const [optionScore, setOptionScore] = useState([0,1]);
  const [optionTime, setOptionTime] = useState(4);
  const [optionsTotal, setOptionsTotal] = useState([]);

  const [options, setOptions] = useState([]);
  const [levels, setLevels] = useState([]);
  const [types, setTypes] = useState([]);
  useEffect( () => {
    async function fetchData() {
      if(isUpdate){
        await api.get('/orders/'+orderID,{
          headers: {Authorization: 'Bearer ' + getToken()}
        }
        ).then(response => {
          const essay= response.data.essay;
          const optionsS = response.data.option_list;
          setOptionsTotal(optionsS);
          setOptionTime(optionsS[optionsS.length-1]);
          optionsS.pop();
          setOptionScore(optionsS)
          setTitle(essay.title);
          setContent(essay.content);
          setType(essay.type_id);
          if(essay.type_id===0){
            setLevel(0);
          }
          else{
            setLevel(1);
          }
          
      }).catch((error) => {
        if(error.response){
            setLoading(false);
            if(error.response.status === 401 || error.response.status === 400 || error.response.status === 403){
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
    };

      await api.get('/levels',).then(response => {
        setLevels(response.data.data);
    });    
      await api.get('/options',).then(response => {
        setOptions(response.data.data);
    });
      await api.get('/types',).then(response => {
        setTypes(response.data.data);
    });
      
        
    }
    fetchData();
    
},[isUpdate,orderID]);

const levelList = levels.map((level) =>(
  <Radio.Button value={level.level_id} key={level.level_id} style={{margin: '0px 8px'}}>{level.level_name}</Radio.Button>
));

const typeList = types.map((type) =>(
type.type_id!==0 &&(
<option value={type.type_id}>{type.type_name}</option>
)
));

const optionList = options.map((option)=>(
option.option_type===0 && (
  <>
  {option.option_id===0  && 
    <Select.Option value={option.option_id} key={option.option_id} label={option.option_name} disabled>
        {option.option_name}
    </Select.Option>
  }
  {option.option_id ===1 && 
    <Select.Option value={option.option_id} key={option.option_id} label={option.option_name} disabled>
        {option.option_name}
    </Select.Option>
  } 
  {option.option_id !==1 && option.option_id !==0 && 
    <Select.Option value={option.option_id} key={option.option_id} label={option.option_name} >
        {option.option_name}
    </Select.Option>
  }
  </>

)
));

const optionTimeList = options.map((option)=>(
option.option_type===1 && (
  <Radio value={option.option_id} key={option.option_id}>{option.option_name} giờ</Radio>
)
));

function handleChangeOptionScore(value) {
setOptionScore(value);
setOptionsTotal(value);
}

function handleChangeLevel(e){
  const level = e.target.value;
  setLevel(level);
  if(level === 0)
  {
    setType(0);
  }
  else{
    setType(1);
  }
}

const ShowType= ()=>{
  return(
      <div className="row" style={{marginBottom:'20px'}}>
          <div className="col col-7">{types? types[type].type_name: ""}:</div>
          <div className="col" style={{textAlign:'right'}}>{types? types[type].type_price: 0} VNĐ</div>
      </div>
  );
}
const ShowTime= ()=>{
  return(
      <div className="row" style={{marginBottom:'20px'}}>
          <div className="col col-7">{options? options[optionTime].option_name: ""}:</div>
          <div className="col" style={{textAlign:'right'}}>{options? options[optionTime].option_price: ""} VNĐ</div>
      </div>
  );
}




const handleSave = (e) =>{
  if(!title){
    setShow(true);
    setColorAlert("warning");
    setError("Bạn chưa nhập đề bài, vui lòng kiểm tra lại!");
  }
  else{
    if(!image && !content)
    {
      setShow(true);
      setColorAlert("warning");
      setError("Bạn chưa nhập nội dung hoặc thêm hình ảnh, vui lòng kiểm tra lại!");
    }
    else{
      if(!optionScore){
        setShow(true);
        setColorAlert("warning");
        setError("Bạn chưa chọn phương thức chấm điểm, vui lòng kiểm tra lại!");
      }
      else{
        setLoading(true);
        if(!isUpdate){
          optionsTotal.push(optionTime);
          api.post('/orders?status_id=0', {
            "essay": {
              "title": title,
              "content": content,
              "type_id": type,
            },
            "option_list": optionsTotal
          }, 
          {
            headers: {'Authorization': 'Bearer ' + getToken()},
          }).then(response => {
            setLoading(false);
            setShow(true);
            setColorAlert("success");
            alert("Bài viết của bạn đã được lưu vào giỏ hàng!");
            props.history.push("/HomeStudentPage/Cart");
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
        else{
          optionsTotal.push(optionTime);
          api.put('/orders/saved/'+orderID, {
            "essay": {
              "title": title,
              "content": content,
              "type_id": type
            },
            "option_list": optionsTotal,
            "status_id": 0
          }, 
          {
            headers: {'Authorization': 'Bearer ' + getToken()},
          }).then(response => {
            setLoading(false);
            setShow(true);
            setColorAlert("success");
            alert("Bài viết của bạn đã được cập nhật và lưu vào giỏ hàng!");
            props.history.push("/HomeStudentPage/Cart");
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
        
      
    }
  }
    }
    
}

const handlePayment = (e) =>{
  if(!title){
    setShow(true);
    setColorAlert("warning");
    setError("Bạn chưa nhập đề bài, vui lòng kiểm tra lại!");
  }
  else{
    if(!image && !content)
    {
      setShow(true);
      setColorAlert("warning");
      setError("Bạn chưa nhập nội dung hoặc thêm hình ảnh, vui lòng kiểm tra lại!");
    }
    else{
      if(!optionScore){
        setShow(true);
        setColorAlert("warning");
        setError("Bạn chưa chọn phương thức chấm điểm, vui lòng kiểm tra lại!");
      }
      else{
        setLoadPay(true);
        if(!isUpdate){
          optionsTotal.push(optionTime);
          api.post('/orders?status_id=1', {
            "essay": {
              "title": title,
              "content": content,
              "type_id": type
            },
            "option_list": optionsTotal
          }, 
          {
            headers: {'Authorization': 'Bearer ' + getToken()},
          }).then(response => {
            setLoadPay(false);
            setShow(true);
            setColorAlert("success");
            alert("Bài viết của bạn đã được thanh toán và đang tìm giáo viên chấm!");
            props.history.push("/HomeStudentPage");
          }).catch((error) => {
            if(error.response){
              setLoadPay(false);
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
        else{
          optionsTotal.push(optionTime);
          api.put('/orders/saved/'+orderID, {
            "essay": {
              "title": title,
              "content": content,
              "type_id": type
            },
            "option_list": optionsTotal,
            "status_id": 1
          }, 
          {
            headers: {'Authorization': 'Bearer ' + getToken()},
          }).then(response => {
            setLoadPay(false);
            setShow(true);
            setColorAlert("success");
            alert("Bài viết của bạn đã được thanh toán và đang tìm giáo viên chấm!");
            props.history.push("/HomeStudentPage");
          }).catch((error) => {
            if(error.response){
              setLoadPay(false);
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
        
      
    }
  }
    }
    
}



  // console.log("title "+ title);
  // console.log("content "+ content);
  // console.log("level "+ level);
  // console.log("type "+ type);
  
  // console.log("optionsTotal "+ optionsTotal);
  // console.log("optionScore "+ optionScore);
  // console.log("optionTime "+ optionTime);
  return (
    <div className="bg" style={{height: window.innerHeight + 'px'}} >
    <div className="row bg margin padding">
        <Steps current={current} style={{padding: "10px 160px 10px 160px", display: "inline-flex"}}>
            {steps.map(item => (
            <Step key={item.title} title={item.title} />
            ))}
        </Steps>
    </div>
    <div className="row bg-row padding margin ">
            {current < steps.length - 1 && (
              <div className="action ml-auto mt-2">
            <Button color="primary" style={{ margin: '0 8px '}} onClick={handleSave}>
              {loading? 'Đang xử lý...' : 'Lưu bài viết'}
            </Button>
            <Button outline color="primary"  onClick={() => next()}>
              Tiếp tục
            </Button>
            </div>
            )}
            {current > 0 && (
              <div className="action mr-auto mt-2">
            <Button outline color="primary"  style={{ margin: '0 8px' }} onClick={() => prev()}>
              Quay lại
            </Button>
            <Button color="primary" style={{ margin: '0 8px '}} onClick={handleSave}>
              {loading? 'Đang xử lý...' : 'Lưu bài viết'}
            </Button>
            </div>
            )}
    </div>
    <div className="row bg-row padding ">
    {error && <Alert color={colorAlert} isOpen={show} style={{margin: 'auto'}}>{error}</Alert>}
        {
        current === 0 && (
          <>
            {/* <First 
              title= {(t)=>setTitle(t)} image= {(i)=>setImage(i)} content= {(c)=>setContent(c)} isFirst={isUpdate}
              titleU={title} contentU={content} imageU={image}
            /> */}
          <div className="container-fluid mt-2" style={{fontSize: "large"}}>
            <Form >
              <FormGroup row>
                <Label for="title" sm={2}>Đề bài</Label>
                <Col sm={10}>
                <Input type="textarea" name="title" id="title" placeholder="Nhập đề bài" required onChange={e => setTitle(e.target.value)} 
                defaultValue={title} />
                </Col>
              </FormGroup> 
              <FormGroup row>
                <Label for="image" sm={2}>Ảnh đính kèm</Label>
                <Col sm={10}>
                <CustomInput type="file" name="image" id="image" accept="image/*" onChange={e => setImage(e.target.value)}/>
                </Col>
              </FormGroup>  
              <FormGroup row>
                <Label for="content" sm={2}>Nội dung</Label>
                <Col sm={10}>
                <Input type="textarea" name="content" id="content" placeholder="Nhập nội dung bài viết" rows="15" onChange={e => setContent(e.target.value)}
                defaultValue={content}/>
                <FormText color="muted">
                  Độ dài tối đa: 1000 chữ.
                </FormText>
                </Col>
              </FormGroup> 
          </Form>
          </div>
    
          </>
        )}
        {current === 1 && (
          <>
            {/* <Second isSecond={isUpdate} type= {(t)=>setType(t)} level= {(t)=>setLevel(t)} optionScore= {(t)=>setOptionScore(t)} optionTime= {(t)=>setOptionTime(t)} optionsTotal= {(t)=>setOptionsTotal(t)}
            /> */}
            <div className="container-fluid mt-2" style={{fontSize: "large"}}>
              <div className="row ">
                <div className="col-8">
                  <Form >
                      <FormGroup row>
                        <Label for="level" sm={3} >Trình độ</Label>
                        <Col sm={9}>
                        <Radio.Group defaultValue={level} onChange={handleChangeLevel} >
                          {levelList}
                        </Radio.Group>
                        </Col>
                      </FormGroup> 
                      <FormGroup row>
                        <Label for="type" sm={3}>Thể loại bài viết</Label>
                        <Col sm={9}>
                        <Input type="select" name="type" id="type" disabled={!level}  value={type} onChange={e => setType(e.target.value)}>
                          {typeList}
                        </Input>
                        </Col>
                      </FormGroup>  
                      <FormGroup row >
                        <Label for="optionScore" sm={3}>Lựa chọn sửa bài</Label>
                        <Col sm={9}>
                        <Select
                          id="optionScore"
                          mode="multiple"
                          allowClear="false"
                          style={{ width: '100%'}}
                          placeholder="Please select at least one option"
                          value={optionScore}
                          onChange={handleChangeOptionScore}
                          optionLabelProp="label"
                        >
                        {optionList}
                        </Select>
                        </Col>
                      </FormGroup> 
                      <FormGroup row style={{marginTop: '30px'}}>
                        <Label for="optionTime" sm={3}>Lựa chọn thời gian chấm</Label>
                        <Col sm={9} style={{padding: "20px 15px"}} >
                          <Radio.Group  defaultValue={optionTime} onChange={e => setOptionTime(e.target.value)}>
                            {optionTimeList}
                          </Radio.Group>
                        </Col>
                      </FormGroup> 
                  </Form>
                </div>
                <div className="col-4">
                  <Card style={{ minHeight: '250px'}}>
                  <CardHeader tag="h4" style={{ width: '100%'}}><i className="fa fa-cart-arrow-down fa-xl"/> Giỏ Hàng</CardHeader>
                    <CardBody>
                      
                      <div className="container-fluid">
                        <ShowType/>
                        <ShowTime/>
                      </div>
                  
                      <hr/>
                    </CardBody>
                  </Card>
                  
                  <Button outline color="success" block className="mb-1 mt-1" onClick={handlePayment}>
                    {loadPay? 'Đang xử lý...' : 'Xác nhận thanh toán'}
                  </Button>
                  <Button outline color="danger" block className="mb-1 mt-1" onClick={handlePayment}>
                    Hủy 
                  </Button>
                </div>
              </div>
            </div>
    
          </>
        )}
        
    </div>
      
    </div>
  );
};

export default withRouter(Stepp);