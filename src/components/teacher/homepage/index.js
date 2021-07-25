import { Breadcrumb, Rate, Table, Tabs, Tag } from "antd";
import { React, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Button, Input } from "reactstrap";
import { formatMoney, showMessage } from "../../messageComponent";
import GlobalHeader from "../header";
import "../Teacher.css";
import {
  getDeadline,
  getOrders,
  getStatistics,
  getStatus,
  getTypes
} from "./api";
const { TabPane } = Tabs;

const HomeTeacher = (props) => {
  const rowSelection = useState([]);
  const [orders, setOrders] = useState([]);
  const [orders2, setOrders2] = useState([]);
  const [status, setStatus] = useState([]);
  const [statistics, setStatistics] = useState();
  const [statistic, setStatistic] = useState([]);
  const [deadline, setDeadline] = useState();
  const [types, setTypes] = useState([]);

  const [searchTitle, setSearchTitle] = useState();

  const [rating, setRating] = useState(0);
  useEffect(() => {
    async function fetchData() {
      getTypes(setTypes);

      getStatus(setStatus);

      getOrders(setOrders, setOrders2);

      getStatistics(setStatistic, setStatistics, setRating);

      getDeadline(setDeadline);
    }
    fetchData();
  }, []);

  const columnsEssay = [
    {
      title: "ID",
      dataIndex: "order_id",
      key: "order_id",
      width: 30,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.order_id - b.order_id,
    },
    {
      title: "Thể loại",
      dataIndex: ["essay", "type_id"],
      key: ["essay", "type_id"],
      width: 120,
      filters: [
        { text: "English Writing", value: 0 },
        { text: "IELTS WRITING TASK 1", value: 1 },
        { text: "IELTS WRITING TASK 2", value: 2 },
      ],
      onFilter: (value, record) => record.essay.type_id === value,
      render: (kind) => (
        <div style={{ color: "blue" }}>
          {types.find((typeEl) => typeEl.type_id === kind).type_name}
        </div>
      ),
    },
    {
      title: "Tiêu đề bài viết",
      dataIndex: ["essay", "title"],
      key: ["essay", "title"],
      width: 230,
      ellipsis: true,
    },

    {
      title: "Giá tiền",
      dataIndex: "total_price",
      key: "total_price",
      width: 50,
      sorter: (a, b) => a.total_price - b.total_price,
      render: (price) => {
        formatMoney(price);
      },
    },
    {
      title: "Hạn giao bài viết",
      fixed: "right",
      dataIndex: "deadline",
      key: "deadline",
      width: 110,
    },
    {
      title: "Tình trạng",
      fixed: "right",
      dataIndex: "status_id",
      key: "status_id",
      width: 100,
      filters: [
        { text: "On Going", value: 2 },
        { text: "Done", value: 3 },
        { text: "Cancelled", value: 4 },
      ],
      onFilter: (value, record) => record.status_id === value,
      render: (statu) => (
        <>
          {statu === 3 && (
            <Tag color="success">
              {status
                .find((el) => el.status_id === statu)
                .status_name.toUpperCase()}
            </Tag>
          )}
          {statu === 2 && (
            <Tag color="processing">
              {status
                .find((el) => el.status_id === statu)
                .status_name.toUpperCase()}
            </Tag>
          )}
          {statu === 4 && (
            <Tag color="error">
              {status
                .find((el) => el.status_id === statu)
                .status_name.toUpperCase()}
            </Tag>
          )}
        </>
      ),
    },
  ];

  const columns = [
    {
      title: "Số lượng",
      dataIndex: "total_orders",
      render: (total) => (
        <p style={{ color: "blue", textAlign: "center", fontSize: "20px" }}>
          {total}
        </p>
      ),
    },
    {
      title: "Đã chấm",
      dataIndex: "total_done",
      render: (score) => (
        <p style={{ color: "blue", textAlign: "center", fontSize: "20px" }}>
          {score}
        </p>
      ),
    },
  ];

  const columnsSchedule = [
    {
      title: "Ngày hôm nay",
      dataIndex: "today_deadline",
      render: (today) => (
        <p style={{ color: "blue", textAlign: "center", fontSize: "20px" }}>
          {today}
        </p>
      ),
    },
    {
      title: "Tuần này",
      dataIndex: "week_deadline",
      render: (week) => (
        <p style={{ color: "blue", textAlign: "center", fontSize: "20px" }}>
          {week}
        </p>
      ),
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
          <div className="container-fluid leftCol" key="leftCol">
            <div className="content-header-teacher padding" key="header">
              <div className="row bg-row margin padding" key="breadcrumb">
                <Breadcrumb className="mt-1" style={{ fontSize: "large" }}>
                  <Breadcrumb.Item key="homepage">
                    <a href="/Home" style={{ color: "white" }}>
                      Trang chủ
                    </a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item style={{ color: "white" }} key="essayManagement">
                    Quản lý bài viết
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div className="row bg-row padding" key="title">
                <br />
                <h3 className="content-header-teacher-title">
                  DANH SÁCH BÀI VIẾT
                </h3>
              </div>
            </div>
            <div
              className="content-teacher"
              style={{ backgroundColor: "transparent", padding: "10px" }}
              key="content"
            >
              <div
                className="container-fluid"
                style={{ backgroundColor: "white", padding: "20px" }}
              >
                <div className="row" key="search">
                  <div className="col col-8 mb-3 mt-3">
                    <Input
                      placeholder="Nhập đề bài viết bạn muốn tìm kiếm"
                      value={searchTitle}
                      onChange={(e) => setSearchTitle(e.target.value)}
                    />
                  </div>
                  <div className="col col-2 mb-auto mt-auto ">
                    <Button
                      outline
                      color="secondary"
                      block
                      onClick={handleReset}
                    >
                      Đặt lại
                    </Button>
                  </div>
                  <div className="col col-2 mb-auto mt-auto ">
                    <Button color="primary" block onClick={handleSearch}>
                      Tìm kiếm{" "}
                    </Button>
                  </div>
                </div>
                <div className="row mt-4" style={{ height: "auto" }} key="table">
                  <Table
                    rowKey={(order) => order.order_id}
                    columns={columnsEssay}
                    dataSource={orders}
                    pagination={{ pageSize: 5 }}
                    rowSelection={{ rowSelection }}
                    scroll={{ x: 1220 }}
                    onRow={(record) => {
                      return {
                        onClick: (event) => (
                          <>
                            {record.status_id === 2 &&
                              props.history.push(
                                "/HomeTeacherPage/ScoreEssay?order_id=" +
                                  record.order_id
                              )}
                            {record.status_id === 3 &&
                              props.history.push(
                                "/HomeTeacherPage/DetailResult?order_id=" +
                                  record.order_id
                              )}
                            {record.status_id === 4 &&
                              showMessage("Bài viết này đã bị hủy!", "info")}
                          </>
                        ),
                      };
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid rightCol" key="rightCol">
            <div className="row  margin" key="row1">
              <div className="card">
                <Button
                  className="btn-homepage"
                  color="primary"
                  href="/HomeTeacherPage/AddNewWriting"
                  block
                  large="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    fill="currentColor"
                    className="bi bi-file-earmark-plus-fill"
                    viewBox="0 0 16 16"
                    style={{ padding: "5px" }}
                  >
                    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0z" />
                  </svg>
                  <br />
                  Chấm bài viết mới
                </Button>

                <div className="card-body">
                  <div
                    style={{
                      fontSize: "large",
                      color: "#2596be",
                      fontWeight: "900",
                      paddingBottom: "5px",
                    }}
                  >
                    <i className="fa fa-info-circle fa-lg"> </i> Số lượng bài
                    viết đã đăng
                  </div>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
                <div>
                  <Tabs defaultActiveKey="1" style={{ padding: "10px" }}>
                    <TabPane tab="Deadline tuần này" key="1">
                      <Table
                        rowKey={deadline}
                        columns={columnsSchedule}
                        dataSource={deadline}
                        pagination={false}
                        size="small"
                        bordered
                      />
                    </TabPane>
                    <TabPane tab="Thống kê" key="2">
                      <Table
                        rowKey={statistic}
                        columns={columns}
                        style={{ textAlign: "center" }}
                        dataSource={statistic}
                        pagination={false}
                        size="small"
                        bordered
                      />
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </div>
            <div className="row shadow-background" key="row2">
              <Tabs
                defaultActiveKey="1"
                style={{
                  borderColor: "grey",
                  backgroundColor: "white",
                  padding: "10px",
                }}
              >
                <TabPane tab="Tổng thu tháng này" key="1">
                  <div className="row bg-row margin padding">
                    {statistics && (
                      <div className="container-fluid">
                        <div className="row ">
                          <div
                            className="col"
                            style={{ fontSize: "30px", fontStyle: "revert" }}
                          >
                            <span style={{ color: "orange" }}>
                              {formatMoney(statistics.monthly_payment)}
                            </span>{" "}
                            VND
                          </div>
                        </div>
                        <div className="row ">
                          <div
                            className="col padding"
                            style={{ fontSize: "18px" }}
                          >
                            So với tháng trước:{" "}
                            {statistics.gross > 0 && (
                              <i
                                className="fa fa-sort-up"
                                style={{ color: "forestgreen" }}
                              />
                            )}
                            {Math.round(statistics.gross) < 0 && (
                              <i
                                className="fa fa-sort-down"
                                style={{ color: "darkorange" }}
                              />
                            )}
                            {Math.round(statistics.gross)} %
                          </div>
                        </div>
                        <hr />
                        <div className="row ">
                          <div
                            className="col padding"
                            style={{ fontSize: "18px" }}
                          >
                            Mức chi trung bình theo bài: <br />
                            <span style={{ color: "green" }}>
                              {Number(
                                statistics.monthly_payment /
                                  statistics.monthly_orders
                              ).toLocaleString()}
                            </span>{" "}
                            đồng
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </TabPane>
                <TabPane tab="Đánh giá của học viên" key="2">
                  <div className="row bg-row margin padding">
                    <div className="container-fluid">
                      <div className="row ">
                        <Rate
                          style={{ margin: "5px 14px " }}
                          value={rating}
                          disabled
                        />
                        <p style={{ fontSize: "30px", fontStyle: "revert" }}>
                          {" " + rating} stars
                        </p>
                      </div>
                    </div>
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(HomeTeacher);
