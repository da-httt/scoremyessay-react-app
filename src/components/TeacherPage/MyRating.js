import './Teacher.css';
import React, { useEffect, useState }  from 'react';
import { Button} from 'reactstrap';
import GlobalHeader from './GlobalHeaderComponent';
import { Breadcrumb, Rate, Table } from 'antd';
import { getBaseURL, getToken} from '../../Utils/Common';
import { withRouter } from 'react-router-dom';

const api= getBaseURL();

const MyRating = (props) =>{
    const [reviews, setReviews] = useState();
    const [averageRating, setAverageRating] = useState();
    useEffect( () => {
        async function fetchData() {
            
            await api.get('/users/me',{
                headers: {Authorization: 'Bearer ' + getToken()}
              }
              ).then( async response => {
                await api.get('ratings/teacher/'+response.data.info.user_id,{
                        headers: {Authorization: 'Bearer ' + getToken()}
                      }
                      ).then(response => {
                          setAverageRating(response.data.average_rating);
                      })
                  
                await  api.get('ratings',{
                    headers: {Authorization: 'Bearer ' + getToken()}
                  }
                  ).then(response => {
                      setReviews(response.data.data);
                  })
              })
            
        }
        fetchData();
        
    },[]);

    
    const  columns = [
        {
            title: 'ID của bài viết',
            dataIndex: 'order_id',
            width: 180,
        },
        
        {
            title: 'Điểm sao',
            dataIndex: 'stars',
            width: 180,
            
        },
        {
            title: 'Bình luận & Nhận xét',
            dataIndex:  'comment',
            width: 450,
           
        },
        {
            render: (_, record) =>
                reviews.length >= 1 ? (
                <Button outline color="primary" onClick={event => (props.history.push("/HomeTeacherPage/DetailResult?order_id="+record.order_id))}>Chi tiết</Button>
              ) : null,
            width: 150
        },
          
    ];
    
    return (
        <>         
            <GlobalHeader/>
            <div className="container-fluid detailPage"  >
                <div className="row" style={{height: window.innerHeight + 'px'}} >
                    <div className="container-fluid centerCol ">
                        <div className="row bg-row margin padding " >
                            <Breadcrumb  className="mt-1" style={{fontSize: "large"}}>
                                <Breadcrumb.Item>
                                <a href="/Home">Trang chủ</a>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item >Xếp hạng của tôi</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="row bg-row padding" >
                            <br/>
                            <h3 className="mt-auto mb-auto"> Xếp hạng của tôi</h3>
                        </div>
                        <div className="bg">
                            <div className="row bg-row margin padding">
                                <div className="container-fluid">
                                    <Rate style={{ margin:"4% 43%"}} value={averageRating} disabled/>
                                    
                                    <Table rowKey={order => order.order_id} 
                                        columns={columns} 
                                        dataSource={reviews} 
                                        pagination={{pageSize:8}} 
                                    
                                />
                                </div>
            
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
    
        </>
    );
    }

export default withRouter(MyRating);