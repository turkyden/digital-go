import React from 'react';

export const initialState = {
  current: 'adsaxaxax', // Current Element
  datas: [
    {
      componentName: 'AreaChart',
      id: 'adsaxaxax',
      rect: {
        x: 0,
        y: 0,
        w: 6,
        h: 14,
        i: '0',
      },
      props: {
        xField: 'Date',
        yField: 'scales',
      },
    },
  ],
};

interface IItem {
  componentName: string;
  id: string;
  rect: {
    x: numnber;
    y: numnber;
    w: numnber;
    h: numnber;
    i: string;
  };
  props: any;
}

type IState = {
  current: string;
  datas: Array<IItem>;
};

type IAction = {
  type: string;
  payload?: any;
};

type IContextProps = [
  state: IState,
  dispatch: ({ type }: { type: string }) => void,
];

export const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'ADD_ELEMENT':
      const { x, y } = action.payload;
      return {
        datas: state.datas.concat([
          {
            componentName: 'AreaChart',
            id: 'kfkdokdsofdks',
            rect: {
              x: x,
              y: y,
              w: 6,
              h: 8,
              i: new Date().getTime().toString(),
            },
            props: {
              xField: 'Date',
              yField: 'scales',
            },
          },
        ]),
      };
    default:
      throw new Error();
  }
};

const Context = React.createContext({} as IContextProps);

export default Context;
