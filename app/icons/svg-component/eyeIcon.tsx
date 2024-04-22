import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const EyeIcon = (props: any) => (
  <Svg
    width={props.width ? props.width : 16}
    height={props.height ? props.height : 16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G id="eye" clipPath="url(#clip0_17_359)">
      <Path
        id="Vector"
        d="M0.666664 8C0.666664 8 3.33333 2.66667 8 2.66667C12.6667 2.66667 15.3333 8 15.3333 8C15.3333 8 12.6667 13.3333 8 13.3333C3.33333 13.3333 0.666664 8 0.666664 8Z"
        stroke={props.stroke ? props.stroke : "#180E19"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        id="Vector_2"
        d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
        stroke={props.stroke ? props.stroke : "#180E19"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_17_359">
        <Rect width={16} height={16} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default EyeIcon;
