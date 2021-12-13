/**
 * @file NoSignal.js
 */
import * as React from 'react';
import PropTypes from 'prop-types';

import styles from './NoSignal.module.css';

import { useLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

class Utils {
  static randomColor() {
    return Math.round(Math.random() * 0xffffff);
  }

  static randomSaturatedColor() {
    let col = Math.round(Math.random() * 0xff);
    return (col << 16) | (col << 8) | col;
  }

  static mulColor(color, factor) {
    let r = (color & 0xff0000) >> 16;
    let g = (color & 0xff00) >> 8;
    let b = color & 0xff;
    r = Math.min(Math.round(r * factor), 0xff);
    g = Math.min(Math.round(g * factor), 0xff);
    b = Math.min(Math.round(b * factor), 0xff);
    return (r << 16) | (g << 8) | b;
  }
}

class Canvas {
  constructor(context) {
    this.canvas = context.canvas;
    this.context = context;
    this.pixelSize = 4;
    this.pixels = [];
    this.onResize();
    this.tick = 0;
    this.lines = [
      { pos: 50, height: 28, speed: 0.281 },
      { pos: 80, height: 16, speed: 1.129 },
    ];
  }

  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.pixels.length = 0;
  }

  start() {}

  update() {
    let pixelWidth = Math.ceil(this.width / this.pixelSize);
    let pixelHeight = Math.ceil(this.height / this.pixelSize);
    let adjacent = 0;
    for (let y = 0; y < pixelHeight; y++) {
      let inLine = this.isInLine(y, pixelHeight);
      for (let x = 0; x < pixelWidth; x++) {
        let index = x + y * pixelWidth;
        let col;
        if (adjacent <= 0) {
          adjacent = 1 + Math.floor(Math.random() * 3);
          col = Utils.randomSaturatedColor();
          col = inLine ? Utils.mulColor(col, 0.55) : Utils.mulColor(col, 0.4);
        } else {
          col = this.pixels[index - 1];
          col = Utils.mulColor(col, 0.8);
        }
        this.pixels[index] = col;

        adjacent--;
      }
    }
    this.updateLines(pixelHeight);
    this.linePos %= pixelHeight;
    this.renderPixels();
  }

  updateLines(pixelHeight) {
    this.lines.forEach(
      line => (line.pos = (line.pos + line.speed) % pixelHeight),
    );
  }

  isInLine(y, pixelHeight) {
    return this.lines.some(
      line =>
        (y >= line.pos && y < line.pos + line.height) ||
        (line.pos + line.height > pixelHeight &&
          y < line.pos - pixelHeight + line.height),
    );
  }

  renderPixels() {
    let pixelWidth = Math.ceil(this.width / this.pixelSize);
    for (let i = 0; i < this.pixels.length; i++) {
      let x = i % pixelWidth;
      let y = Math.floor(i / pixelWidth);
      this.context.fillStyle = '#' + this.pixels[i].toString(16);
      this.context.fillRect(
        x * this.pixelSize,
        y * this.pixelSize,
        this.pixelSize,
        this.pixelSize,
      );
    }
  }
}

const NoSignal = ({
  tagName: Tag = 'canvas',
  className = '',
  variant = 'default',
  children = '',
}) => {
  useLayoutEffect(() => {
    const canvas = new Canvas(
      document.getElementsByTagName('canvas')[0].getContext('2d'),
    );

    canvas.start();

    const tick = () => {
      canvas.update();
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    window.addEventListener('resize', canvas.onResize.bind(canvas));
    return () =>
      window.removeEventListener('resize', canvas.onResize.bind(canvas));
  }, []);

  return (
    <Tag
      className={`${styles.no_signal} ${
        styles[`no_signal__${variant}`]
      } ${className}`}
    />
  );
};

NoSignal.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
};

export default NoSignal;
