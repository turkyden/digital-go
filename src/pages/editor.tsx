import { useState, useRef } from 'react';
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
  EnvironmentOutlined,
} from '@ant-design/icons';
import Draggable from 'react-draggable';
import Moveable from 'react-moveable';
import { ThumbnailChart } from '@/components/Thumbnail/index';

import Grid from '@/components/Grid';

import ReactRuler from '@/layouts/Ruler/index';
import Scaler from '@/layouts/Scaler/index';

import './editor.css';

const { Header, Content, Sider } = Layout;

export default function EditorPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMaterial, setActiveMaterial] = useState('chart');

  // resize the viewport
  const initalScale = 100;
  const [scale, setScale] = useState(initalScale);
  const onZoomUp = () => setScale(scale + 10);
  const onZoomDown = () => scale > 10 && setScale(scale - 10);
  const onReset = () => setScale(initalScale);
  const onWheel = (event: WheelEvent) => {
    if (!event.ctrlKey) return;
    event.deltaY > 0 ? onZoomDown() : onZoomUp();
  };

  // resize canvas
  const [translate, setTranslate] = useState([0, 0]);
  const targetRef = useRef<HTMLDivElement>(null);
  const moveableRef = useRef<Moveable>(null);

  // collapse siderMenu
  const onCollapse = () => setCollapsed(!collapsed);

  return (
    <Layout className="h-screen">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        width={200}
      >
        <Header className="text-center" style={{ padding: '0 24px' }}>
          {!collapsed ? <h2>Digital Go</h2> : <h2>☄️ </h2>}
        </Header>
        <div className="w-full flex">
          <div className="w-full text-xl text-center">
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
        <Content className="relative">
          <ReactRuler />
          <div
            className="absolute top-0 left-0 w-full h-full overflow-auto | handle"
            onWheel={onWheel}
          >
            <Draggable scale={scale / 100} handle=".handle">
              <div className="absolute top-12 left-12">
                <div
                  ref={targetRef}
                  className="border border-solid border-gray-200 border-opacity-25"
                  style={{
                    backgroundImage:
                      'url(https://digital.e-cology.com.cn/cloudstore/release/ca1c4c441fe24c1c97a54b8ff9257cd2/resources/bg.png)',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    width: 1920,
                    height: 1200,
                    transform: `scale(${scale / 100})`,
                  }}
                >
                  <div
                    className="relative text-sm cursor-move | handle"
                    style={{ top: '-1.75rem' }}
                  >
                    同济大学图书馆数字大屏
                  </div>
                  <Grid transformScale={scale / 100} />
                </div>
                {/* <Moveable
                  ref={moveableRef}
                  target={targetRef}
                  resizable={false}
                  throttleResize={10}
                  onResizeStart={e => {
                    e.dragStart && e.dragStart.set(translate);
                  }}
                  onResize={e => {
                    const beforeTranslate = e.drag.beforeTranslate;
                    e.target.style.width = `${e.width}px`;
                    e.target.style.height = `${e.height}px`;
                    e.target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
                  }}
                  onResizeEnd={e => {
                    const lastEvent = e.lastEvent;
                    if (lastEvent) {
                      setTranslate(lastEvent.drag.beforeTranslate);
                    }
                  }}
                /> */}
              </div>
            </Draggable>
          </div>
          <Scaler
            onZoomUp={onZoomUp}
            onZoomDown={onZoomDown}
            onReset={onReset}
          />
        </Content>
      </Layout>
    </Layout>
  );
}
