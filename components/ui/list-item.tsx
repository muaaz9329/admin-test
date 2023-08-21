"use client";

type ListItemProps = {
  children: React.ReactNode;
  className?: string;
  as?: string;
  onClick?: () => void;
};

export const ListItem: React.FC<ListItemProps> = ({
  children,
  className,
  as: Component = "li",
  onClick = undefined,
  ...props
}) => {
  return (
    // @ts-ignore
    <Component
      className={`rounded-md border-2 border-primary py-4 px-8 flex items-center justify-between ${className}`}
      onClick={() => onClick?.()}
      {...props}
    >
      {children}
    </Component>
  );
};
