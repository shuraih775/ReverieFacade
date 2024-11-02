import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 43 43"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M35.2095 11.9825L25.0894 4.90198C22.331 2.96932 18.0967 3.07473 15.4437 5.13038L6.6413 12.0001C4.88434 13.3705 3.49634 16.1817 3.49634 18.3955V30.5185C3.49634 34.9988 7.13325 38.6532 11.6135 38.6532H30.5536C35.0338 38.6532 38.6707 35.0163 38.6707 30.5361V18.6239C38.6707 16.252 37.1422 13.3354 35.2095 11.9825ZM22.4013 31.6254C22.4013 32.3457 21.8039 32.9431 21.0835 32.9431C20.3632 32.9431 19.7658 32.3457 19.7658 31.6254V26.3545C19.7658 25.6341 20.3632 25.0368 21.0835 25.0368C21.8039 25.0368 22.4013 25.6341 22.4013 26.3545V31.6254Z"
      fill="white"
    />
  </Svg>
);
export default SVGComponent;