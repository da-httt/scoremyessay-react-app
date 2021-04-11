import React, { useState } from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle, Button, ModalHeader, ModalBody, Modal, Form, Label, Input, FormGroup, ModalFooter } from 'reactstrap';
const CardLogin = (props) =>{
    const {
        image,
        nameCard,
        contentCard,
        linkSignUp
      } = props;

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
            <Modal isOpen={modal} toggle={toggle} >
            <ModalHeader toggle={toggle}>Login</ModalHeader>
                <ModalBody>
                    <Form>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" placeholder="Nhập Email"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Nhập password"/>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                        <Input type="checkbox" /> Lưu tài khoản
                        </Label>
                    </FormGroup>
                    <Button type="submit" color="primary">Đăng nhập</Button>
                    <Button color="link">Quên mật khẩu?</Button>
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
export default CardLogin;