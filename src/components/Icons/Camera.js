import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgCamera = props => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M2.5 7.5a1.667 1.667 0 0 1 1.667-1.667h.775a1.667 1.667 0 0 0 1.386-.741l.677-1.017a1.667 1.667 0 0 1 1.387-.742h3.216a1.666 1.666 0 0 1 1.387.742l.677 1.017a1.666 1.666 0 0 0 1.386.741h.775A1.666 1.666 0 0 1 17.5 7.5V15a1.666 1.666 0 0 1-1.667 1.667H4.167A1.667 1.667 0 0 1 2.5 15V7.5Z"
      stroke="#fff"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.5 10.833a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0v0Z"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SvgCamera;
