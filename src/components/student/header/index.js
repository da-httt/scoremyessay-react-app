import { AuditOutlined, LogoutOutlined, StarOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import { React, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Navbar, NavbarBrand } from 'reactstrap';
import { removeUserSession } from '../../../Utils/Common';
import '../Student.css';
import { getInfo } from './api';
import './header.css';

const GlobalHeader = (props) => {
  const [username, setUsername] = useState("Không xác định");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
      getInfo(setUsername, setAvatar, props);
  }, [setUsername, setAvatar, props]);

  const handleLogOut = () => {
    removeUserSession();
    props.history.push("/Home");
  };
  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={(e) => props.history.push("/HomeStudentPage/PersonalInfo")}
        icon={<AuditOutlined />}
      >
        Thông tin cá nhân
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={(e) => props.history.push("/HomeStudentPage/MyReview")}
        icon={<StarOutlined />}
      >
        Đánh giá của tôi
      </Menu.Item>
      <Menu.Item key="3" onClick={handleLogOut} icon={<LogoutOutlined />}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Navbar className="navBarStudent" fixed="top">
        <NavbarBrand className="navbarBrandStudent" href="/Home">
          <span className="navBarStudentTitle">ScoreMyEssay</span>
        </NavbarBrand>
        <div className="ml-auto">
          <a
            color="link"
            className="cart-link-student"
            href="/HomeStudentPage/Cart"
          >
            {" "}
            Giỏ hàng <i className="fa fa-cart-arrow-down fa-lg" />
          </a>
          <Dropdown overlay={menu} placement="bottomCenter">
            <i
              class="dropdown-toggle d-flex align-items-center hidden-arrow"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              <span style={{ marginRight: "10px", color: "#2596be" }}>
                {username}
              </span>

              <img
                src={`data:image/jpeg;base64,${avatar}`}
                class="rounded-circle"
                height="50"
                alt=""
                loading="lazy"
              />
            </i>
          </Dropdown>
        </div>
      </Navbar>
    </>
  );
};
export default withRouter(GlobalHeader);
