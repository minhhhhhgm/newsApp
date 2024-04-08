import * as React from "react";
import Svg, { Line } from "react-native-svg";
const LineIcon = (props : any) => (
  <Svg
  style={{
    marginTop : 10
  }}
    width={96}
    height={2}
    viewBox="0 0 96 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Line y1={1} x2={96} y2={1} stroke="black" />
  </Svg>
);
export default LineIcon;