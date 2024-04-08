import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
const InterRestIcon = (props) => (
    <Svg
        width={16}
        height={16}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G id="star">
            <Path
                id="Vector"
                d="M7.99992 1.33331L10.0599 5.50665L14.6666 6.17998L11.3333 9.42665L12.1199 14.0133L7.99992 11.8466L3.87992 14.0133L4.66659 9.42665L1.33325 6.17998L5.93992 5.50665L7.99992 1.33331Z"
                stroke="#180E19"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </G>
    </Svg>
);
export default InterRestIcon;
