import './Student.css';
import { React, useEffect, useState} from 'react';
import {  Button, Input} from 'reactstrap';
import { Breadcrumb,Popconfirm,Radio,Table, Tag } from 'antd';
import GlobalHeader from './GlobalHeaderComponent';
import { getBaseURL, getToken, getTokenType } from '../../Utils/Common';
import { withRouter } from 'react-router-dom';

const api= getBaseURL();

const HomeStudent = (props) =>{
    const rowSelection = useState([]);
    const [orders, setOrders] = useState([]);
    const [orders2, setOrders2] = useState([]);
    const [types, setTypes] = useState([]);
    const [status, setStatus] = useState([]);
    //const [stateOrder,setStateOrder] = useState(1);
    const [statistic,setStatistic] = useState();
    const [statistics,setStatistics] = useState();
    const [topUsers,setTopUsers] = useState([]);
    const [searchTitle, setSearchTitle] = useState();
    useEffect( () => {
        async function fetchData() {
            await api.get('/types',).then(response => {
                const types = response.data.data;
                setTypes(types);
            })  
    
            await api.get('/status',).then(response => {
                const status = response.data.data;
                setStatus(status);
            }) 
    
            await api.get('/orders',{
                headers: {Authorization: getTokenType() + ' ' + getToken()}
            }).then(response => {
                const orders = response.data.data;
                setOrders(orders);
                setOrders2(orders);
                
            })  
            await api.get('/statistics/me',{
                headers: {Authorization: 'Bearer ' + getToken()}
              }
              ).then(response => {
                  setStatistic([response.data]);
                  setStatistics(response.data);
              })
              await api.get('/top_users',{
                headers: {Authorization: 'Bearer ' + getToken()}
              }
              ).then(response => {
                  setTopUsers(response.data.top_users);
                  
              })
        }
        fetchData();
        
    },[]);
    
    // const statusList = status.map((state) => (
    //     state.status_id!==0 && (
    //     <Radio value={state.status_id}>{state.status_name}</Radio>
    //     )
    // ));
    
    const handleDelete =(order_ID) =>{
        api.delete("orders/"+order_ID,{
            headers: {Authorization: 'Bearer ' + getToken()}
          }).then(response => {
            alert("Bài viết của bạn đã được hủy thành công!");
            window.location.reload();
          })
    }
    const handleSearch = () =>{
    
        setOrders(orders2);
        const filteredEvents = orders2.filter((order) => {
            const title = order.essay.title.toLowerCase();
            return title.includes(searchTitle.toLowerCase());
          });
        setOrders(filteredEvents);
    };

    const handleReset = () =>{
        setSearchTitle("");
        setOrders(orders2);
    }

    const  columnsEssay = [
        {
            title: 'ID',
            dataIndex: 'order_id',
            key: 'order_id',
            width: 60,
        },
        {
            title: 'Thể loại',
            dataIndex: ['essay','type_id'],
            key: ['essay','type_id'],
            width: 125,
            render: kind => <div style={{color: 'blue'}}>{types[kind].type_name}</div>,
           },
           {
            title: 'Chủ đề',
            dataIndex:'topic_name',
            width:130
            
          },
          {
            title: 'Đề bài',
            dataIndex: ['essay','title'],
            key: ['essay','title'],
            width: 310,
            render: title => <div>{title.slice(0,40)}...</div>,
            
          },
          {
            title: 'Thời gian cập nhật',
            dataIndex: 'updated_date',
            key: 'updated_date',
            width: 110,
           
          },
          {
            title: 'Tình trạng',
            dataIndex: 'status_id',
            key: 'status_id',
            filters: [
                { text: 'On Going', value: 2 },
                { text: 'Done', value: 3 },
                { text: 'Cancelled', value: 4 },
              ],
            width: 100,
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
          {
            title: 'Giá tiền',
            dataIndex: 'total_price',
            key: 'total_price',
            width: 100,
           
          },
          {
            title: 'Action',
            fixed: 'right',
            render: (_, record) =>
                orders.length >= 1 ? (<>
                <Button outline color="primary" onClick={event => (props.history.push("/HomeStudentPage/DetailWriting?order_id="+record.order_id))}>View</Button>
                <Button outline color="warning" style={{margin:'0px 10px'}} onClick={event => (props.history.push("/HomeStudentPage/DetailResult?order_id="+record.order_id))}>Result</Button>
                {(record.status_id===1 || record.status_id===2) &&(
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.order_id)}>
                  <Button outline color="danger">Delete</Button>
                </Popconfirm>
                )}
                
              </>
              ) : null,
          },

          
          
    ];

    const columns=[{
        title: 'Số lượng',
        dataIndex: 'total_orders',
        render: total => (
            <p style={{color:"blue", textAlign:"center", fontSize:'20px'}}>{total}</p>
        )
    },
    {
        title: 'Đã chấm',
        dataIndex: 'total_done',
        render: score => (
            <p style={{color:"blue", textAlign:"center", fontSize:'20px'}}>{score}</p>
        )
    }]

    const columnsUser = [
      {
        title: 'Người dùng',
        dataIndex: 'user_name',
        width: 220,
        render: username => <div style={{color: 'blue'}}>{username}</div>,
      },
      {
        title: 'Số bài',
        dataIndex: 'order_count',
        width: 90,
       
      },
    ];
    return (
        <>         
            <GlobalHeader />
            
            <div className="container-fluid detailPage" >
                <div class="row" style={{minHeight: window.innerHeight + 'px'}}>
                <div className="container-fluid leftCol">
                    <div className="row bg-row margin padding" >
                        <Breadcrumb  className="mt-1" style={{fontSize: "large"}}>
                            <Breadcrumb.Item>
                            <a href="/Home">Trang chủ</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item >Quản lý bài viết</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="row bg-row padding" >
                        <br/>
                        <h3>DANH SÁCH BÀI VIẾT</h3>
                    </div>
                    <div className="row bg-row margin padding ">
                    <div className="container-fluid">
                        <div className="row ">
                            <div className="col col-8 mb-3 mt-3">
                                <Input id="search" name="search" placeholder="Nhập đề bài viết bạn muốn tìm kiếm" value={searchTitle} onChange={(e)=>setSearchTitle(e.target.value)}/>
                            </div>
                            {/* <div className="col col-6 mb-auto mt-auto " >
                            <Radio.Group  defaultValue={stateOrder} onChange={(e)=>{setStateOrder(e.target.value)}}>
                                {statusList}
                                <Radio value={5}>All</Radio>
                            </Radio.Group>
                            </div> */}
                            <div className="col col-2 mb-auto mt-auto ">
                                <Button outline color="secondary" block onClick={handleReset}>Đặt lại</Button>
                            </div>
                            <div className="col col-2 mb-auto mt-auto ">
                                <Button color="primary" block onClick={handleSearch}>Tìm kiếm</Button>
                            </div>

                        </div>
                        <div className="row mt-4" style={{height:'740px'}}>
                            
                            <Table rowKey={order => order.order_id} 
                            columns={columnsEssay} 
                            dataSource={orders} 
                            pagination={{pageSize:8}} 
                            rowSelection={{rowSelection}}
                            scroll={{ x: 1220 }}
                            />
                        </div>
                    </div>
                        
                </div>
                </div>

                <div className="container-fluid rightCol">
                <div className="row  margin" >
                    <Button color="primary" href="/HomeStudentPage/AddNewWriting" block large>Thêm bài viết mới</Button>
                </div>
                <div className="row bg-row margin padding" >
                    <h5 ><i className="fa fa-info-circle fa-lg" >{' '}</i>  Số lượng bài viết đã đăng</h5>
                    <div className="mr-auto ml-auto">
                    <Table columns={columns} dataSource={statistic} pagination={false} />
                    </div>                     
                </div>
                <div className="row bg-row margin padding" >
                    {statistics && (
                    <div className="container-fluid">
                    <div className="row ">
                        <div className="col contentPhu">Tổng chi tháng này</div>
                        <div ><i className="fa fa-info-circle fa-lg fa-custome " ></i></div>
                    </div>
                    
                    <div className="row ">
                        <div className="col" style={{fontSize: '30px', fontStyle:'revert'}}>
                        {statistics.monthly_payment} đồng
                            </div>
                    </div>
                    <div className="row ">
                        <div className="col" style={{fontSize: '18px'}}>
                            So với tháng trước:  
                            {statistics.gross > 0 && 
                            <i className="fa fa-sort-up" style={{color:'forestgreen'}}></i>}
                            {statistics.gross < 0 && 
                            <i className="fa fa-sort-down" style={{color:'darkorange'}} ></i> }
                            {statistics.gross} %
                        </div>
                    </div>
                    <hr/>
                    <div className="row ">
                        <div className="col" style={{fontSize: '18px',height:"70px"}}>
                            Mức chi trung bình theo bài: 
                            {statistics.monthly_payment/statistic[0].monthly_orders} đồng
                        </div>
                    </div>
                    </div>               
                    )}
                </div>
                <div className="row bg-row margin padding" style={{height: '488px'}} >
                    <div className="container-fluid">
                    <div className="row ">
                        <div className="col mb-2" style={{fontSize: '18px'}}> Xếp hạng</div>
                        <div className=""><i className="fa fa fa-ellipsis-h fa-lg fa-custome "></i></div>
                    </div>
                    <div className="row " >
                        <Table rowKey={topUsers => topUsers.user_id} columns={columnsUser} dataSource={topUsers} pagination={{ pageSize: 5 }} />
                    </div>
                    </div>               
                </div>
            </div>
            </div>
            
            </div>
                 
        </>
        
    );
}

export default withRouter(HomeStudent);


