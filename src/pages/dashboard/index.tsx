import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import './index.css';
import Template from './Template';

const { Header, Sider, Content } = Layout;

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => setCollapsed((preState) => !preState);

  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          className="cursor-pointer py-2 px-5 leading-9"
          onClick={() => (window.location.href = './')}
        >
          {collapsed ? (
            <h2 className="text-center">☄️ </h2>
          ) : (
            <h2 className="text-left">☄️ Digital Go</h2>
          )}
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            模板案例
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            我的模板
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: toggle,
            },
          )}
        </Header>
        <Content className="">
          <Template />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
