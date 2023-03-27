import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgMessage = props => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="m2.5 6.667 6.575 4.383a1.667 1.667 0 0 0 1.85 0L17.5 6.667M4.167 15.833h11.666a1.667 1.667 0 0 0 1.667-1.666V5.833a1.667 1.667 0 0 0-1.667-1.666H4.167A1.667 1.667 0 0 0 2.5 5.833v8.334a1.667 1.667 0 0 0 1.667 1.666Z"
      stroke="#ECEBED"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SvgMessage;
