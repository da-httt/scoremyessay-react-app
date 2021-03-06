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
          "M???t kh???u kh??ng tr??ng kh???p. H??y ki???m tra l???i m???t kh???u!",
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
            "B???n c???n ch???n ch???p nh???n m???i ??i???u kho???n v?? ch??nh s??ch!",
            "warning"
          );
        }
      }
    } else {
      showMessage(
        "B???n ch??a ??i???n ?????y ????? th??ng tin, vui l??ng ki???m tra l???i!",
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
                    ????ng k?? tr??? th??nh h???c vi??n
                  </h3>
                </div>
                <FormGroup>
                  <Label for="fullname">H??? v?? t??n *</Label>
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
                  <Label for="birthday">Ng??y, th??ng, n??m sinh *</Label>
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
                  <Label for="gender">Gi???i t??nh</Label>
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
                  <Label for="carrier">Ngh??? nghi???p hi???n t???i *</Label>
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
                  <Label for="tel">S??? ??i???n tho???i *</Label>
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
                  <Label for="address">?????a ch???</Label>
                  <Input
                    className="register-input"
                    type="text"
                    name="address"
                    id="address"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">M???t kh???u *</Label>
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
                  <Label for="password">Nh???p l???i m???t kh???u* </Label>
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
                    Ch???p nh???n m???i ??i???u kho???n v?? ch??nh s??ch
                  </Label>
                </div>
                <div className="row align-items-center mt-3">
                  <Button
                    color="primary"
                    className="mr-auto ml-auto btn btn-primary btn-login submit px-3"
                    onClick={handleSignUp}
                  >
                    {loading ? "??ang x??? l??..." : "????ng k??"}
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
