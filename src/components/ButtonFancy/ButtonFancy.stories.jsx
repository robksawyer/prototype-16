/**
 * ButtonFancy.jsx
 */
 import * as React from 'react';

 // Component(s)
 import ButtonFancy from './ButtonFancy';

 export default {
   title: 'ButtonFancy',
   component: ButtonFancy,
   // Sets the layout parameter component wide.
   parameters: {
     layout: 'centered',
   },
 };

 export const Default = () => <ButtonFancy />;

 Default.storyName = 'default';
