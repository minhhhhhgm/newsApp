import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
const LogOutIcon = (props) => (
    <Svg
        width={16}
        height={16}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G id="logout">
            <Path
                id="Vector"
                d="M10 2H12.6667C13.0203 2 13.3594 2.14048 13.6095 2.39052C13.8595 2.64057 14 2.97971 14 3.33333V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H10"
                stroke="#180E19"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                id="Vector_2"
                d="M6.66675 11.3334L10.0001 8.00002L6.66675 4.66669"
                stroke="#180E19"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                id="Vector_3"
                d="M10 8H2"
                stroke="#180E19"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </G>
    </Svg>
);
export default LogOutIcon;