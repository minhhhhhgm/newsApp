import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
const BackIcon = (props : any) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G id="chevron">
      <Path
        id="Vector"
        d="M15 18L9 12L15 6"
        stroke="#180E19"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);
export default BackIcon;
