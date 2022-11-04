import { Formik } from 'formik';
import FormFragment from './FormFragment';
import React from 'react';
import * as yup from 'yup';

export default function Form({
  fieldGroups,
  fields,
  submitText,
  onSubmit,
  setRefs = () => {},
}) {
  const validations = {};
  const initialValues = {};

  fields.forEach((f) => {
    if (f.validation) {
      validations[f.name] = f.validation;
    }
    if (f.initialValue !== undefined) {
      initialValues[f.name] = f.initialValue;
    }
  });

  const validationSchema = yup.object().shape(validations);

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}>
      {(config) => {
        setRefs(config, fields);
        return (
          <FormFragment
            config={config}
            fields={fields}
            submitText={submitText}
          />
        );
      }}
    </Formik>
  );
}
