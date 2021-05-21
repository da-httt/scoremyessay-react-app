import { withRouter } from 'react-router-dom';
import "./admin.css"
import { removeUserSession } from '../../Utils/Common';

import { PageHeader, Layout, Button } from 'antd';
import { React, useState } from 'react';
import Rating from "./components/Rating/Rating"
import Sider from "./Sider";
import OrderList from "./components/Order/OrderList"
import UserList from "./components/User/UserList"
import Database from "./components/Database/Database"
import Dashboard from "./components/Dashboard/Dashboard"
const { Content, Footer } = Layout;

const AdminPage = (props) => {

  const handleLogOut = () => {
    removeUserSession();
    props.history.push("/admin");
  }
  const handleMenuClick = menu => {
    console.log("update render key with key = " + menu.key)
    updateRender(menu.key);
  };


  const [render, updateRender] = useState(1);

  const components = {
    1: <Dashboard style={{ width: 'auto', height: 'auto' }} handleClick={handleMenuClick} />,
    2: <OrderList />,
    3: <UserList style={{ width: 'auto' }} />,
    4: <Database style={{ width: 'auto' }} />,
    5: <Rating />,
    6: <span>no</span>
  };


  return (
    <Layout>
      <PageHeader
        ghost={false}
        style={{ color: "#55a2d6" }}
        title={<span className="ten-project"> ScoreMyEssay</span>}
        subTitle="The Admin Panel"
        extra={[
          <>
            <span>Admin</span>
            <Button onClick={handleLogOut}>Logout</Button>,
        </>
        ]}
      > </PageHeader>
      <Content style={{ padding: '0 50px', height: "1200px" }}>
        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
          <Sider handleClick={handleMenuClick} />
          <Content style={{ padding: '0 24px', minHeight: "200px", backgroundColor: "white" }}>
            {components[render]}
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>ScoreMyEssay ©2021 Created by ScoreMyEssay Team </Footer>

    </Layout>

  )

}

export default withRouter(AdminPage);
