import './Student.css';
import { React, useEffect, useState} from 'react';
import {  Button, Input} from 'reactstrap';
import { Breadcrumb, Table } from 'antd';
import GlobalHeader from './GlobalHeaderComponent';
import { getBaseURL, getToken, getTokenType } from '../../Utils/Common';
import { withRouter } from 'react-router';

const api= getBaseURL();


const Cart = (props) =>{
    const rowSelection = useState([]);
    const [orders, setOrders] = useState([]);
    const [orders2, setOrders2] = useState([]);
    const [types, setTypes] = useState([]);
    const [statistic,setStatistic] = useState();
    const [statistics,setStatistics] = useState();
    const [topUsers,setTopUsers] = useState([]);
    const [searchTitle, setSearchTitle] = useState();
    useEffect( () => {
        async function fetchData(){
            await api.get('/types',).then(response => {
                const types = response.data.data;
                setTypes(types);
            })  
    
            await api.get('/orders/saved',{
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
            title: 'Thể loại',
            dataIndex: ['essay','type_id'],
            width: 190,
            render: kind => <div style={{color: 'blue'}}>{types[kind].type_name}</div>,
           },
          {
            title: 'Đề bài',
            dataIndex: ['essay','title'],
            width: 560,
            render: title => <div>{title.slice(0,70)}...</div>
            
          },
          
          {
            title: 'Thời gian gửi',
            dataIndex: 'sent_date',
            width: 160,
           
          },
          {
            title: 'Giá tiền',
            dataIndex: 'total_price',
            width: 120,
           
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
            <GlobalHeader username="Canh Ngo"/>
            
            <div className="container-fluid detailPage" >
                <div class="row" style={{minHeight: window.innerHeight + 'px'}}>
                <div className="container-fluid leftCol">
                <div className="row bg-row margin padding" >
                        <Breadcrumb  className="mt-1" style={{fontSize: "large"}}>
                            <Breadcrumb.Item>
                            <a href="/Home">Trang chủ</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item >
                            <a href="/HomeStudentPage">Quản lý bài viết</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item >Giỏ Hàng</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="row bg-row padding" >
                        <br/>
                        <h3>GIỎ HÀNG CỦA BẠN</h3>
                    </div>
                    <div className="row bg-row margin padding ">
                    <div className="container-fluid">
                        <div className="row ">
                            <div className="col col-7 mb-3 mt-3">
                                <Input placeholder="Nhập đề bài viết bạn muốn tìm kiếm" value={searchTitle} onChange={(e)=>setSearchTitle(e.target.value)}/>
                            </div>
                            <div className="col col-2 mb-auto mt-auto offset-1">
                                <Button outline color="secondary" block onClick={handleReset}>Đặt lại</Button>
                            </div>
                            <div className="col col-2 mb-auto mt-auto ">
                                <Button color="primary" block>Tìm kiếm onClick={handleSearch}</Button>
                            </div>
                        </div>
                        <div className="row mt-4" style={{height:'726px'}}>
                            
                            <Table rowKey={order => order.order_id} 
                            columns={columnsEssay} dataSource={orders} 
                            pagination={{pageSize:10}} rowSelection={{rowSelection}}
                            onRow={(record, rowIndex) => {
                                return {
                                  onClick: event => (props.history.push("/HomeStudentPage/AddNewWriting/?order_id="+record.order_id)),
                                };
                              }}/>
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
                        <div className="col" style={{fontSize: '18px'}}>
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
                        <Table columns={columnsUser} dataSource={topUsers} pagination={{ pageSize: 5 }} />
                    </div>
                    </div>               
                </div>
            </div>
            
            </div>
            
            </div>
                 
        </>
        
    );
}

export default withRouter(Cart);


