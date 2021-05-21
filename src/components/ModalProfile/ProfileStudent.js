import React, { useEffect, useState } from 'react';
import { Button, ModalHeader, ModalBody, Modal, Form, Label, Input, FormGroup, ModalFooter, Container, Row, Col } from 'reactstrap';
 
import { withRouter } from 'react-router-dom';
import { getBaseURL, getToken,  } from '../../Utils/Common';
import { Radio } from 'antd';


const api= getBaseURL();


const ProfileStudent = (props) =>{
    const {
        modal,
        id
    }=props;
    const [modall, setModall] = useState();

    const [info, setInfo] = useState();
    const [base64Image, setBase64Image] = useState("");
    const [ID, setID] =useState();
    const [mail, setMail] = useState();
    const [jobs,setJobs] =useState();
    const [genders,setGenders] =useState([]);
    function handleChange(){
        props.onClick(modall);
    }
    useEffect(()=>{
        setModall(modal);
        setID(id);
        if(modal){
        async function fetchData() {
            api.get('/users/'+ID,{
              headers: {Authorization: 'Bearer ' + getToken()}
            }
            ).then(response => {
                setMail(response.data.email);
                const info = response.data;
                setInfo(info);
                api.get('/avatars/'+ID,{
                    headers: {Authorization: 'Bearer ' + getToken()}
                  }).then(response =>{
                    setBase64Image(response.data.image_base64);
                })
            })
            
            api.get('/jobs').then(response => {
                const jobs = response.data.data;
                setJobs(jobs);
                
            })  
            api.get('/genders').then(response => {
                const genders = response.data.data; 
                setGenders(genders);
                
            }) 
     
        }
        fetchData();
    }
    },[modal,id,ID]);
     const gendersList = genders.map((gender) => (
         <>
         {gender.gender_id===1 &&(
             <><Radio value={gender.gender_id} key={gender.gender_id}>{gender.gender_name}</Radio><br/></>
         )}
         {gender.gender_id!==1 &&(
             <Radio value={gender.gender_id} key={gender.gender_id}>{gender.gender_name}</Radio>
         )}
         
         </>
     ));
    return(
            <Modal isOpen={modall} >
            <ModalHeader >THÔNG TIN CÁ NHÂN</ModalHeader>
               {info && (
               <ModalBody>
                <Container>
                    <Form>
                        <Row>
                            <Col xs="5">
                                <img src={`data:image/jpeg;base64,${base64Image}`} height="165px" width="165px"  alt="Avatar"></img>
                            </Col>
                            <Col xs="7" >
                            <FormGroup style={{fontSize:'17px'}}>
                                <Label for="fullname">Họ và tên</Label>
                                <Input type="text" name="fullname" id="fullname"  defaultValue={info.name}  readOnly style={{backgroundColor:'white'}}
                                />
                            </FormGroup>
                            <FormGroup style={{fontSize:'17px'}}>
                                <Label for="datebirth">Ngày tháng năm sinh</Label>
                                <Input  type="date" name="datebirth" id="datebirth"  defaultValue={info.date_of_birth} readOnly style={{backgroundColor:'white'}}
                                />
                            </FormGroup>
                            <FormGroup style={{fontSize:'17px'}}>
                                <Label for="gender">Giới tính</Label>
                                <br/>
                                <Radio.Group defaultValue={info.gender_id}>
                                    {gendersList}
                                </Radio.Group>
                            </FormGroup>
                            <FormGroup style={{fontSize:'17px'}}>
                                <Label for="gmail">Gmail</Label>
                                <Input type="email" name="gmail" id="gmail"   defaultValue={mail} readOnly style={{backgroundColor:'white'}}/>
                            </FormGroup>
                            <FormGroup style={{fontSize:'17px'}}>
                                <Label for="job">Nghề nghiệp</Label>
                               {jobs && <Input type="test" name="carrier" id="carrier"   defaultValue={jobs[info.job_id].job_name} readOnly style={{backgroundColor:'white'}}/>}
                            </FormGroup>
                            </Col>
                        </Row>
                        
                    </Form>
                </Container>
                
                </ModalBody>)}
                <ModalFooter>
                <Button color="primary" className="ml-auto" onClick={handleChange} onClickCapture={() => setModall(!modal)}>Cancel</Button>
                </ModalFooter>  
            </Modal>
    );
}
export default withRouter(ProfileStudent);