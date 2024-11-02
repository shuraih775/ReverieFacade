import * as React from "react";
import Svg, { Rect } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    width={42}
    height={42}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect x={12} y={10} width={8} height={28} rx={2} fill="#222222" />
    <Rect x={28} y={10} width={8} height={28} rx={2} fill="#222222" />
  </Svg>
);
export default SVGComponent;
