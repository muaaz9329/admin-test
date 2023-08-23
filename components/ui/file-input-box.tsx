"use client";

import React, { useId } from "react";
import Image from "next/image";
import { useI18n } from "@/internationalization/client";
import {
  DEFAULT_ACCEPTED_IMAGE_TYPES,
  DEFAULT_ACCEPTED_VIDEO_TYPES,
} from "@/constants/general-schemas";
import { Button, buttonVariants } from "./button";

export interface FileInputBoxProps {
  fileType: "image" | "video" | "pdf";
  acceptedTypes?: string[];
  value: File | undefined;
  fileSrc?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileInputBox = React.forwardRef<
  HTMLInputElement,
  FileInputBoxProps
>(({ fileType, acceptedTypes, value, fileSrc, ...fieldProps }, ref) => {
  const id = useId();
  const t = useI18n();

  return (
    <label htmlFor={id}>
      <div className="space-y-2">
        {/* showing a box input with box preview for only image and video file inputs */}
        {["image", "video"].includes(fileType) && (
          <div className="h-48 w-72 overflow-hidden rounded-md border-primary border-2 flex items-center justify-center">
            {(!value || !value.name) && (
              <span className="text-placeholder font-medium text-md">
                + {fileType === "image" ? t("words.image") : t("words.video")}
              </span>
            )}

            {fileType === "image" && (value instanceof File || fileSrc) && (
              <Image
                src={fileSrc ? fileSrc : URL.createObjectURL(value!)}
                alt="image"
                height="192"
                width="256"
                className="h-full w-full object-cover "
              />
            )}

            {fileType === "video" && (value instanceof File || fileSrc) && (
              <video
                src={fileSrc ? fileSrc : URL.createObjectURL(value!)}
                className="h-full w-full object-cover "
                controls
              />
            )}
          </div>
        )}

        {fileType === "pdf" && (
          <span className={buttonVariants()}>
            {value ? t("actions.change") : t("actions.upload")}
          </span>
        )}

        {/* Displaying the name of the chosen file or previous uploaded file link if no new file is chosen for all file inputs types */}
        <div className="text-sm text-placeholder">
          {value ? (
            value.name
          ) : fileSrc ? (
            <a
              href={fileSrc}
              target="_blank"
              className={buttonVariants({ variant: "link" })}
            >
              {fileSrc}
            </a>
          ) : (
            ""
          )}
        </div>
      </div>

      <input
        {...fieldProps}
        id={id}
        ref={ref}
        type="file"
        value=""
        accept={
          acceptedTypes
            ? acceptedTypes.join(",")
            : fileType === "image"
            ? DEFAULT_ACCEPTED_IMAGE_TYPES.join(",")
            : fileType === "video"
            ? DEFAULT_ACCEPTED_VIDEO_TYPES.join(",")
            : fileType === "pdf"
            ? "application/pdf"
            : ""
        }
        className="hidden"
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
