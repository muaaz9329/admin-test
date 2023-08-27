"use client";

import { useI18n, useScopedI18n } from "@/internationalization/client";

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
  onContent?: () => void;
};

export const ActionsDropdown = (props: ActionsDropdownProps) => {
  const t = useI18n();

  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger>
        <MoreVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-primary">
        {props.onApprove && (
          <DropdownMenuItem onClick={props.onApprove}>
            {t("actions.approve")}
          </DropdownMenuItem>
        )}
        {props.onContent && (
          <DropdownMenuItem onClick={props.onContent}>
            {t("words.content")}
          </DropdownMenuItem>
        )}
        {props.onEdit && (
          <DropdownMenuItem onClick={props.onEdit}>
            {t("actions.edit")}
          </DropdownMenuItem>
        )}
        {props.onDelete && (
          <DropdownMenuItem onClick={props.onDelete}>
            {t("actions.delete")}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
