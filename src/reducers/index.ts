import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export const initialState = {
  active: 'adsaxaxax', // Current Element
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
    x: number;
    y: number;
    w: number;
    h: number;
    i: string;
  };
  props: any;
}

type IState = {
  active: string;
  datas: Array<IItem>;
};

type IAction = {
  type: string;
  payload?: any;
};

type IContextProps = [state: IState, dispatch: ({ type }: IAction) => void];

export const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'ADD_ELEMENT':
      const uuid = uuidv4();
      return {
        ...state,
        datas: state.datas.concat([
          {
            componentName: 'AreaChart',
            id: uuid,
            rect: {
              x: action.payload.x,
              y: action.payload.y,
              w: 6,
              h: 8,
              i: uuid,
            },
            props: {
              xField: 'Date2',
              yField: 'scales',
            },
          },
        ]),
      };
    case 'DELETE_ELEMENT':
      return {
        ...state,
        datas: state.datas.filter((v) => v.id !== action.payload.id),
      };
    case 'CLICK_ELEMENT':
      return {
        ...state,
        active: action.payload.id,
      };
    case 'UPDATE_PROPS':
      return {
        ...state,
        datas: state.datas.map((v) => {
          return v.id === state.active
            ? { ...v, props: action.payload.props }
            : v;
        }),
      };
    default:
      throw new Error();
  }
};

const Context = React.createContext({} as IContextProps);

export default Context;
