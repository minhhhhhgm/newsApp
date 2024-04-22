import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
const GmailIcon = (props : any) => (
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
      x={1}
      y={1}
      width={43}
      height={40}
      rx={5}
      stroke={props.stroke ? props.stroke : "#180E19"}
      strokeWidth={1.5}
    />
    <Path
      d="M13.3334 12.3333H30.6667C31.8584 12.3333 32.8334 13.3083 32.8334 14.5V27.5C32.8334 28.6917 31.8584 29.6667 30.6667 29.6667H13.3334C12.1417 29.6667 11.1667 28.6917 11.1667 27.5V14.5C11.1667 13.3083 12.1417 12.3333 13.3334 12.3333Z"
      stroke={props.stroke ? props.stroke : "#180E19"}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M32.8334 14.5L22 22.0833L11.1667 14.5"
      stroke={props.stroke ? props.stroke : "#180E19"}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default GmailIcon;
