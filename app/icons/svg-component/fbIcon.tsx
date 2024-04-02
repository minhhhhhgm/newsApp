import * as React from "react";
import Svg, { Rect, G, Path, Defs, ClipPath } from "react-native-svg";
const FbIcon = (props) => (
  <Svg
  style ={{
    marginRight : 20
  }}
    width={46}
    height={42}
    viewBox="0 0 46 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect
      x={1.5}
      y={1}
      width={43}
      height={40}
      rx={5}
      stroke="#180E19"
      strokeWidth={1.5}
    />
    <G clipPath="url(#clip0_87_4195)">
      <Path
        d="M28.4265 12H26.2206C25.7856 11.9982 25.3545 12.0825 24.9522 12.2482C24.5499 12.4138 24.1845 12.6575 23.8768 12.9651C23.5692 13.2727 23.3256 13.6382 23.1599 14.0405C22.9943 14.4427 22.9099 14.8738 22.9118 15.3088V30.75"
        stroke="#180E19"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.5 19.7206H27.3235"
        stroke="#180E19"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_87_4195">
        <Rect
          width={24}
          height={24}
          fill="white"
          transform="translate(11.5 9)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
export default FbIcon;
