import { z } from "zod";
import { ONE_MB } from "./sizes";

export const DEFAULT_IMAGE_MAX_SIZE = 2 * ONE_MB;
export const DEFAULT_VIDEO_MAX_SIZE = 5 * ONE_MB;

export const DEFAULT_ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const DEFAULT_ACCEPTED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/ogg",
];

/**
 * @description This is a schema for validating images.
 * @param isRequired - Whether the image is required or not. Default is false.
 * @param maxSize - The maximum size of the image in bytes. Default is 2MB.
 * @param acceptedTypes - The accepted types of the image. Default is ["image/jpeg", "image/png", "image/webp"].
 */
export const imageSchema = ({
  isRequired = false,
  maxSize: MAX_FILE_SIZE = DEFAULT_IMAGE_MAX_SIZE,
  acceptedTypes: ACCEPTED_IMAGE_TYPES = DEFAULT_ACCEPTED_IMAGE_TYPES,
}: {
  isRequired?: boolean;
  maxSize?: number;
  acceptedTypes?: string[];
}) =>
  z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `File size should be less than ${MAX_FILE_SIZE / ONE_MB}MB.`
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      `Only ${ACCEPTED_IMAGE_TYPES.join(", ")} formats are acceptable.`
    )
    .refine((file) => {
      if (isRequired) {
        return file !== null;
      }
      return true;
    }, "Image is required.");

/**
 * @description This is a schema for validating videos.
 * @param isRequired - Whether the video is required or not. Default is false.
 * @param maxSize - The maximum size of the video in bytes. Default is 5MB.
 * @param acceptedTypes - The accepted types of the video. Default is ["video/mp4", "video/webm", "video/ogg"].
 */
export const videoSchema = ({
  isRequired = false,
  maxSize: MAX_FILE_SIZE = DEFAULT_VIDEO_MAX_SIZE,
  acceptedTypes: ACCEPTED_VIDEO_TYPES = DEFAULT_ACCEPTED_VIDEO_TYPES,
}: {
  isRequired?: boolean;
  maxSize?: number;
  acceptedTypes?: string[];
}) =>
  z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `Max video size is ${MAX_FILE_SIZE / ONE_MB}MB.`
    )
    .refine(
      (file) => ACCEPTED_VIDEO_TYPES.includes(file?.type),
      `Only ${ACCEPTED_VIDEO_TYPES.join(", ")} formats are supported.`
    )
    .refine((file) => {
      if (isRequired) {
        return file !== null;
      }
      return true;
    }, "Image is required.");
