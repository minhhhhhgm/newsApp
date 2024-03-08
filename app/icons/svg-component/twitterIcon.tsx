import * as React from "react";
import Svg, { Rect, G, Path, Defs, ClipPath } from "react-native-svg";
const TwitterIcon = (props:any) => (
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
    <Rect
      x={1.25}
      y={1}
      width={43}
      height={40}
      rx={5}
      stroke="#180E19"
      strokeWidth={1.5}
    />
    <G clipPath="url(#clip0_87_4196)">
      <Path
        d="M23.25 17.25C23.25 15.1875 24.9844 13.4719 27.0469 13.5C27.7692 13.5083 28.4737 13.7251 29.0757 14.1243C29.6778 14.5234 30.1517 15.0879 30.4406 15.75H33.75L30.7219 18.7781C30.5265 21.8199 29.18 24.6731 26.9561 26.7576C24.7323 28.8421 21.7981 30.0015 18.75 30C15.75 30 15 28.875 15 28.875C15 28.875 18 27.75 19.5 25.5C19.5 25.5 13.5 22.5 15 14.25C15 14.25 18.75 18 23.25 18.75V17.25Z"
        stroke="#180E19"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_87_4196">
        <Rect
          width={24}
          height={24}
          fill="white"
          transform="translate(11.25 9)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
export default TwitterIcon;
