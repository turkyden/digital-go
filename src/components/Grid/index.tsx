import React, { useState, useRef } from 'react';
import _ from 'lodash';
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
      x: (i * 2) % 12,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
    };
  });
};

const defaultProps = {
  className: 'layout',
  items: 20,
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
    const { onClick } = props;
    return _.map(_.range(defaultProps.items), (i) => {
      return (
        <div
          className="relative border border-solid border-transparent hover:border-blue-500"
          key={i}
          onClick={onClick}
        >
          <div
            className="absolute w-full flex justify-end items-center text-xs hidden"
            style={{ top: '-1.25rem' }}
          >
            <div className="bg-blue-500">
              <span>
                <DatabaseOutlined />
              </span>
              <span>
                <SettingOutlined />
              </span>
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
