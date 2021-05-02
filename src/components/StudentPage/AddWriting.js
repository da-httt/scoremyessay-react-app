import './Student.css';
import { React,} from 'react';
import { Breadcrumb } from 'antd';
import GlobalHeader from './GlobalHeaderComponent';
import Stepp from './Step';
import { withRouter } from 'react-router-dom';


const AddNewWriting = (props) =>{
    const url = window.location.href.split('=');
    const orderID=Number(url[1]);
    // if(Number.isNaN(orderID)){
    //     console.log("rỗng");
    // }
    //Kiểm tra số đó có rỗng không để create, còn lại là update
    return (
        <div >        
        <GlobalHeader username="Canh Ngo"/>
        <div className="container-fluid detailPage"  >
            <div className="row">
                <div className="container-fluid centerCol ">
                    <div className="row bg-row margin padding " >
                        <Breadcrumb  className="mt-1" style={{fontSize: "large"}}>
                            <Breadcrumb.Item>
                            <a href="/Home">Trang chủ</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item >
                            <a href="/HomeStudentPage">Quản lý bài viết</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item >Thêm bài viết</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="row bg-row padding" >
                        <br/>
                        <h3>THÊM BÀI VIẾT MỚI</h3>
                    </div>
                    
                    <Stepp orderID={orderID}/>
                
                    
                    
                        
                   
            </div>
        </div>
        </div>    
    
    </div>
    
        
    );
}

export default withRouter(AddNewWriting);


