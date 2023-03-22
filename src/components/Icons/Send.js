import * as React from 'react';
import Svg, {Rect, Path, Defs, LinearGradient, Stop} from 'react-native-svg';
const SvgSend = props => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect width={32} height={32} rx={16} fill="url(#send_svg__a)" />
    <Path
      d="M16 21.833v-6.666m0 6.666 7.5 1.667-7.5-15-7.5 15 7.5-1.667Z"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Defs>
      <LinearGradient
        id="send_svg__a"
        x1={0}
        y1={16}
        x2={32.908}
        y2={16}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F72E8E" />
        <Stop offset={1} stopColor="#AC1AF0" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SvgSend;
