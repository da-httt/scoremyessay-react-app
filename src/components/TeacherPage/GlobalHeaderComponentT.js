import './Teacher.css';
import { React, useEffect, useState } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { getBaseURL, getToken, removeUserSession } from '../../Utils/Common';
import { withRouter } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';

import { UserOutlined, AuditOutlined, LogoutOutlined, StarOutlined } from '@ant-design/icons';

const api = getBaseURL();


const GlobalHeader = (props) => {
  const [username, setUsername] = useState("Không xác định");
  const [avatar, setAvatar] = useState("")

  useEffect(() => {
    async function fetchData() {
      await api.get('/users/me', {
        headers: { Authorization: 'Bearer ' + getToken() }
      }
      ).then(response => {
        setUsername(response.data.info.name);
        api.get('/avatars/' + response.data.info.user_id, {
          headers: { Authorization: 'Bearer ' + getToken() }
        }).then(response => {
          setAvatar(response.data.image_base64);
        })
      }).catch((error) => {
        if (error.response) {
          if (error.response.status === 401 || error.response.status === 400 || error.response.status === 403) {
            setUsername(error.response.data.detail);
          }
          else {
            setUsername("Không xác định");
          }

        }
      })

    }
    fetchData();

  }, []);

  const handleLogOut = () => {
    removeUserSession();
    props.history.push("/Home");
  }
  const menu = (
    <Menu >
      <Menu.Item key="1" onClick={e => props.history.push("/HomeTeacherPage/PersonalInfo")} icon={<AuditOutlined />}>
        Thông tin cá nhân
        </Menu.Item>
      <Menu.Item key="1" onClick={e => props.history.push("/HomeTeacherPage/MyRating")} icon={<StarOutlined />}>
        Xếp hạng của tôi
        </Menu.Item>
      <Menu.Item key="3" onClick={handleLogOut} icon={<LogoutOutlined />}>
        Đăng xuất
        </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Navbar className="navBarTeacher" fixed="top" >
        <NavbarBrand className="navbarBrandTeacher" href="/Home">
          <span className="navBarTeacherTitle">ScoreMyEssay</span>
        </NavbarBrand>
        <div className="ml-auto" >
          <Dropdown overlay={menu} placement="bottomCenter" >
            <a
              class="dropdown-toggle d-flex align-items-center hidden-arrow"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              <span style={{ marginRight: "10px", color: "#2596be" }}>{username}</span>

              <img
                src={`data:image/jpeg;base64,${avatar}`}
                class="rounded-circle"
                height="50"
                alt=""
                loading="lazy"
              />
            </a>
          </Dropdown >
        </div>

      </Navbar>

    </>

  );
}
export default withRouter(GlobalHeader);