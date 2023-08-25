"use client";

import React from "react";
import { z } from "zod";
import { DefaultValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useI18n } from "@/internationalization/client";

import { FileInputBox } from "@/components/ui/file-input-box";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  fileSchema,
  DEFAULT_ACCEPTED_IMAGE_TYPES,
} from "@/constants/general-schemas";

const formSchema = z
  .object({
    action: z.enum(["add", "update"]),

    coverImage: z.optional(
      fileSchema({
        acceptedTypes: DEFAULT_ACCEPTED_IMAGE_TYPES,
      })
    ),
    coverImageSrc: z.string().optional(),

    name: z.string().nonempty(),
  })

  // Requirement:
  /*
    name is required.

    if action is add:
      cover image is required
     
    if action is update:
      if cover image source is present:
        cover image is optional
      
  */
  .superRefine((val, ctx) => {
    // lets implement the requirement with proper error messages

    if (val.action === "add") {
      if (!val.coverImage) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Cover image is required",
          path: ["coverImage"],
        });
      }
    }

    if (val.action === "update") {
      if (!val.coverImageSrc) {
        if (!val.coverImage) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Cover image is required",
            path: ["coverImage"],
          });
        }
      }
    }
  });

export type CategoryFormState = z.infer<typeof formSchema>;

const INITIAL_VALUES: DefaultValues<CategoryFormState> = {
  action: "add",
  name: "",
  coverImage: undefined,
  coverImageSrc: "",
};

// Component Prop
type CategoryFormProps = {
  action: "add" | "update";
  footer: React.ReactNode;

  /* a function to call when the form is submitted */
  onSubmit: (values: CategoryFormState) => void;

  /* the initial values of the form */
  initialValues?: DefaultValues<CategoryFormState>;
};

const DailyStudiesForm = ({
  footer,
  onSubmit,
  initialValues = INITIAL_VALUES,
}: CategoryFormProps) => {
  const t = useI18n();

  const form = useForm<CategoryFormState>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-8">
            <div className="flex justify-between">
              <FormLabel>{t("pages.categories.formTitle")}</FormLabel>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex gap-4 space-y-0">
                  <FormLabel className="basis-28 whitespace-nowrap">
                    {t("words.name")}:
                  </FormLabel>
                  <div className="flex-col gap-2 basis-96">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem className="space-y-0 flex gap-2">
                  <FormLabel className="basis-28 whitespace-nowrap">
                    {t("words.image")}:
                  </FormLabel>
                  <div className="space-y-5">
                    <FormControl>
                      <FileInputBox
                        {...field}
                        fileType="image"
                        fileSrc={form.getValues().coverImageSrc}
                      />
                    </FormControl>

                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {footer && footer}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DailyStudiesForm;
