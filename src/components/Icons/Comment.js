import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgComment = props => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M5.333 8h.007M8 8h.007m2.66 0h.006M14 8c0 2.945-2.687 5.333-6 5.333a6.576 6.576 0 0 1-2.837-.632L2 13.333l.93-2.48A4.89 4.89 0 0 1 2 8c0-2.945 2.687-5.333 6-5.333S14 5.055 14 8Z"
      stroke="#ECEBED"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SvgComment;
