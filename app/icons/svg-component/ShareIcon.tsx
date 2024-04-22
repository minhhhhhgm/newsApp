import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
const ShareIcon = (props : any) => (
    <Svg
        width={props.width ?props.width :16}
        height={props.height ?props.height :16}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G id="share">
            <Path
                id="Vector"
                d="M2.66666 8V13.3333C2.66666 13.687 2.80713 14.0261 3.05718 14.2761C3.30723 14.5262 3.64637 14.6667 3.99999 14.6667H12C12.3536 14.6667 12.6927 14.5262 12.9428 14.2761C13.1928 14.0261 13.3333 13.687 13.3333 13.3333V8"
                stroke={props.stroke ? props.stroke : "#180E19"}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                id="Vector_2"
                d="M10.6667 4.00004L8.00001 1.33337L5.33334 4.00004"
                stroke={props.stroke ? props.stroke : "#180E19"}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                id="Vector_3"
                d="M8 1.33337V10"
                stroke={props.stroke ? props.stroke : "#180E19"}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </G>
    </Svg>
);
export default ShareIcon;
