"use client";

import { useI18n } from "@/internationalization/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";

type ConfirmationDialogProps = {
  isOpen: boolean;
  onClose: () => void;

  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "success";
};

export function ConfirmationDialog({
  isOpen,
  onClose,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  variant = "danger",
}: ConfirmationDialogProps) {
  const t = useI18n();

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent dir="rtl">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title || t("messages.areYouSure")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description || t("messages.cantUndo")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {cancelText || t("actions.cancel")}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {confirmText || t("actions.confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
