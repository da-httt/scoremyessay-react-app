import { Row, Col } from 'antd';
import { getBaseURL, getToken, getTokenType } from '../../../../Utils/Common';
import { React, useEffect, useState } from 'react';
import Profit from "./Profit"
import RecentUser from "./RecentUser"
import RecentOrder from "./RecentOrder"
import TopUser from "./TopUser"

const api = getBaseURL();




const Dashboard = () => {

    const [profit, setProfit] = useState([])
    const [recent_users, setRecentUsers] = useState([])
    const [top_users, setTopUsers] = useState([])
    const [recent_orders, setRecentOrder] = useState([])
    useEffect(() => {
        async function fetchData() {
            await api.get('/statistics/profit/days', {
                headers: { Authorization: getTokenType() + ' ' + getToken() }
            }).then(response => {
                const profit = response.data.daily_profit;
                setProfit(profit);
            })

            await api.get('/recent_users', {
                headers: { Authorization: getTokenType() + ' ' + getToken() }
            }).then(response => {
                const recent_users = response.data;
                setRecentUsers(recent_users);
            })

            await api.get('/top_users', {
                headers: { Authorization: getTokenType() + ' ' + getToken() }
            }).then(response => {
                const top_users = response.data.top_users;
                setTopUsers(top_users);
            })
            await api.get('/recent_orders', {
                headers: { Authorization: getTokenType() + ' ' + getToken() }
            }).then(response => {
                const recent_orders = response.data;
                setRecentOrder(recent_orders);
            })
        }
        fetchData();

    }, []);
    return (
        <>
            <Row>
                <Col span={17}><Profit daily_profit={profit} style={{ marginTop: "20px" }} /></Col>
                <Col span={7}><RecentUser recent_users={recent_users} style={{ margin: "20px" }} /></Col>
            </Row>
            <Row >
                <Col span={17}><RecentOrder recent_orders={recent_orders} style={{ margin: "20px" }} /></Col>
                <Col span={7}><TopUser top_users={top_users} style={{ margin: "20px" }} /></Col>
            </Row>
            <Row>
            </Row>

            
        </>
    )
}

export default Dashboard;