import React, { useContext } from 'react';
import { Tooltip } from 'antd';
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import RGL, { WidthProvider, Layout } from 'react-grid-layout';
import Context from '@/reducers';
import AreaChart from '@/materials/Chart/AreaChart';

import '../../../node_modules/react-grid-layout/css/styles.css';
import '../../../node_modules/react-resizable/css/styles.css';
import './index.css';

const ReactGridLayout = WidthProvider(RGL);

export interface ViewRendererProps {
  transformScale: number;
}

const ViewRenderer: React.FunctionComponent<ViewRendererProps> = ({
  transformScale,
}) => {
  const [state, dispatch] = useContext(Context);

  const onDrop = (layout: Layout[], item: Layout, e: Event) => {
    const { x, y } = item;
    dispatch({ type: 'ADD_ELEMENT', payload: { x, y } });
  };

  const onDelete = (id: string) => {
    dispatch({ type: 'DELETE_ELEMENT', payload: { id } });
  };

  const onClick = (id: string) => {
    dispatch({ type: 'CLICK_ELEMENT', payload: { id } });
  };

  const generateDOM = () => {
    return state.datas.map((v) => {
      return (
        <div
          className="dg_grid_item | relative border border-solid border-transparent hover:border-blue-500"
          key={v.rect.i}
          data-grid={v.rect}
          onClick={() => onClick(v.id)}
        >
          <div className="absolute top-0 right-0 z-50 w-full flex justify-end items-center text-xs invisible">
            <div className="cursor-pointer bg-blue-500 rounded-none rounded-bl-lg w-14 h-5 flex justify-center items-center">
              <Tooltip title="复制" placement="top">
                <CopyOutlined onClick={() => onDelete(v.id)} />
              </Tooltip>
              <span className="px-1"></span>
              <Tooltip title="删除" placement="top">
                <DeleteOutlined onClick={() => onDelete(v.id)} />
              </Tooltip>
            </div>
          </div>
          <div className="absolute w-full h-full p-4">
            <AreaChart {...v.props} />
          </div>
        </div>
      );
    });
  };

  return (
    <ReactGridLayout
      className="dg_grid_layout"
      rowHeight={10}
      cols={24}
      isDroppable={true}
      onDrop={onDrop}
      transformScale={transformScale}
      onLayoutChange={(layout) => console.log(layout)}
    >
      {generateDOM()}
    </ReactGridLayout>
  );
};

export default ViewRenderer;
