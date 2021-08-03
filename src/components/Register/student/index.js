import { Radio } from "antd";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { showMessage } from "../../commonFormat";
import Footer from "../../HomePage/FooterComponent";
import HeaderLite from "../../HomePage/HeaderLiteComponent";
import { getGenders, getJobs, registerStudentAcc } from "../api";
import "../register.css";

const StuRegister = (props) => {
  const [type, setType] = useState("password");
  const [classNamePass, setClassNamePass] = useState("fa fa-eye ");
  const [type1, setType1] = useState("password");
  const [classNamePass1, setClassNamePass1] = useState("fa fa-eye ");
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(true);

  const handleShowPassword1 = () => {
    setShow1(!show1);
    show1 ? setType("password") : setType("text");
    show1
      ? setClassNamePass("fa fa-eye ")
      : setClassNamePass("fa fa-eye-slash");
  };
  const handleShowPassword2 = () => {
    setShow2(!show2);
    show2 ? setType1("password") : setType1("text");
    show2
      ? setClassNamePass1("fa fa-eye ")
      : setClassNamePass1("fa fa-eye-slash");
  };

  const [name, setName] = useState();
  const [birthday, setBirthday] = useState();
  const [gender, setGender] = useState(1);
  const [email, setEmail] = useState();
  const [job, setJob] = useState(1);
  const [address, setAddress] = useState();
  const [tel, setTel] = useState();
  const [password, setPassword] = useState();
  const [passwordAgain, setPasswordAgain] = useState();
  const [agree, setAgree] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [genders, setGenders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getJobs(setJobs);
    getGenders(setGenders);
  }, []);

  const jobsList = jobs.map((job) => (
    <option key={job.job_id} value={job.job_id}>
      {job.job_name}
    </option>
  ));

  const gendersList = genders.map((gender) => (
    <Radio value={gender.gender_id} key={gender.gender_id}>
      {gender.gender_name}
    </Radio>
  ));
  const handleSignUp = (e) => {
    if (name && birthday && email && tel && password && passwordAgain) {
      if (password !== passwordAgain) {
        showMessage(
          "Mật khẩu không trùng khớp. Hãy kiểm tra lại mật khẩu!",
          "warning"
        );
      } else {
        if (agree === true) {
          setLoading(true);
          registerStudentAcc(
            email,
            password,
            name,
            address,
            birthday,
            gender,
            job,
            tel,
            props.history,
            setLoading
          );
        } else {
          showMessage(
            "Bạn cần chọn chấp nhận mọi điều khoản và chính sách!",
            "warning"
          );
        }
      }
    } else {
      showMessage(
        "Bạn chưa điền đầy đủ thông tin, vui lòng kiểm tra lại!",
        "warning"
      );
    }
  };

  return (
    <React.Fragment>
      <div className="back">
        <HeaderLite />
        <div className="container bg-signup">
          <Form
            style={{
              marginBottom: 200,
              padding: "20px",
              backgroundColor: "transparent",
            }}
          >
            <div className="row ">
              <div className="col-12 col-md-6 offset-md-3 card-register">
                <div className="row align-items-center">
                  <h3
                    className="ml-auto mr-auto mt-3"
                    style={{
                      fontWeight: 700,
                      color: "#2596be",
                      marginBottom: "50px",
                    }}
                  >
                    Đăng ký trở thành học viên
                  </h3>
                </div>
                <FormGroup>
                  <Label for="fullname">Họ và tên *</Label>
                  <Input
                    className="register-input"
                    type="text"
                    name="fullname"
                    id="fullname"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="birthday">Ngày, tháng, năm sinh *</Label>
                  <Input
                    className="register-input"
                    type="date"
                    name="birthday"
                    id="birthday"
                    required
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="gender">Giới tính</Label>
                  <Radio.Group
                    style={{ marginLeft: "20px" }}
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    {gendersList}
                  </Radio.Group>
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email *</Label>
                  <Input
                    className="register-input"
                    type="email"
                    name="email"
                    id="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="carrier">Nghề nghiệp hiện tại *</Label>
                  <Input
                    className="register-input"
                    type="select"
                    name="carrier"
                    id="carrier"
                    required
                    value={job}
                    onChange={(e) => setJob(e.target.value)}
                  >
                    {jobsList}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="tel">Số điện thoại *</Label>
                  <Input
                    className="register-input"
                    type="tel"
                    name="tel"
                    id="tel"
                    required
                    onChange={(e) => setTel(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="address">Địa chỉ</Label>
                  <Input
                    className="register-input"
                    type="text"
                    name="address"
                    id="address"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Mật khẩu *</Label>
                  <Row style={{ marginRight: "0px" }}>
                    <Col xs="11" style={{ paddingRight: "0px" }}>
                      <Input
                        className="register-input"
                        type={type}
                        name="password"
                        id="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Col>
                    <Col xs="1" style={{ padding: "0px" }}>
                      <Button
                        className={classNamePass}
                        onClick={handleShowPassword1}
                        style={{ height: "38px" }}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Label for="password">Nhập lại mật khẩu* </Label>
                  <Row style={{ marginRight: "0px" }}>
                    <Col xs="11" style={{ paddingRight: "0px" }}>
                      <Input
                        className="register-input"
                        type={type1}
                        name="passwordAgain"
                        id="passwordAgain"
                        required
                        onChange={(e) => setPasswordAgain(e.target.value)}
                      />
                    </Col>
                    <Col xs="1" style={{ padding: "0px" }}>
                      <Button
                        className={classNamePass1}
                        onClick={handleShowPassword2}
                        style={{ height: "38px" }}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <div className="row align-items-center">
                  <Label check className="mr-auto ml-auto">
                    <Input
                      type="checkbox"
                      required
                      style={{ fontSize: "20px", color: "dodgerblue" }}
                      onClick={(e) => setAgree(!agree)}
                    />{" "}
                    Chấp nhận mọi điều khoản và chính sách
                  </Label>
                </div>
                <div className="row align-items-center mt-3">
                  <Button
                    color="primary"
                    className="mr-auto ml-auto btn btn-primary btn-login submit px-3"
                    onClick={handleSignUp}
                  >
                    {loading ? "Đang xử lý..." : "Đăng ký"}
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};
export default withRouter(StuRegister);
