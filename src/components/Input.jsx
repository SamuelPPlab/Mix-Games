import React from 'react';
import PropTypes from 'prop-types';
import '../css/styles.css';

const Input = ({ fieldValue = null, id, className = null, placeholderClass, placeholder = '', step = null,
  setFieldValue = null, type = 'text', readOnly = false, style = null }) => {

  const inputProps = {
    value: fieldValue,
    id,
    onChange: ({ target: { value } }) => setFieldValue(value),
    type: type,
    readOnly: readOnly,
    className,
    step,
    autocomplete: 'off',
  };
console.log(placeholderClass)
  return (
    <label style={style} htmlFor={id}>
      <input {...inputProps} />
      <span className={placeholderClass}>{placeholder}</span>
    </label>
  );
};

Input.defaultProps = { type: 'text', setFieldValue: null, readOnly: false, fieldValue: null, checked: null };

Input.propTypes = {
  name: PropTypes.string.isRequired,
  setField: PropTypes.func,
  type: PropTypes.string,
  readOnly: PropTypes.bool,
};

export default Input;
