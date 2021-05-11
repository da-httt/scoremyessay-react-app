import './Student.css';
import { React, useEffect, useState} from 'react';
import { Badge, Button, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Navbar, NavbarBrand} from 'reactstrap';
import avt from "../../img/avt.png";
import { getBaseURL, getToken, removeUserSession } from '../../Utils/Common';
import { withRouter } from 'react-router-dom';

const api= getBaseURL();

const ButtonDrop = (props) => {
    const [dropdownOpen, setOpen] = useState(false);
  
    const toggle = () => setOpen(!dropdownOpen);
  
    return (

        <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} >
        <DropdownToggle caret className="fa fa-bell-o "  color="info">
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Thông báo mới</DropdownItem>
          <DropdownItem>Thông báo 1</DropdownItem>
          <DropdownItem>Thông báo 2</DropdownItem>
          <DropdownItem divider />
          <DropdownItem header>Thông báo trước đây</DropdownItem>
          <DropdownItem>Thông báo 3</DropdownItem>
          <DropdownItem>Thông báo 4</DropdownItem>
        </DropdownMenu>
        <Badge className="badge">3</Badge>
      </ButtonDropdown>

      
    );
  }

const GlobalHeader= (props)=>{
  const [username, setUsername] = useState("Không xác định");
  useEffect( () => {
    async function fetchData() {
        await api.get('/users/me',{
          headers: {Authorization: 'Bearer ' + getToken()}
        }
        ).then(response => {
            const name = response.data.info.name;
            setUsername(name);
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

    return(
        <Navbar light className="navBarDetail" fixed="top">
            <div style={{marginRight:"560px"}} >
            <NavbarBrand href="/Home">
                <h4 className="ten-project" style={{marginTop:'20px'}}> ScoreMyEssay</h4>
            </NavbarBrand>
            </div>

            <div className="ml-auto" >
            <Button color="link" href="/HomeStudentPage/Cart"><i className="fa fa-cart-arrow-down fa-lg" /> Giỏ Hàng</Button>
            <ButtonDrop />
            </div>
            <a href="/HomeStudentPage/PersonalInfo">
            <img src={avt} height="30px" className="ml-3" alt="Avatar"></img>
            </a>
            <h5 className="username  ml-1 mt-auto mb-auto" onClick={handleLogOut} >{username}</h5>
        </Navbar>
        
    );
}
export default withRouter(GlobalHeader);