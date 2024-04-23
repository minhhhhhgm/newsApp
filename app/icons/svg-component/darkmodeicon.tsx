import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import { COLOR } from "../../utils/color";
const DarkModeicon = (props: any) => (
    <Svg
        width={16}
        height={16}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G id="darkmode">
            <Path
                id="Vector"
                d="M13.8849 8.75506C13.7801 9.88986 13.3542 10.9713 12.6571 11.8729C11.96 12.7745 11.0206 13.4589 9.94875 13.8461C8.87689 14.2333 7.71693 14.3071 6.60461 14.0591C5.49229 13.8111 4.47361 13.2514 3.66776 12.4456C2.86192 11.6397 2.30224 10.621 2.05422 9.50873C1.80619 8.3964 1.88009 7.23645 2.26725 6.16459C2.65441 5.09273 3.33883 4.1533 4.24042 3.45623C5.14201 2.75915 6.22347 2.33326 7.35828 2.22839C6.69389 3.12724 6.37418 4.23469 6.4573 5.34934C6.54042 6.46398 7.02085 7.51177 7.81121 8.30213C8.60157 9.09249 9.64936 9.57292 10.764 9.65604C11.8786 9.73916 12.9861 9.41945 13.8849 8.75506V8.75506Z"
                stroke={props.darkMode ? COLOR.white : `#180E19`}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </G>
    </Svg>
);
export default DarkModeicon;
