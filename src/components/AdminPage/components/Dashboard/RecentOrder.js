import { Card, Table, Tag } from 'antd';


const RecentOrder = (props) => {

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'order_id',
            key: 'order_id',
            width: 'auto'

        },
        {
            title: 'Type',
            dataIndex: 'essay_type',
            width: 'auto'

        }, 
        {
            title: 'Student',
            dataIndex: 'student_name',
            width: 'auto'

        },{
            title: 'STATUS',
            dataIndex: 'status_id',
            key: 'status_id',

            render: statu =>
            (
                <>
                    {statu === 3 && (<Tag color="success">Done</Tag>)}
                    {statu === 2 && (<Tag color="processing">On Going</Tag>)}
                    {statu === 1 && (<Tag color="warning">Waiting</Tag>)}
                    {statu === 4 && (<Tag color="error">Canceled</Tag>)}
                </>
            ),
            width: 'auto'

        }, {
            title: 'DATE',
            dataIndex: 'sent_date',
            render: sent_date => 
            new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date(sent_date)),
        }, {
            title: 'PRICE',
            dataIndex: 'total_price',
            width: 'auto'
        },
    ]

    const recent_orders = props.recent_orders

    return (
        <Card style={{ margin: "20px", height: '500px', width: 'auto' }}>
            <Table 
            pagination={false} 
            columns={columns} 
            rowKey={(record, key) => key} 
            dataSource={recent_orders.filter((item, key) => key < 5)} />
        </Card>
    )
};

export default RecentOrder