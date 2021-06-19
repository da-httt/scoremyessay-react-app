import './Student.css';
import { React, useEffect, useState } from 'react';
import { Button, Input } from 'reactstrap';
import { Breadcrumb, Table } from 'antd';
import GlobalHeader from './GlobalHeaderComponent';
import { getBaseURL, getToken, getTokenType } from '../../Utils/Common';
import { withRouter } from 'react-router';

const api = getBaseURL();


const Cart = (props) => {
    const rowSelection = useState([]);
    const [orders, setOrders] = useState([]);
    const [orders2, setOrders2] = useState([]);
    const [types, setTypes] = useState([]);
    const [searchTitle, setSearchTitle] = useState();
    useEffect(() => {
        async function fetchData() {
            api.get('/types',).then(response => {
                const types = response.data.data;
                setTypes(types);
            })

            api.get('/orders/saved', {
                headers: { Authorization: getTokenType() + ' ' + getToken() }
            }).then(response => {
                const orders = response.data.data;
                setOrders(orders);
                setOrders2(orders);

            })
        }
        fetchData();

    }, []);

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

    const columnsEssay = [
        {
            title: 'Thể loại',
            dataIndex: ['essay', 'type_id'],
            width: 'auto',
            render: kind => <div style={{ color: 'blue' }}>{types[kind].type_name}</div>,
        },
        {
            title: 'Đề bài',
            dataIndex: ['essay', 'title'],
            width: 'auto',
            render: title => <div>{title.slice(0, 70)}...</div>

        },

        {
            title: 'Thời gian gửi',
            dataIndex: 'sent_date',
            width: 'auto',

        },
        {
            title: 'Giá tiền',
            dataIndex: 'total_price',
            width: 'auto',

        },
    ];


    return (
        <div className="student-page">

            <GlobalHeader username="Canh Ngo" />

            <div className="container-fluid detailPage" >
                <div class="row" style={{ minHeight: window.innerHeight + 'px' }}>
                    <div className="container-fluid centerCol">
                        <div className="gradient-background-student padding">
                            <div className="row padding " >
                                <Breadcrumb className="mt-1" >
                                    <Breadcrumb.Item>
                                        <a href="/Home">Trang chủ</a>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item >
                                        <a href="/HomeStudentPage">Quản lý bài viết</a>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item style={{ color: "white" }}>Giỏ Hàng</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <div className="row bg-row padding" >
                                <br />
                                <h3 style={{ color: "white", fontWeight: "700" }}>GIỎ HÀNG CỦA BẠN</h3>
                            </div>
                        </div>
                        <div className="content-student" style={{padding: "10px"}}>
                            <div className="container-fluid" style={{ backgroundColor: "white" }}>
                                <div className="row ">


                                    <div className="col col-7 mb-3 mt-3">
                                        <Input id="search" name="search" placeholder="Nhập đề bài viết bạn muốn tìm kiếm" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} />
                                    </div>
                                    <div className="col col-2 mb-auto mt-auto ">
                                        <Button className="btn-homepage" color="primary" block onClick={handleSearch}>Tìm kiếm</Button>
                                    </div>
                                    <div className=" mb-auto mt-auto ">
                                        <Button className="btn-homepage btn-primary btn-outline-primary" outline color="primary" block onClick={handleReset}>Đặt lại</Button>
                                    </div>


                                </div>
                                <div className="row" >

                                    <Table style={{ width: 'auto', minWidth: 'unset' }} rowKey={order => order.order_id}
                                        columns={columnsEssay} dataSource={orders}
                                        pagination={{ pageSize: 5 }} rowSelection={{ rowSelection }}
                                        onRow={(record, rowIndex) => {
                                            return {
                                                onClick: event => (props.history.push("/HomeStudentPage/AddNewWriting/?order_id=" + record.order_id)),
                                            };
                                        }}
                                        scroll={{ x: 1000 }} />
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

        </div>

    );
}

export default withRouter(Cart);


