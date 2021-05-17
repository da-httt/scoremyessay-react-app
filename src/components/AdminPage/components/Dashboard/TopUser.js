import { List, Avatar, Card } from 'antd';


const TopUser = (props) => {

    const top_users = props.top_users

    return (
        <Card title="Xếp hạng" style={{ margin: "20px", height: '500px', width: 'auto' }}>

        <List
        itemLayout="horizontal"
        dataSource={top_users}
        pagination={{ pageSize:3 }}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
                avatar={<Avatar src={`data:image/jpeg;base64,${item.image_base64}`} />}
              title={item.user_name}
              description={`User ID: ${item.user_id}`}
            />
            {`Order Count: ${item.order_count}`}
          </List.Item>
        )}
      />
      </Card>
    )
};

export default TopUser