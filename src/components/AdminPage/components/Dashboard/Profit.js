import React from 'react';
import {Line} from '@ant-design/charts';
import { Card } from 'antd';

const Profit = (props) => {

    const daily_profit = props.daily_profit
    const profit_data = daily_profit.map((profit) => ({
        date: profit.day,
        total_profit: profit.total_profit,
    }))
    const data = profit_data.reverse()
    const config = {
        data,
        height: 400,
        xField: 'date',
        yField: 'total_profit',
        point: {
            size: 5,
            shape: 'diamond',
        },
    };
    return (
        <Card title="Doanh thu 30 ngày gần nhất" style={{ margin: "20px", height: '500px', width: 'auto' }}>
            <Line {...config} style={{ marginBottom: "20px" }} />
        </Card>

    );
};
export default Profit;