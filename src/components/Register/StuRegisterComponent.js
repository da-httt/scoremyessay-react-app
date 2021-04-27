import React, { useEffect, useState } from 'react';
import { Button, Form, Label, FormGroup, Input, Col, Row, Alert } from 'reactstrap';
import Footer from '../HomePage/FooterComponent';
import Header from '../HomePage/HeaderComponent';
import axios from 'axios'; 
import {  Radio } from 'antd';
import { withRouter } from 'react-router';
import { getBaseURL } from '../../Utils/Common';


const api= getBaseURL();

const StuRegister = (props) =>{
    const [type, setType] = useState("password");
    const [classNamePass, setClassNamePass] = useState("fa fa-eye ");
    const [type1, setType1] = useState("password");
    const [classNamePass1, setClassNamePass1] = useState("fa fa-eye ");
    const [show1, setShow1 ] = useState(true);
    const [show2, setShow2 ] = useState(true);

    const handleShowPassword1 = () =>{
        setShow1(!show1);
        show1 ? setType("password") : setType("text");
        show1 ? setClassNamePass("fa fa-eye ") : setClassNamePass("fa fa-eye-slash"); 
    }
    const handleShowPassword2 = () =>{
        setShow2(!show2);
        show2 ? setType1("password") : setType1("text");
        show2 ? setClassNamePass1("fa fa-eye ") : setClassNamePass1("fa fa-eye-slash"); 
    }

    const [name, setName] = useState();
    const [birthday, setBirthday] = useState();
    const [gender, setGender] = useState(1);
    const [email, setEmail] = useState();
    const [job,setJob] = useState(1);
    const [address, setAddress] = useState();
    const [tel, setTel] = useState();
    const [password, setPassword] = useState();
    const [passwordAgain, setPasswordAgain] = useState();
    
    const [jobs, setJobs] = useState([]); 
    const [genders, setGenders] = useState([]);
    
    useEffect( async () => {
        await api.get('/jobs').then(response => {
            const jobs = response.data.data;
            setJobs(jobs);
            
        })  
        await api.get('/genders').then(response => {
            const genders = response.data.data; 
            setGenders(genders);
            
        })  
    },[]);
    
    const jobsList = jobs.map((job) => (
        <option value={job.job_id}>{job.job_name}</option>
    ));

    const gendersList = genders.map((gender) => (
        <Radio value={gender.gender_id}>{gender.gender_name}</Radio>
    ));
    
    const checkPassword = () =>{
        if(password === null || passwordAgain === null){
            setShow(false);
        }
        else{
            if (password !== passwordAgain) {
                setShow(true);
                setError("Mật khẩu không trùng khớp. Hãy kiểm tra lại mật khẩu!");
            }
        }
    }
    const removeError = () =>{
            setShow(false);
    }

    const [show, setShow] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] =useState(false);

    const handleSignUp =(e) => {
        setLoading(true);
        api.post('/signup',{
            email: email,
            password: password ,
            name: name,
            address: address,
            date_of_birth: birthday,
            gender_id: gender,
            job_id: job,
            phone_number: tel
        })
        .then(response => {
            setLoading(false);
            props.history.push("/Home");
        }).catch((error) => {
            if(error.response){
                setLoading(false);
                if(error.response.status === 401 || error.response.status === 400){
                    setShow(true);
                    setError(error.response.data.detail);
                }
                else{
                    setShow(true);
                    setError("Something went wrong. Please try again later!");
                }
                
            } 
        })
    }
    
  

    return(
        <React.Fragment>
            <Header/>
            <div class="container bg-signup">
            <Form onSubmit={handleSignUp} >
                <div className="row align-items-center">
                    <h3 className="ml-auto mr-auto mt-3">Đăng ký trở thành học viên</h3>
                </div>
                <div className="row " >
                    <div className="col-12 col-md-6 offset-md-3 ">
                        <FormGroup>
                            <Label for="fullname">Họ và tên *</Label>
                            <Input type="text" name="fullname" id="fullname" required onChange={e => setName(e.target.value)}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="birthday">Ngày, tháng, năm sinh *</Label>
                            <Input type="date" name="birthday" id="birthday" required onChange={e => setBirthday(e.target.value)}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="gender">Giới tính</Label>
                            <Radio.Group style={{marginLeft: '20px'}} value= {gender} onChange={e => setGender(e.target.value)}>
                                {gendersList}
                            </Radio.Group>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email *</Label>
                            <Input type="email" name="email" id="email" required onChange={e => setEmail(e.target.value)}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="carrier">Nghề nghiệp hiện tại *</Label>
                            <Input type="select" name="carrier" id="carrier" required value={job} onChange={e => setJob(e.target.value)}>
                                {jobsList}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="tel">Số điện thoại *</Label>
                            <Input type="tel" name="tel" id="tel" required onChange={e => setTel(e.target.value)}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">Địa chỉ *</Label>
                            <Input type="text" name="address" id="address" required onChange={e => setAddress(e.target.value)}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Mật khẩu</Label>
                            <Row style={{marginRight: '0px'}}>
                            <Col xs="11" style={{paddingRight: '0px'}}><Input type={type} name="password" id="password" required onChange={e => setPassword(e.target.value)} onBlur={checkPassword} onClick={removeError}/></Col>
                            <Col xs="1" style={{padding: '0px'}}>
                                <Button className={classNamePass}  onClick={handleShowPassword1} style={{height:"38px"}}/></Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Nhập lại mật khẩu</Label>
                            <Row style={{marginRight: '0px'}}>
                            <Col xs="11" style={{paddingRight: '0px'}}><Input type={type1} name="password" id="password" required onChange={e => setPasswordAgain(e.target.value)} onBlur={checkPassword} onClick={removeError}/></Col>
                            <Col xs="1" style={{padding: '0px'}}>
                                <Button className={classNamePass1}  onClick={handleShowPassword2} style={{height:"38px"}} /></Col>
                            </Row>
                        </FormGroup>
                        
                        

                    </div>
                </div>
                <div className="row align-items-center">
                    <Label check className="mr-auto ml-auto"><Input type="checkbox" required/> Chấp nhận mọi điều khoản và chính sách</Label>
                </div>
                <div className="row align-items-center mt-3">
                    <Button color="primary" type="submit" className="mr-auto ml-auto" >{loading? 'Đang xử lý...' : 'Đăng ký'}</Button>
                </div>
                <div className="row align-items-center mt-3">
                 {error && <Alert color='danger' isOpen={show} style={{margin: 'auto'}}>{error}</Alert>}
                </div>
            </Form>
            </div>   
        <Footer/> 
        </React.Fragment>
    );
}
export default withRouter(StuRegister);