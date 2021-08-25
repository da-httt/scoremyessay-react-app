import {
  Button,
  Col,
  Container,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";

const ForgotPassword = (props) => {
  const { modal } = props;
  const [openModal, setOpenModal] = useState();
  console.log(openModal);
  useEffect(() => {
    setOpenModal(modal);
  }, [setOpenModal, modal]);

  function handleClose() {
    props.onClick(openModal);
  }

  return (
    <Modal isOpen={openModal}>
      <ModalHeader>TÌM TÀI KHOẢN CỦA BẠN</ModalHeader>
      <ModalBody>
        <Container>
          <Form>
            <Row>
              <Col className="col-12" >
                <h6>Vui lòng nhập email của bạn để tìm kiếm tài khoản của bạn.</h6>
              </Col>
              <Col className="col-12">
                <Input
                  type="email"
                  name="email"
                  id="fullname"
                  style={{ backgroundColor: "white" }}
                />
              </Col>
            </Row>
          </Form>
        </Container>
      </ModalBody>
      <ModalFooter>
        <Button
          className="ml-auto"
          onClick={handleClose}
          onClickCapture={() => setOpenModal(!modal)}
        >
          Hủy
        </Button>
        <Button className="ml-2" color="primary">
          Tìm kiếm
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default withRouter(ForgotPassword);
