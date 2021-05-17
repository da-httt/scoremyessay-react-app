import React from "react";
import { Menu, Layout } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  SettingOutlined,
  WechatOutlined
} from '@ant-design/icons';


export default function Sider(props) {
  const { handleClick } = props;
  return (
    <Layout.Sider className="site-layout-background" width={200}>
      <Menu mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }} openKeys={"sub1"}>
          <Menu.Item key="1" onClick={handleClick}>
          <DashboardOutlined twoToneColor="blue"/> Dashboard
          </Menu.Item>
          <Menu.Item key="2" onClick={handleClick}>
          <ShoppingCartOutlined /> Order Management
          </Menu.Item>
          <Menu.Item key="3" onClick={handleClick}>
          <UserOutlined />User Management
          </Menu.Item>
          <Menu.Item key="4" onClick={handleClick}>
          <DatabaseOutlined /> Category 
          </Menu.Item>
          <Menu.Item key="5" onClick={handleClick}>
          <WechatOutlined />Rating 
          </Menu.Item>
          <Menu.Item key="6" onClick={handleClick}>
          <SettingOutlined />Setting 
          </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
}