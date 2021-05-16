import { List, Avatar, Card } from 'antd';


const RecentUser = (props) => {

    const recent_users = props.recent_users

    return (
        <Card title="Học viên mới" style={{ margin: "20px", height: '500px', width: 'auto' }}>

            <List
                style={{height: '500px'}}
                itemLayout="horizontal"
                dataSource={recent_users}
                pagination={{ pageSize: 4 }}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={`data:image/jpeg;base64,${item.image_base64}`} />}
                            title={item.user_name}
                            description={`User ID: ${item.user_id}`}
                        />
                    </List.Item>
                )}
            />
        </Card>
    )
};

export default RecentUser