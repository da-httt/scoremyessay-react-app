import './Teacher.css';
import { React, useState} from 'react';
import { Badge, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Navbar, NavbarBrand} from 'reactstrap';
import avt from "../../img/avt.png";
import { removeUserSession } from '../../Utils/Common';
import { withRouter } from 'react-router-dom';


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
    const {
        username
    }=props;

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
            
            <ButtonDrop />
            </div>
            <img src={avt} height="30px" className="ml-3" alt="Avatar"></img>
            <h5 className="username  ml-1 mt-auto mb-auto" onClick={handleLogOut}>  {username}</h5>
        </Navbar>
        
    );
}
export default withRouter(GlobalHeader);