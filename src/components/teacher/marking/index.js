import { Breadcrumb, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Button, Card, Col, Form, FormGroup, Input, Label } from "reactstrap";
import ProfileStudent from "../../ModalProfile/ProfileStudent";
import GlobalHeader from "../header";
import "../Teacher.css";
import {
  getComments,
  getImage,
  getOrder,
  getResults,
  putResults,
  saveResults,
} from "./api";

const { TabPane } = Tabs;

const ScoreEssay = (props) => {
  const url = window.location.href.split("=");
  const orderID = Number(url[1]);

  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const [loadSave2, setLoadSave2] = useState(false);
  const [loadDone2, setLoadDone2] = useState(false);

  const [studentID, setStudentID] = useState();
  const [student, setStudent] = useState("Không xác định");
  const [deadline, setDeadline] = useState("Không xác định");

  const [titleS, setTitleS] = useState();
  const [title, setTitle] = useState();
  const [base64Image, setBase64Image] = useState("");
  const [content, setContent] = useState();
  const [sentences, setSentences] = useState([]);
  const [comments, setComments] = useState([
    { sentence_index: 0, comment: "" },
  ]);

  const [commentOne, setCommentOne] = useState();

  const [grade, setGrade] = useState();
  const [gradeComment, setGradeComment] = useState();
  const [review, setReview] = useState();
  const [commentGeneral, setCommentGeneral] = useState();
  const [isCriteria, setIsCriteria] = useState();
  const [criteriaResults, setCriteriaResults] = useState([]);
  const [extraResults, setExtraResults] = useState([]);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  function handleChange(newValue) {
    setModal(newValue);
  }

  useEffect(() => {
    async function fetchData() {
      await getOrder(orderID, setStudentID, setStudent, setDeadline, setTitleS);
      getImage(orderID, setBase64Image);

      await getComments(orderID, setTitle, setContent, setSentences);

      await getResults(
        orderID,
        setIsCriteria,
        setGrade,
        setGradeComment,
        setReview,
        setCommentGeneral,
        setCriteriaResults,
        setExtraResults
      );
    }
    fetchData();
  }, [orderID, studentID]);

  const handleClickCapture = (e) =>
    comments.forEach((item, index) => {
      if (commentOne) {
        if (
          comments.length === 1 &&
          item.sentence_index === 0 &&
          item.comment === ""
        ) {
          comments.splice(index, 1);
        }
        var count = 0;
        if (item.sentence_index === current) {
          count++;
          comments.splice(index, 1);
        }
        if (
          count !== 0 ||
          index === comments.length - 1 ||
          comments.length === 0
        ) {
          setComments([
            ...comments,
            { sentence_index: current, comment: commentOne },
          ]);

          setCommentOne();
          return;
        }
      } else return;
    });

  const handleSaveResult = (e) => {
    setLoadSave2(true);
    saveResults(
      orderID,
      grade,
      gradeComment,
      review,
      commentGeneral,
      criteriaResults,
      extraResults,
      setLoadSave2
    );
  };

  const handleDoneResult = (e) => {
    setLoadDone2(true);
    putResults(
      props,
      orderID,
      grade,
      gradeComment,
      review,
      commentGeneral,
      criteriaResults,
      extraResults,
      setLoadDone2
    );
  };
  function getHighlightedText(text, highlight) {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
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
    );
  }
  const sentenceList = sentences.map((sentence) => (
    <>
      {current === sentence.sentence_index && (
        <div key={sentence.sentence_id}>
          <div className="col-7">
            <Tabs defaultActiveKey="2">
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
                <div className="scroll" style={{ height: "auto" }}>
                  <p>{getHighlightedText(content, sentence.sentence)}</p>
                </div>
              </TabPane>
            </Tabs>
          </div>
          <div className="col-5">
            <div style={{ marginBottom: "10px", textAlign: "center" }}>
              {current === 0 && (
                <>
                  <Button style={{ margin: "5px" }} outline disabled>
                    Câu trước đó
                  </Button>
                  <Button outline style={{ margin: "5px" }}>
                    Đặt lại
                  </Button>

                  <Button
                    style={{ margin: "5px" }}
                    outline
                    onClick={() => next()}
                    disabled={sentences.length - 1 === 0 ? true : false}
                    onClickCapture={handleClickCapture}
                  >
                    Câu tiếp theo
                  </Button>
                </>
              )}
              {current < sentences.length - 1 && current > 0 && (
                <>
                  <Button
                    outline
                    style={{ margin: "5px" }}
                    onClick={() => prev()}
                    onClickCapture={handleClickCapture}
                  >
                    Câu trước đó
                  </Button>
                  <Button outline style={{ margin: "5px" }}>
                    Đặt lại
                  </Button>
                  <Button
                    outline
                    style={{ margin: "5px" }}
                    onClick={() => next()}
                    onClickCapture={handleClickCapture}
                  >
                    Câu tiếp theo
                  </Button>
                </>
              )}
              {current === sentences.length - 1 && current !== 0 && (
                <>
                  <Button
                    outline
                    style={{ margin: "5px" }}
                    onClick={() => prev()}
                    onClickCapture={handleClickCapture}
                  >
                    Câu trước đó
                  </Button>
                  <Button outline style={{ margin: "5px" }}>
                    Đặt lại
                  </Button>
                  <Button outline disabled style={{ margin: "5px" }}>
                    Câu tiếp theo
                  </Button>
                </>
              )}
            </div>

            <Card
              style={{
                padding: "10px",
                backgroundColor: "#2bbaed",
                height: "505px",
              }}
            >
              <div key={sentence.sentence_index}>
                <strong>
                  #{sentence.sentence_index}: {sentence.sentence}
                </strong>
                <br />
                <Input
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
                  placeholder="Nhập lỗi cần chỉnh sửa và gợi ý câu mang tính học thuật hơn"
                  onChange={(e) => {
                    setCommentOne(e.target.value);
                    sentences[current].comment = e.target.value;
                  }}
                ></Input>
              </div>
              <div className="ml-auto mr-auto" style={{ marginTop: "10px" }}>
                <span
                  style={{
                    borderRadius: "5px",
                    backgroundColor: "red",
                    padding: "5px",
                    color: "white",
                  }}
                >
                  Hạn giao bài viết: {deadline}
                </span>
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  ));

  const criteriaResultsUI = criteriaResults.map((cri, index) => (
    <FormGroup row key={cri.criteria_id}>
      <Label for="task" sm={9} style={{ fontStyle: "italic" }}>
        {cri.criteria_name}
      </Label>
      <Col sm={3}>
        <Input
          disabled={!isCriteria}
          defaultValue={cri.criteria_score}
          type="number"
          name="task"
          id={cri.criteria_id}
          onChange={(e) =>
            (criteriaResults[index].criteria_score = e.target.value)
          }
        />
      </Col>
    </FormGroup>
  ));

  const extraResultsUI = extraResults.map((extra, index) => (
    <div key={index}>
      <strong>{extra.option_name}</strong>
      <Input
        type="textarea"
        id="generalComment"
        rows={7}
        defaultValue={extra.content}
        onChange={(e) => (extraResults[index].content = e.target.value)}
      ></Input>
    </div>
  ));

  const nameOfTeacher = (
    <>
      Người viết:{" "}
      <Button color="link" onClick={toggle}>
        {student}
      </Button>
    </>
  );

  return (
    <div className="teacher-page">
      <GlobalHeader />
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
                  <Breadcrumb.Item style={{ color: "white" }}>
                    Xem bài viết
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div className="row bg-row padding">
                <br />
                <h3
                  className="mt-auto mb-auto"
                  style={{ color: "white", fontWeight: "700" }}
                >
                  #{orderID} {titleS}...
                </h3>
              </div>
            </div>
            <div className="bg">
              <div
                className="shadow-background"
                style={{ backgroundColor: "white", padding: "10px" }}
              >
                <div
                  className="container-fluid"
                  style={{ marginBottom: "50px" }}
                >
                  <ProfileStudent
                    modal={modal}
                    id={studentID}
                    onClick={handleChange}
                  />
                  <Tabs defaultActiveKey="1" tabBarExtraContent={nameOfTeacher}>
                    <TabPane tab="Sửa lỗi" key="1">
                      <div
                        className="container-fluid mt-2"
                        style={{ fontSize: "medium", textAlign: "justify" }}
                      >
                        <div className="row ">{sentenceList}</div>
                      </div>
                    </TabPane>

                    <TabPane tab="Chấm điểm và đánh giá" key="2">
                      <div
                        className="container-fluid mt-2"
                        style={{ fontSize: "medium", textAlign: "justify" }}
                      >
                        <div className="row ">
                          <div className="col-7">
                            <strong>Đánh giá bài làm</strong>
                            <Input
                              type="textarea"
                              id="review"
                              rows={4}
                              placeholder="Nhập đánh giá chung cho bài viết"
                              defaultValue={review}
                              onChange={(e) => setReview(e.target.value)}
                            ></Input>
                            <br />
                            <strong>Nhận xét về bài làm</strong>
                            <Input
                              type="textarea"
                              id="generalComment"
                              rows={4}
                              placeholder="Nhập nhận xét chung cho bài viết"
                              defaultValue={commentGeneral}
                              onChange={(e) =>
                                setCommentGeneral(e.target.value)
                              }
                            ></Input>
                            <br />
                            {extraResultsUI}
                          </div>
                          <div className="col-5">
                            <div
                              className="mb-1"
                              style={{ textAlign: "center" }}
                            >
                              <Button
                                outline
                                style={{ margin: "5px" }}
                                color="primary"
                              >
                                Đặt lại
                              </Button>
                              <Button
                                outline
                                style={{ margin: "5px" }}
                                color="primary"
                                onClick={handleSaveResult}
                              >
                                {loadSave2 ? "Loading..." : "Lưu lại"}
                              </Button>
                              <Button
                                outline
                                style={{ margin: "5px" }}
                                color="primary"
                                onClick={handleDoneResult}
                              >
                                {loadDone2 ? "Loading..." : "Kết thúc chấm"}
                              </Button>
                            </div>
                            <Card
                              style={{
                                padding: "10px 30px ",
                                minHeight: "265px",
                              }}
                            >
                              <Form>
                                <FormGroup row>
                                  <strong>Điểm số</strong>
                                  <br />
                                  <Input
                                    type="number"
                                    defaultValue={grade}
                                    name="grade"
                                    id="grade"
                                    placeholder="Nhập điểm"
                                    onChange={(e) => setGrade(e.target.value)}
                                  />
                                </FormGroup>
                                <FormGroup row>
                                  <strong>Nhận xét về điểm</strong>
                                  <br />
                                  <Input
                                    type="textarea"
                                    defaultValue={gradeComment}
                                    rows="3"
                                    name="commentGrade"
                                    id="commentGrade"
                                    placeholder="Nhập Nhận xét"
                                    onChange={(e) =>
                                      setGradeComment(e.target.value)
                                    }
                                  />
                                </FormGroup>
                                {isCriteria === true && (
                                  <FormGroup row>
                                    <strong>Điểm thành phần</strong>
                                    <br />
                                  </FormGroup>
                                )}
                                {criteriaResultsUI}
                              </Form>
                            </Card>
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
      </div>
    </div>
  );
};

export default withRouter(ScoreEssay);
