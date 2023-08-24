"use client";

import { useScopedI18n } from "@/internationalization/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

type ActionsDropdownProps = {
  onEdit?: () => void;
  onDelete?: () => void;
  onApprove?: () => void;
};

export const ActionsDropdown = (props: ActionsDropdownProps) => {
  const t = useScopedI18n("actions");

  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger>
        <MoreVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-primary">
      {
          props.onApprove &&(
            <DropdownMenuItem onClick={props.onApprove}>
            {t("approve")}
          </DropdownMenuItem>
          )
        }
        {props.onEdit && (
          <DropdownMenuItem onClick={props.onEdit}>
            {t("edit")}
          </DropdownMenuItem>
        )}
        {props.onDelete && (
          <DropdownMenuItem onClick={props.onDelete}>
            {t("delete")}
          </DropdownMenuItem>
        )}
        
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
