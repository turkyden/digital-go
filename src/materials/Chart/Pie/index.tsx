import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/charts';

const PieChart: React.FC<{}> = () => {
  var data = [
    {
      type: 'Category One',
      value: 27,
    },
    {
      type: 'Category Two',
      value: 25,
    },
    {
      type: 'Category Three',
      value: 18,
    },
    {
      type: 'Category Four',
      value: 15,
    },
    {
      type: 'Category Five',
      value: 10,
    },
    {
      type: 'other',
      value: 5,
    },
  ];
  var config = {
    appendPadding: 10,
    data: data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: function content(_ref) {
        var percent = _ref.percent;
        return ''.concat(percent * 100, '%');
      },
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [{ type: 'element-active' }],
  };
  return <Pie {...config} />;
};

export default PieChart;
