/**
 * @file WaveTextCSS.js
 */
import * as React from 'react';
import PropTypes from 'prop-types';

import styles from './WaveTextCSS.module.scss';

const WaveTextCSS = ({
  tagName: Tag = 'div',
  className = 'absolute flex items-center justify-center w-screen h-screen text-2xl text-white',
  variant = 'default',
  children = '',
}) => {
  return (
    <Tag className={`${className}`}>
      <div className={`${styles.waving} `}>
        <span>l</span>
        <span>o</span>
        <span>a</span>
        <span>d</span>
        <span>i</span>
        <span>n</span>
        <span>g</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    </Tag>
  );
};

WaveTextCSS.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
};

export default WaveTextCSS;
