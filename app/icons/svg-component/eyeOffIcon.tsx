import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const EyeOffIcon = (props : any) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G id="eye-off" clipPath="url(#clip0_17_496)">
      <Path
        id="Vector"
        d="M9.41335 9.41334C9.23025 9.60984 9.00945 9.76744 8.76412 9.87675C8.51879 9.98607 8.25395 10.0448 7.98541 10.0496C7.71687 10.0543 7.45013 10.0049 7.20109 9.90433C6.95206 9.80374 6.72583 9.65403 6.53592 9.46411C6.346 9.27419 6.19628 9.04797 6.09569 8.79893C5.9951 8.5499 5.9457 8.28315 5.95044 8.01461C5.95518 7.74607 6.01396 7.48124 6.12327 7.2359C6.23258 6.99057 6.39019 6.76977 6.58669 6.58667M11.96 11.96C10.8204 12.8287 9.43276 13.3099 8.00002 13.3333C3.33335 13.3333 0.666687 8.00001 0.666687 8.00001C1.49595 6.4546 2.64611 5.10441 4.04002 4.04001L11.96 11.96ZM6.60002 2.82667C7.05891 2.71926 7.52873 2.66557 8.00002 2.66667C12.6667 2.66667 15.3334 8.00001 15.3334 8.00001C14.9287 8.75708 14.4461 9.46983 13.8934 10.1267L6.60002 2.82667Z"
        stroke="#180E19"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        id="Vector_2"
        d="M0.666687 0.666672L15.3334 15.3333"
        stroke="#180E19"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_17_496">
        <Rect width={16} height={16} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default EyeOffIcon;
