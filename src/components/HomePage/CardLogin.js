import React, { useState } from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle,  Modal } from 'reactstrap';
import { Alert} from 'antd';
import { withRouter } from 'react-router-dom';
import { getBaseURL, setUserSession } from '../../Utils/Common';
import "./cardlogin.css"

const api = getBaseURL();

const style = {
    width: "15rem",
    borderRadius: "10px"
};

const imageStyle = {
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px"

}

const CardLogin = (props) => {
    const [gmail, setGmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false)
    const [message, setMessage] = useState("")
    const {
        image,
        nameCard,
        contentCard,
        linkSignUp,
    } = props;

    const handleClose = () =>{
        console.log("On close")
        setAlert(false)
    }

    const handleLogin = (e) => {
        setLoading(true);
        e.preventDefault();
        console.log(gmail)

        api.post('/login', {
            username: gmail,
            password: password
        })
            .then(response => {
                setUserSession(response.data.access_token, response.data.token_type);
                api.get('/accounts/me', {
                    headers: { Authorization: 'Bearer ' + response.data.access_token }
                }).then(response => {
                    setLoading(false);

                    localStorage.setItem("roleID", response.data.role_id);
                    const role = response.data.role_id;
                    let linkSignIn = "/Home";
                    if (role === 1) linkSignIn = '/HomeStudentPage';
                    else if (role === 2) linkSignIn = '/HomeTeacherPage';
                    else if (role === 0) linkSignIn = '/admin';
                    props.history.push(linkSignIn);
                })


            }).catch((error) => {
                if (error.response) {
                    setLoading(false);

                    setAlert(true)
                    setMessage("Wrong password or email")

                }
            })
    }

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    return (
        <React.Fragment>
            {/*   <Card className="card">
                <CardImg top width="100%" src={image} alt={nameCard}></CardImg>
                <CardBody>
                    <CardTitle tag="h4" >Trở thành {nameCard}</CardTitle>
                    <CardText className="card-text">
                        {contentCard}
                    </CardText>
                    <Button outline color="primary" onClick={toggle}>Let's go</Button>
                </CardBody>
    </Card> */}
            <>
                <a style={{ cursor: 'pointer' }} onClick={toggle}>
                    <Card className="card" style={style}>
                        <CardImg
                            alt="..."
                            src={image}
                            top
                            style={imageStyle}
                        ></CardImg>
                        <CardBody>
                            <CardTitle>{nameCard}</CardTitle>
                            <CardText>
                                {contentCard}
                            </CardText>
                        </CardBody>
                    </Card>
                </a>
            </>

            {/*  <Modal isOpen={modal} toggle={toggle} onSubmit={handleLogin}>
                <ModalHeader toggle={toggle}>Login</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="Nhập Email" onChange={e => setGmail(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="Nhập password" onChange={e => setPassword(e.target.value)} />
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" /> Lưu tài khoản
                        </Label>
                        </FormGroup>
                        <Button type="submit" color="primary" >{loading ? 'Đang xử lý...' : 'Đăng nhập'}</Button>
                        <Button color="link">Quên mật khẩu?</Button>
                        {error && <Alert color='danger' isOpen={show} style={{ marginTop: '10px' }}>{error}</Alert>}
                        <hr />
                        <Label >Bạn là {nameCard} mới?</Label><br />
                        <Button color="warning" href={linkSignUp}>Đăng ký</Button>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="ml-auto" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>*/}
            <Modal
                isOpen={modal}
                toggle={toggle}
                onSubmit={handleLogin}
                onClosed={handleClose}
                className="modal-dialog">
                <div className="row cardlogin">
                    <div className="col-md-12 col-lg-12" >
                        <div className="wrap d-md-flex">
                            <div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
                                <div className="text w-100">
                                    <h2>Chào mừng đến với ScoreMyEssay</h2>
                                    <p>Ban không có tài khoản?</p>
                                    <a href={linkSignUp} className="btn btn-white btn-outline-white btn-login ">Đăng ký</a>
                                </div>
                            </div>
                            <div className="login-wrap p-4 p-lg-5">
                                <div className="d-flex">
                                    <div className="w-100">
                                        <h3 className="mb-4">Đăng nhập </h3>
                                    </div>
                                </div>
                                <form action="#" className="signin-form">
                                    <div className="form-group form-group-login mb-3">
                                        <label className="label" for="name">Email</label>
                                        <input type="email" className="form-control form-control-login" placeholder="Email" required onChange={e => setGmail(e.target.value)} />
                                    </div>
                                    <div className="form-group form-group-login mb-3">
                                        <label className="label" for="password">Mật khẩu</label>
                                        <input type="password" className="form-control form-control-login" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
                                    </div>
                                    <div className="form-group form-group-login">
                                        {alert && <Alert message={message} type="error" />}
                                        <button type="submit" className="form-control form-control-login btn btn-primary btn-login submit px-3">{loading ? 'Đang xử lý...' : 'Đăng nhập'}</button>
                                    </div>
                                    <div className="form-group form-group-login d-md-flex text-center">
                                            <a href="#">Forgot Password</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

        </React.Fragment>
    );
}
export default withRouter(CardLogin);