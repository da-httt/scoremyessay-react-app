import './Teacher.css';
import { React, useEffect, useState} from 'react';
import {  Button, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import { Breadcrumb,Table } from 'antd';
import GlobalHeader from './GlobalHeaderComponentT';
import { getBaseURL, getToken, getTokenType } from '../../Utils/Common';
import { withRouter } from 'react-router-dom';

const api = getBaseURL();




const AddWritingT = (props) =>{
    const rowSelection = useState([]);
    const [orders, setOrders] = useState([]);

    const [statistic,setStatistic] = useState([]);
    const [statistics,setStatistics] = useState();
    const [deadline, setDeadline] = useState([]);

    const [types, setTypes] = useState([]);
    const [searchTitle, setSearchTitle] = useState();
    const [orders2, setOrders2] = useState([]);
    useEffect( () => {
        async function fetchData() {
            await api.get('/types',).then(response => {
                const types = response.data.data;
                setTypes(types);
            })  

            await api.get('/orders/waiting',{
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
            title: 'Chủ đề',
            dataIndex: 'topic_name',
            key: 'topic_name',
            width: 120
          },
          {
            title: 'Tiêu đề bài viết',
            dataIndex: ['essay','title'],
            key: ['essay','title'],
            width: 450,
            render: title => <div>{title.slice(0,60)}...</div>
            
          },
          {
            title: 'Mức giá',
            dataIndex: 'total_price',
            key: 'total_price',
            width: 100,
            sorter: (a, b) => a.total_price - b.total_price,
           
          },
          {
            title: 'Hạn giao bài viết',
            dataIndex: 'deadline',
            key: 'deadline',
            width: 110,
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
            <GlobalHeader />
            
            <div className="container-fluid detailPage" >
                <div className="row" style={{minHeight: window.innerHeight + 'px'}}>
                <div className="container-fluid leftCol">
                    <div className="row bg-row margin padding" >
                        <Breadcrumb  className="mt-1" style={{fontSize: "large"}}>
                            <Breadcrumb.Item>
                            <a href="/Home">Trang chủ</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                            <a href="/HomeTeacherPage">Quản lý bài viết</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item >Danh sách bài viết mới </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="row bg-row padding" >
                        <br/>
                        <div className="col-8"><h3>DANH SÁCH BÀI VIẾT MỚI</h3></div>
                        <div className=" col-4 ">
                            <InputGroup >
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>Chủ Đề</InputGroupText>
                                </InputGroupAddon>
                                <Input type="select" >
                                    <option>SCIENCE {'&'} TECH</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </InputGroup>
                        </div>
                    </div>
                    <div className="row bg-row margin padding ">
                    <div className="container-fluid">
                        <div className="row ">
                        <div className="col col-8 mb-3 mt-3">
                                <Input placeholder="Nhập đề bài viết bạn muốn tìm kiếm" value={searchTitle} onChange={(e)=>setSearchTitle(e.target.value)} />
                            </div>
                            <div className="col col-2 mb-auto mt-auto ">
                                <Button outline color="secondary" block onClick={handleReset}>Đặt lại</Button>
                            </div>
                            <div className="col col-2 mb-auto mt-auto ">
                                <Button color="primary" block onClick={handleSearch}>Tìm kiếm </Button>
                            </div>
                        </div>
                        <div className="row mt-4" style={{height:'710px'}}>
                            <Table rowKey={order => order.order_id} 
                                columns={columnsEssay} 
                                dataSource={orders} 
                                pagination={{pageSize:7}} 
                                rowSelection={{rowSelection}}
                                onRow={(record) => {
                                    return {
                                    onClick: event => (props.history.push("/HomeTeacherPage/DetailRequirement?order_id="+record.order_id)),
                                    };
                                }}/>
                        </div>
                    </div>
                        
                </div>
                </div>

                <div className="container-fluid rightCol">
                <div className="row bg-row margin padding" style={{height:"242px"}}>
                    <h5 ><i className="fa fa-info-circle fa-lg">{' '}</i>  Số lượng bài viết đã nhận</h5>
                    <div className="mr-auto ml-auto">
                    <Table columns={columns} dataSource={statistic} pagination={false}/>
                    </div>                     
                </div>
                <div className="row bg-row margin padding" style={{height:"242px"}}>
                    <h5 ><i className="fa fa-info-circle fa-lg" >{' '}</i>  Số bài phải chấm</h5>
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
                        <div className="row " style={{height:'52px'}}>
                            <div className="col contentPhu">Đánh giá của học viên</div>
                            <div ><i className="fa fa-info-circle fa-lg fa-custome " ></i></div>
                            
                        </div>
                        <div className="row ">
                            <div className="col" style={{fontSize: '30px', fontStyle:'revert'}}>{'4.95'} </div>
                        </div>
                        <div className="row ">
                            <div className="col" style={{fontSize: '18px',height:'57px'}} >
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

export default withRouter(AddWritingT);


