export default {
  type: 'object',
  properties: {
    xField: {
      title: 'X 轴字段',
      default: 'Date',
      required: false,
      disabled: false,
      readOnly: false,
      hidden: false,
      props: {
        allowClear: false,
      },
      type: 'string',
    },
    yField: {
      title: 'Y 轴字段',
      description: '',
      default: 'scales',
      required: false,
      disabled: false,
      readOnly: false,
      hidden: false,
      props: {
        allowClear: false,
      },
      type: 'string',
    },
  },
  displayType: 'column',
};
