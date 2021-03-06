import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Modal,
} from "reactstrap";
import { Alert } from "antd";
import { withRouter } from "react-router-dom";
import { getBaseURL, setUserSession } from "../../Utils/Common";
import "./cardlogin.css";
import ForgotPassword from "./ForgotPassword";

const api = getBaseURL();

const style = {
  width: "15rem",
  borderRadius: "10px",
};

const imageStyle = {
  borderTopLeftRadius: "10px",
  borderTopRightRadius: "10px",
};

const CardLogin = (props) => {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const { image, nameCard, contentCard, linkSignUp } = props;
  const [modalForgotPass, setModalForgotPass] = useState(false);
  const [modal, setModal] = useState(false);

  const handleClose = () => {
    setAlert(false);
  };

  const handleLogin = (e) => {
    setLoading(true);
    e.preventDefault();

    api
      .post("/login", {
        username: gmail,
        password: password,
      })
      .then((response) => {
        setUserSession(response.data.access_token, response.data.token_type);
        api
          .get("/accounts/me", {
            headers: { Authorization: "Bearer " + response.data.access_token },
          })
          .then((response) => {
            setLoading(false);

            localStorage.setItem("roleID", response.data.role_id);
            const role = response.data.role_id;
            let linkSignIn = "/Home";
            if (role === 1) linkSignIn = "/HomeStudentPage";
            else if (role === 2) linkSignIn = "/HomeTeacherPage";
            else if (role === 0) linkSignIn = "/admin";
            props.history.push(linkSignIn);
          });
      })
      .catch((error) => {
        if (error.response) {
          setLoading(false);

          setAlert(true);
          setMessage("Wrong password or email");
        }
      });
  };

  const toggle = () => setModal(!modal);

  const toggleForgotPass = () => setModalForgotPass(!modalForgotPass);
  console.log('modelForgotPass: ', modalForgotPass);
  function handleOpenForgotPass(newValue) {
    setModalForgotPass(newValue);
  }
  return (
    <React.Fragment>
      <>
        <i style={{ cursor: "pointer" }} onClick={toggle}>
          <Card className="card-login" style={style}>
            <CardImg alt="..." src={image} top style={imageStyle}></CardImg>
            <CardBody>
              <CardTitle>{nameCard}</CardTitle>
              <CardText>{contentCard}</CardText>
            </CardBody>
          </Card>
        </i>
      </>

      <Modal
        isOpen={modal}
        toggle={toggle}
        onSubmit={handleLogin}
        onClosed={handleClose}
        className="modal-dialog"
      >
        <div className="row cardlogin">
          <div className="col-md-12 col-lg-12">
            <div className="wrap d-md-flex">
              <div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
                <div className="text w-100">
                  <h2>Ch??o m???ng ?????n v???i ScoreMyEssay</h2>
                  <p>Ban kh??ng c?? t??i kho???n?</p>
                  <a
                    href={linkSignUp}
                    className="btn btn-white btn-outline-white btn-login "
                  >
                    ????ng k??
                  </a>
                </div>
              </div>
              <div className="login-wrap p-4 p-lg-5">
                <div className="d-flex">
                  <div className="w-100">
                    <h3 className="mb-4">????ng nh???p </h3>
                  </div>
                </div>
                <form action="#" className="signin-form">
                  <div className="form-group form-group-login mb-3">
                    <label className="label" for="name">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-login"
                      placeholder="Email"
                      required
                      onChange={(e) => setGmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group form-group-login mb-3">
                    <label className="label" for="password">
                      M???t kh???u
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-login"
                      placeholder="Password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group form-group-login">
                    {alert && <Alert message={message} type="error" />}
                    <button
                      type="submit"
                      className="form-control form-control-login btn btn-primary btn-login submit px-3"
                    >
                      {loading ? "??ang x??? l??..." : "????ng nh???p"}
                    </button>
                  </div>
                  <div className="form-group form-group-login d-md-flex text-center">
                    <a onClick={toggleForgotPass} >
                      Forgot Password
                    </a>
                    <ForgotPassword
                      modal={modalForgotPass}
                      onClick={handleOpenForgotPass}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};
export default withRouter(CardLogin);
