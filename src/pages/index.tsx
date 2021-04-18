import { Layout, Radio } from 'antd';
import {
  RollbackOutlined,
  CloudDownloadOutlined,
  SendOutlined,
  FontSizeOutlined,
  BarChartOutlined,
  AppstoreOutlined,
  EyeOutlined,
  PicRightOutlined,
  PicLeftOutlined,
  PicCenterOutlined,
} from '@ant-design/icons';
import { ThumbnailChart } from '@/components/Thumbnail/index';
import { useState } from 'react';

import DragFromOutsideLayout from '@/components/Grid';

import ReactRuler from '@/layouts/Ruler/index';
import Scaler from '@/layouts/Scaler/index';

import './index.css';

const { Header, Content, Sider } = Layout;

export default function IndexPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMaterial, setActiveMaterial] = useState('chart');

  const onCollapse = () => setCollapsed(!collapsed);

  return (
    <Layout className="h-screen">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        width={200}
      >
        <Header className="text-center">
          {!collapsed ? <h2>Digital Go</h2> : <h2>Digital</h2>}
        </Header>
        <div className="w-full flex">
          <div className="w-full text-xl text-center">
            <div className="p-2 cursor-pointer hover:text-blue-500">
              <BarChartOutlined />
            </div>
            <div className="p-2 cursor-pointer hover:text-blue-500">
              <FontSizeOutlined />
            </div>
            <div className="p-2 cursor-pointer hover:text-blue-500">
              <AppstoreOutlined />
            </div>
          </div>
          {!collapsed && (
            <div
              className="overflow-auto"
              style={{ height: window.innerHeight - 112 }}
            >
              <ThumbnailChart />
            </div>
          )}
        </div>
      </Sider>

      <Layout>
        <Header className="flex justify-between items-center">
          <div className="flex justify-between w-24 text-lg">
            <PicRightOutlined className="cursor-pointer text-blue-500 hover:text-blue-500" />
            <PicCenterOutlined className="cursor-pointer hover:text-blue-500" />
            <PicLeftOutlined className="cursor-pointer hover:text-blue-500" />
          </div>
          <div className="flex h-full justify-center items-center">
            <Radio.Group
              defaultValue="pc"
              size="small"
              style={{ marginTop: 16 }}
            >
              <Radio.Button value="pc">PC</Radio.Button>
              <Radio.Button value="mobile">Mobile</Radio.Button>
            </Radio.Group>
          </div>
          <div className="flex justify-between w-48 text-lg">
            <RollbackOutlined className="cursor-pointer hover:text-blue-500" />
            <EyeOutlined className="cursor-pointer hover:text-blue-500" />
            <CloudDownloadOutlined className="cursor-pointer hover:text-blue-500" />
            <SendOutlined className="cursor-pointer hover:text-blue-500" />
          </div>
        </Header>
        {/* <div>标尺</div> */}
        <Content className="h-96 relative">
          <ReactRuler />
          <div className="absolute top-24 left-48">
            <div
              className="bg-gray-900"
              style={{
                backgroundImage:
                  'url(https://digital.e-cology.com.cn/cloudstore/release/ca1c4c441fe24c1c97a54b8ff9257cd2/resources/bg.png)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: 1200,
                height: 800,
              }}
            >
              <DragFromOutsideLayout />
            </div>
          </div>
          <Scaler />
        </Content>
      </Layout>
    </Layout>
  );
}
