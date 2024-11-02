import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    width={100}
    height={100}
    viewBox="0 0 180 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M48.7686 52.3139C50.8869 31.1312 68.7117 15 90 15C111.288 15 129.113 31.1312 131.231 52.3139L133.381 73.81C133.512 75.1172 133.577 75.7708 133.655 76.4141C134.737 85.288 137.788 93.8081 142.585 101.352C142.932 101.898 143.297 102.445 144.025 103.538L150.484 113.226C156.381 122.072 159.33 126.495 158.036 130.059C157.791 130.733 157.451 131.369 157.026 131.946C154.778 135 149.462 135 138.831 135H41.1692C30.5376 135 25.2218 135 22.9738 131.946C22.5488 131.369 22.2087 130.733 21.9641 130.059C20.67 126.495 23.6187 122.072 29.5161 113.226L35.9746 103.538C36.7033 102.445 37.0677 101.898 37.4155 101.352C42.2124 93.8081 45.2631 85.288 46.3445 76.4141C46.4229 75.7708 46.4883 75.1172 46.619 73.81L48.7686 52.3139Z"
      fill="#222222"
    />
    <Path
      d="M75.5111 154.721C76.3657 155.518 78.2489 156.223 80.8686 156.725C83.4882 157.228 86.698 157.5 90 157.5C93.302 157.5 96.5118 157.228 99.1314 156.725C101.751 156.223 103.634 155.518 104.489 154.721"
      stroke="#222222"
      strokeWidth={15}
      strokeLinecap="round"
    />
  </Svg>
);
export default SVGComponent;