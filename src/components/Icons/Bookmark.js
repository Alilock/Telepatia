import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgBookmark = props => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M4.655 2.988a1.667 1.667 0 0 0-.488 1.179V17.5L10 14.583l5.833 2.917V4.167A1.667 1.667 0 0 0 14.167 2.5H5.833c-.442 0-.866.176-1.178.488Z"
      stroke="#ECEBED"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SvgBookmark;
