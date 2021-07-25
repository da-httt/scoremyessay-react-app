import { Breadcrumb, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Card, Input } from "reactstrap";
import { getTypes } from "../../api";
import { getBase64Image, getOptions, getOrderInfo } from "./api";
import GlobalHeader from "../header";
import "../Student.css";

const { TabPane } = Tabs;
const DetailRequirement = () => {
  const url = window.location.href.split("=");
  const orderID = Number(url[1]);

  const [title, setTitle] = useState();
  const [titleSub, setTitleSub] = useState();
  const [base64Image, setBase64Image] = useState("");
  const [content, setContent] = useState();
  const [level, setLevel] = useState(0);
  const [type, setType] = useState(0);
  const [optionsTotal, setOptionsTotal] = useState([]);

  const [sentDate, setSentdate] = useState();
  const [totalPrice, setTotalPrice] = useState("0 VNĐ");

  const [options, setOptions] = useState();
  const [types, setTypes] = useState();

  useEffect(() => {
    async function fetchData() {
      getOrderInfo(
        orderID,
        setSentdate,
        setTotalPrice,
        setOptionsTotal,
        setTitle,
        setTitleSub,
        setContent,
        setType,
        setLevel
      );

      getBase64Image(orderID, setBase64Image);

      getOptions(setOptions);

      getTypes(setTypes);
    }
    fetchData();
  }, [orderID]);
  const ShowType = () => {
    return (
      <div className="row" style={{ marginBottom: "20px" }}>
        <div className="col col-8" style={{ color: "#2596be " }}>
          {types ? types[type].type_name : ""}:
        </div>
        <div className="col" style={{ textAlign: "right" }}>
          {types ? Number(types[type].type_price).toLocaleString() : 0}
        </div>
      </div>
    );
  };
  const showOptions = optionsTotal.map((option) => (
    <div className="row" style={{ marginBottom: "20px" }} key={option.option_id}>
      <div className="col col-8">
        {options ? options[option].option_name : ""}:
      </div>
      <div className="col" style={{ textAlign: "right" }}>
        {options ? Number(options[option].option_price).toLocaleString() : ""}{" "}
      </div>
    </div>
  ));

  return (
    <div className="student-page">
      <GlobalHeader />
      <div
        className="container-fluid detailPageStudent padding"
        style={{ backgroundColor: "transparent" }}
      >
        <div className="row" style={{ height: window.innerHeight + "px" }}>
          <div className="container-fluid centerCol ">
            <div
              className="gradient-background-student "
              style={{ padding: "10px" }}
            >
              <div className="row bg-row margin padding ">
                <Breadcrumb className="mt-1">
                  <Breadcrumb.Item>
                    <a href="/Home">Trang chủ</a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <a href="/HomeStudentPage">Quản lý bài viết</a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item style={{ color: "white" }}>
                    Xem chi tiết bài viết
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div className="row bg-row padding">
                <br />
                <h3 className="mt-auto mb-auto  " style={{ color: "white" }}>
                  {" "}
                  #{orderID} {titleSub}...
                </h3>
              </div>
            </div>
            <div>
              <div
                className=" bg-row margin padding"
                style={{ backgroundColor: "white", padding: "10px" }}
              >
                <div
                  className="container-fluid mt-2"
                  style={{ textAlign: "justify" }}
                >
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
                          border: "none",
                          minHeight: "280px",
                          padding: "10px 30px ",
                          marginTop: "5px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "large",
                            color: "#2596be",
                            fontWeight: "900",
                          }}
                        >
                          <strong>YÊU CẦU BÀI</strong>
                        </div>
                        <div
                          className="mr-auto"
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
                            <ShowType />
                            {showOptions}
                            <hr />
                            <div
                              className="row"
                              style={{ marginBottom: "20px" }}
                            >
                              <strong className="ml-auto mr-3">
                                Tổng tiền:{" "}
                                <span style={{ color: "green" }}>
                                  {totalPrice}
                                </span>
                              </strong>
                            </div>
                          </div>
                        </Card>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(DetailRequirement);
