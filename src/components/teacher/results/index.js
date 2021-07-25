import '../Teacher.css';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Input } from 'reactstrap';
import GlobalHeader from '../header';
import { Breadcrumb, Rate, Table, Tabs } from 'antd';
import { getBaseURL, getToken, getTokenType } from '../../../Utils/Common';
import { withRouter } from 'react-router-dom';

const { TabPane } = Tabs;

const api = getBaseURL();

const DetailResult = (props) => {
    const url = window.location.href.split('=');
    const orderID = Number(url[1]);

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
    const [topic, setTopic] = useState();
    const [spelling, setSpelling] = useState([]);
    const [numSentence, setNumSentence] = useState();
    const [numErrors, setNumErrors] = useState();
    const [average, setAverage] = useState();

    const [rate, setRate] = useState(4);
    const [comment, setComment] = useState();
    const [response, setResponse] = useState(true);
    const [loadResponse, setLoadResponse] = useState(false);
    const [error, setError] = useState();
    const [show, setShow] = useState(false);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    useEffect(() => {
        async function fetchData() {

            await api.get('/orders/' + orderID, {
                headers: { Authorization: getTokenType() + ' ' + getToken() }
            }).then(response => {
                setTitle(response.data.essay.title);
                setContent(response.data.essay.content);
                setTitleS(response.data.essay.title.slice(0, 65));
            })
            await api.get('/spelling_errors/' + orderID, {
                headers: { Authorization: getTokenType() + ' ' + getToken() }
            }).then(response => {
                setTopic(response.data.predicted_topic);
                setSpelling(response.data.spelling_errors);
                setNumSentence(response.data.number_of_sentences);
                setAverage(response.data.average_sentence_length);
                setNumErrors(response.data.num_errors);
            })

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
            })

            await api.get('/essay_comments/' + orderID, {
                headers: { Authorization: getTokenType() + ' ' + getToken() }
            }).then(response => {
                const data = response.data;
                setSentences(data.essay_comments);

            });

            await api.get('ratings/' + orderID, {
                headers: { Authorization: getTokenType() + ' ' + getToken() }
            }).then(response => {
                setResponse(false);
                setRate(response.data.stars);
                setComment(response.data.comment);
            }).catch((error) => {
                if (error.response)
                    if (error.response.status === 404) {
                        setResponse(true);
                        setRate(0);
                        setComment(null);
                    }
            })

        }
        fetchData();

    }, [orderID]);

    const columns = [
        {
            title: 'Vị trí câu',
            dataIndex: 'sentence_index',
            key: 'sentence_index',
            width: 100,
        },

        {
            title: 'Câu sai',
            dataIndex: 'sentence',
            key: 'sentence',
            width: 520,

        },
        {
            title: 'Từ sai',
            dataIndex: 'word',
            key: 'word',
            width: 180,

        },

        {
            title: 'Gợi ý sửa',
            dataIndex: 'suggested_word',
            key: 'suggested_word',
            width: 180,

        },

    ];
    const criteriaResultsUI = criteriaResults.map((cri) => (
        <p key={cri.criteria_id}>{cri.criteria_name}     : {cri.criteria_score}</p>
    ));

    function getHighlightedText(text, highlight) {
        // Split on highlight term and include term into parts, ignore case
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return <span className="white"> {parts.map((part, i) =>
            <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { color: "red" } : {}}>
                {part}
            </span>)
        } </span>;
    }

    const sentenceList = sentences.map((sentence) => (
        <div key={sentence.sentence_id}>
            {
                current === sentence.sentence_index &&
                (
                    <>
                        <div className="col-7">
                            <strong>Đề bài</strong>
                            <span><p>{title}</p></span>
                            <strong>Nội dung bài viết</strong>
                            <br />
                            <div className="scroll">{getHighlightedText(content, sentence.sentence)}</div>
                        </div>
                        <div className="col-5">
                            <div style={{ marginBottom: "10px", textAlign: "center" }}>
                                {current === 0 && (
                                    <>
                                        <Button style={{ margin: "5px" }} outline disabled>
                                            Câu trước đó
                </Button>
                                        <Button style={{ margin: "5px" }} outline onClick={() => next()} disabled={sentences.length - 1 === 0 ? true : false}>
                                            Câu tiếp theo
                </Button>
                                    </>
                                )}
                                {current < sentences.length - 1 && current > 0 && (
                                    <>
                                        <Button style={{ margin: "5px" }} outline onClick={() => prev()}>
                                            Câu trước đó
                </Button>
                                        <Button style={{ margin: "5px" }} outline onClick={() => next()} >
                                            Câu tiếp theo
                </Button>
                                    </>
                                )}
                                {current === sentences.length - 1 && current !== 0 && (
                                    <>
                                        <Button style={{ margin: "5px" }} outline onClick={() => prev()}>
                                            Câu trước đó
                </Button>
                                        <Button style={{ margin: "5px" }} outline disabled >
                                            Câu tiếp theo
                </Button>
                                    </>
                                )}

                            </div>

                            <Card style={{ padding: "10px", backgroundColor: 'sky', Height: '505px' }} >
                                <div key={sentence.sentence_index}>
                                    <strong>
                                        #{sentence.sentence_index}: {sentence.sentence}
                                    </strong>
                                    <br />
                                    <Input disable type="textarea" rows="12" name="fix" id={sentence.sentence_index} style={{ marginTop: "10px", backgroundColor: 'white', resize: "none", padding: "5px" }}
                                        value={sentence.comment} disabled
                                    ></Input>
                                </div>

                            </Card>
                        </div>
                    </>

                )}
        </div>
    ))

    const extraResultsUI = extraResults.map((extra, index) => (
        <div key={extra.extra_id}>
            <strong>{extra.option_name}</strong>
            <Input type="textarea" id="generalComment" rows={7}
                defaultValue={extra.content}
                onChange={e => extraResults[index].content = e.target.value}
            ></Input>
        </div>
    ));
    const handleResponse = (e) => {
        setLoadResponse(true);
        api.post("ratings/" + orderID, {
            "stars": rate,
            "comment": comment
        },
            {
                headers: { 'Authorization': 'Bearer ' + getToken() },
            }).then(response => {
                alert("Cảm ơn bạn đã phản hồi!");
                setResponse(false);
            }).catch((error) => {
                if (error.response) {
                    setLoadResponse(false);
                    if (error.response.status === 401 || error.response.status === 400) {
                        setShow(true);
                        setError(error.response.data.detail);
                    }
                    else {
                        setShow(true);
                        setError("Something went wrong. Please try again later!");
                    }

                }
            })
    }

    return (
        <div className="teacher-page">
            <GlobalHeader />
            <div className="container-fluid detailPage"  >
                <div className="row" style={{ minHeight: window.innerHeight + 'px' }} >
                    <div className="container-fluid centerCol ">
                        <div className="gradient-background-teacher padding">
                            <div className="row bg-row margin padding " >
                                <Breadcrumb className="mt-1" style={{ fontSize: "large" }}>
                                    <Breadcrumb.Item>
                                        <a href="/Home">Trang chủ</a>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item >
                                        <a href="/HomeTeacherPage" >Quản lý bài viết</a>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item style={{ color: "white" }}>Xem bài viết</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <div className="row bg-row padding" >
                                <br />
                                <h3 className="mt-auto mb-auto" style={{ color: "white" }}> #{orderID} {titleS}...</h3>
                            </div>
                        </div>
                        <div className="bg">
                            <div className="shadow-background" style={{ backgroundColor: "white", padding: '10px' }}>
                                <div className="container-fluid">

                                    <Tabs defaultActiveKey="1" >
                                        <TabPane tab="Điểm số và đánh giá" key="1">
                                            <div className="container-fluid mt-2" style={{ fontSize: "medium", textAlign: "justify" }}>
                                                <div className="row ">
                                                    <div className="col-7">
                                                        <div className="margin">
                                                            <strong>Đánh Giá</strong>
                                                            <br />
                                                            <span style={{ color: "" }}><p>{review}</p></span>
                                                        </div>
                                                        <div className="margin">
                                                            <strong>Nhận xét</strong>
                                                            <br />
                                                            <span><p>{commentGeneral}</p></span>

                                                        </div>
                                                        <div className="margin">
                                                            {extraResultsUI}
                                                        </div>


                                                    </div>
                                                    <div className="col-5">
                                                        <Card style={{ minHeight: '150px', padding: "10px 30px " }}>
                                                            <strong>Điểm số</strong>
                                                            <div className="container-fluid">
                                                                <div className="row" style={{ color: "green", paddingTop: "0px", fontSize: "75px" }}>{grade}</div>
                                                                <div className="row">
                                                                    <p>{gradeComment}</p>
                                                                </div>
                                                            </div>
                                                            {isCriteria === true && <strong>Điểm thành phần</strong>}
                                                            {criteriaResultsUI}

                                                        </Card>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabPane>
                                        <TabPane tab="Sửa lỗi tự động" key="2">
                                            <div className="container-fluid mt-2" style={{ fontSize: "medium", textAlign: "justify" }}>
                                                <div className="row ">
                                                    <div className="col-3">
                                                        <strong>Chủ đề: </strong>
                                                        <p>{topic}</p>
                                                    </div>
                                                    <div className="col-2">
                                                        <strong>Tổng số câu:</strong>
                                                        <p> {numSentence}</p>
                                                    </div>
                                                    <div className="col-5">
                                                        <strong>      Chiều dài trung bình mỗi câu:</strong>
                                                        <p>     {average}</p>
                                                    </div>
                                                    <div className="col-2">
                                                        <strong>     Tổng số lỗi:</strong>
                                                        <p>  {numErrors}</p>
                                                    </div>
                                                </div>

                                                <Table
                                                    columns={columns}
                                                    dataSource={spelling}
                                                    pagination={{ pageSize: 8 }}
                                                />
                                            </div>


                                        </TabPane>

                                        <TabPane tab="Sửa lỗi" key="3">
                                            <div className="container-fluid mt-2" style={{ fontSize: "medium", textAlign: "justify" }}>
                                                <div className="row ">
                                                    {/* <div className="col-7">
                    <strong>Đề bài</strong>
                    <Input style={{fontSize:'20px', marginTop:'8px',textAlign:'justify',backgroundColor:'white'}} type="textarea" name="title" id="title" disabled rows='4' defaultValue={title} />
                                        
                    <br/>
                    <strong>Nôi dung bài viết</strong>
                    <Input style={{textAlign:'justify',backgroundColor:'white'}} type="textarea" name="title" id="title" disabled rows='14' defaultValue={content} />
                </div>
                <div className="col-5">
                    {sentenceList}
                </div> */}
                                                    {sentenceList}
                                                </div>
                                            </div>
                                        </TabPane>
                                        <TabPane tab="Phản hồi" key="4">
                                            <div style={{ height: '400px', textAlign: "center" }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="#2596be" className="bi bi-mailbox" viewBox="0 0 16 16">
                                                    <path d="M4 4a3 3 0 0 0-3 3v6h6V7a3 3 0 0 0-3-3zm0-1h8a4 4 0 0 1 4 4v6a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7a4 4 0 0 1 4-4zm2.646 1A3.99 3.99 0 0 1 8 7v6h7V7a3 3 0 0 0-3-3H6.646z" />
                                                    <path d="M11.793 8.5H9v-1h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.354-.146l-.853-.854zM5 7c0 .552-.448 0-1 0s-1 .552-1 0a1 1 0 0 1 2 0z" />
                                                </svg>
                                                <br></br>
                                                <span style={{ padding: "10px", fontSize: "20px" }}>Bạn có thích bài chấm này không? <br />Hãy đánh giá và bình luận để tôi có thể hoàn thiện tốt hơn nữa nhé!</span>
                                                <br></br>
                                                <Rate className="margin" value={rate} onChange={(value) => setRate(value)} disabled={!response} /><br />
                                                <div className="mt-3 mb-3" style={{ padding: "10px 100px 10px 100px" }}>
                                                    <Input type="textarea" rows={5} placeholder="Nhập bình luận của bạn" value={comment} disabled={!response} onChange={(e) => setComment(e.target.value)} /></div>
                                                {response &&
                                                    <Button outline color="primary" style={{ margin: "0% 44%" }} onClick={handleResponse}>
                                                        {loadResponse ? "Đang xử lý..." : "Gửi phản hồi"}
                                                    </Button>}
                                                {error && <Alert color="danger" isOpen={show} style={{ margin: 'auto' }}>{error}</Alert>}
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

export default withRouter(DetailResult);