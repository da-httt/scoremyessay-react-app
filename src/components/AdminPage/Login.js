import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './login.css';
import { Image, Alert, Form, Input, Row, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { getBaseURL, setUserSession } from '../../Utils/Common';
import logo from "./img/logo.png"


const api = getBaseURL();


const { Content } = Layout;
export const Login = (props) => {

    const [alert, setAlert] = useState(false)
    const [message, setMessage] = useState("")
    const [form] = Form.useForm();

    const handleLogin = (e) => {
        console.log("loginging...")

        api.post('/login', {
            username: form.getFieldValue('email'),
            password: form.getFieldValue('password'),
        })
            .then(response => {
                setUserSession(response.data.access_token, response.data.token_type);
                api.get('/accounts/me', {
                    headers: { Authorization: 'Bearer ' + response.data.access_token }
                }).then(response => {
                    localStorage.setItem("roleID", response.data.role_id);
                    const role = response.data.role_id;
                    console.log(role)
                    props.history.push("/admin")
                })
            }).catch((error) => {
                if (error.response) {
                    setAlert(true)
                    setMessage("Wrong password or email")
                }
            })
    }


    return (
        <Layout>

            <Content className="center" >
                <>
                    <Row>
                        <Image className="imglogo-admin" preview={false} src={logo} />
                    </Row>
                    <Row style={{ marginBottom: 20 }}>
                        <span >The Admin Panel</span>
                    </Row>
                    <Row style={{ marginBottom: 20 }}>
                        {alert && <Alert message={message} type="error" />}
                    </Row>
                    <Row>
                        <Form
                            form={form}
                            name="normal_login"
                            className="login-form"
                        >
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Email!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" className="form-control form-control-login btn btn-primary btn-login submit px-3" onClick={handleLogin}>
                                    Log in
                        </Button>
                            </Form.Item>
                        </Form>
                    </Row>
                    <Row>
                    <a href="/Home" >Back to HomePage</a>

                    </Row>
                </>
                <span style={{ marginTop: 30, position: 'fixed', bottom: 20, textAlign: 'center', backgroundColor: 'transparent' }}>ScoreMyEssay ©2021 Created by ScoreMyEssay Team </span>
            </Content>
        </Layout>
    );
};


export default Login;