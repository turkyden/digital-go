import React, { useState, useRef } from 'react';
import _ from 'lodash';
import { Tooltip } from 'antd';
import { DatabaseOutlined, SettingOutlined } from '@ant-design/icons';
import RGL, { WidthProvider, Layout } from 'react-grid-layout';
import '../../../node_modules/react-grid-layout/css/styles.css';
import '../../../node_modules/react-resizable/css/styles.css';
import './index.css';

import AreaChart from '@/materials/chart/AreaChart';

const ReactGridLayout = WidthProvider(RGL);

const layout: Layout[] = Array.from(new Array(2), (v, i) => {
  const y = Math.ceil(Math.random() * 4) + 1;
  return {
    x: (i * 6) % 12,
    y: Math.floor(i / 6) * y,
    w: 6,
    h: 14,
    i: i.toString(),
  };
});

export interface GridProps {
  transformScale: number;
  onEditOptions: (key: number) => void;
  onEditDatas: (key: number) => void;
}

const Grid: React.FunctionComponent<GridProps> = ({
  transformScale,
  onEditOptions,
  onEditDatas,
}) => {
  const generateDOM = () => {
    return Array.from(new Array(2), (v, k) => {
      return (
        <div
          className="dg_grid_item | relative border border-solid border-transparent hover:border-blue-500"
          key={k}
        >
          <div
            className="absolute w-full flex justify-end items-center text-xs invisible"
            style={{ top: '-1rem' }}
          >
            <div className="cursor-pointer">
              <Tooltip title="接入数据" placement="top">
                <span
                  className="bg-blue-500 px-1 rounded-sm"
                  onClick={() => onEditDatas(k)}
                >
                  <DatabaseOutlined />
                </span>
              </Tooltip>
              <span className="px-1"></span>
              <Tooltip title="设置图表" placement="top">
                <span
                  className="bg-blue-500 px-1 rounded-sm"
                  onClick={() => onEditOptions(k)}
                >
                  <SettingOutlined />
                </span>
              </Tooltip>
            </div>
          </div>
          <div className="absolute w-full h-full p-4">
            <AreaChart />
          </div>
        </div>
      );
    });
  };

  const onDrop = (layout: Layout[], item: Layout, e: Event) => {
    window.alert(
      `Dropped element props:\n${JSON.stringify(
        item,
        ['x', 'y', 'w', 'h'],
        2,
      )}`,
    );
  };

  return (
    <ReactGridLayout
      className="dg_grid_layout"
      rowHeight={10}
      cols={24}
      isDroppable={true}
      layout={layout}
      onDrop={onDrop}
      transformScale={transformScale}
    >
      {generateDOM()}
    </ReactGridLayout>
  );
};

export default Grid;
