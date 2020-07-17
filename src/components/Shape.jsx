import React from 'react';

const Shape = ({ feature, pathGenerator }) =>
  <path
    className='shape'
    d={pathGenerator(feature)}
    fill={`${feature.properties.fill}`}
    stroke={`${feature.properties.color}`}
    strokeWidth={`${feature.properties.lineWidth}`}
  />;

export default Shape;
