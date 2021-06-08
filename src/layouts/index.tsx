import React, { useState } from 'react';
import { Layout, Radio, Drawer, Tooltip } from 'antd';
import {
  RollbackOutlined,
  CloudDownloadOutlined,
  SendOutlined,
  FontSizeOutlined,
  BarChartOutlined,
  AppstoreOutlined,
  EyeOutlined,
  PicRightOutlined,
  EnvironmentOutlined,
  MenuFoldOutlined,
  CodeOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import Thumbnail from '@/components/Thumbnail';
import Ruler from '@/components/Ruler';
import FormRender from '@/renderers/FormRenderer';
import Canvas from './Canvas';

import './index.css';

const { Header, Content, Sider } = Layout;

type LayoutPageProps = {
  children: React.ReactNode;
};

const LayoutPage: React.FC<LayoutPageProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  // collapse siderMenu
  const onCollapse = () => setCollapsed(!collapsed);

  // source panel visible
  const [optionsVisible, setOptionsVisible] = useState(true);
  const [datasVisible, setDatasVisible] = useState(false);

  const [schemaVisible, setSchemaVisible] = useState(false);

  return (
    <Layout className="h-screen">
      <Sider collapsible trigger={null} collapsed={collapsed} width={200}>
        <Header className="text-center" style={{ padding: '0 24px' }}>
          {!collapsed ? (
            <h2
              className="cursor-pointer"
              onClick={() => (window.location.href = '/')}
            >
              Digital Go
            </h2>
          ) : (
            <h2>☄️ </h2>
          )}
        </Header>
        <div className="absolute top-16 w-full h-full flex">
          <div className="w-full h-full flex flex-col justify-between items-center text-xl text-center">
            <div className="">
              <div className="p-2 cursor-pointer hover:text-blue-500">
                <MenuFoldOutlined onClick={onCollapse} />
              </div>
              <div className="p-2 cursor-pointer hover:text-blue-500">
                <BarChartOutlined />
              </div>
              <div className="p-2 cursor-pointer hover:text-blue-500">
                <EnvironmentOutlined />
              </div>
              <div className="p-2 cursor-pointer hover:text-blue-500">
                <FontSizeOutlined />
              </div>
              <div className="p-2 cursor-pointer hover:text-blue-500">
                <AppstoreOutlined />
              </div>
            </div>
            <div>
              <Tooltip
                className="p-2 cursor-pointer hover:text-blue-500"
                title="Schema 源码开发"
                placement="right"
              >
                <CodeOutlined
                  className="cursor-pointer hover:text-blue-500"
                  onClick={() => setSchemaVisible(true)}
                />
              </Tooltip>
              <Tooltip
                className="p-2 cursor-pointer hover:text-blue-500"
                title="帮助"
                placement="right"
              >
                <QuestionCircleOutlined className="cursor-pointer hover:text-blue-500" />
              </Tooltip>
            </div>
          </div>
          {!collapsed && (
            <div className="overflow-auto bg-gray-400 bg-opacity-5">
              <Thumbnail />
            </div>
          )}
        </div>
      </Sider>

      <Layout>
        <Header className="flex justify-between items-center">
          <div className="flex justify-between w-24 text-lg">
            <PicRightOutlined className="cursor-pointer text-blue-500 hover:text-blue-500" />
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
            <Tooltip title="上一步" placement="bottom">
              <RollbackOutlined className="cursor-pointer hover:text-blue-500" />
            </Tooltip>
            <Tooltip title="预览" placement="bottom">
              <EyeOutlined className="cursor-pointer hover:text-blue-500" />
            </Tooltip>
            <Tooltip title="导出" placement="bottom">
              <CloudDownloadOutlined className="cursor-pointer hover:text-blue-500" />
            </Tooltip>
            <Tooltip title="发布" placement="bottom">
              <SendOutlined className="cursor-pointer hover:text-blue-500" />
            </Tooltip>
          </div>
        </Header>
        <Content className="relative overflow-hidden">
          <Canvas>{children}</Canvas>
          <Drawer
            title="配置项"
            mask={false}
            placement="right"
            key="right"
            className="absolute"
            style={{ position: 'absolute' }}
            closable={true}
            onClose={() => setOptionsVisible(false)}
            visible={optionsVisible}
            getContainer={false}
          >
            <FormRender />
          </Drawer>
          <Drawer
            title="数据源"
            placement="bottom"
            key="bottom"
            className="absolute"
            style={{ position: 'absolute' }}
            closable={true}
            onClose={() => setDatasVisible(false)}
            visible={datasVisible}
            getContainer={false}
          >
            <ol>
              <li>样例数据</li>
              <li>本地数据，支持 .csx、.excel、.json 格式</li>
              <li>实时数据，serverless 云函数</li>
            </ol>
          </Drawer>
          <Drawer
            title="Schema 源码开发"
            placement="left"
            visible={schemaVisible}
            onClose={() => setSchemaVisible(false)}
            key="left"
            width="600"
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Drawer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
