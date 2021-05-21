import React, { useState } from 'react';
import { Navbar, NavbarToggler, Nav, NavbarBrand, Button, Jumbotron, Collapse, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import logo from '../../img/logo.png';
import "./home.css"
const Header = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <React.Fragment>
            <div  >
                <Navbar light expand="sm" className="navBar " fixed="top" >
                    <div className="d-flex flex-nowrap">
                    <NavbarBrand href="/Home">
                        <span className="ten-project"> ScoreMyEssay</span>
                    </NavbarBrand>
                    <NavbarToggler onClick={toggleNavbar}  />
                    </div>

                    <Collapse isOpen={!collapsed} navbar>
                        <Nav navbar className="navbar-nav ml-auto ">
                            <NavItem className="nav-link js-scroll-trigge" ><a href="/Home#homepage">Trang chủ </a></NavItem>
                            <NavItem className="nav-link js-scroll-trigge"><a href="/Home#discover">Tìm hiểu</a></NavItem>
                            <NavItem className="nav-link js-scroll-trigge"><a href="/Home#aboutus">Đội ngũ </a></NavItem>

                        </Nav>
                    </Collapse>
                </Navbar>
                <div className="container" style={{ marginBottom: 20 }}>
                    <div className="row align-items-center">
                        <img src={logo} alt="Score My Essay" className="img-fluid mr-auto ml-auto imglogo" />
                    </div>
                    <div className="row align-items-center">
                        <h6 className="subtitle mr-auto ml-auto">Cải thiện điểm số Tiếng Anh của bạn và còn hơn thế nữa!</h6>
                    </div>
                    <div style={{marginTop: 20}}className="row align-items-center">
                        <Button outline color='info' className=" mr-auto ml-auto" >Khám phá Score My Essay</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );


}

export default Header;