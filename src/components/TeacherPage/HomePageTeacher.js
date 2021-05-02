import './Teacher.css';
import { React, useState} from 'react';
import {  Button, Input} from 'reactstrap';
import { Breadcrumb,Table, Tag } from 'antd';
import GlobalHeader from './GlobalHeaderComponent';


const essayList = [
    {
        key: 1,
        kind: 'IELTS Writting',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đang chấm',
        time: '29-3-2021 8:00:02',
        score: 'N/A',
    },
    {
        key: 2,
        kind: 'IELTS Writting',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đã chấm',
        time: '29-1-2021 8:00:02',
        score: '8',
    },
    {
        key: 3,
        kind: 'Basic',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đã hủy',
        time: '29-3-2020 8:00:02',
        score: 'N/A',
    },
    {
        key: 4,
        kind: 'IELTS Writting',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đang xử lý',
        time: '29-3-2021 8:00:02',
        score: 'N/A',
    },
    {
        key: 5,
        kind: 'IELTS Writting',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đã chấm',
        time: '29-1-2021 8:00:02',
        score: '7,5',
    },
    {
        key: 6,
        kind: 'Basic',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đã hủy',
        time: '29-3-2020 8:00:02',
        score: 'N/A',
    },
    {
        key: 7,
        kind: 'Basic',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đã hủy',
        time: '29-3-2020 8:00:02',
        score: 'N/A',
    },
    {
        key: 8,
        kind: 'IELTS Writting',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đang chấm',
        time: '29-3-2021 8:00:02',
        score: 'N/A',
    },
    {
        key: 9,
        kind: 'IELTS Writting',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đã chấm',
        time: '29-1-2021 8:00:02',
        score: '7,5',
    },
    {
        key: 10,
        kind: 'Basic',
        title: 'Describe about your future home .',
        cost: '2,300',
        status: 'Đã chấm',
        time: '29-1-2021 8:00:02',
        score: '9,0',
    },
    {
        key: 11,
        kind: 'Basic',
        title: 'Describe about your future home .',
        cost: '2,300',
        status: 'Đã chấm',
        time: '29-1-2021 8:00:02',
        score: '9,0',
    },
    {
        key: 12,
        kind: 'Basic',
        title: 'Describe about your future home .',
        cost: '2,300',
        status: 'Đã chấm',
        time: '29-1-2021 8:00:02',
        score: '9,0',
    },
    {
        key: 13,
        kind: 'Basic',
        title: 'Describe about your future home .',
        cost: '2,300',
        status: 'Đã chấm',
        time: '29-1-2021 8:00:02',
        score: '9,0',
    },
    {
        key: 14,
        kind: 'IELTS Writting',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đang chấm',
        time: '29-3-2021 8:00:02',
        score: 'N/A',
    },
    {
        key: 15,
        kind: 'IELTS Writting',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đang chấm',
        time: '29-3-2021 8:00:02',
        score: 'N/A',
    },
    {
        key: 16,
        kind: 'IELTS Writting',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đang chấm',
        time: '29-3-2021 8:00:02',
        score: 'N/A',
    },
    {
        key: 17,
        kind: 'IELTS Writting',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đang chấm',
        time: '29-3-2021 8:00:02',
        score: 'N/A',
    },
    {
        key: 18,
        kind: 'IELTS Writting',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đang chấm',
        time: '29-3-2021 8:00:02',
        score: 'N/A',
    },
    {
        key: 19,
        kind: 'IELTS Writting',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đang chấm',
        time: '29-3-2021 8:00:02',
        score: 'N/A',
    },
    {
        key: 20,
        kind: 'IELTS Writting',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đang chấm',
        time: '29-3-2021 8:00:02',
        score: 'N/A',
    },
    {
        key: 21,
        kind: 'IELTS Writting',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đang chấm',
        time: '29-3-2021 8:00:02',
        score: 'N/A',
    },
    {
        key: 22,
        kind: 'IELTS Writting',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đang chấm',
        time: '29-3-2021 8:00:02',
        score: 'N/A',
    },
    {
        key: 23,
        kind: 'IELTS Writting',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đang chấm',
        time: '29-3-2021 8:00:02',
        score: 'N/A',
    },
    {
        key: 24,
        kind: 'IELTS Writting',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đang chấm',
        time: '29-3-2021 8:00:02',
        score: 'N/A',
    },
    {
        key: 25,
        kind: 'IELTS Writting',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đang chấm',
        time: '29-3-2021 8:00:02',
        score: 'N/A',
    },
    {
        key: 26,
        kind: 'IELTS Writting',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đang chấm',
        time: '29-3-2021 8:00:02',
        score: 'N/A',
    },
    {
        key: 27,
        kind: 'IELTS Writting',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đang chấm',
        time: '29-3-2021 8:00:02',
        score: 'N/A',
    },
    {
        key: 28,
        kind: 'IELTS Writting',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đang chấm',
        time: '29-3-2021 8:00:02',
        score: 'N/A',
    },
    {
        key: 29,
        kind: 'IELTS Writting',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đang chấm',
        time: '29-3-2021 8:00:02',
        score: 'N/A',
    },
    {
        key: 30,
        kind: 'IELTS Writting',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đang chấm',
        time: '29-3-2021 8:00:02',
        score: 'N/A',
    },
    {
        key: 31,
        kind: 'IELTS Writting',
        title: 'Vel cras auctor at tortor imperdiet .',
        cost: '3,430,300',
        status: 'Đang chấm',
        time: '29-3-2021 8:00:02',
        score: 'N/A',
    },
]

const  columnsEssay = [
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



function EssayTable(props){
    const rowSelection = useState([]);

    return(
        <>
        <Table columns={columnsEssay} dataSource={essayList} 
        rowSelection={{rowSelection}}
        pagination={{pageSize:8}} />
        </>
    );
}



const HomeTeacher = (props) =>{
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
        total: '10',
        score: '7'
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
            <GlobalHeader username="Teacher"/>
            
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
                        <h3>NHẬN BÀI VIẾT MỚI</h3>
                    </div>
                    <div className="row bg-row margin padding ">
                    <div className="container-fluid">
                        <div className="row ">
                            <div className="col col-3 mb-3 mt-3">
                                <Input placeholder="Nhập tên bài viết cần tìm" />
                            </div>
                            <div className="col col-1 mb-auto mt-auto ml-4" ><Input type="radio" name="sort" checked/> Tất cả</div>
                            <div className="col col-1 mb-auto mt-auto "><Input type="radio" name="sort" />Đã chấm </div>
                            <div className="col col-1 mb-auto mt-auto " ><Input type="radio" name="sort"/>Đang chấm</div>
                            <div className="col col-1 mb-auto mt-auto "><Input type="radio" name="sort"/> Bị hủy</div>
                            <div className="col col-2 mb-auto mt-auto ">
                                <Button outline color="secondary" block>Đặt lại</Button>
                            </div>
                            <div className="col col-2 mb-auto mt-auto ">
                                <Button color="primary" block>Tìm kiếm</Button>
                            </div>
                        </div>
                        <div className="row mt-4" style={{height:'570px'}}>
                            <EssayTable/>
                        </div>
                    </div>
                        
                </div>
                </div>

                <div className="container-fluid rightCol">
                <div className="row  margin" >
                    <Button color="primary" href="/HomeTeacherPage/AddNewWriting" block large>Chấm bài viết mới</Button>
                </div>
                <div className="row bg-row margin padding" >
                    <h5 ><i className="fa fa-info-circle fa-lg">{' '}</i>  Số lượng bài viết đã đăng</h5>
                    <div className="mr-auto ml-auto">
                    <Table columns={columns} dataSource={data} pagination={false}/>
                    </div>                     
                </div>
                <div className="row bg-row margin padding" >
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
                        <div className="col" style={{fontSize: '18px'}}>
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

export default HomeTeacher;


