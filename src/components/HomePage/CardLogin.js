import React, { useState } from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle, Button, ModalHeader, ModalBody, Modal, Form, Label, Input, FormGroup, ModalFooter, Alert } from 'reactstrap';
 
import { withRouter } from 'react-router-dom';
import { getBaseURL, getRoleID, setRoleID, setUserSession } from '../../Utils/Common';


const api= getBaseURL();


const CardLogin = (props) =>{
    const [gmail, setGmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] =useState(false);

    const {
        image,
        nameCard,
        contentCard,
        linkSignUp,
      } = props;

    const handleLogin = (e) =>{
        setLoading(true);
        e.preventDefault();

        api.post('/login',{
            username: gmail,
            password: password 
        })
        .then(response => {
            setLoading(false);
            setUserSession(response.data.access_token, response.data.token_type);
            setRoleID();
            const role = getRoleID();
            const linkSignIn= "/Home";
            if (role === 1) linkSignIn = '/HomeStudentPage';
            else if (role === 2) linkSignIn = '/HomeTeacherPage';
            else if (role === 0) linkSignIn = '/HomeStudentPage';
            props.history.push(linkSignIn);
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

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    return(
        <React.Fragment>
            <Card  className="card">
                <CardImg top width="100%" src={image} alt={nameCard}></CardImg>
                <CardBody>
                    <CardTitle tag="h4" >Trở thành {nameCard}</CardTitle>
                    <CardText class="card-text"> 
                    {contentCard}
                    </CardText>
                    <Button outline color="primary" onClick={toggle}>Let's go</Button>
                </CardBody>
            </Card>
            <Modal isOpen={modal} toggle={toggle} onSubmit={handleLogin}>
            <ModalHeader toggle={toggle}>Login</ModalHeader>
                <ModalBody>
                    <Form>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" placeholder="Nhập Email" onChange={e => setGmail(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Nhập password" onChange={e => setPassword(e.target.value)}/>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                        <Input type="checkbox" /> Lưu tài khoản
                        </Label>
                    </FormGroup>
                    <Button type="submit" color="primary" >{loading? 'Đang xử lý...' : 'Đăng nhập'}</Button>
                    <Button color="link">Quên mật khẩu?</Button>
                    {error && <Alert color='danger' isOpen={show} style={{marginTop:'10px'}}>{error}</Alert>}
                    <hr/>
                    <Label >Bạn là {nameCard} mới?</Label><br/>
                    <Button color="warning" href={linkSignUp}>Đăng ký</Button>
                    </Form>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" className="ml-auto" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
}
export default withRouter(CardLogin);