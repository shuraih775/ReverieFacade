import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    width={42}
    height={42}
    viewBox="0 0 41 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.5 41C31.8218 41 41 31.8218 41 20.5C41 9.17816 31.8218 0 20.5 0C9.17816 0 0 9.17816 0 20.5C0 31.8218 9.17816 41 20.5 41ZM19.9721 28.7915L31.3609 15.1248L27.8613 12.2084L18.0692 23.9589L12.9995 18.8893L9.77826 22.1106L16.6116 28.9439L18.3753 30.7076L19.9721 28.7915Z"
      fill="#222222"
    />
  </Svg>
);
export default SVGComponent;
