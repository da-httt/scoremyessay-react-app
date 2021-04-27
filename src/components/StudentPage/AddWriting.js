import './Student.css';
import { React,} from 'react';
import { Breadcrumb } from 'antd';
import GlobalHeader from './GlobalHeaderComponent';
import Stepp from './Step';

const AddNewWriting = (props) =>{
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
                    
                    <Stepp/>
                
                    
                    
                        
                   
            </div>
        </div>
        </div>    
    
    </div>
    
        
    );
}

export default AddNewWriting;


