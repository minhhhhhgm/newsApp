import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
const SearchIcons = (props:any) => (
  <Svg
    width={21}
    height={20}
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G id="search_selected">
      <Path
        id="Vector"
        d="M9.66663 17C14.0849 17 17.6666 13.4183 17.6666 9C17.6666 4.58172 14.0849 1 9.66663 1C5.24835 1 1.66663 4.58172 1.66663 9C1.66663 13.4183 5.24835 17 9.66663 17Z"
        fill={props.fill}
        stroke="#180E19"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        id="Vector_2"
        d="M19.6667 19L15.3167 14.65"
        stroke="#180E19"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);
export default SearchIcons;
