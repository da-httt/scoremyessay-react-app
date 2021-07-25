import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { getBaseURL, getToken } from "../../../Utils/Common";
import { formatMoney, showMessage } from "../../messageComponent";
import "../Student.css";

const api = getBaseURL();
export const Invoice = (props) => {
  const [modalInvoice, setModalInvoice] = useState();

  const [loadingCredit, setLoadingCredit] = useState(false);
  function handleChange() {
    props.onClick(!props.modal);
  }

  function handleChangeWhenCallApi(isHasCard, infoCard) {
    props.onCallApi(false, isHasCard, infoCard, true);
  }

  useEffect(() => {
    setModalInvoice(props.modal);
  }, [props.modal]);

  const handlePaymentCreditCard = (e) => {
    setLoadingCredit(true);
    api
      .get("/credit_card/me", {
        headers: { Authorization: "Bearer " + getToken() },
      })
      .then((response) => {
        setLoadingCredit(false);
        if(response.data.provider !== null){
          
        if (response.data.balance < props.total) {
          setModalInvoice(!props.modal);
          showMessage(
            "Hiện tài khoản của bạn không đủ tiền! Vui lòng kiểm tra lại",
            "info"
          );
          handleChange();
        } else {
          handleChangeWhenCallApi(true, response.data);
        }
      }else{
        handleChangeWhenCallApi(false, response.data);
      }
      })
      .catch(() => {
        setLoadingCredit(false);
      });
  };

  return (
    <Modal isOpen={modalInvoice}>
      <ModalHeader>THÔNG TIN HÓA ĐƠN</ModalHeader>
      <ModalBody>
        <Container>
          <Form>
            <Row xs={12}>
              <Col xs={7}>
                <Card style={{ width: "450px" }}>
                  <CardHeader
                    style={{
                      fontSize: "large",
                      color: "#2596be",
                      fontWeight: "900",
                    }}
                  >
                    <i className="fa fa-cart-arrow-down fa-xl" /> Giỏ hàng
                  </CardHeader>
                  <CardBody>
                    <div className="container-fluid">
                      {props.type}
                      {props.optionScore}
                      {props.time}
                      <hr />
                      <div
                        className="row"
                        style={{
                          marginBottom: "20px",
                          fontSize: "20px",
                          color: "green",
                        }}
                      >
                        <div className="col col-7">Tổng:</div>
                        <div className="col" style={{ textAlign: "right" }}>
                          {formatMoney(props.total)} VNĐ
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col>
                <h5 style={{ marginTop: "100px", textAlign: "center" }}>
                  Lựa chọn hình thức thanh toán
                </h5>
                <br></br>
                <Button color="primary" block onClick={handlePaymentCreditCard}>
                  {loadingCredit ? "Loading..." : "CREDIT_CARD"}
                </Button>
                <Button color="warning" block disabled={true}>
                  VÍ MOMO
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          className="ml-auto"
          onClick={handleChange}
          onClickCapture={() => setModalInvoice(!props.modal)}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export const ContinuePayment = (props) => {
  const [modalContinue, setModalContinue] = useState();

  useEffect(() => {
    setModalContinue(props.modal);
  }, [props.modal]);

  function handleCancel() {
    props.onCancel(modalContinue);
  }

  function handleOk() {
    props.onOk();
    setModalContinue(!props.modal);
    props.onCancel(modalContinue);
  }
  return (
    <Modal isOpen={modalContinue}>
      <ModalHeader>THÔNG TIN TÀI KHOẢN</ModalHeader>
      <ModalBody style={{ width: "400px" }}>
        <div className="row" style={{ marginBottom: "20px" }}>
          <div className="col-6">Số tài khoản:</div>
          <div className="col-6" style={{ textAlign: "right" }}>
            {props.infoCard.account_no}
          </div>
        </div>
        <div className="row" style={{ marginBottom: "20px" }}>
          <div className="col-6">Chủ tài khoản:</div>
          <div className="col-6" style={{ textAlign: "right" }}>
            {props.infoCard.provider}
          </div>
        </div>
        <div className="row" style={{ marginBottom: "20px" }}>
          <div className="col-6">Tổng giá trị đơn hàng: </div>
          <div className="col-6" style={{ textAlign: "right" }}>
            {formatMoney(props.amount)} VNĐ
          </div>
        </div>

        <div style={{ color: "green", fontSize: "20px", textAlign: "center" }}>
          Bạn có muốn tiếp tục?
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          outline
          className="ml-auto"
          onClick={handleCancel}
          onClickCapture={() => setModalContinue(!props.modal)}
        >
          Cancel
        </Button>
        <Button color="primary" onClick={handleOk}>
          OK
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export const InputInfoCard = (props) => {
  const [modalInputCard, setModalInputCard] = useState();

  const [provider, setProvider] = useState();
  const [accountNo, setAccountNo] = useState();
  const [expiryDate, setExpiryDate] = useState();

  useEffect(() => {
    setModalInputCard(props.modal);
  }, [props.modal]);

  function handleCancel() {
    props.onCancel(modalInputCard);
  }

  function handleOk() {
    props.onOk(provider, accountNo, expiryDate);
    setModalInputCard(!props.modal);
    props.onCancel(modalInputCard);
  }
  return (
    <Modal isOpen={modalInputCard}>
      <ModalHeader>CẬP NHẬT THÔNG TIN TÀI KHOẢN</ModalHeader>
      <ModalBody style={{ width: "600px" }}>
        <FormGroup row>
          <Label for="provider" sm={3}>
            Tên chủ thẻ *
          </Label>
          <Col>
            <Input
              className="register-input"
              type="text"
              name="provider"
              id="provider"
              required
              onChange={(e) => setProvider(e.target.value)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="accountNo" sm={3}>
            Số tài khoản*
          </Label>
          <Col>
            <Input
              className="register-input"
              type="text"
              name="accountNo"
              id="accountNo"
              required
              onChange={(e) => setAccountNo(e.target.value)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="expiryDate" sm={3}>
            Ngày hết hạn *
          </Label>
          <Col>
            <Input
              className="register-input"
              type="date"
              name="expiryDate"
              id="expiryDate"
              required
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </Col>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button
          outline
          className="ml-auto"
          onClick={handleCancel}
          onClickCapture={() => setModalInputCard(!props.modal)}
        >
          Cancel
        </Button>
        <Button color="primary" onClick={handleOk}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};
