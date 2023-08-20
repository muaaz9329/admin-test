"use client";

import React, { useId } from "react";
import Image from "next/image";
import { useI18n } from "@/internationalization/client";
import {
  DEFAULT_ACCEPTED_IMAGE_TYPES,
  DEFAULT_ACCEPTED_VIDEO_TYPES,
} from "@/constants/general-schemas";

export interface FileInputBoxProps {
  fileType: "image" | "video";
  acceptedTypes?: string[];
  value: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileInputBox = React.forwardRef<
  HTMLInputElement,
  FileInputBoxProps
>(({ fileType, acceptedTypes, ...fieldProps }, ref) => {
  const id = useId();
  const t = useI18n();

  return (
    <label htmlFor={id}>
      <div className="space-y-2">
        <div className="h-48 w-72 rounded-md border-primary border-2 flex items-center justify-center">
          {(!fieldProps.value || !fieldProps.value.name) && (
            <span className="text-placeholder font-medium text-md">
              + {fileType === "image" ? t("words.image") : t("words.video")}
            </span>
          )}

          {fileType === "image" &&
            fieldProps.value instanceof File &&
            fieldProps.value.name && (
              <Image
                src={URL.createObjectURL(fieldProps.value)}
                alt="image"
                height="192"
                width="256"
                className="h-full w-full object-cover "
              />
            )}

          {fileType === "video" &&
            fieldProps.value instanceof File &&
            fieldProps.value.name && (
              <video
                src={URL.createObjectURL(fieldProps.value)}
                className="h-full w-full object-cover "
                controls
              />
            )}
        </div>
        {/* filename here */}
        <div className="text-sm text-placeholder">{fieldProps.value?.name}</div>
      </div>

      <input
        {...fieldProps}
        id={id}
        ref={ref}
        type="file"
        accept={
          acceptedTypes
            ? acceptedTypes.join(",")
            : fileType === "image"
            ? DEFAULT_ACCEPTED_IMAGE_TYPES.join(",")
            : fileType === "video"
            ? DEFAULT_ACCEPTED_VIDEO_TYPES.join(",")
            : ""
        }
        className="hidden"
        // @ts-ignore
        value={""}
        onChange={(e) => {
          if (fieldProps.onChange)
            fieldProps.onChange({
              ...e,
              target: {
                ...e.target,
                // @ts-ignore
                value: e.target.files?.[0],
              },
            });
        }}
      />
    </label>
  );
});

FileInputBox.displayName = "FileInputBox";
