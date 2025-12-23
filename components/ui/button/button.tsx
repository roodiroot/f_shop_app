import cn from "clsx";

import { PropsWithChildren } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  variant?: "default" | "big";
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  variant = "default",
  className,
  children,
  ...props
}) => {
  const variantClasses = {
    default: {
      container: "px-4 py-3",
      text: "text-base",
    },
    big: {
      container: "px-6 py-4",
      text: "text-lg",
    },
  };

  return (
    <TouchableOpacity
      className={cn(
        "flex-row justify-center rounded-lg bg-neutral-800 shadow-sm w-full",
        variantClasses[variant].container,
        props.disabled && "bg-neutral-400",
        className
      )}
      {...props}
    >
      <Text
        className={cn(
          "text-base font-semibold text-white mx-auto",
          variantClasses[variant].text
        )}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
