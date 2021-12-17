import React from 'react';

const Button = ({ name = null, disabled = false, id, onClick, style = null, className = null }) => (
  <button
    type="button"
    id={id}
    disabled={disabled}
    data-testid={id}
    onClick={onClick}
    style={style}
    className={className}
  >
    {name}
  </button>
);

Button.defaultProps = { name: null, disabled: false };

export default Button;
