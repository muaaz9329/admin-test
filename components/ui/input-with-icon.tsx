import { Input, InputProps } from "./input";

type InputWithIconProps = {
  icon: React.ComponentElement<any, any>;
  className?: string;
} & InputProps;

export const InputWithIcon = ({
  icon,
  className,
  ...props
}: InputWithIconProps) => {
  return (
    <div className="relative">
      <Input {...props} className={"w-full h-full pr-12 " + className} />
      <span
        className="
        absolute top-0 bottom-0 flex items-center justify-center px-4 text-placeholder
      "
      >
        {icon}
      </span>
    </div>
  );
};
