import * as React from "react";
import Svg, { Rect, G, Path, Defs, ClipPath } from "react-native-svg";
const AppleIcon = (props) => (
  <Svg
    width={45}
    height={42}
    viewBox="0 0 45 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect
      x={1}
      y={1}
      width={43}
      height={40}
      rx={5}
      stroke="#180E19"
      strokeWidth={1.5}
    />
    <G clipPath="url(#clip0_87_4197)">
      <Path
        d="M23.9469 12.0469C24.165 11.4806 24.5496 10.9938 25.0501 10.6507C25.5505 10.3076 26.1432 10.1243 26.75 10.125"
        stroke="#180E19"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M31.4844 24.2719C30.3031 27.1594 28.1656 29.25 26.375 29.25H19.625C17 29.25 13.625 24.75 13.625 19.875C13.6254 18.7893 13.94 17.7269 14.5308 16.8161C15.1216 15.9052 15.9633 15.1847 16.9545 14.7417C17.9457 14.2986 19.0439 14.1519 20.1166 14.3192C21.1894 14.4864 22.1908 14.9606 23 15.6844V15.6844C23.5728 15.1712 24.2448 14.7809 24.9743 14.5377C25.7039 14.2945 26.4756 14.2034 27.2418 14.2702C28.008 14.337 28.7523 14.5601 29.4288 14.9259C30.1053 15.2917 30.6996 15.7923 31.175 16.3969V16.3969C30.486 16.8129 29.9211 17.4062 29.5394 18.1148C29.1576 18.8234 28.9729 19.6214 29.0045 20.4257C29.0361 21.23 29.2829 22.0111 29.719 22.6876C30.1552 23.364 30.7648 23.9112 31.4844 24.2719V24.2719Z"
        stroke="#180E19"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_87_4197">
        <Rect width={24} height={24} fill="white" transform="translate(11 9)" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default AppleIcon;
