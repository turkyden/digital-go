import React, { useState, useReducer } from 'react';
import Layout from '@/layouts';
import ViewRenderer from '@/renderers/ViewRenderer';
import Context, { reducer, initialState } from '@/reducers';

export default function EditorPage() {
  const store = useReducer(reducer, initialState);

  // source panel visible
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [datasVisible, setDatasVisible] = useState(false);

  return (
    <Context.Provider value={store}>
      <Layout>
        <ViewRenderer
          transformScale={100}
          onEditOptions={() => setOptionsVisible(true)}
          onEditDatas={() => setDatasVisible(true)}
        />
      </Layout>
    </Context.Provider>
  );
}
