import React from 'react';

const Shape = ({ feature, pathGenerator }) =>
   <path
    className='shape'
    d={pathGenerator(feature)}
    fill='none'
    stroke={`${feature.properties.color}`}
    strokeWidth={`${feature.properties.lineWidth}`} />;

export default Shape;
