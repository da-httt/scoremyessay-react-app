import './Teacher.css';
import { React, useEffect, useState} from 'react';
import {  Button, Input} from 'reactstrap';
import { Breadcrumb,Radio,Table, Tag } from 'antd';
import GlobalHeader from './GlobalHeaderComponent';
import { getBaseURL, getToken, getTokenType } from '../../Utils/Common';
import { withRouter } from 'react-router-dom';

const api = getBaseURL();


const HomeTeacher = (props) =>{
    const rowSelection = useState([]);
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState([]);
    const [stateOrder,setStateOrder] = useState(2);

    const [statistic,setStatistic] = useState([]);
    useEffect( () => {
        async function fetchData() {
             
    
            await api.get('/status',).then(response => {
                const status = response.data.data;
                setStatus(status);
            }) 
    
            await api.get('/orders',{
                headers: {Authorization: getTokenType() + ' ' + getToken()}
            }).then(response => {
                const orders = response.data.data;
                setOrders(orders);
                
            })  
            await api.get('/statistics/me',{
                headers: {Authorization: 'Bearer ' + getToken()}
              }
              ).then(response => {
                  setStatistic([response.data]);
              })
        }
        fetchData();
        
    },[]);

    const statusList = status.map((state) => (
        state.status_id!==0 && state.status_id!==1 && (
        <Radio value={state.status_id}>{state.status_name}</Radio>
        )
    ));

    const  columnsEssay = [
        {
            title: 'ID',
            dataIndex: 'order_id',
            key: 'order_id',
            width: 20,
        },
        {
            title: 'Tên HS',
            dataIndex: 'student_id',
            key: 'student_id',
            width: 130,
            render: name => <div style={{color: 'blue'}}>{name}</div>,
           },
          {
            title: 'Tiêu đề bài viết',
            dataIndex: ['essay','title'],
            key: ['essay','title'],
            width: 460,
            render: title => <div>{title.slice(0,50)}...</div>
          },
          {
            title: 'Giá tiền',
            dataIndex: 'total_price',
            key: 'total_price',
            width: 100,
           
          },
          {
            title: 'Hạn giao bài viết',
            dataIndex: 'deadline',
            key: 'deadline',
            width: 110,
          },
          {
            title: 'Tình trạng',
            dataIndex: 'status_id',
            key: 'status_id',
            width: 100,
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
            title: 'Điểm',
          }
          
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
    
    const columnsSchedule=[{
        title: 'Ngày hôm nay',
        dataIndex: 'today',
        key: 'today',
        render: today => (
            <p style={{color:"blue", textAlign:"center", fontSize:'20px'}}>{today}</p>
        )
    },
    {
        title: 'Tuần này',
        dataIndex: 'week',
        key: 'week',
        render: week => (
            <p style={{color:"blue", textAlign:"center", fontSize:'20px'}}>{week}</p>
        )
    }]

    const dataSchedule=[
        {
            today: 12,
            week: 20
        }
    ]
    return (
        <>         
            <GlobalHeader/>
            
            <div className="container-fluid detailPage" >
                <div class="row" style={{minHeight: window.innerHeight + 'px'}}>
                <div className="container-fluid leftCol">
                    <div className="row bg-row margin padding" >
                        <Breadcrumb  className="mt-1" style={{fontSize:'large'}}>
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
                            <div className="col col-3 mb-3 mt-3">
                                <Input placeholder="Nhập tên bài viết cần tìm" />
                            </div>
                            <div className="col col-5 mb-auto mt-auto " >
                            <Radio.Group  defaultValue={stateOrder} onChange={(e)=>{setStateOrder(e.target.value)}}>
                                {statusList}
                                <Radio value={5}>All</Radio>
                            </Radio.Group>
                            </div>
                            <div className="col col-2 mb-auto mt-auto ">
                                <Button outline color="secondary" block>Đặt lại</Button>
                            </div>
                            <div className="col col-2 mb-auto mt-auto ">
                                <Button color="primary" block>Tìm kiếm</Button>
                            </div>
                        </div>
                        <div className="row mt-4" style={{height:'710px'}}>
                            <Table rowKey={order => order.order_id} 
                                columns={columnsEssay} 
                                dataSource={orders} 
                                pagination={{pageSize:10}} 
                                rowSelection={{rowSelection}}
                                onRow={(record) => {
                                    return {
                                    onClick: event => (props.history.push("/HomeTeacherPage/ScoreEssay?order_id="+record.order_id)),
                                    };
                                }}/>
                        </div>
                    </div>
                        
                </div>
                </div>

                <div className="container-fluid rightCol">
                <div className="row  margin" >
                    <Button color="primary" href="/HomeTeacherPage/AddNewWriting" block>Chấm bài viết mới</Button>
                </div>
                <div className="row bg-row margin padding"  style={{height:"230px"}}>
                    <h5 ><i className="fa fa-info-circle fa-lg">{' '}</i>  Số lượng bài viết đã đăng</h5>
                    <div className="mr-auto ml-auto">
                    <Table columns={columns} dataSource={statistic} pagination={false}/>
                    </div>                     
                </div>
                <div className="row bg-row margin padding"  style={{height:"230px"}}>
                    <h5 ><i className="fa fa-info-circle fa-lg">{' '}</i>  Số bài phải chấm</h5>
                    <div className="mr-auto ml-auto">
                    <Table columns={columnsSchedule} dataSource={dataSchedule} pagination={false}/>
                    </div>                     
                </div>
                <div className="row bg-row margin padding" >
                    <div className="container-fluid">
                    <div className="row ">
                        <div className="col contentPhu">Tổng doanh thu tháng này</div>
                        <div><i className="fa-custome fa fa-info-circle fa-lg" ></i></div>
                        
                    </div>
                    <div className="row ">
                        <div className="col" style={{fontSize: '30px', fontStyle:'revert'}}>{'$1,500,000'} </div>
                    </div>
                    <div className="row ">
                        <div className="col" style={{fontSize: '18px'}}>
                            So với tháng trước {'10% '} 
                            <i className="fa fa-sort-up" style={{color:'forestgreen'}}></i>
                            <i className="fa fa-sort-down" style={{color:'darkorange'}} ></i> 
                        </div>
                    </div>
                    <hr/>
                    <div className="row ">
                        <div className="col" style={{fontSize: '18px', height:'100px'}}>
                            Doanh thu trung bình theo bài {'$300'} 
                        </div>
                    </div>
                    </div>               
                </div>
                <div className="row bg-row margin padding" >
                    <div className="container-fluid">
                        <div className="row ">
                            <div className="col contentPhu">Đánh giá của học viên</div>
                            <div ><i className="fa-custome fa fa-info-circle fa-lg" ></i></div>
                            
                        </div>
                        <div className="row ">
                            <div className="col" style={{fontSize: '30px', fontStyle:'revert'}}>{'4.95'} </div>
                        </div>
                        <div className="row ">
                            <div className="col" style={{fontSize: '18px', height:'57px'}}>
                                So với tháng trước {'10% '} 
                                <i className="fa fa-sort-up" style={{color:'forestgreen'}}></i>
                                <i className="fa fa-sort-down" style={{color:'darkorange'}} ></i> 
                            </div>
                        </div>
                    </div>               
                </div>
            </div>
            </div>
            
            </div>
                 
        </>
        
    );
}

export default withRouter(HomeTeacher);


