import React, { useState, useEffect } from 'react';
import { Area, G2 } from '@ant-design/charts';
import { deepMix } from '@antv/util';

const theme = deepMix({}, G2.getTheme('dark'), {
  background: 'transparent',
});

export interface AreaProps {
  xField?: string;
  yField?: string;
}

const ArraChart: React.FC<AreaProps> = ({
  xField = 'Date',
  yField = 'scales',
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json',
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const config = {
    data: data,
    xField,
    yField,
    xAxis: { tickCount: 5 },
    theme,
  };

  return <Area {...config} />;
};

export default ArraChart;
