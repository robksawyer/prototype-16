/**
 * WaveTextCSS.jsx
 */
 import * as React from 'react';

 // Component(s)
 import WaveTextCSS from './WaveTextCSS';

 export default {
   title: 'WaveTextCSS',
   component: WaveTextCSS,
   // Sets the layout parameter component wide.
   parameters: {
     layout: 'centered',
   },
 };

 export const Default = () => <WaveTextCSS />;

 Default.storyName = 'default';
