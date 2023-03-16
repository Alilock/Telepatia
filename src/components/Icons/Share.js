import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgShare = props => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M2.667 10.667v.666a2 2 0 0 0 2 2h6.666a2 2 0 0 0 2-2v-.666m-2.666-5.334L8 2.667m0 0L5.333 5.333M8 2.667v8"
      stroke="#ECEBED"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SvgShare;
