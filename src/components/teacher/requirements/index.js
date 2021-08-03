import { Breadcrumb, Spin, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Button, Card, Input } from "reactstrap";
import { getTypes } from "../../api";
import { formatNumber } from "../../commonFormat";
import ProfileStudent from "../../ModalProfile/ProfileStudent";
import GlobalHeader from "../header";
import "../Teacher.css";
import {
  getImage,
  getOptions,
  getOrdersWaiting,
  getUser,
  putReceiveOrder,
} from "./api";
const { TabPane } = Tabs;
const DetailReq = (props) => {
  const url = window.location.href.split("=");
  const orderID = Number(url[1]);

  const [spinning, setSpinning] = useState(true);
  const [loading, setLoading] = useState(false);
  const [teacherID, setTeacherID] = useState();

  const [title, setTitle] = useState();
  const [titleSub, setTitleSub] = useState();
  const [base64Image, setBase64Image] = useState("");
  const [content, setContent] = useState();
  const [type, setType] = useState(0);
  const [optionsTotal, setOptionsTotal] = useState([]);

  const [student, setStudent] = useState(" Không xác định");
  const [studentID, setStudentID] = useState();
  const [sentDate, setSentdate] = useState();
  const [totalPrice, setTotalPrice] = useState("0 VNĐ");

  const [options, setOptions] = useState([]);
  const [types, setTypes] = useState([]);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  function handleChange(newValue) {
    setModal(newValue);
  }

  useEffect(() => {
    async function fetchData() {
      await getOrdersWaiting(
        orderID,
        setStudentID,
        setStudent,
        setSentdate,
        setTotalPrice,
        setOptionsTotal,
        setTitle,
        setTitleSub,
        setContent,
        setType,
        setSpinning
      );

      getImage(orderID, setBase64Image);

      await getOptions(setOptions);

      getTypes(setTypes);

      await getUser(setTeacherID);
    }
    fetchData();
  }, [orderID]);
  function showType(id) {
    return types.map(
      (type) =>
        type.type_id === id && (
          <div className="row" style={{ marginBottom: "20px" }} key={id}>
            <div className="col col-7">{type.type_name}:</div>
            <div className="col" style={{ textAlign: "right" }}>
              {formatNumber(type.type_price)} VNĐ
            </div>
          </div>
        )
    );
  }
  const showOptions = optionsTotal.map((id) => {
    return options.map(
      (option) =>
        option.option_id === id && (
          <div className="row" style={{ marginBottom: "20px" }} key={id}>
            <div className="col col-7">{option.option_name}:</div>
            <div className="col" style={{ textAlign: "right" }}>
              {formatNumber(option.option_price)} VNĐ
            </div>
          </div>
        )
    );
  });

  const handleReceive = (e) => {
    setLoading(true);
    putReceiveOrder(orderID, teacherID, setLoading, props.history);
  };

  return (
    <div className="teacher-page">
      <GlobalHeader />
      <Spin spinning={spinning}>
        <div className="container-fluid detailPage">
          <div className="row" style={{ height: window.innerHeight + "px" }}>
            <div className="container-fluid centerCol ">
              <div className="gradient-background-teacher padding">
                <div className="row bg-row margin padding ">
                  <Breadcrumb className="mt-1" style={{ fontSize: "large" }}>
                    <Breadcrumb.Item>
                      <a href="/Home">Trang chủ</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <a href="/HomeTeacherPage">Quản lý bài viết</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <a href="/HomeTeacherPage/AddNewWriting">
                        Danh sách bài viết mới
                      </a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item style={{ color: "white" }}>
                      Nhận chấm bài mới
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </div>
                <div className="row bg-row padding">
                  <br />
                  <h3 className="mt-auto mb-auto" style={{ color: "white" }}>
                    {" "}
                    #{orderID} {titleSub}
                  </h3>
                </div>
              </div>

              <div className="bg">
                <div
                  className="shadow-background"
                  style={{ backgroundColor: "white" }}
                >
                  <div
                    className="container-fluid mt-2"
                    style={{ fontSize: "medium", textAlign: "justify" }}
                  >
                    <div className="row ">
                      <div className="ml-auto mr-3">
                        Người viết:{" "}
                        <Button color="link" onClick={toggle}>
                          {student}
                        </Button>
                      </div>
                      <ProfileStudent
                        modal={modal}
                        id={studentID}
                        onClick={handleChange}
                      />
                    </div>
                    <div className="row ">
                      <div className="col-7">
                        <Tabs defaultActiveKey="1">
                          <TabPane tab="Đề bài" key="1">
                            <Input
                              style={{ textAlign: "justify", resize: "none" }}
                              type="textarea"
                              name="title"
                              id="title"
                              disabled
                              rows="4"
                              defaultValue={title}
                            />
                            <br></br>
                            {base64Image && (
                              <img
                                src={`data:image/jpeg;base64,${base64Image}`}
                                width="563px"
                                alt="Title or Content"
                              ></img>
                            )}
                            <br />
                          </TabPane>
                          <TabPane tab="Nội dung bài viết" key="2">
                            <Input
                              style={{
                                marginTop: "10px",
                                minHeight: "500px",
                                textAlign: "justify",
                                resize: "none",
                              }}
                              type="textarea"
                              name="title"
                              id="title"
                              disabled
                              rows="10"
                              defaultValue={content}
                            />
                          </TabPane>
                        </Tabs>
                      </div>
                      <div className="col-5">
                        <Card
                          style={{
                            minHeight: "250px",
                            padding: "10px",
                            marginTop: "5px",
                          }}
                        >
                          <strong>YÊU CẦU BÀI</strong>
                          <div
                            className="ml-auto"
                            style={{ color: "grey", marginBottom: "5px" }}
                          >
                            Cập nhật lúc: {sentDate}
                          </div>

                          <Card
                            style={{
                              minHeight: "220px",
                              marginTop: "20px",
                              padding: "10px",
                            }}
                          >
                            <div className="container">
                              {showType(type)}
                              {showOptions}
                              <hr />
                              <div
                                className="row"
                                style={{ marginBottom: "20px" }}
                              >
                                <strong className="ml-auto mr-3">
                                  Tổng tiền:{" "}
                                  <span style={{ color: "green" }}>
                                    {formatNumber(totalPrice)} VNĐ
                                  </span>
                                </strong>
                              </div>
                            </div>
                          </Card>
                          <div className="ml-auto">
                            <Button
                              outline
                              color="primary"
                              block
                              style={{ padding: "0px 20px" }}
                              onClick={handleReceive}
                            >
                              {loading ? "Đang xử lý..." : "Nhận chấm"}
                            </Button>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default withRouter(DetailReq);
