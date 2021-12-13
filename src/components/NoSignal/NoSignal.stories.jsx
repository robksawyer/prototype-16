/**
 * NoSignal.jsx
 */
 import * as React from 'react';

 // Component(s)
 import NoSignal from './NoSignal';

 export default {
   title: 'NoSignal',
   component: NoSignal,
   // Sets the layout parameter component wide.
   parameters: {
     layout: 'centered',
   },
 };

 export const Default = () => <NoSignal />;

 Default.storyName = 'default';
