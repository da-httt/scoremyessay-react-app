import { AuditOutlined, LogoutOutlined, StarOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { React, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Navbar, NavbarBrand } from "reactstrap";
import { removeUserSession } from "../../../Utils/Common";
import { getUserInfo } from "./api";
import "../Teacher.css";

const GlobalHeader = (props) => {
  const [username, setUsername] = useState("Không xác định");
  const [avatar, setAvatar] = useState("");

  const handleLogOut = () => {
    removeUserSession();
    props.history.push("/Home");
  };

  useEffect(() => {
    getUserInfo(setUsername, setAvatar, props.history);
  }, [props.history]);

  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={(e) => props.history.push("/HomeTeacherPage/PersonalInfo")}
        icon={<AuditOutlined />}
      >
        Thông tin cá nhân
      </Menu.Item>
      <Menu.Item
        key="1"
        onClick={(e) => props.history.push("/HomeTeacherPage/MyRating")}
        icon={<StarOutlined />}
      >
        Xếp hạng của tôi
      </Menu.Item>
      <Menu.Item key="3" onClick={handleLogOut} icon={<LogoutOutlined />}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Navbar className="navBarTeacher" fixed="top">
        <NavbarBrand className="navbarBrandTeacher" href="/Home">
          <span className="navBarTeacherTitle">ScoreMyEssay</span>
        </NavbarBrand>
        <div className="ml-auto">
          <Dropdown overlay={menu} placement="bottomCenter">
            <i
              className="dropdown-toggle d-flex align-items-center hidden-arrow"
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
                className="rounded-circle"
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
