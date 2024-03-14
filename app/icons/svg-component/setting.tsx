import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const SettingIconProfile = (props) => (
    <Svg
        width={16}
        height={16}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G id="settings_icons" clipPath="url(#clip0_158_1051)">
            <Path
                id="Vector"
                d="M7.99992 14.6666C11.6818 14.6666 14.6666 11.6819 14.6666 7.99998C14.6666 4.31808 11.6818 1.33331 7.99992 1.33331C4.31802 1.33331 1.33325 4.31808 1.33325 7.99998C1.33325 11.6819 4.31802 14.6666 7.99992 14.6666Z"
                stroke="#180E19"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                id="Vector_2"
                d="M6.06006 6.00001C6.21679 5.55446 6.52616 5.17875 6.93336 4.93944C7.34056 4.70012 7.81932 4.61264 8.28484 4.69249C8.75036 4.77234 9.1726 5.01436 9.47678 5.3757C9.78095 5.73703 9.94743 6.19436 9.94672 6.66668C9.94672 8.00001 7.94673 8.66668 7.94673 8.66668"
                stroke="#180E19"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                id="Vector_3"
                d="M8 11.3333H8.00667"
                stroke="#180E19"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </G>
        <Defs>
            <ClipPath id="clip0_158_1051">
                <Rect width={16} height={16} fill="white" />
            </ClipPath>
        </Defs>
    </Svg>
);
export default SettingIconProfile;
