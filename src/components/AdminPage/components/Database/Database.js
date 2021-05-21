import { getBaseURL, getToken, getTokenType } from '../../../../Utils/Common';
import { Tabs, List, Card, Row, Col, Space, Tag, Table,Button } from 'antd';
import { React, useEffect, useState } from 'react';

const api = getBaseURL();
const { TabPane } = Tabs;


export const Database = (props) => {
    const [genders, setGenders] = useState([]);
    const [types, setTypes] = useState([]);
    const [status, setStatus] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [options, setOptions] = useState([]);

    const rowSelection = useState([]);

    useEffect(() => {
        async function fetchData() {

            await api.get('/genders', {
                headers: { Authorization: getTokenType() + ' ' + getToken() }
            }).then(response => {
                const genders = response.data.data;
                setGenders(genders);
            })

            await api.get('/jobs', {
                headers: { Authorization: getTokenType() + ' ' + getToken() }
            }).then(response => {
                const jobs = response.data.data;
                setJobs(jobs);
            })

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


        }
        fetchData();

    }, []);

    const columnOptions = [
        {
            title: 'Option ID',
            dataIndex: ['option_id'],
            key: ['option_id'],
            width: 'auto',
        },
        {
            title: 'Option Name',
            dataIndex: ['option_name'],
            key: ['option_name'],
            width: 'auto',
        },

        {
            title: 'Option Type',
            dataIndex: ['option_type'],
            key: ['option_type'],
            width: 'auto',
            render: option_type =>
            (
                <>
                    {option_type === 0 && (<Tag color="green">{"Mức độ chấm điểm"}</Tag>)}
                    {option_type === 1 && (<Tag color="blue">{"Thời gian chấm"}</Tag>)}

                </>
            )
        },

        {
            title: 'Price',
            dataIndex: ['option_price'],
            key: ['option_price'],
            width: 'auto',
        }
        , {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => {
                    }}> Edit </Button>
                    <Button type="link">Delete</Button>
                </Space>
            ),
        }

    ];



    return (
        <>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="Quản lý danh mục đơn hàng" key="1">
                    <Table style={{ width: 'auto' }}
                        rowKey={options => options.option_id}
                        columns={columnOptions}
                        dataSource={options}
                        pagination={{ pageSize: 5 }}
                        rowSelection={{ rowSelection }} />

                </TabPane>
                <TabPane tab="Quản lý danh mục thông tin" key="2">
                    <Row>
                        <Col>
                            <div className="site-card-border-less-wrapper">
                                <Card title="Job List" style={{ width: 400, margin: 20 }}>
                                    <List

                                        className="demo-loadmore-list"
                                        itemLayout="horizontal"
                                        dataSource={jobs}
                                        renderItem={item => (
                                            <List.Item
                                                actions={[<Button type="link" >edit</Button>]}
                                            >
                                                <List.Item.Meta

                                                    title={item.job_name}
                                                    description={"Job ID: " + item.job_id}
                                                />
                                            </List.Item>
                                        )}
                                    />
                                    <Button>Add</Button>
                                </Card>
                            </div>
                        </Col>
                        <div className="site-card-border-less-wrapper">
                            <Card title="Gender List" style={{ width: 400, margin: 20 }}>
                                <List

                                    className="demo-loadmore-list"
                                    itemLayout="horizontal"
                                    dataSource={genders}
                                    renderItem={item => (
                                        <List.Item
                                        actions={[<Button type="link" >edit</Button>]}
                                        >
                                            <List.Item.Meta

                                                title={item.gender_name}
                                                description={"Gender ID: " + item.gender_id}
                                            />
                                        </List.Item>
                                    )}
                                />
                                <Button>Add</Button>
                            </Card>
                        </div>
                        <Col>
                            <div className="site-card-border-less-wrapper">
                                <Card title="Status List" style={{ width: 400, margin: 20 }}>
                                    <List

                                        className="demo-loadmore-list"
                                        itemLayout="horizontal"
                                        dataSource={status}
                                        renderItem={item => (
                                            <List.Item
                                            actions={[<Button type="link" >edit</Button>]}
                                            >
                                                <List.Item.Meta

                                                    title={item.status_name}
                                                    description={"Status ID: " + item.status_id}
                                                />
                                            </List.Item>
                                        )}
                                    />
                                    <Button>Add</Button>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </TabPane>

            </Tabs>



        </>

    )
}

export default Database

