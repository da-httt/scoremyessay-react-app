import { getBaseURL, getToken, getTokenType } from '../../../../Utils/Common';
import { Popconfirm, notification, Modal, Form, DatePicker, Radio, Input, Select, Avatar, Divider, Descriptions, PageHeader, Drawer, Space, Tag, Table, Layout, Menu, Breadcrumb, Button } from 'antd';
import { React, useEffect, useState } from 'react';
import "../../admin.css"

const api = getBaseURL();


export const Rating = () => {

    const [rating, setRating] = useState([])

    useEffect(() => {
        async function fetchData() {

            await api.get('/ratings', {
                headers: { Authorization: getTokenType() + ' ' + getToken() }
            }).then(response => {

                const rating = response.data.data;
                setRating(rating);
            })
        }
        fetchData();

    }, []);

    const columns = [
        {
            title: 'Rating ID',
            dataIndex: 'rating_id',
            key: 'rating_id',
            width: 'auto',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.rating_id - b.rating_id,
        },
        {
            title: 'Student',
            dataIndex: 'student_id',
            key: 'student_id',
            width: 'auto',
        },
        {
            title: 'Rating',
            dataIndex: 'stars',
            key: 'stars',
            width: 'auto',
        }, {
            title: 'Comment',
            dataIndex: 'comment',
            key: 'comment',
            width: 'auto',
        }

    ]

    return (
        <>
            <PageHeader
                ghost={false}
                title="Rating"
            >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="Total Rating: ">{rating && rating.length}</Descriptions.Item>
                </Descriptions>
            </PageHeader>

            <Table style={{ width: 'auto' }}
                rowKey={raing => rating.rating_id}
                columns={columns}
                dataSource={rating}
                pagination={{ pageSize: 5 }}
            />
        </>
    )
};

export default Rating;