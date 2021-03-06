import { PageHeader, Radio, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Table,
} from "reactstrap";
import { formatNumber, showMessage } from "../../commonFormat";
import GlobalHeader from "../header";
import "../Teacher.css";
import {
  getGenders,
  getJobs,
  getStatistics,
  getUserInfo,
  putAvatar,
  putPassword,
  putUsers,
} from "./api";

const PersonalInfoTea = () => {
  const [spinning, setSpinning] = useState(true);
  const [name, setName] = useState();
  const [id, setID] = useState();
  const [birthday, setBirthday] = useState();
  const [address, setAddress] = useState();
  const [gender, setGender] = useState();
  const [jobID, setJobID] = useState();
  const [phone, setPhone] = useState();
  const [mail, setMail] = useState();
  const [base64Image, setBase64Image] = useState("");

  const [jobs, setJobs] = useState([]);
  const [genders, setGenders] = useState([]);

  const [edit, setEdit] = useState(true);
  const [editAvt, setEditAvt] = useState(true);
  const [editPass, setEditPass] = useState(true);

  const [loadInfo, setLoadInfo] = useState(false);

  const [loadAvt, setLoadAvt] = useState(false);

  const [loadPass, setLoadPass] = useState(false);

  const [pass, setPass] = useState();
  const [passA, setPassA] = useState();
  const [statistic, setStatistic] = useState();

  useEffect(() => {
    getUserInfo(
      setMail,
      setName,
      setID,
      setBirthday,
      setAddress,
      setGender,
      setJobID,
      setPhone,
      setBase64Image,
      setSpinning
    );
    getJobs(setJobs);
    getGenders(setGenders);
    getStatistics(setStatistic);
  }, []);

  const jobsList = jobs.map((job) => (
    <option key={job.job_id} value={job.job_id}>
      {job.job_name}
    </option>
  ));

  const gendersList = genders.map((gender) => (
    <>
      {gender.gender_id === 1 && (
        <>
          <Radio value={gender.gender_id} key={gender.gender_id}>
            {gender.gender_name}
          </Radio>
          <br />
        </>
      )}
      {gender.gender_id !== 1 && (
        <Radio value={gender.gender_id} key={gender.gender_id}>
          {gender.gender_name}
        </Radio>
      )}
    </>
  ));
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    const a = base64.split(",");
    setBase64Image(a[1]);
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleChangeInfo = (e) => {
    setLoadInfo(true);
    putUsers(
      id,
      name,
      address,
      birthday,
      gender,
      jobID,
      phone,
      setLoadInfo,
      setEdit
    );
  };

  const handleChangeAvt = (e) => {
    setLoadAvt(true);
    putAvatar(id, base64Image, setEditAvt, setLoadAvt);
  };

  const handleChangePass = (e) => {
    if (pass !== passA) {
      showMessage(
        "M???t kh???u ch??a tr??ng kh???p, vui l??ng ki???m tra l???i!",
        "warning"
      );
    } else {
      setLoadPass(true);
      putPassword(pass, setLoadPass, setEditPass);
    }
  };

  return (
    <div className="teacher-page">
      <GlobalHeader />
      <Spin spinning={spinning}>
        <div
          className="container-fluid detailPageTeacher"
          style={{ height: window.innerHeight + "px" }}
        >
          <div className="row ">
            <div
              className="container-fluid centerCol"
              style={{ borderRadius: "10px" }}
            >
              <div
                className="row margin padding shadow-background personal-background-teacher"
                style={{ color: "white" }}
              >
                <PageHeader
                  className="site-page-header"
                  title={
                    <span style={{ color: "white" }}>TH??NG TIN C?? NH??N</span>
                  }
                />
              </div>
              <div className="row shadow-background">
                <div
                  className="col-4 padding "
                  style={{
                    backgroundColor: "white",
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  <img
                    style={{ borderRadius: "10px", marginTop: "50px" }}
                    src={`data:image/jpeg;base64,${base64Image}`}
                    height="273px"
                    width="273px"
                    className="ml-3"
                    alt="Avatar"
                  ></img>

                  <div style={{ padding: "20px", marginTop: "10px" }}>
                    <h3 style={{ fontWeight: "900" }}>{name}</h3>
                    <h6>
                      <span
                        style={{
                          padding: "5px",
                          borderRadius: "5px",
                          backgroundColor: "orange",
                          color: "white",
                          fontWeight: "400",
                        }}
                      >
                        Gi??o vi??n{" "}
                      </span>{" "}
                    </h6>
                  </div>
                  {!editAvt ? (
                    <>
                      <div className="mt-2 ml-3 mr-3">
                        <Input
                          type="file"
                          onChange={(e) => {
                            uploadImage(e);
                          }}
                          accept="image/*"
                        />
                      </div>
                      <div className="mt-2 mb-3 ml-3 mr-3">
                        <Row>
                          <Col sm="6">
                            <Button
                              color="info"
                              outline
                              block
                              onClick={handleChangeAvt}
                            >
                              {loadAvt ? "??ang x??? l??..." : "L??u thay ?????i"}
                            </Button>
                          </Col>
                          <Col sm="6">
                            <Button
                              color="info"
                              outline
                              block
                              onClick={(e) => setEditAvt(true)}
                            >
                              Tr??? l???i
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </>
                  ) : (
                    <div className="mt-2 ml-3 mr-3">
                      <Button
                        className="btn-teacher-link"
                        color="link"
                        outline
                        block
                        onClick={(e) => setEditAvt(false)}
                      >
                        Thay ?????i ???nh ?????i di???n
                      </Button>
                    </div>
                  )}

                  <div className="mt-2 ml-3 mr-3">
                    <Button
                      className="btn-teacher-link"
                      color="link"
                      outline
                      block
                      onClick={(e) => {
                        setEdit(false);
                        setEditPass(true);
                        setEditAvt(true);
                      }}
                    >
                      Thay ?????i th??ng tin c?? nh??n
                    </Button>
                  </div>
                  <div className="mt-2 ml-3 mr-3">
                    <Button
                      className="btn-teacher-link"
                      color="link"
                      outline
                      block
                      onClick={(e) => {
                        setEditPass(false);
                        setEditAvt(true);
                        setEdit(true);
                      }}
                    >
                      Thay ?????i m???t kh???u
                    </Button>
                  </div>
                </div>
                <div
                  className="col-8 padding "
                  style={{ backgroundColor: "white" }}
                >
                  <div className="row  bg-row padding">
                    <Container>
                      <Form>
                        <Row>
                          <Col xs="6">
                            <FormGroup style={{ fontSize: "17px" }}>
                              <Label for="id">M?? Gi??o vi??n *</Label>
                              <Input
                                type="text"
                                name="id"
                                id="id"
                                disabled
                                value={id}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs="6">
                            <FormGroup style={{ fontSize: "17px" }}>
                              <Label for="fullname">H??? v?? t??n *</Label>
                              <Input
                                style={{ backgroundColor: "white" }}
                                type="text"
                                name="fullname"
                                id="fullname"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={edit}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs="6">
                            <FormGroup style={{ fontSize: "17px" }}>
                              <Label for="datebirth">
                                Ng??y th??ng n??m sinh *
                              </Label>
                              <Input
                                style={{ backgroundColor: "white" }}
                                type="date"
                                name="datebirth"
                                id="datebirth"
                                required
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                disabled={edit}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs="6">
                            <FormGroup style={{ fontSize: "17px" }}>
                              <Label for="gender">Gi???i t??nh *</Label>
                              <br />
                              <Radio.Group
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                disabled={edit}
                              >
                                {gendersList}
                              </Radio.Group>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs="6">
                            <FormGroup style={{ fontSize: "17px" }}>
                              <Label for="gmail">Gmail *</Label>
                              <Input
                                type="email"
                                name="gmail"
                                id="gmail"
                                required
                                value={mail}
                                onChange={(e) => setMail(e.target.value)}
                                disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col xs="6">
                            <FormGroup style={{ fontSize: "17px" }}>
                              <Label for="address">?????a ch??? *</Label>
                              <Input
                                style={{ backgroundColor: "white" }}
                                type="text"
                                name="address"
                                id="address"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                disabled={edit}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs="6">
                            <FormGroup style={{ fontSize: "17px" }}>
                              <Label for="job">Ngh??? nghi???p *</Label>
                              <Input
                                style={{ backgroundColor: "white" }}
                                type="select"
                                name="carrier"
                                id="carrier"
                                required
                                value={jobID}
                                onChange={(e) => setJobID(e.target.value)}
                                disabled={edit}
                              >
                                {jobsList}
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col xs="6">
                            <FormGroup style={{ fontSize: "17px" }}>
                              <Label for="tel">S??? ??i???n tho???i *</Label>
                              <Input
                                style={{ backgroundColor: "white" }}
                                type="tel"
                                name="tel"
                                id="tel"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                disabled={edit}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form>
                    </Container>
                    {!edit && (
                      <div className=" mt-2 mr-3 ml-auto">
                        <Button
                          color="primary"
                          outline
                          onClick={handleChangeInfo}
                          style={{ margin: "0px 7px" }}
                        >
                          {loadInfo ? "??ang x??? l??..." : "L??u l???i"}
                        </Button>
                        <Button
                          color="primary"
                          outline
                          onClick={(e) => setEdit(true)}
                        >
                          Tr??? l???i
                        </Button>
                      </div>
                    )}
                  </div>

                  {!editPass ? (
                    <div className="row  bg-row padding margin">
                      <h5>
                        <strong>Thay ?????i m???t kh???u</strong>
                      </h5>
                      <Container>
                        <Form>
                          <Row>
                            <Col xs="6">
                              <FormGroup style={{ fontSize: "17px" }}>
                                <Label for="password">M???t kh???u m???i *</Label>
                                <Input
                                  type="password"
                                  name="password"
                                  id="password"
                                  required
                                  onChange={(e) => setPass(e.target.value)}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs="6">
                              <FormGroup style={{ fontSize: "17px" }}>
                                <Label for="passwordAgain">
                                  Nh???p l???i m???t kh???u m???i *
                                </Label>
                                <Input
                                  type="password"
                                  name="passwordAgain"
                                  id="passwordAgain"
                                  required
                                  onChange={(e) => setPassA(e.target.value)}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Form>
                      </Container>
                      <div className=" mt-2 mr-3 ml-auto">
                        <Button
                          color="primary"
                          outline
                          style={{ margin: "0px 7px" }}
                          onClick={handleChangePass}
                        >
                          {loadPass ? "??ang x??? l??..." : "L??u l???i"}
                        </Button>
                        <Button
                          color="primary"
                          outline
                          onClick={(e) => setEditPass(true)}
                        >
                          Tr??? l???i
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="row  bg-row padding margin">
                      <h5>
                        <strong>Th??ng tin ho???t ?????ng</strong>
                      </h5>
                      <br />
                      {statistic && (
                        <Table bordered>
                          <tr>
                            <th>T???ng s??? ch???m</th>
                            <td>{formatNumber(statistic.total_orders)} b??i</td>
                          </tr>
                          <tr>
                            <th>S??? b??i ???? ch???m</th>
                            <td>{formatNumber(statistic.total_done)} b??i</td>
                          </tr>
                          <tr>
                            <th>T???ng thu</th>
                            <td>{formatNumber(statistic.total_payment)} VN??</td>
                          </tr>
                          <tr>
                            <th>Trung b??nh thu theo th??ng</th>
                            <td>
                              {formatNumber(statistic.monthly_payment)} VN??
                            </td>
                          </tr>
                          <tr>
                            <th>T???ng thu so v???i th??ng tr?????c</th>
                            <td>
                              {Math.round(statistic.gross) > 0 && (
                                <i
                                  className="fa fa-sort-up"
                                  style={{ color: "forestgreen" }}
                                />
                              )}
                              {Math.round(statistic.gross) < 0 && (
                                <i
                                  className="fa fa-sort-down"
                                  style={{ color: "darkorange" }}
                                />
                              )}
                              {Math.round(statistic.gross)} %
                            </td>
                          </tr>
                        </Table>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default withRouter(PersonalInfoTea);
