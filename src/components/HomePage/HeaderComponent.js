import React, {useState} from 'react';
import {Navbar, NavbarToggler,  Nav, NavbarBrand, Jumbotron, Collapse, NavItem } from 'reactstrap';
import {NavLink} from 'react-router-dom';
import logo from 'F:/scoremyessay-react-app/src/img/logo.png';

const Header =(props) =>{
    const [collapsed, setCollapsed] = useState(false);
    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <React.Fragment>
        <div>
            <div className="container">
            <Navbar light expand="sm" className="navBar" fixed="top" style={{backgroundColor: 'white'}}>
                <NavbarBrand href="/Home">
                    <h4 className="ten-project"> ScoreMyEssay</h4>
                </NavbarBrand>
            <NavbarToggler onClick={toggleNavbar} className="mr-2" />
            <Collapse isOpen={!collapsed} navbar>
                <Nav navbar className="ml-auto">
                    <NavItem><NavLink className="nav-link" to="/Home">Trang chủ</NavLink></NavItem>
                    <NavItem><NavLink className="nav-link" to="/AboutUs">Về chúng tôi</NavLink></NavItem>
                    <NavItem><NavLink className="nav-link" to="/Function">Tính năng</NavLink></NavItem>
                    <NavItem><NavLink className="nav-link" to="/Price">Giá cả</NavLink></NavItem>
                </Nav>
            </Collapse>
            </Navbar>
            </div>     
            <Jumbotron className="jumbotronn">
                <div className="container">
                    <div className="row row-header align-items-center">
                        <img src={logo}  alt="Score My Essay" className="img-fluid mr-auto ml-auto" height="40%" width="40%"/>
                    </div>
                    <div className="row row-header align-items-center">
                        <h6 class="subtitle">Là phần mềm giúp bạn có thể thuê giảng viên để chấm các bài IELTS writing,
                            giúp thăng hạng band điểm IELTS cho bản thân!</h6>
                    </div>
                </div>  
            </Jumbotron> 
        </div>
        </React.Fragment>
      );
    

}

export default Header;