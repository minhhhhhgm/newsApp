import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
const SearchNewsIcons = (props : any) => (
    <Svg
        width={17}
        height={18}
        viewBox="0 0 17 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G id="search">
            <Path
                id="Vector"
                d="M7.79167 13.9583C10.9213 13.9583 13.4583 11.4213 13.4583 8.29167C13.4583 5.16205 10.9213 2.625 7.79167 2.625C4.66205 2.625 2.125 5.16205 2.125 8.29167C2.125 11.4213 4.66205 13.9583 7.79167 13.9583Z"
                stroke="#919191"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                id="Vector_2"
                d="M14.875 15.375L11.7938 12.2938"
                stroke="#919191"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </G>
    </Svg>
);
export default SearchNewsIcons;
