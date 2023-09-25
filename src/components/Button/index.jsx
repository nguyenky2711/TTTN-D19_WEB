import React, { useEffect } from 'react';

import './styles.scss';
import { useNavigate } from 'react-router-dom';

const Button = ({
  className=null,
  name,
  IconBtnMui,
  onClick,
  bwidth,
  bheight,
  fz,
  children,
  outline,
  bg = {},
  color,
  disabled=null,
  padding,
  borderColor,
  cursorValue,
}) => {
  return (
    <>
      <button
        className={`button ${className ? className : ''} ${
          disabled ? 'disabled' : ''
        }`}
        onClick={onClick}
        style={{
          width: bwidth ? `${bwidth}` : '',
          height: bheight ? `${bheight}` : '',
          fontSize: fz ? fz : '',
          outline: outline ? outline : '',
          backgroundColor: bg ? bg : '',
          color: color,
          padding: padding ? padding : '',
          border: borderColor
            ? `1px solid ${borderColor}`
            : '1px solid $color-default',
          cursor: cursorValue ? cursorValue : 'pointer',
        }}
        type='submit'
      >
        {IconBtnMui ? <IconBtnMui className='button__icon' /> : null}
        <p>{name}</p>
        {children}
      </button>
    </>
  );
};

export default Button;
