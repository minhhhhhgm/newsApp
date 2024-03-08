import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
const BookMarkIcon = (props : any) => (
  <Svg
    width={21}
    height={20}
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G id="bookmark_selected">
      <Path
        id="Vector"
        d="M16.1667 17.5L10.3333 13.3333L4.5 17.5V4.16667C4.5 3.72464 4.67559 3.30072 4.98816 2.98816C5.30072 2.67559 5.72464 2.5 6.16667 2.5H14.5C14.942 2.5 15.366 2.67559 15.6785 2.98816C15.9911 3.30072 16.1667 3.72464 16.1667 4.16667V17.5Z"
        fill={props.fill}
        stroke="#180E19"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);
export default BookMarkIcon;
