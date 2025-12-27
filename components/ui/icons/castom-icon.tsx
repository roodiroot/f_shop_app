import { icons } from "./icons";

type IconName = keyof typeof icons;

type CastomIconProps = {
  name: IconName;
  size?: number;
  color?: string;
};

const CastomIcon = ({ name, size = 30, color = "#000" }: CastomIconProps) => {
  const Icon = icons[name];
  if (!Icon) return null;

  return <Icon width={size} height={size} color={color} />;
};

export default CastomIcon;
