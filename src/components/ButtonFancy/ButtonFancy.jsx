/**
 * @file ButtonFancy.js
 */
import * as React from 'react';
import PropTypes from 'prop-types';

import styles from './ButtonFancy.module.scss';

const ButtonFancy = ({
  tagName: Tag = 'div',
  className = 'text-2xl',
  variant = 'default',
  children = '',
}) => {
  const btn = React.useRef();

  React.useEffect(() => {
    const handleMouseMove = ({ offsetX, offsetY }) => {
      let x = 1 - (_btn.clientWidth - offsetX) / _btn.clientWidth;
      let y = 1 - (_btn.clientHeight - offsetY) / _btn.clientHeight;
      _btn.style.setProperty('--perX', (x * 100).toFixed(2) + '%');
      _btn.style.setProperty('--perY', (y * 100).toFixed(2) + '%');
    };

    const _btn = btn.current;

    _btn.addEventListener('mousemove', handleMouseMove);

    return () => _btn.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Tag className={`${className}`}>
      <a ref={btn} href="#!" className={`${styles.button_fancy}`}>
        {children}
      </a>
    </Tag>
  );
};

ButtonFancy.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
};

export default ButtonFancy;
