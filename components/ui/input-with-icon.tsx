import React from "react";
import { Input } from "./input";

export interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ComponentElement<any, any>;
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ icon, className, ...props }, ref) => {
    return (
      <div className="relative">
        <Input
          {...props}
          className={"w-full h-full pr-12 " + className}
          ref={ref}
        />
        <span
          className="
        absolute top-0 bottom-0 flex items-center justify-center px-4 text-placeholder
      "
        >
          {icon}
        </span>
      </div>
    );
  }
);
InputWithIcon.displayName = "InputWithIcon";

export { InputWithIcon };
