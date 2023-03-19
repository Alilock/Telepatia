import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgImage = props => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="m3.333 13.333 3.822-3.821a1.667 1.667 0 0 1 2.357 0l3.821 3.821m-1.666-1.666 1.321-1.322a1.667 1.667 0 0 1 2.357 0l1.322 1.322m-5-5h.008M5 16.667h10A1.667 1.667 0 0 0 16.667 15V5A1.667 1.667 0 0 0 15 3.333H5A1.667 1.667 0 0 0 3.333 5v10A1.667 1.667 0 0 0 5 16.667Z"
      stroke="#fff"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SvgImage;
