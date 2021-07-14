import './Teacher.css';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, FormGroup, Input, Label, Form, Alert } from 'reactstrap';
import GlobalHeader from './GlobalHeaderComponentT';
import { Breadcrumb, Tabs } from 'antd';
import { withRouter } from 'react-router-dom';
import { getBaseURL, getToken, getTokenType } from '../../Utils/Common';
import ProfileStudent from '../ModalProfile/ProfileStudent';

const { TabPane } = Tabs;

const api = getBaseURL();

const ScoreEssay = (props) => {
    const url = window.location.href.split('=');
    const orderID = Number(url[1]);

    const [current, setCurrent] = React.useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };
    const [show, setShow] = useState(false);
    const [error, setError] = useState(null);
    const [colorAlert, setColorAlert] = useState("warning");
    // const [loadSave, setLoadSave] = useState(false);

    const [show2, setShow2] = useState(false);
    const [error2, setError2] = useState(null);
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
    const [comments, setComments] = useState([{ sentence_index: 0, comment: "" }]);

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

            await api.get('/orders/' + orderID, {
                headers: { Authorization: getTokenType() + ' ' + getToken() }
            }).then(response => {
                const order = response.data;
                setStudentID(order.student_id);
                api.get('/users/' + order.student_id, {
                    headers: { Authorization: getTokenType() + ' ' + getToken() }
                }).then(response => {
                    setStudent(response.data.name);
                })
                setDeadline(order.deadline);
                setTitleS(order.essay.title.slice(0, 65));

            });
            api.get('/orders/image/' + orderID, {
                headers: { Authorization: 'Bearer ' + getToken() }
            }).then(response => {
                setBase64Image(response.data.image_base64);
            })

            await api.get('/essay_comments/' + orderID, {
                headers: { Authorization: getTokenType() + ' ' + getToken() }
            }).then(response => {
                const data = response.data;
                setTitle(data.title);
                setContent(data.content);
                setSentences(data.essay_comments);

            });

            await api.get('/results/' + orderID, {
                headers: { Authorization: getTokenType() + ' ' + getToken() }
            }).then(response => {
                const data = response.data;
                setIsCriteria(data.isCriteria);
                setGrade(data.grade);
                setGradeComment(data.grade_comment);
                setReview(data.review);
                setCommentGeneral(data.comment);
                if (data.criteria_results !== null)
                    setCriteriaResults(data.criteria_results);
                if (data.extra_results !== null)
                    setExtraResults(data.extra_results);


            });

        }
        fetchData();
    }, [orderID, studentID]);


    const handleClickCapture = (e) => comments.forEach((item, index) => {

        if (commentOne) {
            if (comments.length === 1 && item.sentence_index === 0 && item.comment === "") {
                comments.splice(index, 1);
            }
            var count = 0;
            if (item.sentence_index === current) {
                count++;
                comments.splice(index, 1);
            }
            if (count !== 0 || index === (comments.length - 1) || comments.length === 0) {
                console.log(1);

                setComments([...comments, { sentence_index: current, comment: commentOne }]);

                setCommentOne();
                return
            }
        }
        else return;
    })


    // const handleSaveComment = (e) => {
    //     setLoadSave(true);
    //     api.put('/essay_comments/' + orderID, {
    //         comments: comments
    //     },
    //         {
    //             headers: { 'Authorization': 'Bearer ' + getToken() },
    //         }).then(response => {
    //             setLoadSave(false);
    //             setShow(true);
    //             setColorAlert("success");
    //             alert("Bài chấm của bạn đã được lưu lại, hãy chuyển sang phần chẩm điểm & đánh giá!");
    //         }).catch((error) => {
    //             if (error.response) {
    //                 setLoadSave(false);
    //                 setShow(true);
    //                 setColorAlert("danger");
    //                 setError(error.response.data.detail);
    //             }
    //         })
    // }

    const handleSaveResult = (e) => {
        setLoadSave2(true);
        api.put('/results/' + orderID + '?status_id=2', {
            "grade": 9,
            "grade_comment": gradeComment,
            "review": review,
            "comment": commentGeneral,
            "criteria_results": criteriaResults,
            "extra_results": extraResults
        },
            {
                headers: { 'Authorization': 'Bearer ' + getToken() },
            }).then(response => {
                setLoadSave2(false);
                setShow2(true);
                setColorAlert("success");
                alert("Bài chấm của bạn đã được lưu lại!");
            }).catch((error) => {
                if (error.response) {
                    setLoadSave2(false);
                    if (error.response.status === 401 || error.response.status === 400) {
                        setShow2(true);
                        setColorAlert("danger");
                        setError2(error.response.data.detail);
                    }
                    else {
                        setShow2(true);
                        setColorAlert("danger");
                        setError2("Something went wrong. Please try again later!");
                    }

                }
            })
    }

    const handleDoneResult = (e) => {
        setLoadDone2(true);
        api.put('/results/' + orderID + '?status_id=3', {
            "grade": 9,
            "grade_comment": gradeComment,
            "review": review,
            "comment": commentGeneral,
            "criteria_results": criteriaResults,
            "extra_results": extraResults
        },
            {
                headers: { 'Authorization': 'Bearer ' + getToken() },
            }).then(response => {
                setLoadDone2(false);
                setShow2(true);
                setColorAlert("success");
                alert("Bài chấm của bạn đã chấm xong!");
                props.history.push("/HomeTeacherPage");
            }).catch((error) => {
                if (error.response) {
                    setLoadDone2(false);
                    if (error.response.status === 401 || error.response.status === 400) {
                        setShow2(true);
                        setColorAlert("danger");
                        setError2(error.response.data.detail);
                    }
                    else {
                        setShow2(true);
                        setColorAlert("danger");
                        setError2("Something went wrong. Please try again later!");
                    }

                }
            })
    }
    function getHighlightedText(text, highlight) {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return <span className="white"> {parts.map((part, i) =>
            <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { color: "red" } : {}}>
                {part}
            </span>)
        } </span>;
    }
    const sentenceList = sentences.map((sentence) => (
        <>
            {current === sentence.sentence_index &&
                (
                    <>
                        <div className="col-7">
                            <Tabs defaultActiveKey="2" >
                                <TabPane tab="Đề bài" key="1">
                                    <Input style={{ textAlign: 'justify', resize: 'none' }} type="textarea" name="title" id="title" disabled rows='4' defaultValue={title} />
                                    <br></br>
                                    {base64Image && <img src={`data:image/jpeg;base64,${base64Image}`} width="563px" alt="Title or Content"></img>}<br />
                                </TabPane>
                                <TabPane tab="Nội dung bài viết" key="2">
                                    <div className="scroll" style={{ height: 'auto' }}><p>{getHighlightedText(content, sentence.sentence)}</p></div>
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
                                        <Button outline style={{ margin: "5px" }}>Đặt lại</Button>

                                        <Button style={{ margin: "5px" }} outline onClick={() => next()} disabled={sentences.length - 1 === 0 ? true : false} onClickCapture={handleClickCapture}>
                                            Câu tiếp theo
                </Button>

                                    </>
                                )}
                                {current < sentences.length - 1 && current > 0 && (
                                    <>
                                        <Button outline style={{ margin: "5px" }} onClick={() => prev()}
                                            onClickCapture={handleClickCapture}
                                        >Câu trước đó</Button>
                                        <Button outline style={{ margin: "5px" }}>Đặt lại</Button>
                                        <Button outline style={{ margin: "5px" }} onClick={() => next()}
                                            onClickCapture={handleClickCapture}
                                        >Câu tiếp theo</Button>
                                    </>
                                )}
                                {current === sentences.length - 1 && current !== 0 && (
                                    <>
                                        <Button outline style={{ margin: "5px" }} onClick={() => prev()}
                                            onClickCapture={handleClickCapture}
                                        >Câu trước đó</Button>
                                        <Button outline style={{ margin: "5px" }}>Đặt lại</Button>
                                        <Button outline disabled style={{ margin: "5px" }} >
                                            Câu tiếp theo
                </Button>
                                    </>
                                )}

                            </div>

                            <Card style={{ padding: "10px", backgroundColor: '#2bbaed', height: '505px' }} >
                                <div key={sentence.sentence_index}>
                                    <strong>
                                        #{sentence.sentence_index}: {sentence.sentence}
                                    </strong>
                                    <br />
                                    <Input type="textarea" rows="12" name="fix" id={sentence.sentence_index} style={{ marginTop: "10px", backgroundColor: 'white', resize: "none", padding: "5px" }}
                                        value={sentence.comment}
                                        placeholder="Nhập lỗi cần chỉnh sửa và gợi ý câu mang tính học thuật hơn"
                                        onChange={e => { setCommentOne(e.target.value); sentences[current].comment = e.target.value }}
                                    ></Input>
                                </div>
                                <div className="ml-auto mr-auto" style={{ marginTop: '10px' }}><span style={{ borderRadius: "5px", backgroundColor: "red", padding: "5px", color: "white" }}>Hạn giao bài viết: {deadline}</span></div>

                            </Card>
                        </div>
                    </>

                )}
        </>
    ))


    const criteriaResultsUI = criteriaResults.map((cri, index) => (
        <FormGroup row key={cri.criteria_id}>
            <Label for="task" sm={9} style={{ fontStyle: 'italic' }}>{cri.criteria_name}</Label>
            <Col sm={3}>
                <Input disabled={!isCriteria} defaultValue={cri.criteria_score} type="number" name="task" id={cri.criteria_id}
                    onChange={e => criteriaResults[index].criteria_score = e.target.value} />
            </Col>
        </FormGroup>
    ));

    const extraResultsUI = extraResults.map((extra, index) => (
        <>
            <strong>{extra.option_name}</strong>
            <Input type="textarea" id="generalComment" rows={7}
                defaultValue={extra.content}
                onChange={e => extraResults[index].content = e.target.value}
            ></Input>
        </>
    ));




    const nameOfTeacher = <>Người viết: <Button color="link" onClick={toggle}>{student}</Button></>;


    return (
        <div className="teacher-page">
            <GlobalHeader />
            <div className="container-fluid detailPage"  >
                <div className="row" style={{ height: window.innerHeight + 'px' }} >
                    <div className="container-fluid centerCol ">
                        <div className="gradient-background-teacher padding">
                            <div className="row bg-row margin padding " >
                                <Breadcrumb className="mt-1" style={{ fontSize: "large" }}>
                                    <Breadcrumb.Item>
                                        <a href="/Home">Trang chủ</a>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item >
                                        <a href="/HomeTeacherPage">Quản lý bài viết</a>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item style={{ color: "white" }} >Xem bài viết</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <div className="row bg-row padding" >
                                <br />
                                <h3 className="mt-auto mb-auto" style={{ color: "white", fontWeight: "700" }}>#{orderID} {titleS}...</h3>
                            </div>
                        </div>
                        <div className="bg">
                            <div className="shadow-background" style={{ backgroundColor: "white", padding: '10px' }}>
                                <div className="container-fluid" style={{ marginBottom: "50px" }}>
                                    <ProfileStudent modal={modal} id={studentID} onClick={handleChange} />
                                    <Tabs defaultActiveKey="1" tabBarExtraContent={nameOfTeacher}>

                                        <TabPane tab="Sửa lỗi" key="1">
                                            <div className="container-fluid mt-2" style={{ fontSize: "medium", textAlign: "justify" }}>
                                                {error && <Alert color={colorAlert} isOpen={show} style={{ margin: 'auto' }}>{error}</Alert>}
                                                <div className="row ">
                                                    {sentenceList}
                                                </div>
                                            </div>
                                        </TabPane>

                                        <TabPane tab="Chấm điểm và đánh giá" key="2">
                                            <div className="container-fluid mt-2" style={{ fontSize: "medium", textAlign: "justify" }}>
                                                {error2 && <Alert color={colorAlert} isOpen={show2} style={{ margin: 'auto' }}>{error2}</Alert>}
                                                <div className="row ">
                                                    <div className="col-7">
                                                        <strong >Đánh giá bài làm</strong>
                                                        <Input type="textarea" id="review" rows={4} placeholder="Nhập đánh giá chung cho bài viết"
                                                            defaultValue={review}
                                                            onChange={e => setReview(e.target.value)}></Input>
                                                        <br />
                                                        <strong>Nhận xét về bài làm</strong>
                                                        <Input type="textarea" id="generalComment" rows={4} placeholder="Nhập nhận xét chung cho bài viết"
                                                            defaultValue={commentGeneral}
                                                            onChange={e => setCommentGeneral(e.target.value)}
                                                        ></Input>
                                                        <br />
                                                        {extraResultsUI}
                                                    </div>
                                                    <div className="col-5">
                                                        <div className="mb-1" style={{ textAlign: "center" }}>
                                                            <Button outline style={{ margin: "5px" }} color="primary" >Đặt lại</Button>
                                                            <Button outline style={{ margin: "5px" }} color="primary" onClick={handleSaveResult}>{loadSave2 ? 'Loading...' : 'Lưu lại'}</Button>
                                                            <Button outline style={{ margin: "5px" }} color="primary" onClick={handleDoneResult}>{loadDone2 ? 'Loading...' : 'Kết thúc chấm'}</Button>
                                                        </div>
                                                        <Card style={{ padding: "10px 30px ", minHeight: '265px' }}>
                                                            <Form >
                                                                <FormGroup row>
                                                                    <strong>Điểm số</strong><br />
                                                                    <Input type="number" defaultValue={grade} name="grade" id="grade" placeholder="Nhập điểm"
                                                                        onChange={e => setGrade(e.target.value)} />
                                                                </FormGroup>
                                                                <FormGroup row>
                                                                    <strong>Nhận xét về điểm</strong><br />
                                                                    <Input type="textarea" defaultValue={gradeComment} rows='3' name="commentGrade" id="commentGrade" placeholder="Nhập Nhận xét"
                                                                        onChange={e => setGradeComment(e.target.value)} />
                                                                </FormGroup>
                                                                {isCriteria === true &&
                                                                    <FormGroup row>
                                                                        <strong>Điểm thành phần</strong><br />
                                                                    </FormGroup>
                                                                }
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
}

export default withRouter(ScoreEssay);