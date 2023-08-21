"use client";

import { cn } from "@/lib/utils";

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
      className={cn(
        `shadow rounded-md border-2 border-primary py-4 px-8 flex items-center justify-between gap-4`,
        typeof onClick === "function" && "cursor-pointer",
        className
      )}
      onClick={() => onClick?.()}
      {...props}
    >
      {children}
    </Component>
  );
};
