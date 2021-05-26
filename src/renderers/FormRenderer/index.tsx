import React from 'react';
import FormRender, { useForm } from 'form-render';
import schema from '@/materials/chart/AreaChart/schema';

const FormRenderer: React.FC<{}> = () => {
  const form = useForm();

  return (
    <div>
      <FormRender form={form} schema={schema} />
    </div>
  );
};

export default FormRenderer;
