import Svg, { Path } from "react-native-svg";

type Props = React.ComponentProps<typeof Svg>;

export default function CheckSvg(props: Props) {
  return (
    <Svg fill="none" viewBox="0 0 14 14" {...props}>
      <Path
        d="M3 8L6 11L11 3.5"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
