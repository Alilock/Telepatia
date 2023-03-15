import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const SvgSearch = props => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM2 8a6 6 0 1 1 10.89 3.476l4.817 4.817a1 1 0 0 1-1.414 1.414l-4.816-4.816A6 6 0 0 1 2 8Z"
      // stroke="#fff"
      // strokeWidth={2}

      fillRule="evenodd"
      clipRule="evenodd"
    // fill="#fff"
    />
  </Svg>
);
export default SvgSearch;
