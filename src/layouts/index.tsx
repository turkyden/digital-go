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
} from '@ant-design/icons';
import { Resizable, ResizeCallbackData } from 'react-resizable';
import Draggable from 'react-draggable';
import Thumbnail from '@/components/Thumbnail';
import Scaler from '@/components/Scaler';
import Ruler from '@/components/Ruler';
import ViewRenderer from '@/renderers/ViewRenderer';

import FormRender from '@/renderers/FormRenderer';

import './index.css';

const { Header, Content, Sider } = Layout;

type LayoutPageProps = {
  children: React.ReactNode;
};

const LayoutPage: React.FC<EditorPageProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMaterial, setActiveMaterial] = useState('chart');

  // resize the viewport
  const initalScale = 100;
  const [scale, setScale] = useState(initalScale);
  const onZoomUp = () => setScale(scale + 10);
  const onZoomDown = () => scale > 10 && setScale(scale - 10);
  const onReset = () => setScale(initalScale);
  const onWheel = (event: any) => {
    if (!event.ctrlKey) return;
    event.deltaY > 0 ? onZoomDown() : onZoomUp();
  };

  // collapse siderMenu
  const onCollapse = () => setCollapsed(!collapsed);

  // source panel visible
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [datasVisible, setDatasVisible] = useState(false);

  const [width, setWidth] = useState(1366);
  const [height, setHeight] = useState(768);

  const onResize = (
    event: React.SyntheticEvent,
    { size }: ResizeCallbackData,
  ) => {
    setWidth(size.width);
    setHeight(size.height);
  };

  const [title, setTitle] = useState('xxx 数字大屏');

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
        <div className="w-full flex">
          <div className="w-full text-xl text-center">
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
          {!collapsed && (
            <div
              className="overflow-auto bg-gray-400 bg-opacity-5"
              style={{ height: window.innerHeight - 64 }}
            >
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
          <Ruler />
          <div
            className="relative top-0 left-0 w-full h-full overflow-auto"
            onWheel={onWheel}
          >
            <Draggable scale={scale / 100} handle="#handle">
              <div className="absolute top-12 left-12">
                <Resizable
                  className="absolute top-12 left-12"
                  height={height}
                  width={width}
                  transformScale={scale / 100}
                  onResize={onResize}
                >
                  <div
                    className="border border-solid border-gray-200 border-opacity-25 hover:border-blue-500"
                    style={{
                      backgroundImage:
                        'url(https://digital.e-cology.com.cn/cloudstore/release/ca1c4c441fe24c1c97a54b8ff9257cd2/resources/bg.png)',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      width: width,
                      height: height,
                      transform: `scale(${scale / 100})`,
                    }}
                  >
                    <div
                      id="handle"
                      className="absolute text-sm cursor-move"
                      style={{ top: '-1.75rem' }}
                    >
                      {title}
                    </div>
                    {children}
                  </div>
                </Resizable>
              </div>
            </Draggable>
          </div>
          <Scaler
            onZoomUp={onZoomUp}
            onZoomDown={onZoomDown}
            onReset={onReset}
          />
          <Drawer
            title="配置项"
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
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
