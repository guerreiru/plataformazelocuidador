import React, { useState, useEffect } from 'react';
import SwitchGroup from '../SwitchGroup';

export default function CheckAll({ label, fields, values, handleChange }) {
  const checkStatus = () => {
    for (const field of fields) {
      if (values[field] === 'false') {
        return false;
      }
    }
    return true;
  };

  const [check, setCheck] = useState(false);

  useEffect(() => {
    const status = checkStatus();
    setCheck(status);
  }, [values]);

  return (
    <SwitchGroup
      label={label}
      value={check + ''}
      handleChange={() => {
        const status = !check;
        fields.forEach((field) => {
          handleChange(field)(status + '');
        });
        setCheck(status);
      }}
    />
  );
}
