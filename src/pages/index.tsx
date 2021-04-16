import { Layout, Menu, Breadcrumb, Radio } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import {
  RollbackOutlined,
  CloudDownloadOutlined,
  SendOutlined,
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

export default function IndexPage() {
  return (
    <Layout>
      <Header className="flex justify-between items-center">
        <h2>· : Digital Go : ·</h2>
        <div className="flex h-full justify-center items-center">
          <Radio.Group
            defaultValue="edit"
            size="small"
            style={{ marginTop: 16 }}
          >
            <Radio.Button value="edit">Edit</Radio.Button>
            <Radio.Button value="preview">Preview</Radio.Button>
          </Radio.Group>
        </div>
        <div className="flex justify-between w-48 text-lg">
          <RollbackOutlined className="cursor-pointer hover:text-blue-500" />
          <SendOutlined className="cursor-pointer hover:text-blue-500" />
          <CloudDownloadOutlined className="cursor-pointer hover:text-blue-500" />
          <CloudDownloadOutlined className="cursor-pointer hover:text-blue-500" />
        </div>
      </Header>
      <Layout>
        <Sider width={200}>
          <div>物料区</div>
        </Sider>
        <Layout>
          {/* <div>标尺</div> */}
          <Content className="p-10 h-96">
            <div className="bg-gray-900 h-96">画布区</div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
