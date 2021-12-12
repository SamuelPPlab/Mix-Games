import React from 'react';
import PropTypes from 'prop-types';

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

Button.propTypes = {
  name: PropTypes.any.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default Button;
