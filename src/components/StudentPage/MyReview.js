import './Student.css';
import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import GlobalHeader from './GlobalHeaderComponent';
import { Breadcrumb, Table } from 'antd';
import { getBaseURL, getToken } from '../../Utils/Common';
import { withRouter } from 'react-router-dom';

const api = getBaseURL();

const MyReviews = (props) => {
    const [reviews, setReviews] = useState();
    useEffect(() => {
        async function fetchData() {
            await api.get('/users/me', {
                headers: { Authorization: 'Bearer ' + getToken() }
            }
            ).then(response => {
                api.get('ratings?student_id=' + response.data.info.user_id, {
                    headers: { Authorization: 'Bearer ' + getToken() }
                }
                ).then(response => {
                    setReviews(response.data.data);
                })
            })

        }
        fetchData();

    }, []);


    const columns = [
        {
            title: 'ID của bài viết',
            dataIndex: 'order_id',
            width: 180,
        },

        {
            title: 'Điểm sao',
            dataIndex: 'stars',
            width: 180,

        },
        {
            title: 'Bình luận & Nhận xét',
            dataIndex: 'comment',
            width: 450,

        },
        {
            render: (_, record) =>
                reviews.length >= 1 ? (
                    <Button outline color="primary" onClick={event => (props.history.push("/HomeStudentPage/DetailResult?order_id=" + record.order_id))}>Chi tiết</Button>
                ) : null,
            width: 150
        },

    ];

    return (
        < div className="student-page">
            <GlobalHeader />
            <div className="container-fluid detailPage"  >
                <div className="row" style={{ height: window.innerHeight + 'px' }} >
                    <div className="container-fluid centerCol padding">
                        <div className="gradient-background-student padding"> 
                            <div className="row bg-row margin padding " >
                                <Breadcrumb className="mt-1" style={{ fontSize: "large" }}>
                                    <Breadcrumb.Item>
                                        <a style={{ color:"white" }} href="/Home">Trang chủ</a>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item style={{ color:"white" }}>Đánh giá của tôi</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <div className="row bg-row padding" >
                                <br />
                                <h3 className="mt-auto mb-auto" style={{ color:"white", fontWeight:"700" }}> ĐÁNH GIÁ CỦA TÔI</h3>
                            </div>
                        </div>

                        <div className="bg" style={{backgroundColor:"white"}}>
                            <div className="row bg-row margin padding">
                                <div className="container-fluid">
                                    <Table rowKey={order => order.order_id}
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

        </div>
    );
}

export default withRouter(MyReviews);