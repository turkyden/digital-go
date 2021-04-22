import React, { useState, useRef } from 'react';
import _ from 'lodash';
import { Tooltip } from 'antd';
import { DatabaseOutlined, SettingOutlined } from '@ant-design/icons';
import RGL, { WidthProvider } from 'react-grid-layout';
import '../../../node_modules/react-grid-layout/css/styles.css';
import '../../../node_modules/react-resizable/css/styles.css';
import './index.css';

const ReactGridLayout = WidthProvider(RGL);

const generateLayout = (p) => {
  return _.map(new Array(p.items), function (item, i) {
    const y = _.result(p, 'y') || Math.ceil(Math.random() * 4) + 1;
    return {
      x: (i * 4) % 12,
      y: Math.floor(i / 6) * y,
      w: 4,
      h: y,
      i: i.toString(),
    };
  });
};

const defaultProps = {
  className: 'layout w-full',
  items: 8,
  rowHeight: 10,
  onLayoutChange: (layout) => {},
  cols: 24,
  transformScale: 1,
  isDroppable: true,
  onClick: () => {},
};

export default function Grid(props) {
  const [layout, setLayout] = useState(generateLayout(defaultProps));

  const generateDOM = () => {
    const { onEditOptions, onEditDatas } = props;
    return _.map(_.range(defaultProps.items), (i) => {
      return (
        <div
          className="dg_grid | relative border border-solid border-transparent hover:border-blue-500"
          key={i}
        >
          <div
            className="dg_grid_handle | absolute w-full flex justify-end items-center text-xs invisible"
            style={{ top: '-1rem' }}
          >
            <div className="cursor-pointer">
              <Tooltip title="接入数据" placement="top">
                <span
                  className="bg-blue-500 px-1 rounded-sm"
                  onClick={() => onEditDatas(i)}
                >
                  <DatabaseOutlined />
                </span>
              </Tooltip>
              <span className="px-1"></span>
              <Tooltip title="设置图表" placement="top">
                <span
                  className="bg-blue-500 px-1 rounded-sm"
                  onClick={() => onEditOptions(i)}
                >
                  <SettingOutlined />
                </span>
              </Tooltip>
            </div>
          </div>
          <span className="text">{i}</span>
        </div>
      );
    });
  };

  const onDrop = (layout, layoutItem, _event) => {
    window.alert(
      `Dropped element props:\n${JSON.stringify(
        layoutItem,
        ['x', 'y', 'w', 'h'],
        2,
      )}`,
    );
  };

  return (
    <ReactGridLayout
      {...defaultProps}
      layout={layout}
      onDrop={onDrop}
      {...props}
    >
      {generateDOM()}
    </ReactGridLayout>
  );
}
