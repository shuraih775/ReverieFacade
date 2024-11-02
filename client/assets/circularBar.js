import React from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const ConcentricCircularProgress = ({ size = 100, strokeWidth = 15, progress1 = 50, progress2 = 75 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  
  
  return (
    <View style={{ width: size, height: size }}>
      <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Outer Circle */}
        <Circle
          stroke="#ABCACF"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke="#0A1366"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference  * .95}
          strokeDashoffset={ (circumference - (circumference * progress1) / 100)}
          strokeLinecap="round"
        />
        {/* Inner Circle */}
        <Circle
          stroke="#ABCACF"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius - 20}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke="#2B303C"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius - 20}
          strokeWidth={strokeWidth}
          strokeDasharray={(circumference - 80) * .95}
          strokeDashoffset={(circumference - (circumference * progress2) / 100)}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
};

export default ConcentricCircularProgress;
