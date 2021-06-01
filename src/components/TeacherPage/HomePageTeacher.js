import './Teacher.css';
import { React, useEffect, useState } from 'react';
import { Button, Input } from 'reactstrap';
import { Breadcrumb, Radio, Table, Tag, Tabs } from 'antd';
import GlobalHeader from './GlobalHeaderComponentT';
import { getBaseURL, getToken, getTokenType } from '../../Utils/Common';
import { withRouter } from 'react-router-dom';
const { TabPane } = Tabs;
const api = getBaseURL();


const HomeTeacher = (props) => {
    const rowSelection = useState([]);
    const [orders, setOrders] = useState([]);
    const [orders2, setOrders2] = useState([]);
    const [status, setStatus] = useState([]);
    //const [stateOrder,setStateOrder] = useState(2);
    const [statistics, setStatistics] = useState();
    const [statistic, setStatistic] = useState([]);
    const [deadline, setDeadline] = useState([]);
    const [types, setTypes] = useState([]);

    const [searchTitle, setSearchTitle] = useState();
    useEffect(() => {
        async function fetchData() {
            await api.get('/types',).then(response => {
                const types = response.data.data;
                setTypes(types);
            })

            await api.get('/status',).then(response => {
                const status = response.data.data;
                setStatus(status);
            })

            await api.get('/orders', {
                headers: { Authorization: getTokenType() + ' ' + getToken() }
            }).then(response => {
                const orders = response.data.data;
                setOrders(orders);
                setOrders2(orders);

            })
            await api.get('/statistics/me', {
                headers: { Authorization: 'Bearer ' + getToken() }
            }
            ).then(response => {
                setStatistic([response.data]);
                setStatistics(response.data);
            })

            await api.get('/deadlines', {
                headers: { Authorization: 'Bearer ' + getToken() }
            }
            ).then(response => {
                setDeadline([response.data]);
            })
        }
        fetchData();

    }, []);

    const statusList = status.map((state) => (
        state.status_id !== 0 && state.status_id !== 1 && (
            <Radio value={state.status_id}>{state.status_name}</Radio>
        )
    ));

    const columnsEssay = [
        {
            title: 'ID',
            dataIndex: 'order_id',
            key: 'order_id',
            width: 30,
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.order_id - b.order_id,
        },
        {
            title: 'Thể loại',
            dataIndex: ['essay', 'type_id'],
            key: ['essay', 'type_id'],
            width: 120,
            filters: [
                { text: 'English Writing', value: 0 },
                { text: 'IELTS WRITING TASK 1', value: 1 },
                { text: 'IELTS WRITING TASK 2', value: 2 },
            ],
            onFilter: (value, record) => record.essay.type_id === value,
            render: kind => <div style={{ color: 'blue' }}>{types[kind].type_name}</div>,
        },
        {
            title: 'Tiêu đề bài viết',
            dataIndex: ['essay', 'title'],
            key: ['essay', 'title'],
            width: 230,
            render: title => <div>{title.slice(0, 50)}...</div>
        },

        {
            title: 'Giá tiền',
            dataIndex: 'total_price',
            key: 'total_price',
            width: 50,
            sorter: (a, b) => a.total_price - b.total_price,

        },
        {
            title: 'Hạn giao bài viết',
            fixed: 'right',
            dataIndex: 'deadline',
            key: 'deadline',
            width: 110,

        },
        {
            title: 'Tình trạng',
            fixed: 'right',
            dataIndex: 'status_id',
            key: 'status_id',
            width: 100,
            filters: [
                { text: 'On Going', value: 2 },
                { text: 'Done', value: 3 },
                { text: 'Cancelled', value: 4 },
            ],
            onFilter: (value, record) => record.status_id === value,
            render: statu =>
            (
                <>
                    {statu === 3 && (<Tag color="success">{status[statu].status_name.toUpperCase()}</Tag>)}
                    {statu === 2 && (<Tag color="processing">{status[statu].status_name.toUpperCase()}</Tag>)}
                    {statu === 4 && (<Tag color="error">{status[statu].status_name.toUpperCase()}</Tag>)}
                </>
            )
        },


    ];

    const columns = [{
        title: 'Số lượng',
        dataIndex: 'total_orders',
        render: total => (
            <p style={{ color: "blue", textAlign: "center", fontSize: '20px' }}>{total}</p>
        )
    },
    {
        title: 'Đã chấm',
        dataIndex: 'total_done',
        render: score => (
            <p style={{ color: "blue", textAlign: "center", fontSize: '20px' }}>{score}</p>
        )
    }]

    const columnsSchedule = [{
        title: 'Ngày hôm nay',
        dataIndex: 'today_deadline',
        render: today => (
            <p style={{ color: "blue", textAlign: "center", fontSize: '20px' }}>{today}</p>
        )
    },
    {
        title: 'Tuần này',
        dataIndex: 'week_deadline',
        render: week => (
            <p style={{ color: "blue", textAlign: "center", fontSize: '20px' }}>{week}</p>
        )
    }]

    const handleSearch = () => {

        setOrders(orders2);
        const filteredEvents = orders2.filter((order) => {
            const title = order.essay.title.toLowerCase();
            return title.includes(searchTitle.toLowerCase());
        });
        setOrders(filteredEvents);
    };

    const handleReset = () => {
        setSearchTitle("");
        setOrders(orders2);
    }

    return (
        <div className="teacher-page">
            <GlobalHeader />

            <div className="container-fluid detailPage" >
                <div class="row" style={{ minHeight: window.innerHeight + 'px' }}>
                    <div className="container-fluid leftCol">
                        <div className="content-header-teacher padding">
                            <div className="row bg-row margin padding" >
                                <Breadcrumb className="mt-1" style={{ fontSize: 'large' }}>
                                    <Breadcrumb.Item>
                                        <a href="/Home" style={{ color: "white" }} >Trang chủ</a>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item style={{ color: "white" }} >Quản lý bài viết</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <div className="row bg-row padding" >
                                <br />
                                <h3 className="content-header-teacher-title" >DANH SÁCH BÀI VIẾT</h3>
                            </div>
                        </div>
                        <div className="content-teacher  " style={{ backgroundColor: "transparent", padding: "10px" }}>
                            <div className="container-fluid" style={{ backgroundColor: "white", padding: "20px" }}>
                                <div className="row ">
                                    <div className="col col-8 mb-3 mt-3">
                                        <Input placeholder="Nhập đề bài viết bạn muốn tìm kiếm" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} />
                                    </div>
                                    {/* <div className="col col-5 mb-auto mt-auto " >
                            <Radio.Group  defaultValue={stateOrder} onChange={(e)=>{setStateOrder(e.target.value)}}>
                                {statusList}
                                <Radio value={5}>All</Radio>
                            </Radio.Group>
                            </div> */}
                                    <div className="col col-2 mb-auto mt-auto ">
                                        <Button outline color="secondary" block onClick={handleReset}>Đặt lại</Button>
                                    </div>
                                    <div className="col col-2 mb-auto mt-auto ">
                                        <Button color="primary" block onClick={handleSearch}>Tìm kiếm </Button>
                                    </div>
                                </div>
                                <div className="row mt-4" style={{ height: 'auto' }}>
                                    <Table rowKey={order => order.order_id}
                                        columns={columnsEssay}
                                        dataSource={orders}
                                        pagination={{ pageSize: 5 }}
                                        rowSelection={{ rowSelection }}
                                        scroll={{ x: 1220 }}
                                        onRow={(record) => {
                                            return {
                                                onClick: event => <>
                                                    {record.status_id === 2 && (props.history.push("/HomeTeacherPage/ScoreEssay?order_id=" + record.order_id))}
                                                    {record.status_id === 3 && (props.history.push("/HomeTeacherPage/DetailResult?order_id=" + record.order_id))}
                                                </>,
                                            };
                                        }} />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="container-fluid rightCol">
                        <div className="row  margin" >
                            <div class="card" >
                                <Button className="btn-homepage" color="primary" href="/HomeTeacherPage/AddNewWriting" block large>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-file-earmark-plus-fill" viewBox="0 0 16 16" style={{ padding: "5px" }}>
                                        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0z" />
                                    </svg>
                                    <br />Chấm bài viết mới</Button>

                                <div className="card-body">
                                    <div style={{ fontSize: "large", color: "#2596be", fontWeight: "900", paddingBottom: "5px" }} ><i className="fa fa-info-circle fa-lg" >{' '}</i>   Số lượng bài viết đã đăng</div>
                                    <p className="card-text">
                                        Some quick example text to build on the card title and make up the bulk of the
                                        card's content.
    </p>
                                </div>
                                <div >
                                    <Tabs defaultActiveKey="1" style={{padding:"10px"}}>
                                        <TabPane tab="Deadline tuần này" key="1">
                                            <Table columns={columnsSchedule} 
                                            dataSource={deadline} 
                                            pagination={false} 
                                            size="small"
                                            bordered/>
                                        </TabPane>
                                        <TabPane tab="Thống kê" key="2">
                                            <Table columns={columns}
                                                style={{ textAlign: "center" }}
                                                dataSource={statistic}
                                                pagination={false}
                                                size="small"
                                                bordered />
                                        </TabPane>

                                    </Tabs>

                                </div>
                            </div>
                        </div>
                        <div className="row shadow-background">
                            <Tabs defaultActiveKey="1" style={{ borderColor: "grey", backgroundColor: "white", padding: "10px" }}>
                                <TabPane tab="Tổng thu tháng này" key="1">

                                    <div className="row bg-row margin padding" >
                                        {statistics && (
                                            <div className="container-fluid">

                                                <div className="row ">
                                                    <div className="col" style={{ fontSize: '30px', fontStyle: 'revert' }}>
                                                        <span style={{ color: "orange" }}>{Number(statistics.monthly_payment).toLocaleString()} </span>VND
                            </div>
                                                </div>
                                                <div className="row ">
                                                    <div className="col padding" style={{ fontSize: '18px' }}>
                                                        So với tháng trước:
                            {statistics.gross > 0 &&
                                                            <i className="fa fa-sort-up" style={{ color: 'forestgreen' }} />}
                                                        {Math.round(statistics.gross) < 0 &&
                                                            <i className="fa fa-sort-down" style={{ color: 'darkorange' }} />}
                                                        {Math.round(statistics.gross)} %
                        </div>
                                                </div>
                                                <hr />
                                                <div className="row ">
                                                    <div className="col padding" style={{ fontSize: '18px' }}>
                                                        Mức chi trung bình theo bài: <br />
                                                        <span style={{ color: "green" }}>{Number(statistics.monthly_payment / statistics.monthly_orders).toLocaleString()}</span>  đồng
                        </div>
                                                </div>
                                            </div>)}

                                    </div>
                                </TabPane>
                                <TabPane tab="Đánh giá của học viên" key="2">
                                    <div className="row bg-row margin padding" >
                                        <div className="container-fluid">
                                            <div className="row ">
                                                <div className="col" style={{ fontSize: '30px', fontStyle: 'revert' }}>{'4.95'} </div>
                                            </div>
                                            <div className="row ">
                                                <div className="col" style={{ fontSize: '18px', height: '57px' }}>
                                                    So với tháng trước {'10% '}
                                                    <i className="fa fa-sort-up" style={{ color: 'forestgreen' }}></i>
                                                    <i className="fa fa-sort-down" style={{ color: 'darkorange' }} ></i>
                                                </div>
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

    );
}

export default withRouter(HomeTeacher);


