import { Breadcrumb, Rate, Spin, Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Button, Card, Input } from "reactstrap";
import GlobalHeader from "../header";
import "../Teacher.css";
import {
  getComments,
  getOrders,
  getRatings,
  getResults,
  getSpellingErrors,
  postRatings,
} from "./api";

const { TabPane } = Tabs;

const DetailResult = () => {
  const url = window.location.href.split("=");
  const orderID = Number(url[1]);

  const [spinning, setSpinning] = useState(true);
  const [current, setCurrent] = useState(0);

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
  const [spelling, setSpelling] = useState([]);
  const [numSentence, setNumSentence] = useState();
  const [keyWords, setKeyWords] = useState([]);
  const [numErrors, setNumErrors] = useState();
  const [average, setAverage] = useState();

  const [rate, setRate] = useState(4);
  const [comment, setComment] = useState();
  const [response, setResponse] = useState(true);
  const [loadResponse, setLoadResponse] = useState(false);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  useEffect(() => {
    async function fetchData() {
      await getOrders(orderID, setTitle, setContent, setTitleS, setSpinning);

      await getSpellingErrors(
        orderID,
        setSpelling,
        setNumSentence,
        setAverage,
        setNumErrors,
        setKeyWords
      );

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

      await getComments(orderID, setSentences);

      await getRatings(orderID, setResponse, setRate, setComment);
    }
    fetchData();
  }, [orderID]);

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
      title: "V??? tr?? c??u",
      dataIndex: "sentence_index",
      key: "sentence_index",
      width: 100,
    },

    {
      title: "C??u sai",
      dataIndex: "sentence",
      key: "sentence",
      width: 520,
    },
    {
      title: "T??? sai",
      dataIndex: "word",
      key: "word",
      width: 180,
    },

    {
      title: "G???i ?? s???a",
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
    <div key={sentence.sentence_id} className="row">
      {current === sentence.sentence_index && (
        <>
          <div className="col-7">
            <strong>????? b??i</strong>
            <span>
              <p>{title}</p>
            </span>
            <strong>N???i dung b??i vi???t</strong>
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
                    C??u tr?????c ????
                  </Button>
                  <Button
                    style={{ margin: "5px" }}
                    outline
                    onClick={() => next()}
                    disabled={sentences.length - 1 === 0 ? true : false}
                  >
                    C??u ti???p theo
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
                    C??u tr?????c ????
                  </Button>
                  <Button
                    style={{ margin: "5px" }}
                    outline
                    onClick={() => next()}
                  >
                    C??u ti???p theo
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
                    C??u tr?????c ????
                  </Button>
                  <Button style={{ margin: "5px" }} outline disabled>
                    C??u ti???p theo
                  </Button>
                </>
              )}
            </div>

            <Card
              style={{
                padding: "10px",
                backgroundColor: "sky",
                Height: "505px",
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
        </>
      )}
    </div>
  ));

  const extraResultsUI = extraResults.map((extra, index) => (
    <div key={extra.extra_id}>
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
  const handleResponse = (e) => {
    setLoadResponse(true);
    postRatings(orderID, rate, comment, setResponse, setLoadResponse);
  };

  return (
    <div className="teacher-page">
      <GlobalHeader />
      <Spin spinning={spinning}>
        <div className="container-fluid detailPage">
          <div className="row" style={{ minHeight: window.innerHeight + "px" }}>
            <div className="container-fluid centerCol ">
              <div className="gradient-background-teacher padding">
                <div className="row bg-row margin padding ">
                  <Breadcrumb className="mt-1" style={{ fontSize: "large" }}>
                    <Breadcrumb.Item>
                      <a href="/Home">Trang ch???</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <a href="/HomeTeacherPage">Qu???n l?? b??i vi???t</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item style={{ color: "white" }}>
                      Xem b??i vi???t
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </div>
                <div className="row bg-row padding">
                  <br />
                  <h3 className="mt-auto mb-auto" style={{ color: "white" }}>
                    {" "}
                    #{orderID} {titleS}...
                  </h3>
                </div>
              </div>
              <div className="bg">
                <div
                  className="shadow-background"
                  style={{ backgroundColor: "white", padding: "10px" }}
                >
                  <div className="container-fluid">
                    <Tabs defaultActiveKey="1">
                      <TabPane tab="??i???m s??? v?? ????nh gi??" key="1">
                        <div
                          className="container-fluid mt-2"
                          style={{ fontSize: "medium", textAlign: "justify" }}
                        >
                          <div className="row ">
                            <div className="col-7">
                              <div className="margin">
                                <strong>????nh Gi??</strong>
                                <br />
                                <span style={{ color: "" }}>
                                  <p>{review}</p>
                                </span>
                              </div>
                              <div className="margin">
                                <strong>Nh???n x??t</strong>
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
                                <strong>??i???m s???</strong>
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
                                  <strong>??i???m th??nh ph???n</strong>
                                )}
                                {criteriaResultsUI}
                              </Card>
                            </div>
                          </div>
                        </div>
                      </TabPane>
                      <TabPane tab="S???a l???i t??? ?????ng" key="2">
                        <div
                          className="container-fluid mt-2"
                          style={{ fontSize: "medium", textAlign: "justify" }}
                        >
                          <div className="row ">
                            <div className="col-3">
                              <strong>T??? kh??a: </strong>
                              <p>{showKeyWords(keyWords)}</p>
                            </div>
                            <div className="col-2">
                              <strong>T???ng s??? c??u:</strong>
                              <p> {numSentence}</p>
                            </div>
                            <div className="col-5">
                              <strong> Chi???u d??i trung b??nh m???i c??u:</strong>
                              <p> {average}</p>
                            </div>
                            <div className="col-2">
                              <strong> T???ng s??? l???i:</strong>
                              <p> {numErrors}</p>
                            </div>
                          </div>

                          <Table
                            columns={columns}
                            dataSource={spelling}
                            pagination={{ pageSize: 8 }}
                          />
                        </div>
                      </TabPane>

                      <TabPane tab="S???a l???i" key="3">
                        <div
                          className="container-fluid mt-2"
                          style={{ fontSize: "medium", textAlign: "justify" }}
                        >
                          {sentenceList}
                        </div>
                      </TabPane>
                      <TabPane tab="Ph???n h???i" key="4">
                        <div style={{ height: "450px", textAlign: "center" }}>
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
                          <span style={{ padding: "10px", fontSize: "20px" }}>
                            B???n c?? th??ch b??i ch???m n??y kh??ng? <br />
                            H??y ????nh gi?? v?? b??nh lu???n ????? t??i c?? th??? ho??n thi???n
                            t???t h??n n???a nh??!
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
                              placeholder="Nh???p b??nh lu???n c???a b???n"
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
                              {loadResponse ? "??ang x??? l??..." : "G???i ph???n h???i"}
                            </Button>
                          )}
                        </div>
                      </TabPane>
                    </Tabs>
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

export default withRouter(DetailResult);
