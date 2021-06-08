import React, { useContext, useCallback } from 'react';
import FormRender, { useForm } from 'form-render';
import schema from '@/materials/chart/Area/schema';
import Context from '@/reducers';

const FormRenderer: React.FC<{}> = () => {
  const [state, dispatch] = useContext(Context);

  const form = useForm();

  useCallback(() => {
    const item = state.datas.find((v) => v.id === state.active);
    form.setValues(item?.props);
  }, [state.active]);

  return (
    <div>
      <FormRender
        form={form}
        schema={schema}
        watch={{
          '#': (props) => {
            dispatch({ type: 'UPDATE_PROPS', payload: { props } });
          },
        }}
      />
    </div>
  );
};

export default FormRenderer;
