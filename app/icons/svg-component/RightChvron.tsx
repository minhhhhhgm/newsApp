import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
const RightChvron = (props :any) => (
    <Svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G id="chevron">
            <Path
                id="Vector"
                d="M7.5 15L12.5 10L7.5 5"
                stroke={props.stroke ? props.stroke : "#919191"}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </G>
    </Svg>
);
export default RightChvron;
