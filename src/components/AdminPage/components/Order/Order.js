import { getBaseURL, getToken, getTokenType } from '../../../../Utils/Common';
import { List, Tabs, Input, Modal, Form, Badge, Descriptions, Image, Space, Tag,Button,  Divider, InputNumber } from 'antd';
import { React, useEffect, useState } from 'react';

const { TabPane } = Tabs;
const api = getBaseURL();


const getHighlightedText = (text, highlight) => {
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return <span> {parts.map((part, i) =>
        <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold', color: "red" } : {}}>
            {part}
        </span>)
    } </span>;
};



const Order = (props) => {

    const [order, setOrder] = useState([]);
    const [student, setStudent] = useState([]);
    const [teacher, setTeacher] = useState([]);
    const [options, setOptions] = useState([]);
    const [status, setStatus] = useState([]);
    const [result, setResult] = useState([])
    const [essay_comment, setEssayComment] = useState([])
    const [types, setTypes] = useState([]);
    const [image, setImage] = useState([])
    const [base64Image, setBase64Image] = useState("");
    const [tempBase64Image, setTempBase64Image] = useState("");
    const [editType, setEditType] = useState("");
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        console.log("show modal")
        if (editType === 'deadline') {

        } else {
            form.setFieldsValue({
                "grade": result.grade,
                "grade_comment": result.grade_comment,
                "comment": result.comment,
                "review": result.review
            })
            if (result.isCriteria) {
                result.criteria_results.map((criteria_result) => {
                    console.log(criteria_result);
                    form.setFieldsValue({
                        [criteria_result.criteria_id + ".grade"]: criteria_result.criteria_score,
                        [criteria_result.criteria_id + ".comment"]: criteria_result.criteria_comment
                    });
                    return 0;
                })
            }
            if (result.isExtra) {
                result.extra_results.map((extra_result) => {
                    form.setFieldsValue({
                        ["extra." + extra_result.option_id + ".content"]: extra_result.content
                    })
                    return 0;

                })
            }
            if (result && essay_comment) {
                essay_comment.essay_comments.map((essay_comment) => {
                    form.setFieldsValue({
                        [`em.${essay_comment.sentence_index}.comment`]: essay_comment.comment
                    })
                    return 0;

                })
            }

            
        }
        setVisible(true);
    };
    const changeEdit = (e) => {
        setEditType(e)
        showModal()
    }


    const handleOk = () => {
        setConfirmLoading(true);
        if (editType === 'deadline') {
            api.put("/orders/reset/" + order.order_id,{},{
                headers: { 'Authorization': 'Bearer ' + getToken() },
            }).then(response => {
                const order = response.data
                setOrder(order)
                setVisible(false);
                setConfirmLoading(false);
            }).catch((e) => {
                if(e.response){
                    console.log(e.response)
                }
            })
        } else {
            console.log("Updating result.....")

            const criteria_results = result.isCriteria ? result.criteria_results.map((criteria_result) => ({
                "criteria_id": criteria_result.criteria_id,
                "criteria_score": form.getFieldValue(criteria_result.criteria_id + ".grade"),
                "criteria_comment": form.getFieldValue(criteria_result.criteria_id + ".comment")

            })) : []
            const extra_results = result.isExtra ? result.extra_results.map((extra_result) => ({
                "option_id": extra_result.option_id,
                "content": form.getFieldValue("extra." + extra_result.option_id + ".content")
            })) : []

            const essay_comments = essay_comment.essay_comments.map((essay_comment) => ({
                "sentence_index": essay_comment.sentence_index,
                "comment": form.getFieldValue(`em.${essay_comment.sentence_index}.comment`)
            }))

            api.put("/results/" + order.order_id + "?status_id=" + order.status_id, {
                "grade": form.getFieldValue('grage'),
                "grade_comment": form.getFieldValue('grade_comment'),
                "comment": form.getFieldValue("comment"),
                "review": form.getFieldValue("review"),
                "criteria_results": criteria_results,
                "extra_results": extra_results
            }, {
                headers: { 'Authorization': 'Bearer ' + getToken() },
            }).then((response) => {
                const result = response.data;
                setResult(result);
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)

                }
            })

            result && api.put("/essay_comments/" + order.order_id, {
                "comments": essay_comments
            }, {
                headers: { 'Authorization': 'Bearer ' + getToken() },
            }).then((response) => {
                const essay_comment = response.data;
                setEssayComment(essay_comment);
                setVisible(false);
                setConfirmLoading(false);
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)

                }
            })

        }
    };


    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        const a = base64.split(",");
        setTempBase64Image(a[1])
    }
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error)
            };
        });
    };

    useEffect(() => {
        async function fetchData() {

            await api.get('/options',).then(response => {
                const options = response.data.data;
                setOptions(options);
            })

            await api.get('/types',).then(response => {
                const types = response.data.data;
                setTypes(types);
            })

            await api.get('/status',).then(response => {
                const status = response.data.data;
                setStatus(status);
            })

            await api.get('/orders/' + props.order_id, {
                headers: { Authorization: getTokenType() + ' ' + getToken() }
            }).then(response => {
                console.log("receive data from api with order_id = " + response.data.order_id)
                const order = response.data;
                setOrder(order);
                api.get('/users/' + order.student_id, {
                    headers: { Authorization: getTokenType() + ' ' + getToken() }
                }).then(response => {
                    console.log(response.data)
                    const student = response.data;
                    setStudent(student);
                }).catch(function (error) {
                    // handle error
                    console.log(error);
                })

                order.teacher_id && api.get('/users/' + order.teacher_id, {
                    headers: { Authorization: getTokenType() + ' ' + getToken() }
                }).then(response => {
                    console.log(response.data)
                    const teacher = response.data;
                    setTeacher(teacher);
                }).catch(function (error) {
                    // handle error
                    console.log(error);
                })

                order.teacher_id && api.get('/results/' + order.order_id, {
                    headers: { Authorization: getTokenType() + ' ' + getToken() }
                }).then(response => {
                    console.log(response.data)
                    const result = response.data;
                    setResult(result);
                }).catch(function (error) {
                    // handle error
                    console.log(error);
                })

                api.get('/results/' + order.order_id, {
                    headers: { Authorization: getTokenType() + ' ' + getToken() }
                }).then(response => {
                    console.log(response.data)
                    const result = response.data;
                    setResult(result);
                }).catch(function (error) {
                    // handle error
                    console.log(error);
                })

                api.get('/essay_comments/' + order.order_id, {
                    headers: { Authorization: getTokenType() + ' ' + getToken() }
                }).then(response => {
                    console.log(response.data)
                    const essay_comment = response.data;
                    setEssayComment(essay_comment);
                }).catch(function (error) {
                    // handle error
                    console.log(error);
                })

                api.get('/orders/image/' + order.order_id, {
                    headers: { Authorization: getTokenType() + ' ' + getToken() }
                }).then(response => {
                    const base64Image = response.data.image_base64;
                    setBase64Image(base64Image);
                    setTempBase64Image(base64Image)

                }).catch(function (error) {
                    // handle error
                    console.log(error);
                })

                console.log(result.extra_results)
            }).catch(function (error) {
                // handle error
                console.log(error);
            })



        }
        fetchData();

    }, [props.order_id]);

    return (
        <>
            <span style={{ marginBottom: "50px" }}>
                <Button style={{ marginBottom: "5px" }} onClick={(e) => { changeEdit('deadline') }} > Reset Deadline</Button>
                <Space />
                {order.teacher_id && <Button style={{ marginLeft: "20px", marginBottom: "5px" }} onClick={(e) => { changeEdit('result') }}> Edit Result</Button>}
                <Tabs defaultActiveKey="1" >
                    <TabPane tab="Thông tin đơn hàng " key="1">
                        <Descriptions title="Order" bordered>
                            <Descriptions.Item label="Order Id">{order.order_id}</Descriptions.Item>
                            <Descriptions.Item label="Disabled" span={2}>
                                <>
                                    {order.is_disabled === true && (<Tag color="red">{'TRUE'}</Tag>)}
                                    {order.is_disabled === false && (<Tag color="gray">{'FALSE'}</Tag>)}
                                </>
                            </Descriptions.Item>
                            <Descriptions.Item label="Status" span={3}>
                                <>
                                    {status[order.status_id] && (<Badge status="default" text={status[order.status_id].status_name.toUpperCase()} />)}
                                </>
                            </Descriptions.Item>
                            <Descriptions.Item label="Student" span={3}>{student.info && student.info.name}</Descriptions.Item>
                            <Descriptions.Item label="Assigned Teacher" span={3}>{(order.teacher_id && teacher.info && teacher.info.name) || "The Order hasn't been taken by any teacher."}</Descriptions.Item>
                            <Descriptions.Item label="Sent Date" span={3}>{order.sent_date}</Descriptions.Item>
                            <Descriptions.Item label="Updated Date" span={3}>{order.updated_date}</Descriptions.Item>
                            <Descriptions.Item label="Deadline" span={2}>{order.deadline}</Descriptions.Item>
                            <Descriptions.Item label="Time Left">{order.time_left}</Descriptions.Item>
                            <Descriptions.Item label="Options" span={3}>
                                <List
                                    bordered
                                    dataSource={order.option_list}
                                    renderItem={item => (
                                        <List.Item>
                                            {options && options[item].option_type === 0 && options[item].option_name}
                                            {options && options[item].option_type === 1 && "Thời hạn chấm: " + options[item].option_name + " tiếng"}
                                        </List.Item>
                                    )}
                                />
                            </Descriptions.Item>
                            <Descriptions.Item label="Total Price">{order.total_price} VNĐ</Descriptions.Item>
                        </Descriptions>
                    </TabPane>
                    <TabPane tab="Bài Viết" key="2" >

                        {order.essay && (
                            <Descriptions title="Essay Info" layout="vertical" style={{ marginBottom: "100px" }} bordered>
                                <Descriptions.Item label="Essay Topic" span={2}>{order.topic_name}</Descriptions.Item>
                                <Descriptions.Item label="Topic ID ">{order.topic_id}</Descriptions.Item>
                                <Descriptions.Item label="Title" span={3}>
                                    <p>{order.essay.title}</p>
                                </Descriptions.Item>
                                <Descriptions.Item span={3}>
                                    {base64Image ? (
                                        <Image src={`data:image/jpeg;base64,${base64Image}`} />) :
                                        "This order has no image attached"
                                    }
                                </Descriptions.Item>
                                <Descriptions.Item label="Content" span={3}>
                                    <p>{order.essay.content}</p>
                                </Descriptions.Item>
                            </Descriptions>)
                        }
                    </TabPane>
                    <TabPane tab="Chấm điểm của giáo viên" key="3">
                        {order.teacher_id === null && <span>Order hasn't been taken by any teacher</span>}
                        {order.teacher_id &&
                            (<>
                                <Descriptions title="Result" bordered>
                                    <Descriptions.Item label="Result ID">{result.result_id}</Descriptions.Item>
                                    <Descriptions.Item label="isCriteria">
                                        <>
                                            {result.isCriteria === true && (<Tag color="green">{'TRUE'}</Tag>)}
                                            {result.isCriteria === false && (<Tag color="gray">{'FALSE'}</Tag>)}
                                        </>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="isExtra">
                                        {result.isExtra === true && (<Tag color="green">{'TRUE'}</Tag>)}
                                        {result.isExtra === false && (<Tag color="gray">{'FALSE'}</Tag>)}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Grade " spane={3}>{result.grade}</Descriptions.Item>
                                    <Descriptions.Item label="Grade Comment" span={3}>
                                        <p>{result.grade_comment}</p>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Review" span={3}>
                                        <p>{result.review}</p>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Comment" span={3}>
                                        <p>{result.comment}</p>
                                    </Descriptions.Item>
                                </Descriptions>
                                <br />
                                <Tabs defaultActiveKey="1">
                                    {result.isCriteria && (
                                        <TabPane tab="Criteria Result" key='1'>
                                            <List
                                                style={{ marginBottom: "100px" }}
                                                dataSource={result.criteria_results}
                                                pagination={{ pageSize: "1" }}
                                                renderItem={item => (
                                                    <List.Item>
                                                        <Descriptions bordered  >
                                                            <Descriptions.Item label="Criteria ID" span={3}>{item.criteria_id}</Descriptions.Item>
                                                            <Descriptions.Item label="Criteria " span={3}>{item.criteria_name}</Descriptions.Item>
                                                            <Descriptions.Item label="Criteria Score" span={3}>{item.criteria_score}</Descriptions.Item>
                                                            <Descriptions.Item label="Criteria Comment" span={3}>{item.criteria_comment}</Descriptions.Item>
                                                        </Descriptions>
                                                    </List.Item>
                                                )}
                                            />
                                        </TabPane>)}
                                    {result.isExtra && (
                                        <TabPane tab="Extra Result" key="2">
                                            <List
                                                style={{ marginBottom: "200px" }}
                                                pagination={{ pageSize: "1" }}
                                                dataSource={result.extra_results}
                                                renderItem={item => (
                                                    <List.Item>
                                                        <Descriptions bordered>
                                                            <Descriptions.Item label="Option ID" span={3}>{item.option_id}</Descriptions.Item>
                                                            <Descriptions.Item label="Option " span={3}>{item.option_name}</Descriptions.Item>
                                                            <Descriptions.Item label="Criteria Comment" span={3}>{item.content}</Descriptions.Item>
                                                        </Descriptions>
                                                    </List.Item>
                                                )}
                                            />
                                        </TabPane>)}

                                </Tabs>


                            </>)}
                    </TabPane>
                    {order.teacher_id && <TabPane tab="Sửa lỗi theo câu" key="4">

                        <List
                            style={{ marginBottom: "200px" }}
                            dataSource={essay_comment.essay_comments}
                            pagination={{ pageSize: 1 }}

                            renderItem={item => (
                                <List.Item>
                                    <Descriptions layout="vertical" bordered>
                                        <Descriptions.Item label="Original Essay" span={3}>
                                            {getHighlightedText(order.essay.content, item.sentence)}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Sentence index" span={1}>{item.sentence_index}</Descriptions.Item>
                                        <Descriptions.Item label="Sentence " span={2}>{item.sentence}</Descriptions.Item>
                                        <Descriptions.Item label="Comment" span={3}>{item.comment}</Descriptions.Item>
                                    </Descriptions>
                                </List.Item>
                            )}
                        />)
                    </TabPane>}
                </Tabs>
            </span>

            <Modal
                title={`OrderID :${order.order_id}`}
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                width={editType === 'result' ? 1000 : 500}
            >
                {
                    editType === 'deadline' ?
                        <div>
                            Are you sure to reset this order's deadline?
                            </div>
                        : (order.teacher_id &&
                            <>
                                <Tabs defaultActiveKey="1"  >
                                    <TabPane tab="Edit General Result" key="1">
                                        <div>
                                            <Form labelCol={{ span: 4 }}
                                                wrapperCol={{ span: 20 }}
                                                form={form} >
                                                <Form.Item name="grade" label="Grade" >
                                                    <InputNumber showCount={true} allowClear={true} bordered />
                                                </Form.Item>
                                                <Form.Item name="grade_comment" label="Grade Comment" >
                                                    <Input.TextArea showCount={true} allowClear={true} bordered />
                                                </Form.Item>

                                                <Form.Item name="review" label="Review">
                                                    <Input.TextArea showCount={true} allowClear={true} autoSize={{ minRows: 5, maxRows: 9 }} bordered />
                                                </Form.Item>
                                                <Form.Item name="comment" label="Comment">
                                                    <Input.TextArea showCount={true} allowClear={true} autoSize={{ minRows: 5, maxRows: 9 }} bordered />
                                                </Form.Item>

                                            </Form>
                                        </div>
                                    </TabPane>
                                    {result.isCriteria &&
                                        <TabPane tab="Edit Criteria Result" key="2">

                                            <List
                                                header={<div>Criteria Result</div>}
                                                style={{ marginBottom: "20px" }}
                                                dataSource={result.criteria_results}
                                                pagination={{ pageSize: 1 }}
                                                renderItem={item => (
                                                    <>
                                                        <Divider orientation="left">Criteria ID : {item.criteria_id}</Divider>
                                                        <Descriptions layout="vertical" bordered>
                                                            <Descriptions.Item label="Criteria " span={2}>{item.criteria_name}</Descriptions.Item>
                                                            <Descriptions.Item label="Criteria Score" span={1}>
                                                                <Form form={form} >
                                                                    <Form.Item name={`${item.criteria_id}.grade`}>
                                                                        <InputNumber showCount={true} allowClear={true} bordered />
                                                                    </Form.Item>
                                                                </Form>
                                                            </Descriptions.Item>
                                                            <Descriptions.Item label="Criteria Comment" span={3}>
                                                                <Form form={form} >
                                                                    <Form.Item name={`${item.criteria_id}.comment`}  >
                                                                        <Input.TextArea showCount={true} allowClear={true} autoSize={{ minRows: 5, maxRows: 9 }} bordered />
                                                                    </Form.Item>
                                                                </Form>
                                                            </Descriptions.Item>
                                                        </Descriptions>
                                                    </>
                                                )}
                                            />


                                        </TabPane>

                                    }
                                    {result.isExtra &&
                                        <TabPane tab="Edit Extra Result" key="3">
                                            <List
                                                style={{ marginBottom: "200px" }}
                                                header={<div>Extra Result</div>}
                                                dataSource={result.extra_results}
                                                pagination={{ pageSize: 1 }}
                                                renderItem={item => (
                                                    <>
                                                        <Divider orientation="left">Option ID : {item.option_id}</Divider>

                                                        <Descriptions bordered>
                                                            <Descriptions.Item label="Option Name" span={3}>{item.option_name}</Descriptions.Item>
                                                            <Descriptions.Item label="Option Content" span={3}>
                                                                <Form form={form}>
                                                                    <Form.Item name={`extra.${item.option_id}.content`}>
                                                                        <Input.TextArea showCount={true} allowClear={true} autoSize={{ minRows: 5, maxRows: 9 }} bordered />
                                                                    </Form.Item>
                                                                </Form>
                                                            </Descriptions.Item>

                                                        </Descriptions>
                                                    </>

                                                )}
                                            />
                                        </TabPane>}
                                    <TabPane tab="Edit Essay Comment" key="4">
                                        <List
                                            dataSource={essay_comment.essay_comments}
                                            pagination={{
                                                pageSize: 1
                                            }}
                                            renderItem={item => (
                                                <>
                                                    <Descriptions labelCol={{ span: 4 }}
                                                        wrapperCol={{ span: 20 }} layout="vertical" bordered>
                                                        <Descriptions.Item label="Original Essay" span={3}>
                                                            {getHighlightedText(order.essay.content, item.sentence)}
                                                        </Descriptions.Item>
                                                        <Descriptions.Item label="Sentence Index" span={1}>{item.sentence_index}</Descriptions.Item>

                                                        <Descriptions.Item label="Sentence" span={2}>{item.sentence}</Descriptions.Item>
                                                        <Descriptions.Item label="Option Content" span={3}>
                                                            <Form form={form}>
                                                                <Form.Item name={`em.${item.sentence_index}.comment`}>
                                                                    <Input.TextArea showCount={true} allowClear={true} autoSize={{ minRows: 5, maxRows: 9 }} bordered />
                                                                </Form.Item>
                                                            </Form>
                                                        </Descriptions.Item>

                                                    </Descriptions>
                                                </>

                                            )}
                                        />
                                    </TabPane>
                                </Tabs>
                            </>)
                }
            </Modal>
        </>
    )
}

export default Order