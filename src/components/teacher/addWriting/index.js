import { Breadcrumb, Table } from "antd";
import { React, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import {
    Button,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from "reactstrap";
import { getTypes } from "../../api";
import GlobalHeader from "../header";
import "../Teacher.css";
import { getOrdersWaiting } from "./api";

const AddWritingT = (props) => {
  const rowSelection = useState([]);
  const [orders, setOrders] = useState([]);

  const [types, setTypes] = useState([]);
  const [searchTitle, setSearchTitle] = useState();
  const [orders2, setOrders2] = useState([]);
  useEffect(() => {
    getTypes(setTypes);
    getOrdersWaiting(setOrders, setOrders2);
  }, []);

  const columnsEssay = [
    {
      title: "ID",
      dataIndex: "order_id",
      key: "order_id",
      width: 20,
    },
    {
      title: "Thể loại",
      dataIndex: ["essay", "type_id"],
      key: ["essay", "type_id"],
      width: 150,
      filters: [
        { text: "English Writing", value: 0 },
        { text: "IELTS WRITING TASK 1", value: 1 },
        { text: "IELTS WRITING TASK 2", value: 2 },
      ],
      onFilter: (value, record) => record.essay.type_id === value,
      render: (kind) => (
        <div style={{ color: "blue" }}>{types[kind].type_name}</div>
      ),
    },
    {
      title: "Chủ đề",
      dataIndex: "topic_name",
      key: "topic_name",
      width: 120,
    },
    {
      title: "Tiêu đề bài viết",
      dataIndex: ["essay", "title"],
      key: ["essay", "title"],
      width: 450,
      render: (title) => <div>{title.slice(0, 60)}...</div>,
    },
    {
      title: "Mức giá",
      dataIndex: "total_price",
      key: "total_price",
      width: 100,
      sorter: (a, b) => a.total_price - b.total_price,
    },
    {
      title: "Hạn giao bài viết",
      dataIndex: "deadline",
      key: "deadline",
      width: "auto",
    },
  ];

  const handleSearch = () => {
    setOrders(orders2);
    const filteredEvents = orders2.filter((order) => {
      const title = order.essay.title.toLowerCase();
      return title.includes(searchTitle.toLowerCase());
    });
    setOrders(filteredEvents);
  };

  const handleReset = () => {
    setSearchTitle("");
    setOrders(orders2);
  };

  return (
    <div className="teacher-page">
      <GlobalHeader />

      <div className="container-fluid detailPage">
        <div className="row" style={{ minHeight: window.innerHeight + "px" }}>
          <div className="container-fluid centerCol">
            <div className="content-header-teacher padding">
              <div className="row bg-row margin padding">
                <Breadcrumb className="mt-1" style={{ fontSize: "large" }}>
                  <Breadcrumb.Item>
                    <a href="/Home">Trang chủ</a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <a href="/HomeTeacherPage">Quản lý bài viết</a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item style={{ color: "white" }}>
                    Danh sách bài viết mới{" "}
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div className="row bg-row padding">
                <br />
                <div className="col-8" style={{ textAlign: "left" }}>
                  <h3 style={{ color: "white", fontWeight: "700" }}>
                    DANH SÁCH BÀI VIẾT MỚI
                  </h3>
                </div>
                <div className="col-4 ">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Chủ Đề</InputGroupText>
                    </InputGroupAddon>
                    <Input type="select">
                      <option>SCIENCE {"&"} TECH</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Input>
                  </InputGroup>
                </div>
              </div>
            </div>
            <div
              className=" shadow-background"
              style={{ backgroundColor: "transparent" }}
            >
              <div
                className="container-fluid "
                style={{ backgroundColor: "white" }}
              >
                <div className="row ">
                  <div className="col col-7 mb-3 mt-3">
                    <Input
                      id="search"
                      name="search"
                      placeholder="Nhập đề bài viết bạn muốn tìm kiếm"
                      value={searchTitle}
                      onChange={(e) => setSearchTitle(e.target.value)}
                    />
                  </div>
                  <div className="col col-2 mb-auto mt-auto ">
                    <Button
                      className="btn-homepage"
                      color="primary"
                      block
                      onClick={handleSearch}
                    >
                      Tìm kiếm
                    </Button>
                  </div>
                  <div className=" mb-auto mt-auto ">
                    <Button
                      className="btn-homepage btn-primary btn-outline-primary"
                      outline
                      color="primary"
                      block
                      onClick={handleReset}
                    >
                      Đặt lại
                    </Button>
                  </div>
                </div>
                <div className="row " style={{ padding: "10px" }}>
                  <Table
                    style={{ width: "auto", minWidth: "unset" }}
                    rowKey={(order) => order.order_id}
                    columns={columnsEssay}
                    dataSource={orders}
                    pagination={{ pageSize: 5 }}
                    rowSelection={{ rowSelection }}
                    onRow={(record) => {
                      return {
                        onClick: (event) =>
                          props.history.push(
                            "/HomeTeacherPage/DetailRequirement?order_id=" +
                              record.order_id
                          ),
                      };
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(AddWritingT);
