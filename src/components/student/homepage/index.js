import { Breadcrumb, Popconfirm, Table, Tag } from 'antd';
import { React, useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { Button, Input } from 'reactstrap';
import GlobalHeader from '../header';
import { getTypes } from '../api';
import '../Student.css';
import {
    deleteEssay,
    getOrders,
    getStatistic,
    getStatus,
    getTopUser
} from './api';
import './homepage.css';
import { columns, columnsUser } from './template';

const HomeStudent = () => {
  const rowSelection = useState([]);
  const [orders, setOrders] = useState([]);
  const [orders2, setOrders2] = useState([]);
  const [types, setTypes] = useState([]);
  const [status, setStatus] = useState([]);
  const [statistic, setStatistic] = useState();
  const [statistics, setStatistics] = useState();
  const [topUsers, setTopUsers] = useState([]);
  const [searchTitle, setSearchTitle] = useState();
  const history = useHistory();
  useEffect(() => {
    getTypes(setTypes);

    getStatus(setStatus);

    getOrders(setOrders, setOrders2);

    getStatistic(setStatistic, setStatistics);

    getTopUser(setTopUsers);
  }, []);

  const columnsEssay = [
    {
      title: "ID",
      dataIndex: "order_id",
      key: "order_id",
      width: 60,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.order_id - b.order_id,
    },
    {
      title: "Thể loại",
      dataIndex: ["essay", "type_id"],
      key: ["essay", "type_id"],
      width: 125,
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
      width: 130,
      sorter: (a, b) => a.topic_name.localeCompare(b.topic_name),
    },
    {
      title: "Đề bài",
      dataIndex: ["essay", "title"],
      key: ["essay", "title"],
      width: 310,
      ellipsis: true,
      sorter: (a, b) => a.essay.title.localeCompare(b.essay.title),
    },

    {
      title: "Thời gian cập nhật",
      dataIndex: "updated_date",
      key: "updated_date",
      width: 110,
    },
    {
      title: "Giá tiền",
      dataIndex: "total_price",
      key: "total_price",
      width: "100",
      render: (money) => Number(money).toLocaleString(),
      sorter: (a, b) => a.total_price - b.total_price,
    },
    {
      title: "Tình trạng",
      dataIndex: "status_id",
      fixed: "right",
      key: "status_id",
      filters: [
        { text: "On Going", value: 2 },
        { text: "Done", value: 3 },
        { text: "Cancelled", value: 4 },
      ],
      width: 120,
      onFilter: (value, record) => record.status_id === value,
      render: (s) => (
        <div>
          {s === 1 && status[s] && (
            <Tag>{status[s].status_name.toUpperCase()}</Tag>
          )}
          {s === 3 && status[s] && (
            <Tag color="success">{status[s].status_name.toUpperCase()}</Tag>
          )}
          {s === 2 && status[s] && (
            <Tag color="processing">{status[s].status_name.toUpperCase()}</Tag>
          )}
          {s === 4 && status[s] && (
            <Tag color="error">{status[s].status_name.toUpperCase()}</Tag>
          )}
        </div>
      ),
    },
    {
      title: "Action",
      fixed: "right",
      width: "250px",
      render: (_, record) =>
        orders.length >= 1 ? (
          <>
            <Button
              outline
              color="link"
              style={{ color: "rgb(8, 120, 148)", margin: "0px 0px" }}
              onClick={(event) =>
                history.push(
                  "/HomeStudentPage/DetailWriting?order_id=" + record.order_id
                )
              }
            >
              View
            </Button>
            {record.status_id === 3 && (
              <Button
                outline
                color="link"
                style={{ color: "green", margin: "0px 0px" }}
                onClick={(event) =>
                  history.push(
                    "/HomeStudentPage/DetailResult?order_id=" + record.order_id
                  )
                }
              >
                Result
              </Button>
            )}
            {(record.status_id === 1 || record.status_id === 2) && (
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => handleDelete(record.order_id)}
              >
                <Button
                  outline
                  color="link "
                  style={{ color: "red", margin: "0px 0px" }}
                >
                  Delete
                </Button>
              </Popconfirm>
            )}
          </>
        ) : null,
    },
  ];

  const handleDelete = (order_ID) => {
    deleteEssay(order_ID);
  };

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
    <div className="student-page">
      <GlobalHeader/>
      <div className="container-fluid detailPageStudent padding">
        <div class="row">
          <div className="container-fluid leftCol">
            <div className="content-header-student padding">
              <div className="row bg-row margin padding">
                <Breadcrumb
                  className="mt-1"
                  style={{ fontSize: "medium", color: "white" }}
                >
                  <Breadcrumb.Item>
                    <a style={{ color: "white" }} href="/Home">
                      Trang chủ
                    </a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item style={{ color: "white" }}>
                    Quản lý bài viết
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div className="row bg-row padding">
                <br />
                <h3 className="content-header-student-title">
                  Danh sách bài viết{" "}
                </h3>
              </div>
            </div>
            <div
              className="content-student bg-row "
              style={{ backgroundColor: "transparent", padding: "10px" }}
            >
              <div
                className="container-fluid"
                style={{ backgroundColor: "white", padding: "20px" }}
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
                <div className="row" style={{ height: "auto" }}>
                  <Table
                    rowKey={(order) => order.order_id}
                    columns={columnsEssay}
                    dataSource={orders}
                    pagination={{ pageSize: 5 }}
                    rowSelection={{ rowSelection }}
                    scroll={{ x: 1220 }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid rightCol">
            <div
              className="row bg-row"
              style={{ backgroundColor: "transparent" }}
            >
              <div class="card">
                <Button
                  className="btn-homepage"
                  color="primary"
                  href="/HomeStudentPage/AddNewWriting"
                  block
                  large
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
                  Thêm bài viết mới
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
                  <Table
                    columns={columns}
                    style={{ textAlign: "center" }}
                    dataSource={statistic}
                    pagination={false}
                    bordered
                  />
                </div>
              </div>
            </div>
            <div>
              <div
                className="row bg-row padding card"
                style={{ backgroundColor: "white", padding: "20px" }}
              >
                {statistics && (
                  <div className="container-fluid">
                    <div className="row ">
                      <div
                        style={{
                          fontSize: "large",
                          color: "#2596be",
                          fontWeight: "900",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ padding: "5px" }}
                          width="30"
                          height="30"
                          fill="currentColor"
                          class="bi bi-currency-exchange"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 5a5.002 5.002 0 0 0 4.027 4.905 6.46 6.46 0 0 1 .544-2.073C3.695 7.536 3.132 6.864 3 5.91h-.5v-.426h.466V5.05c0-.046 0-.093.004-.135H2.5v-.427h.511C3.236 3.24 4.213 2.5 5.681 2.5c.316 0 .59.031.819.085v.733a3.46 3.46 0 0 0-.815-.082c-.919 0-1.538.466-1.734 1.252h1.917v.427h-1.98c-.003.046-.003.097-.003.147v.422h1.983v.427H3.93c.118.602.468 1.03 1.005 1.229a6.5 6.5 0 0 1 4.97-3.113A5.002 5.002 0 0 0 0 5zm16 5.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0zm-7.75 1.322c.069.835.746 1.485 1.964 1.562V14h.54v-.62c1.259-.086 1.996-.74 1.996-1.69 0-.865-.563-1.31-1.57-1.54l-.426-.1V8.374c.54.06.884.347.966.745h.948c-.07-.804-.779-1.433-1.914-1.502V7h-.54v.629c-1.076.103-1.808.732-1.808 1.622 0 .787.544 1.288 1.45 1.493l.358.085v1.78c-.554-.08-.92-.376-1.003-.787H8.25zm1.96-1.895c-.532-.12-.82-.364-.82-.732 0-.41.311-.719.824-.809v1.54h-.005zm.622 1.044c.645.145.943.38.943.796 0 .474-.37.8-1.02.86v-1.674l.077.018z" />
                        </svg>
                        Tổng chi{" "}
                      </div>
                    </div>

                    <div className="row ">
                      <div
                        className="col"
                        style={{ fontSize: "30px", fontStyle: "revert" }}
                      >
                        <span style={{ color: "orange" }}>
                          {Number(statistics.monthly_payment).toLocaleString()}{" "}
                        </span>
                        VND
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col" style={{ fontSize: "16px" }}>
                        So với tháng trước:
                        <br />
                        {statistics.gross > 0 && (
                          <i
                            className="fa fa-sort-up"
                            style={{ color: "forestgreen" }}
                          ></i>
                        )}
                        {statistics.gross < 0 && (
                          <i
                            className="fa fa-sort-down"
                            style={{ color: "darkorange" }}
                          ></i>
                        )}
                        {statistics.gross} %
                      </div>
                    </div>
                    <hr />
                    <div className="row ">
                      <div className="col" style={{ fontSize: "16px" }}>
                        Mức chi trung bình:
                        <span style={{ color: "green" }}>
                          {" "}
                          {statistics.monthly_payment /
                            statistic[0].monthly_orders}
                        </span>{" "}
                        VND
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="row bg-row"
                style={{ backgroundColor: "transparent" }}
              >
                <div className="card">
                  <div className="card-body">
                    <div
                      style={{
                        fontSize: "large",
                        color: "#2596be",
                        fontWeight: "900",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        className="bi bi-bar-chart-fill"
                        viewBox="0 0 16 16"
                        style={{ padding: "5px" }}
                      >
                        <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z" />
                      </svg>
                      Xếp hạng người dùng{" "}
                    </div>
                    <Table
                      rowKey={(topUsers) => topUsers.user_id}
                      columns={columnsUser}
                      dataSource={topUsers}
                      pagination={{ pageSize: 2, total: 5 }}
                    />
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

export default withRouter(HomeStudent);
