import './Teacher.css';
import { React, useEffect, useState} from 'react';
import {  Button, Input} from 'reactstrap';
import { Breadcrumb,Radio,Table, Tag } from 'antd';
import GlobalHeader from './GlobalHeaderComponentT';
import { getBaseURL, getToken, getTokenType } from '../../Utils/Common';
import { withRouter } from 'react-router-dom';

const api = getBaseURL();


const HomeTeacher = (props) =>{
    const rowSelection = useState([]);
    const [orders, setOrders] = useState([]);
    const [orders2, setOrders2] = useState([]);
    const [status, setStatus] = useState([]);
    //const [stateOrder,setStateOrder] = useState(2);
    const [statistics,setStatistics] = useState();
    const [statistic,setStatistic] = useState([]);
    const [deadline, setDeadline] = useState([]);
    const [types, setTypes] = useState([]);

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

              await api.get('/deadlines',{
                headers: {Authorization: 'Bearer ' + getToken()}
              }
              ).then(response => {
                  setDeadline([response.data]);
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
            title: 'Thể loại',
            dataIndex: ['essay','type_id'],
            key: ['essay','type_id'],
            width: 150,
            filters: [
                { text: 'English Writing', value: 0 },
                { text: 'IELTS WRITING TASK 1', value: 1 },
                { text: 'IELTS WRITING TASK 2', value: 2 },
              ],
            onFilter: (value, record) => record.essay.type_id === value,
            render: kind => <div style={{color: 'blue'}}>{types[kind].type_name}</div>,
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
            width: 150,
            sorter: (a, b) => a.total_price - b.total_price,
           
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
            filters: [
                { text: 'On Going', value: 2 },
                { text: 'Done', value: 3 },
                { text: 'Cancelled', value: 4 },
              ],
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
        dataIndex: 'today_deadline',
        render: today => (
            <p style={{color:"blue", textAlign:"center", fontSize:'20px'}}>{today}</p>
        )
    },
    {
        title: 'Tuần này',
        dataIndex: 'week_deadline',
        render: week => (
            <p style={{color:"blue", textAlign:"center", fontSize:'20px'}}>{week}</p>
        )
    }]

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
                            <div className="col col-8 mb-3 mt-3">
                                <Input placeholder="Nhập đề bài viết bạn muốn tìm kiếm" value={searchTitle} onChange={(e)=>setSearchTitle(e.target.value)} />
                            </div>
                            {/* <div className="col col-5 mb-auto mt-auto " >
                            <Radio.Group  defaultValue={stateOrder} onChange={(e)=>{setStateOrder(e.target.value)}}>
                                {statusList}
                                <Radio value={5}>All</Radio>
                            </Radio.Group>
                            </div> */}
                            <div className="col col-2 mb-auto mt-auto ">
                                <Button outline color="secondary" block onClick={handleReset}>Đặt lại</Button>
                            </div>
                            <div className="col col-2 mb-auto mt-auto ">
                                <Button color="primary" block onClick={handleSearch}>Tìm kiếm </Button>
                            </div>
                        </div>
                        <div className="row mt-4" style={{height:'735px'}}>
                            <Table rowKey={order => order.order_id} 
                                columns={columnsEssay} 
                                dataSource={orders} 
                                pagination={{pageSize:7}} 
                                rowSelection={{rowSelection}}
                                onRow={(record) => {
                                    return {
                                    onClick: event => <>
                                    {record.status_id===2 &&(props.history.push("/HomeTeacherPage/ScoreEssay?order_id="+record.order_id))}
                                    {record.status_id===3 &&(props.history.push("/HomeTeacherPage/DetailResult?order_id="+record.order_id))}
                                    </>,
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
                    <h5 ><i className="fa fa-info-circle fa-lg">{' '}</i>  Số lượng bài viết đã nhận</h5>
                    <div className="mr-auto ml-auto">
                    <Table columns={columns} dataSource={statistic} pagination={false}/>
                    </div>                     
                </div>
                <div className="row bg-row margin padding"  style={{height:"230px"}}>
                    <h5 ><i className="fa fa-info-circle fa-lg">{' '}</i>  Số bài phải chấm</h5>
                    <div className="mr-auto ml-auto">
                    <Table columns={columnsSchedule} dataSource={deadline} pagination={false}/>
                    </div>                     
                </div>
                <div className="row bg-row margin padding" >
                {statistics &&(
                        <div className="container-fluid">
                    <div className="row ">
                        <div className="col contentPhu">Tổng thu tháng này</div>
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
                            <i className="fa fa-sort-up" style={{color:'forestgreen'}}/>}
                            {statistics.gross < 0 && 
                            <i className="fa fa-sort-down" style={{color:'darkorange'}} /> } 
                            {statistics.gross} %
                        </div>
                    </div>
                    <hr/>
                    <div className="row ">
                        <div className="col" style={{fontSize: '18px',height:'98px'}}>
                            Mức chi trung bình theo bài: <br/>
                            { statistics.monthly_payment/statistics.monthly_orders} đồng
                        </div>
                    </div>
                    </div>                 )}
                
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


