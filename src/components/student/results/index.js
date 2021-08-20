import { Breadcrumb, Rate, Spin, Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Button, Card, Input } from "reactstrap";
import GlobalHeader from "../header";
import ProfileTeacher from "../../ModalProfile/ProfileTeacher";
import {
  getComments,
  getOrderInfo,
  getRating,
  getResults,
  getSpellingErrors,
  postRating,
} from "./api";
import "../Student.css";

const { TabPane } = Tabs;

const DetailResultStu = () => {
  const url = window.location.href.split("=");
  const orderID = Number(url[1]);
  const [spinning, setSpinning] = useState(true);
  const [statusWriting, setStatusWriting] = useState();
  const [current, setCurrent] = React.useState(0);

  const [title, setTitle] = useState();
  const [titleS, setTitleS] = useState();
  const [content, setContent] = useState();
  const [grade, setGrade] = useState();
  const [gradeComment, setGradeComment] = useState();
  const [review, setReview] = useState();
  const [commentGeneral, setCommentGeneral] = useState();
  const [isCriteria, setIsCriteria] = useState();
  const [criteriaResults, setCriteriaResults] = useState([]);
  const [extraResults, setExtraResults] = useState([]);

  const [sentences, setSentences] = useState([]);
  const [teacher, setTeacher] = useState();
  const [teacherID, setTeacherID] = useState();
  const [spelling, setSpelling] = useState([]);
  const [numSentence, setNumSentence] = useState();
  const [numErrors, setNumErrors] = useState();
  const [keyWords, setKeyWords] = useState([]);
  const [average, setAverage] = useState();

  const [rate, setRate] = useState(4);
  const [comment, setComment] = useState();
  const [response, setResponse] = useState(true);
  const [loadResponse, setLoadResponse] = useState(false);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  function handleChange(newValue) {
    setModal(newValue);
  }

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  useEffect(() => {
    async function fetchData() {
      getOrderInfo(
        orderID,
        setTeacherID,
        setStatusWriting,
        setTitle,
        setContent,
        setTitleS,
        setTeacher,
        setSpinning
      );
      if (statusWriting === 3) {
        getSpellingErrors(
          orderID,
          setSpelling,
          setNumSentence,
          setAverage,
          setNumErrors,
          setKeyWords
        );
        getResults(
          orderID,
          setIsCriteria,
          setGrade,
          setGradeComment,
          setReview,
          setCommentGeneral,
          setCriteriaResults,
          setExtraResults
        );
        getComments(orderID, setSentences);
        getRating(orderID, setResponse, setRate, setComment);
      }
    }
    fetchData();
  }, [orderID, statusWriting]);

  const showKeyWords = (keyWords) => {
    let result = " ";
    for (let i = 0; i < keyWords.length; i++) {
      result = result + keyWords[i];
      if (i !== keyWords.length - 1) {
        result += ", ";
      }
    }
    return result;
  };
  const columns = [
    {
      title: "Vị trí câu",
      dataIndex: "sentence_index",
      key: "sentence_index",
      width: 100,
    },

    {
      title: "Câu sai",
      dataIndex: "sentence",
      key: "sentence",
      width: 520,
    },
    {
      title: "Từ sai",
      dataIndex: "word",
      key: "word",
      width: 180,
    },

    {
      title: "Gợi ý sửa",
      dataIndex: "suggested_word",
      key: "suggested_word",
      width: 180,
    },
  ];
  const criteriaResultsUI = criteriaResults.map((cri) => (
    <p key={cri.criteria_id}>
      {cri.criteria_name} : {cri.criteria_score}
    </p>
  ));

  function getHighlightedText(text, highlight) {
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <div aria-hidden="true">
        <span className="white">
          {" "}
          {parts.map((part, i) => (
            <span
              key={i}
              style={
                part.toLowerCase() === highlight.toLowerCase()
                  ? { color: "red" }
                  : {}
              }
            >
              {part}
            </span>
          ))}{" "}
        </span>
      </div>
    );
  }

  const sentenceList = sentences.map((sentence) => (
    <>
      {current === sentence.sentence_index && (
        <div key={sentence.sentence_id} className="row">
          <div className="col-7">
            <strong>Đề bài</strong>
            <span>
              <p>{title}</p>
            </span>
            <strong>Nội dung bài viết</strong>
            <br />
            <div className="scroll">
              {getHighlightedText(content, sentence.sentence)}
            </div>
          </div>
          <div className="col-5">
            <div style={{ marginBottom: "10px", textAlign: "center" }}>
              {current === 0 && (
                <>
                  <Button style={{ margin: "5px" }} outline disabled>
                    Câu trước đó
                  </Button>
                  <Button
                    style={{ margin: "5px" }}
                    outline
                    onClick={() => next()}
                    disabled={sentences.length - 1 === 0 ? true : false}
                  >
                    Câu tiếp theo
                  </Button>
                </>
              )}
              {current < sentences.length - 1 && current > 0 && (
                <>
                  <Button
                    style={{ margin: "5px" }}
                    outline
                    onClick={() => prev()}
                  >
                    Câu trước đó
                  </Button>
                  <Button
                    style={{ margin: "5px" }}
                    outline
                    onClick={() => next()}
                  >
                    Câu tiếp theo
                  </Button>
                </>
              )}
              {current === sentences.length - 1 && current !== 0 && (
                <>
                  <Button
                    style={{ margin: "5px" }}
                    outline
                    onClick={() => prev()}
                  >
                    Câu trước đó
                  </Button>
                  <Button style={{ margin: "5px" }} outline disabled>
                    Câu tiếp theo
                  </Button>
                </>
              )}
            </div>

            <Card
              style={{
                padding: "10px",
                backgroundColor: "sky",
                height: "505px",
              }}
            >
              <div key={sentence.sentence_index}>
                <strong>
                  #{sentence.sentence_index}: {sentence.sentence}
                </strong>
                <br />
                <Input
                  disable
                  type="textarea"
                  rows="12"
                  name="fix"
                  id={sentence.sentence_index}
                  style={{
                    marginTop: "10px",
                    backgroundColor: "white",
                    resize: "none",
                    padding: "5px",
                  }}
                  value={sentence.comment}
                  disabled
                ></Input>
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  ));

  const extraResultsUI = extraResults.map((extra, index) => (
    <>
      <strong>{extra.option_name}</strong>
      <Input
        type="textarea"
        id="generalComment"
        rows={7}
        defaultValue={extra.content}
        style={{ resize: "none" }}
        disabled
        onChange={(e) => (extraResults[index].content = e.target.value)}
      ></Input>
    </>
  ));
  const handleResponse = (e) => {
    setLoadResponse(true);
    postRating(orderID, rate, comment, setResponse, setLoadResponse);
  };
  const nameOfTeacher = (
    <>
      Người chấm:{" "}
      <Button color="link" onClick={toggle}>
        {teacher}
      </Button>
    </>
  );
  return (
    <div className="student-page">
      <GlobalHeader />
      <Spin spinning={spinning}>
        <div className="container-fluid detailPage">
          <div className="row" style={{ height: window.innerHeight + "px" }}>
            <div className="container-fluid centerCol ">
              <div
                className="gradient-background-student"
                style={{ padding: "10px" }}
              >
                <div className="row bg-row margin padding ">
                  <Breadcrumb className="mt-1" style={{ fontSize: "large" }}>
                    <Breadcrumb.Item>
                      <a href="/Home">Trang chủ</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <a href="/HomeStudentPage">Quản lý bài viết</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item style={{ color: "white" }}>
                      Xem bài viết
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </div>
                <div className="row bg-row padding">
                  <br />
                  <h3 className="mt-auto mb-auto" style={{ color: "white" }}>
                    {" "}
                    #{orderID} {titleS}
                  </h3>
                </div>
              </div>
              <div className="bg">
                <div
                  className="shadow-background"
                  style={{ backgroundColor: "white", padding: "10px" }}
                >
                  <div className="container-fluid">
                    {statusWriting === 3 && (
                      <>
                        <ProfileTeacher
                          modal={modal}
                          id={teacherID}
                          onClick={handleChange}
                        />
                        <Tabs
                          defaultActiveKey="1"
                          tabBarExtraContent={nameOfTeacher}
                        >
                          <TabPane tab="Điểm số và đánh giá" key="1">
                            <div
                              className="container-fluid mt-2"
                              style={{
                                marginBottom: "20px",
                                fontSize: "medium",
                                textAlign: "justify",
                              }}
                            >
                              <div className="row ">
                                <div className="col-7">
                                  <div className="margin">
                                    <strong>Đánh Giá</strong>
                                    <br />
                                    <span style={{ color: "" }}>
                                      <p>{review}</p>
                                    </span>
                                  </div>
                                  <div className="margin">
                                    <strong>Nhận xét</strong>
                                    <br />
                                    <span>
                                      <p>{commentGeneral}</p>
                                    </span>
                                  </div>
                                  <div className="margin">{extraResultsUI}</div>
                                </div>
                                <div className="col-5">
                                  <Card
                                    style={{
                                      minHeight: "150px",
                                      padding: "10px 30px ",
                                    }}
                                  >
                                    <strong>Điểm số</strong>
                                    <div className="container-fluid">
                                      <div
                                        className="row"
                                        style={{
                                          color: "green",
                                          paddingTop: "0px",
                                          fontSize: "75px",
                                        }}
                                      >
                                        {grade}
                                      </div>
                                      <div className="row">
                                        <p>{gradeComment}</p>
                                      </div>
                                    </div>
                                    {isCriteria === true && (
                                      <strong>Điểm thành phần</strong>
                                    )}
                                    {criteriaResultsUI}
                                  </Card>
                                </div>
                              </div>
                            </div>
                          </TabPane>
                          <TabPane tab="Sửa lỗi tự động" key="2">
                            <div
                              className="container-fluid mt-2"
                              style={{
                                fontSize: "medium",
                                textAlign: "justify",
                              }}
                            >
                              <div className="row">
                                <div className="col-3">
                                  <strong>Từ khóa: </strong>
                                  <p>{showKeyWords(keyWords)}</p>
                                </div>
                                <div className="col-2">
                                  <strong>Tổng số câu:</strong>
                                  <p> {numSentence}</p>
                                </div>
                                <div className="col-5">
                                  <strong>
                                    {" "}
                                    Chiều dài trung bình mỗi câu:
                                  </strong>
                                  <p> {average}</p>
                                </div>
                                <div className="col-2">
                                  <strong> Tổng số lỗi:</strong>
                                  <p> {numErrors}</p>
                                </div>
                              </div>

                              <Table
                                columns={columns}
                                dataSource={spelling}
                                pagination={{ pageSize: 4 }}
                              />
                            </div>
                          </TabPane>

                          <TabPane tab="Sửa lỗi" key="3">
                            <div
                              className="container-fluid mt-2"
                              style={{
                                fontSize: "medium",
                                textAlign: "justify",
                              }}
                            >
                              {sentenceList}
                            </div>
                          </TabPane>
                          <TabPane tab="Phản hồi" key="4">
                            <div
                              style={{ height: "450px", textAlign: "center" }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="100"
                                height="100"
                                fill="#2596be"
                                className="bi bi-mailbox"
                                viewBox="0 0 16 16"
                              >
                                <path d="M4 4a3 3 0 0 0-3 3v6h6V7a3 3 0 0 0-3-3zm0-1h8a4 4 0 0 1 4 4v6a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7a4 4 0 0 1 4-4zm2.646 1A3.99 3.99 0 0 1 8 7v6h7V7a3 3 0 0 0-3-3H6.646z" />
                                <path d="M11.793 8.5H9v-1h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.354-.146l-.853-.854zM5 7c0 .552-.448 0-1 0s-1 .552-1 0a1 1 0 0 1 2 0z" />
                              </svg>
                              <br></br>
                              <span
                                style={{ padding: "10px", fontSize: "20px" }}
                              >
                                Bạn có thích bài chấm này không? <br />
                                Hãy đánh giá và bình luận để tôi có thể hoàn
                                thiện tốt hơn nữa nhé!
                              </span>
                              <br></br>
                              <Rate
                                className="margin"
                                value={rate}
                                onChange={(value) => setRate(value)}
                                disabled={!response}
                              />
                              <br />
                              <div
                                className="mt-3 mb-3"
                                style={{ padding: "10px 100px 10px 100px" }}
                              >
                                <Input
                                  type="textarea"
                                  rows={5}
                                  placeholder="Nhập bình luận của bạn"
                                  value={comment}
                                  disabled={!response}
                                  onChange={(e) => setComment(e.target.value)}
                                />
                              </div>
                              {response && (
                                <Button
                                  outline
                                  color="primary"
                                  style={{ margin: "0% 40%" }}
                                  onClick={handleResponse}
                                >
                                  {loadResponse
                                    ? "Đang xử lý..."
                                    : "Gửi phản hồi"}
                                </Button>
                              )}
                            </div>
                          </TabPane>
                        </Tabs>
                      </>
                    )}
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

export default withRouter(DetailResultStu);
