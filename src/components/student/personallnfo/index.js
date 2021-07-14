import { PageHeader, Radio } from "antd";
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
    Table
} from "reactstrap";
import { showMessage } from "../../messageComponent";
import { getBaseURL, getToken } from "../../Utils/Common";
import { getGenders, getJobs, getPersonalInfo, getStatistic } from "./api";
import GlobalHeader from "./header";
import "./Student.css";

const api = getBaseURL();

const PersonalInfo = () => {
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
    async function fetchData() {
      getPersonalInfo(
        setMail,
        setName,
        setID,
        setBirthday,
        setAddress,
        setGender,
        setJobID,
        setPhone,
        setBase64Image
      );

      getJobs(setJobs);
      getGenders(setGenders);
      getStatistic(setStatistic);
    }
    fetchData();
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
    api
      .put(
        "/users/" + id,
        {
          name: name,
          address: address,
          date_of_birth: birthday,
          gender_id: gender,
          job_id: jobID,
          phone_number: phone,
        },
        {
          headers: { Authorization: "Bearer " + getToken() },
        }
      )
      .then((response) => {
        setLoadInfo(false);
        setEdit(true);
        showMessage("Thông tin của bạn đã được cập nhật!", "success");
      })
      .catch((error) => {
        if (error.response) {
          setLoadInfo(false);
          showMessage(error.response.data.detail, "error");
        }
      });
  };

  const handleChangeAvt = (e) => {
    setLoadAvt(true);
    api
      .put(
        "/avatars/" + id,
        {
          base64: base64Image,
        },
        {
          headers: { Authorization: "Bearer " + getToken() },
        }
      )
      .then(() => {
        setLoadAvt(false);
        setEditAvt(true);
        showMessage("Ảnh đại diện của bạn đã được cập nhật!", "success");
      })
      .catch((error) => {
        if (error.response) {
          setLoadAvt(false);
          if (error.response.status === 401 || error.response.status === 400) {
            showMessage(error.response.data.detail, "error");
          } else {
            showMessage(
              "Something went wrong. Please try again later!",
              "error"
            );
          }
        }
      });
  };

  const handleChangePass = (e) => {
    if (pass !== passA) {
      showMessage(
        "Mật khẩu chưa trùng khớp, vui lòng kiểm tra lại!",
        "warning"
      );
    } else {
      setLoadPass(true);
      api
        .put(
          "/change_password/me?new_password=" + pass.toString(),
          {},
          {
            headers: { Authorization: "Bearer " + getToken() },
          }
        )
        .then((response) => {
          setLoadPass(false);
          showMessage("Mật khẩu của bạn đã được cập nhật!", "success");
          setEditPass(true);
        })
        .catch((error) => {
          if (error.response) {
            setLoadPass(false);
            if (
              error.response.status === 401 ||
              error.response.status === 400
            ) {
              showMessage(error.response.data.detail, "error");
            } else {
              showMessage(
                "Something went wrong. Please try again later!",
                "error"
              );
            }
          }
        });
    }
  };

  return (
    <div className="student-page">
      <GlobalHeader />
      <div
        className="container-fluid detailPageStudent"
        style={{ height: window.innerHeight + "px" }}
      >
        <div className="row ">
          <div
            className="container-fluid centerCol"
            style={{ borderRadius: "10px" }}
          >
            <div
              className="row margin padding shadow-background personal-background-student"
              style={{ color: "white" }}
            >
              <PageHeader
                className="site-page-header"
                title={
                  <span style={{ color: "white" }}>THÔNG TIN CÁ NHÂN</span>
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
                        backgroundColor: "#2596be",
                        color: "white",
                        fontWeight: "400",
                      }}
                    >
                      Học viên
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
                            {loadAvt ? "Đang xử lý..." : "Lưu thay đổi"}
                          </Button>
                        </Col>
                        <Col sm="6">
                          <Button
                            color="info"
                            outline
                            block
                            onClick={(e) => setEditAvt(true)}
                          >
                            Trở lại
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </>
                ) : (
                  <div className="mt-2 ml-3 mr-3">
                    <Button
                      className="btn-student-link"
                      color="link"
                      outline
                      block
                      onClick={(e) => setEditAvt(false)}
                    >
                      Thay đổi ảnh đại diện
                    </Button>
                  </div>
                )}

                <div className="mt-2 ml-3 mr-3">
                  <Button
                    className="btn-student-link"
                    color="link"
                    outline
                    block
                    onClick={(e) => {
                      setEdit(false);
                      setEditPass(true);
                      setEditAvt(true);
                    }}
                  >
                    Thay đổi thông tin cá nhân
                  </Button>
                </div>
                <div className="mt-2 ml-3 mr-3">
                  <Button
                    className="btn-student-link"
                    color="link"
                    outline
                    block
                    onClick={(e) => {
                      setEditPass(false);
                      setEditAvt(true);
                      setEdit(true);
                    }}
                  >
                    Thay đổi mật khẩu
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
                            <Label for="id">Mã học sinh *</Label>
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
                            <Label for="fullname">Họ và tên *</Label>
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
                            <Label for="datebirth">Ngày tháng năm sinh *</Label>
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
                            <Label for="gender">Giới tính *</Label>
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
                            <Label for="address">Địa chỉ *</Label>
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
                            <Label for="job">Nghề nghiệp *</Label>
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
                            <Label for="tel">Số điện thoại *</Label>
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
                        {loadInfo ? "Đang xử lý..." : "Lưu lại"}
                      </Button>
                      <Button
                        color="primary"
                        outline
                        onClick={(e) => setEdit(true)}
                      >
                        Trở lại
                      </Button>
                    </div>
                  )}
                </div>

                {!editPass ? (
                  <div className="row  bg-row padding margin">
                    <h5>
                      <strong>Thay đổi mật khẩu</strong>
                    </h5>
                    <Container>
                      <Form>
                        <Row>
                          <Col xs="6">
                            <FormGroup style={{ fontSize: "17px" }}>
                              <Label for="password">Mật khẩu mới *</Label>
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
                                Nhập lại mật khẩu mới *
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
                        {loadInfo ? "Đang xử lý..." : "Lưu lại"}
                      </Button>
                      <Button
                        color="primary"
                        outline
                        onClick={(e) => setEditPass(true)}
                      >
                        Trở lại
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="row  bg-row padding margin">
                    <h5>
                      <strong>Thông tin hoạt động</strong>
                    </h5>
                    <br />
                    {statistic && (
                      <Table bordered>
                        <tr>
                          <th>Tổng số bài đăng</th>
                          <td>{statistic.total_orders} bài</td>
                        </tr>
                        <tr>
                          <th>Số bài được chấm</th>
                          <td>{statistic.total_done} bài</td>
                        </tr>
                        <tr>
                          <th>Tổng chi</th>
                          <td>{statistic.total_payment} VNĐ</td>
                        </tr>
                        <tr>
                          <th>Trung bình chi theo tháng</th>
                          <td>{statistic.monthly_payment} VNĐ</td>
                        </tr>
                        <tr>
                          <th>Tổng chi so với tháng trước</th>
                          <td>
                            {statistic.gross > 0 && (
                              <i
                                className="fa fa-sort-up"
                                style={{ color: "forestgreen" }}
                              />
                            )}
                            {statistic.gross < 0 && (
                              <i
                                className="fa fa-sort-down"
                                style={{ color: "darkorange" }}
                              />
                            )}
                            {statistic.gross} %
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
    </div>
  );
};

export default withRouter(PersonalInfo);
