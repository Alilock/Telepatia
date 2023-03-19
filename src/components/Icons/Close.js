import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgClose = props => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="m4 4 8 8m-8 0 8-8-8 8Z"
      stroke="#ECEBED"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SvgClose;
