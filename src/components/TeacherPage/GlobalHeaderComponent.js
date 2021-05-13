import './Teacher.css';
import { React, useEffect, useState} from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import { getBaseURL, getToken, removeUserSession } from '../../Utils/Common';
import { withRouter } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';

import { UserOutlined, AuditOutlined, LogoutOutlined } from '@ant-design/icons';

const api = getBaseURL();


const GlobalHeader= (props)=>{
  const [username, setUsername] = useState("Không xác định");
  
  useEffect( () => {
    async function fetchData() {
        await api.get('/users/me',{
          headers: {Authorization: 'Bearer ' + getToken()}
        }
        ).then(response => {
            setUsername(response.data.info.name);
        }).catch((error) => {
          if(error.response){
              if(error.response.status === 401 || error.response.status === 400 || error.response.status === 403){
                setUsername(error.response.data.detail);
              }
              else{
                setUsername("Không xác định");
              }
              
          } 
      })
 
    }
    fetchData();
    
},[]);

    const handleLogOut=() =>{
      removeUserSession();
      props.history.push("/Home");
    }
    const menu = (
      <Menu >
        <Menu.Item key="1" onClick={e => props.history.push("/HomeTeacherPage/PersonalInfo")} icon={<AuditOutlined />}>
          Thông tin cá nhân
        </Menu.Item>
        <Menu.Item key="2" onClick={handleLogOut} icon={<LogoutOutlined />}>
          Đăng xuất
        </Menu.Item>
      </Menu>
    );
    return(
        <Navbar light className="navBarDetail" fixed="top">
            <div style={{marginRight:"560px"}} >
            <NavbarBrand href="/Home">
                <h4 className="ten-project" style={{marginTop:'20px'}}> ScoreMyEssay</h4>
            </NavbarBrand>
            </div>

            <div className="ml-auto" >
            <Dropdown.Button overlay={menu} placement="bottomCenter" icon={<UserOutlined />}>
            </Dropdown.Button>
            </div>
            <h5 className="username  ml-1 mt-auto mb-auto" >  {username}</h5>
            
        </Navbar>
        
    );
}
export default withRouter(GlobalHeader);