import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgLike = props => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M9.333 6.667h3.176a1.333 1.333 0 0 1 1.193 1.929l-2.333 4.667a1.333 1.333 0 0 1-1.194.737H7.497c-.108 0-.217-.013-.323-.04l-2.507-.627m4.666-6.666V3.333A1.333 1.333 0 0 0 8 2h-.063a.603.603 0 0 0-.604.603c0 .476-.14.942-.405 1.338L4.667 7.333v6m4.666-6.666H8m-3.333 6.666H3.333A1.333 1.333 0 0 1 2 12V8a1.333 1.333 0 0 1 1.333-1.333H5"
      stroke="#ECEBED"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SvgLike;
