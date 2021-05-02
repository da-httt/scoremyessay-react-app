import './Student.css';
import { React, useEffect, useState} from 'react';
import {  Button, Input} from 'reactstrap';
import { Breadcrumb,Radio,Table, Tag } from 'antd';
import GlobalHeader from './GlobalHeaderComponent';
import { getBaseURL, getToken, getTokenType } from '../../Utils/Common';
import { withRouter } from 'react-router-dom';

  const columnsUser = [
    {
    title: 'STT',
    dataIndex: 'key',
    width: 40,
   },
  {
    title: 'Người dùng',
    dataIndex: 'username',
    width: 170,
    render: username => <div style={{color: 'blue'}}>{username}</div>,
  },
  {
    title: 'Số bài',
    dataIndex: 'numOfEssay',
    width: 90,
   
  },
];

const dataUser=[
    {
        key: 1,
        username: 'pmdung',
        numOfEssay: '13'
    },
    {
        key: 2,
        username: 'ntcanh',
        numOfEssay: '29'
    },
    {
        key: 3,
        username: 'tdnam',
        numOfEssay: '17'
    },
    {
        key: 4,
        username: 'canhngo',
        numOfEssay: '2'
    },
    {
        key: 5,
        username: 'namhunter',
        numOfEssay: '10'
    },
    {
        key: 6,
        username: 'dungpm',
        numOfEssay: '32'
    },
    {
        key: 7,
        username: 'namhunter',
        numOfEssay: '11'
    },
]

function UserTable(props){
    return(
        <Table columns={columnsUser} dataSource={dataUser} pagination={{ pageSize: 5 }} />
    );
}

/*const  columnsEssay = [
    {
        title: 'Thể loại',
        dataIndex: 'kind',
        width: 130,
        render: kind => <div style={{color: 'blue'}}>{kind}</div>,
       },
      {
        title: 'Đề bài',
        dataIndex: 'title',
        width: 360,
        
      },
      {
        title: 'Giá tiền',
        dataIndex: 'cost',
        width: 120,
       
      },
      {
        title: 'Tình trạng',
        dataIndex: 'status',
        width: 120,
        render: tag => (
            <>
              {tag === "Đã chấm" && (<Tag color="success">{tag.toUpperCase()}</Tag>)}
              {tag === "Đang chấm" && (<Tag color="processing">{tag.toUpperCase()}</Tag>)}
              {tag === "Đang xử lý" && (<Tag color="warning">{tag.toUpperCase()}</Tag>)}
              {tag === "Đã hủy" && (<Tag color="error">{tag.toUpperCase()}</Tag>)}
            </>
          ),
       
      },
      {
        title: 'Thời gian',
        dataIndex: 'time',
        width: 150,
       
      },
      {
        title: 'Điểm',
        dataIndex: 'score',
        width: 100,
       
      },

];
*/


const api= getBaseURL();


const HomeStudent = (props) =>{
    const rowSelection = useState([]);
    const [orders, setOrders] = useState([]);
    const [types, setTypes] = useState([]);
    const [status, setStatus] = useState([]);
    const [stateOrder,setStateOrder] = useState(1);
    console.log(rowSelection);
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
                
            })  
        }
        fetchData();
        
    },[]);
    
    const statusList = status.map((state) => (
        state.status_id!==0 && (
        <Radio value={state.status_id}>{state.status_name}</Radio>
        )
    ));

    const  columnsEssay = [
        {
            title: 'ID',
            dataIndex: 'order_id',
            key: 'order_id',
            width: 30,
        },
        {
            title: 'Thể loại',
            dataIndex: ['essay','type_id'],
            key: ['essay','type_id'],
            width: 130,
            render: kind => <div style={{color: 'blue'}}>{types[kind].type_name}</div>,
           },
          {
            title: 'Đề bài',
            dataIndex: ['essay','title'],
            key: ['essay','title'],
            width: 460,
            
          },
          {
            title: 'Thời gian cập nhật',
            dataIndex: 'updated_date',
            key: 'updated_date',
            width: 160,
           
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
                    {statu === 1 && (<Tag color="warning">{status[statu].status_name.toUpperCase()}</Tag>)}
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
            title: 'Điểm',
            width:100
          }
          
    ];

    const columns=[{
        title: 'Số lượng',
        dataIndex: 'total',
        key: 'total',
        render: total => (
            <p style={{color:"blue", textAlign:"center", fontSize:'20px'}}>{total}</p>
        )
    },
    {
        title: 'Đã chấm',
        dataIndex: 'score',
        key: 'score',
        render: score => (
            <p style={{color:"blue", textAlign:"center", fontSize:'20px'}}>{score}</p>
        )
    }]

    const data=[{
        id:1,
        total: '10',
        score: '7'
    }]
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
                            </Radio.Group>
                            </div>
                            <div className="col col-2 mb-auto mt-auto ">
                                <Button outline color="secondary" block>Đặt lại</Button>
                            </div>
                            <div className="col col-2 mb-auto mt-auto ">
                                <Button color="primary" block>Tìm kiếm</Button>
                            </div>

                            

                            
                        </div>
                        <div className="row mt-4" style={{height:'705px'}}>
                            
                            <Table rowKey={order => order.order_id} 
                            columns={columnsEssay} 
                            dataSource={orders} 
                            pagination={{pageSize:10}} 
                            rowSelection={{rowSelection}}
                            onRow={(record, rowIndex) => {
                                return {
                                  onClick: event => (props.history.push("/HomeStudentPage/DetailWriting?order_id="+record.order_id)),
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
                    <Table columns={columns} dataSource={data} pagination={false} />
                    </div>                     
                </div>
                <div className="row bg-row margin padding" >
                    <div className="container-fluid">
                    <div className="row ">
                        <div className="col contentPhu">Tổng chi tháng này</div>
                        <div ><i className="fa fa-info-circle fa-lg fa-custome " ></i></div>
                        
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
                        <div className="col" style={{fontSize: '18px'}}>
                            Mức chi trung bình theo bài {'$300'} 
                        </div>
                    </div>
                    </div>               
                </div>
                <div className="row bg-row margin padding" style={{height: '495px'}} >
                    <div className="container-fluid">
                    <div className="row ">
                        <div className="col mb-2" style={{fontSize: '18px'}}> Xếp hạng</div>
                        <div className=""><i className="fa fa fa-ellipsis-h fa-lg fa-custome "></i></div>
                    </div>
                    <div className="row " >
                        <UserTable/>
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


