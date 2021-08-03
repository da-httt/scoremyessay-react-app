import { Breadcrumb, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Button } from "reactstrap";
import GlobalHeader from "../header";
import "../Student.css";
import { getReview } from "./api";

const MyReviews = (props) => {

  const [spinning, setSpinning] = useState(true);
  const [reviews, setReviews] = useState();
  useEffect(() => {
    getReview(setReviews, setSpinning);
  }, []);

  const columns = [
    {
      title: "ID của bài viết",
      dataIndex: "order_id",
      width: 180,
    },

    {
      title: "Điểm sao",
      dataIndex: "stars",
      width: 180,
    },
    {
      title: "Bình luận & Nhận xét",
      dataIndex: "comment",
      width: 450,
      ellipsis: true,
    },
    {
      render: (_, record) =>
        reviews.length >= 1 ? (
          <Button
            outline
            color="primary"
            onClick={(event) =>
              props.history.push(
                "/HomeStudentPage/DetailResult?order_id=" + record.order_id
              )
            }
          >
            Chi tiết
          </Button>
        ) : null,
      width: 150,
    },
  ];

  return (
    <div className="student-page">
      <GlobalHeader />
      <Spin spinning={spinning}>
        <div className="container-fluid detailPage">
          <div className="row" style={{ height: window.innerHeight + "px" }}>
            <div className="container-fluid centerCol padding">
              <div className="gradient-background-student padding">
                <div className="row bg-row margin padding ">
                  <Breadcrumb className="mt-1" style={{ fontSize: "large" }}>
                    <Breadcrumb.Item>
                      <a style={{ color: "white" }} href="/Home">
                        Trang chủ
                      </a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item style={{ color: "white" }}>
                      Đánh giá của tôi
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </div>
                <div className="row bg-row padding">
                  <br />
                  <h3
                    className="mt-auto mb-auto"
                    style={{ color: "white", fontWeight: "700" }}
                  >
                    {" "}
                    ĐÁNH GIÁ CỦA TÔI
                  </h3>
                </div>
              </div>

              <div className="bg" style={{ backgroundColor: "white" }}>
                <div className="row bg-row margin padding">
                  <div className="container-fluid">
                    <Table
                      rowKey={(order) => order.order_id}
                      columns={columns}
                      dataSource={reviews}
                      pagination={{ pageSize: 5 }}
                    />
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

export default withRouter(MyReviews);
