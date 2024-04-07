import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const CancelIcon = (props : any) => (
    <Svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G id="cancel" clipPath="url(#clip0_67_1944)">
            <Path
                id="Vector"
                d="M10 18.3334C14.6024 18.3334 18.3334 14.6024 18.3334 10C18.3334 5.39765 14.6024 1.66669 10 1.66669C5.39765 1.66669 1.66669 5.39765 1.66669 10C1.66669 14.6024 5.39765 18.3334 10 18.3334Z"
                stroke={props.stroke}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                id="Vector_2"
                d="M12.5 7.5L7.5 12.5"
                stroke={props.stroke}
                // stroke="#919191"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                id="Vector_3"
                d="M7.5 7.5L12.5 12.5"
                stroke={props.stroke}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </G>
        <Defs>
            <ClipPath id="clip0_67_1944">
                <Rect width={20} height={20} fill="white" />
            </ClipPath>
        </Defs>
    </Svg>
);
export default CancelIcon;
