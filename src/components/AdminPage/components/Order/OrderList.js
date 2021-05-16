import { getBaseURL, getToken, getTokenType } from '../../../../Utils/Common';
import { Form, DatePicker, Popconfirm, Input, Row, Col, Descriptions, PageHeader, Drawer, Space, Tag, Table, Layout, Menu, Radio, Button } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { React, useEffect, useState } from 'react';
import Order from "./Order"

const { Search } = Input
const { RangePicker } = DatePicker
const { SubMenu } = Menu;
const { Header, Content, Footer } = Layout;

const api = getBaseURL();

const status_fitler = [
  { label: 'All', value: 0},
  { label: 'Waiting', value: 1 },
  { label: 'On Going', value: 2 },
  { label: 'Done', value: 3 },
  { label: 'Canceled', value: 4 },
];




export const OrderList = (props) => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [order, setOrder] = useState(0);

  const [types, setTypes] = useState([]);
  const [status, setStatus] = useState([]);
  const [stateOrder, setStateOrder] = useState(1);
  const rowSelection = useState([]);
  const [visible, setVisible] = useState(false);
  const [statusSelect, setStatusSelect] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0);
  const showDrawer = () => {
    setVisible(true);
  };


  const onClose = () => {
    console.log("on close")
    setVisible(false);
    setRefreshKey(oldKey => oldKey +1)
  };

  const cancel = (e) =>{

  };
  const confirm = (e) =>{
    
  };

  const columnsEssay = [
    {
      title: 'ID',
      dataIndex: 'order_id',
      key: 'order_id',
      width: 'auto',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.order_id - b.order_id,
    },
    {
      title: 'Type',
      dataIndex: ['essay', 'type_id'],
      key: ['essay', 'type_id'],
      width: 'auto',
      render: kind => <div style={{ color: '#0693E3' }}>{types[kind].type_name}</div>,
    },
    {
      title: 'Student',
      dataIndex: ['student_id'],
      key: ['student_id'],
      width: 'auto',
      render: student_id => <div>{users[0]  && (users.filter(user => user.info.user_id == student_id)[0]).info.name }</div>,
    },
    {
      title: 'Updated Time',
      dataIndex: 'updated_date',
      key: 'updated_date',
      width: 'auto',

    },
    {
      title: 'Status',
      dataIndex: 'status_id',
      key: 'status_id',
      filters: [
        {
          text: 'All',
          value: 0,
        },
        {
          text: 'Waiting',
          value: 1,
        },
        {
          text: 'On Going',
          value: 2,
        },{
          text: 'Done',
          value: 3,
        },
        {
          text: 'Canceled',
          value: 4,
        },
        
      ],
      render: statu =>
      (
        <>
          {statu === 3 && (<Tag color="success">{status[statu].status_name.toUpperCase()}</Tag>)}
          {statu === 2 && (<Tag color="processing">{status[statu].status_name.toUpperCase()}</Tag>)}
          {statu === 1 && (<Tag color="warning">{status[statu].status_name.toUpperCase()}</Tag>)}
          {statu === 4 && (<Tag color="error">{status[statu].status_name.toUpperCase()}</Tag>)}
        </>
      ),
      onFilter: (value, record) => value == 0 ? true: record.status_id === value,
      width: 'auto'
    },
    {
      title: 'Total Price',
      dataIndex: 'total_price',
      key: 'total_price',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.total_price - b.total_price,
    }
    , {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a href="#" onClick={() => {
            showDrawer()
            setOrder(record.order_id)
          }}> View </a>
          <Popconfirm
            title="Are you sure to perform this task?"
            onConfirm={(e) =>{
              api.delete("/orders/" + record.order_id,{
                headers: { Authorization: getTokenType() + ' ' + getToken() }
              }).then(response => {
                setRefreshKey(oldKey => oldKey +1)
              })
            }}
            onCancel={cancel}
            okText="Disable"
            cancelText="Cancel"
          >
            <a href="#"> Disable</a>
          </Popconfirm>,
        </Space>
      ),
    }

  ];


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
      })

      await api.get('/users', {
        headers: { Authorization: getTokenType() + ' ' + getToken() }
      }).then(response => {
        const users = response.data.data;
        console.log(response.data)
        setUsers(users);
      })
    }
    fetchData();

  }, [refreshKey]);


  return (
    <>
      <PageHeader
        ghost={false}
        title="Quản lý đơn hàng"
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="Total Order: ">{orders.length}</Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <div className="site-drawer-render-in-current-wrapper">
        <Table rowKey={order => order.order_id}
          columns={columnsEssay}
          dataSource={orders}
          expandable={{
            
            expandedRowRender: record =><>
              <p style={{ marginLeft: 20 }}>Created Time: {record.sent_date}</p>
              <p style={{ marginLeft: 20 }}>    Deadline: {record.deadline}</p>
              <p style={{ marginLeft: 20}}>   Time left: {record.time_left}</p>
            </>
          }}
          bordered
          pagination={{ pageSize: 5 , position: 'topRight'}}
          rowSelection={{ rowSelection }} />


        <Drawer
          width={900}
          title="Order Information"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          {order && (<Order order_id={order} />)}
        </Drawer>
      </div>
    </>
  )
}

export default OrderList