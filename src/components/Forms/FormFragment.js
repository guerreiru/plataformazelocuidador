import React, { Fragment, createRef } from 'react';
import Input from '../Inputs/Input';
import Select from '../Inputs/Select';
import Checkbox from '../Checkbox';
import InputMask from '../Inputs/InputMask';
import SwitchGroup from '../SwitchGroup';
import SubmitButton from './SubmitButton';
import { getFormValidationErrorMessage } from '../../utils/validations';

export default function FormFragment({ config, fields, submitText }) {
  const types = ['checkbox', 'select', 'switchToggle'];
  let inputs = Array(fields.length);
  const arrayIdInclude = [];

  for (let i = 0; i < inputs.length; i++) {
    if (
      !fields[i].content &&
      ((!types.includes(fields[i].type) && fields[i].editable !== false) ||
        (fields[i].mask && fields[i].editable !== false))
    ) {
      arrayIdInclude.push(i);
      inputs[i] = createRef();
    }
  }

  const lastIndex = arrayIdInclude[arrayIdInclude.length - 1];

  const onSubmit = async () => {
    config.validateForm().then((res) => {
      if (Object.keys(res).length === 0) {
        config.handleSubmit();
      } else {
        getFormValidationErrorMessage(config, fields, res);
      }
    });
  };

  const renderField = (field, index) => {
    const { values, handleChange, errors, setFieldTouched, touched } = config;

    const setOnSubmitEditing = () => {
      if (arrayIdInclude.includes(index)) {
        if (lastIndex === index) {
          return onSubmit();
        }
        const _input =
          inputs[
            arrayIdInclude[arrayIdInclude.findIndex((i) => i === index) + 1]
          ];
        if (_input.focus) {
          return _input.focus();
        }
        if (_input.getElement) {
          return _input.getElement().focus();
        }
      }
    };

    if (field.condition && !field.condition(config, fields)) {
      return null;
    }

    if (field.content) {
      return <field.content key={field.key} />;
    }

    if (field.type === 'checkbox') {
      return (
        <Checkbox
          key={field.name}
          name={field.name}
          label={field.label}
          value={values ? values[field.name] : undefined}
          handleChange={handleChange(field.name)}
        />
      );
    }
    if (field.mask) {
      return (
        <InputMask
          {...field}
          value={values ? values[field.name] : undefined}
          handleChange={handleChange(field.name)}
          setFieldTouched={() => setFieldTouched(field.name)}
          key={field.name}
          error={touched[field.name] ? errors[field.name] : null}
          setRef={(input) => {
            if (arrayIdInclude.includes(index)) {
              return (inputs[index] = input);
            }
          }}
          returnKeyType={lastIndex === index ? 'done' : 'next'}
          onSubmitEditing={setOnSubmitEditing}
        />
      );
    }
    if (field.type === 'select') {
      return (
        <Select
          key={field.name}
          name={field.name}
          label={field.label}
          error={touched[field.name] ? errors[field.name] : null}
          value={values ? values[field.name] : undefined}
          handleChange={handleChange(field.name)}
          options={field.options}
          placeholder={field.placeholder}
        />
      );
    }
    if (field.type === 'switchToggle') {
      return (
        <SwitchGroup
          {...field}
          //theme={theme}
          key={field.name}
          value={values[field.name]}
          handleChange={handleChange(field.name)}
          error={touched[field.name] ? errors[field.name] : null}
        />
      );
    }

    return (
      <Input
        {...field}
        key={field.name}
        value={values ? values[field.name] : undefined}
        handleChange={handleChange(field.name)}
        setFieldTouched={() => setFieldTouched(field.name)}
        blurOnSubmit={false}
        error={touched[field.name] ? errors[field.name] : null}
        setRef={(input) => {
          if (arrayIdInclude.includes(index)) {
            return (inputs[index] = input);
          }
        }}
        returnKeyType={lastIndex === index ? 'done' : 'next'}
        onSubmitEditing={setOnSubmitEditing}
      />
    );
  };

  return (
    <Fragment>
      {fields.map((f, index) => renderField(f, index))}
      {!!submitText && (
        <SubmitButton submitText={submitText} config={config} fields={fields} />
      )}
    </Fragment>
  );
}
