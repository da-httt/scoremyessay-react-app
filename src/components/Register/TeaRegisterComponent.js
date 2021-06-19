import React, { useEffect } from 'react';
import './register.css';
import { Button, Form, Label, Input, FormGroup, CustomInput, Card, CardHeader, CardBody, Col, Alert } from 'reactstrap';
import Footer from '../HomePage/FooterComponent';
import HeaderLite from '../HomePage/HeaderLiteComponent';
import { Radio } from 'antd';
import { getBaseURL } from '../../Utils/Common';
import { useState } from 'react/cjs/react.development';
import { withRouter } from 'react-router-dom';

const api = getBaseURL();

const TeaRegister = (props) => {
    const [jobs, setJobs] = useState([]);
    const [genders, setGenders] = useState([]);
    const [levels, setLevels] = useState([]);
    const [job, setJob] = useState(0);
    const [gender, setGender] = useState(0);
    const [level, setLevel] = useState(0);
    const [name, setName] = useState();
    const [birthday, setBirthday] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [tel, setTel] = useState();
    const [base64Image, setBase64Image] = useState();
    const [coverLetter, setCoverLetter] = useState();

    const [show, setShow] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [colorAlert, setColorAlert] = useState('danger');

    const [agree, setAgree] = useState(false);
    useEffect(() => {
        async function fetchData() {
            await api.get('/jobs').then(response => {
                const jobs = response.data.data;
                setJobs(jobs);

            })
            await api.get('/genders').then(response => {
                const genders = response.data.data;
                setGenders(genders);
            })
            await api.get('/levels').then(response => {
                const levels = response.data.data;
                setLevels(levels);
            })
        }
        fetchData();

    }, []);

    const jobsList = jobs.map((job) => (
        <option key={job.job_id} value={job.job_id} >{job.job_name}</option>
    ));

    const gendersList = genders.map((gender) => (

        <Radio value={gender.gender_id} key={gender.gender_id}>{gender.gender_name}</Radio>
    )
    );

    const levelsList = levels.map((level) => (

        <Radio value={level.level_id} key={level.level_id}>{level.level_name}</Radio>
    )
    );


    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        const a = base64.split(",");
        setBase64Image(a[1]);
    }
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error)
            };
        });
    };
    const handleSignUp = (e) => {
        if (name && birthday && email && tel && base64Image && coverLetter) {
            if (agree === true) {
                setShow(false);
                setLoading(true);
                api.post('/signup/teacher', {
                    "name": name,
                    "gender_id": gender,
                    "email": email,
                    "address": address,
                    "job_id": job,
                    "phone_number": tel,
                    "date_of_birth": birthday,
                    "level_id": level,
                    "avatar": base64Image,
                    "cover_letter": coverLetter
                })
                    .then(response => {
                        alert("Bạn đã đăng ký tài khoản thành công!")
                        props.history.push("/Home");
                    }).catch((error) => {
                        if (error.response) {
                            setLoading(false);
                                setShow(true);
                                setColorAlert("danger");
                                setError(error.response.data.detail);
                    }
                })
            }
            else {
                setShow(true);
                setColorAlert("warning");
                setError("Bạn cần chọn chấp nhận mọi điều khoản và chính sách!");
            }


        }
        else {
            setShow(true);
            setColorAlert("warning");
            setError("Bạn chưa điền đầy đủ thông tin, vui lòng kiểm tra lại!");
        }
    }
    return (
        <React.Fragment>
            <div className="back">
                <HeaderLite />
                <div className="container bg-signup">
                    <Form className="card-register" style={{ marginBottom: 200 }}>
                        <div className="row align-items-center">
                            <h3 className="ml-auto mr-auto mt-3" style={{
                                fontWeight: 700,
                                color: "#2596be",
                                marginBottom: "20px"
                            }}>Đăng ký trở thành giảng viên, chuyên gia</h3>
                        </div>
                        <div className="row " >
                            <Card className="card-tea-register">
                                <CardHeader style={{
                                    backgroundColor: "#2596be",
                                    color: "white",
                                    fontWeight: 900
                                }}>
                                    Thông tin cá nhân
                        </CardHeader>
                                <CardBody>
                                    <div className="container">
                                        <FormGroup row>
                                            <Label for="fullname" sm={3}>Họ và tên *</Label>
                                            <Col >
                                                <Input className="register-input" type="text" name="fullname" id="fullname" required onChange={e => setName(e.target.value)} />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="birthday" sm={3}>Ngày tháng năm sinh *</Label>
                                            <Col >
                                                <Input className="register-input" type="date" name="birthday" id="birthday" required onChange={e => setBirthday(e.target.value)} />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="gender" sm={3}>Giới tính</Label>
                                            <Col >
                                                <Radio.Group style={{ marginLeft: '20px' }} value={gender} onChange={e => setGender(e.target.value)}>
                                                    {gendersList}
                                                </Radio.Group>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="email" sm={3}>Email *</Label>
                                            <Col >
                                                <Input className="register-input" type="email" name="email" id="email" required onChange={e => setEmail(e.target.value)} />
                                            </Col>
                                        </FormGroup>

                                        <FormGroup row>
                                            <Label for="phone" sm={3}>Số điện thoại *</Label>
                                            <Col >
                                                <Input className="register-input" type="tel" name="phone" id="phone" required onChange={e => setTel(e.target.value)} />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="address" sm={3}>Địa chỉ</Label>
                                            <Col >
                                                <Input className="register-input" type="text" name="address" id="address" onChange={e => setAddress(e.target.value)} />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="carrier" sm={3}>Nghề nghiệp hiện tại *</Label>
                                            <Col >
                                                <Input className="register-input" type="select" name="carrier" id="carrier" required value={job} onChange={e => setJob(e.target.value)}>
                                                    {jobsList}
                                                </Input>
                                            </Col>
                                        </FormGroup>


                                    </div>


                                </CardBody>
                            </Card>

                        </div>
                        <div className="row " >
                            <Card className="card-tea-register" >
                                <CardHeader style={{
                                    backgroundColor: "#2596be",
                                    color: "white",
                                    fontWeight: 900
                                }}>
                                    Đơn xin đăng nhập đội ngũ giáo viên, giảng viên của hệ thống
                        </CardHeader>
                                <CardBody>
                                    <div className="container">
                                        <FormGroup row>
                                            <Label for="fullname" sm={3}>Ảnh đại diện *</Label>
                                            <Col >
                                                <CustomInput className="register-input" type="file" accept="image/*" onChange={(e) => { uploadImage(e) }} />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="fullname" sm={3}>Trình độ chấm bài</Label>
                                            <Col >
                                                <Radio.Group style={{ marginLeft: '20px' }} value={level} onChange={e => setLevel(e.target.value)}>
                                                    {levelsList}
                                                </Radio.Group>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="fullname" sm={3}>Lý do bạn muốn trở thành giảng viên, giáo viên của hệ thống? *</Label>

                                            <Col >
                                                <Input className="register-input" type="textarea" rows={4} onChange={e => setCoverLetter(e.target.value)} />
                                            </Col>
                                        </FormGroup>

                                    </div>

                                </CardBody>
                            </Card>

                        </div>
                        <div className="row align-items-center">
                            <Label check className="mr-auto ml-auto" style={{ marginTop: '20px' }} onClick={e => setAgree(!agree)}><Input type="checkbox" /> Chấp nhận mọi điều khoản và chính sách</Label>

                        </div>
                        <div className="row align-items-center mt-3">
                            {error && <Alert color={colorAlert} isOpen={show} style={{ margin: 'auto' }}>{error}</Alert>}
                        </div>
                        <div className="row align-items-center mt-3">
                            <Button color="primary" className="mr-auto ml-auto btn btn-primary btn-login" onClick={handleSignUp}>{loading ? 'Đang xử lý...' : 'Đăng ký'}</Button>
                        </div>

                    </Form>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
}
export default withRouter(TeaRegister);


