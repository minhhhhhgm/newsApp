import * as React from "react";
import Svg, { G, Path, Rect, Defs, ClipPath } from "react-native-svg";
const GoogleIcon = (props) => (
  <Svg
  style ={{
    marginRight : 20
  }}
    width={45}
    height={42}
    viewBox="0 0 45 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_87_4194)">
      <Path
        d="M21.75 21H30C30.002 22.9112 29.3411 24.764 28.13 26.2425C26.9188 27.721 25.2324 28.7338 23.3582 29.1081C21.484 29.4824 19.5379 29.1951 17.8518 28.2952C16.1657 27.3953 14.8438 25.9385 14.1115 24.1731C13.3793 22.4077 13.2819 20.443 13.8361 18.6139C14.3902 16.7847 15.5616 15.2044 17.1505 14.1422C18.7394 13.08 20.6475 12.6018 22.5496 12.789C24.4516 12.9762 26.2299 13.8172 27.5813 15.1687"
        stroke="#180E19"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Rect
      x={0.75}
      y={1}
      width={43}
      height={40}
      rx={5}
      stroke="#180E19"
      strokeWidth={1.5}
    />
    <Defs>
      <ClipPath id="clip0_87_4194">
        <Rect
          width={24}
          height={24}
          fill="white"
          transform="translate(9.75 9)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
export default GoogleIcon;
