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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  fileSchema,
  DEFAULT_ACCEPTED_IMAGE_TYPES,
} from "@/constants/general-schemas";

type DailyStudiesFormProps = {
  footer: React.ReactNode;

  /* a className to apply to the form */
  // className?: string;

  /* a function to call when the form is submitted */
  onSubmit: (values: DailyStudiesFormState) => void;

  /* the initial values of the form */
  initialValues?: DefaultValues<DailyStudiesFormState>;
};

const formSchema = z.object({
  pdf: fileSchema({
    acceptedTypes: ["application/pdf"],
  }),
  pdfSrc: z.string().optional(),

  studyContent: z.string().optional(),

  coverImage: fileSchema({
    isRequired: true,
    acceptedTypes: DEFAULT_ACCEPTED_IMAGE_TYPES,
  }),
  coverImageSrc: z.string().optional(),

  fileName: z.string().nonempty(),
  // content type can be either 'pdf' or 'text'
  contentType: z.enum(["pdf", "text"]),
});

export type DailyStudiesFormState = z.infer<typeof formSchema>;

const INITIAL_VALUES: DefaultValues<DailyStudiesFormState> = {
  studyContent: "",
  pdf: undefined,
  coverImage: undefined,
  fileName: "",
  contentType: "text",
};

const DailyStudiesForm = ({
  footer,
  onSubmit,
  initialValues = INITIAL_VALUES,
}: DailyStudiesFormProps) => {
  const t = useI18n();

  const form = useForm<DailyStudiesFormState>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-8">
            <div className="flex justify-between">
              <FormLabel>{t("pages.dailyStudies.formTitle")}</FormLabel>

              {/* select here */}
            </div>

            <FormField
              control={form.control}
              name="fileName"
              render={({ field }) => (
                <FormItem className="flex gap-4 space-y-0">
                  <FormLabel className="basis-28 whitespace-nowrap">
                    {t("words.fileName")}:
                  </FormLabel>
                  <div className="flex-col gap-2">
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
                    {t("actions.addCover")}:
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

            <FormField
              control={form.control}
              name="contentType"
              render={({ field }) => (
                <FormItem className="flex gap-2 space-y-0">
                  <FormLabel className="basis-28 whitespace-nowrap">
                    {"Content Type"}:
                  </FormLabel>
                  <div className="space-y-2">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your content type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="text">TEXT</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormDescription>
                      You can either upload a pdf file or enter text content
                    </FormDescription>

                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {
              // if the content type is pdf, show the pdf input
              form.watch("contentType") === "pdf" ? (
                <FormField
                  control={form.control}
                  name="pdf"
                  render={({ field }) => (
                    <FormItem className="space-y-0 flex gap-2">
                      <FormLabel className="basis-28 whitespace-nowrap">
                        {"Pdf"}:
                      </FormLabel>
                      <div className="space-y-5">
                        <FormControl>
                          <FileInputBox
                            {...field}
                            fileType="pdf"
                            fileSrc={form.getValues().pdfSrc}
                          />
                        </FormControl>

                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              ) : (
                <FormField
                  control={form.control}
                  name="studyContent"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 space-y-0">
                      <FormLabel className="basis-28 whitespace-nowrap">
                        {t("pages.dailyStudies.studyContent")}:
                      </FormLabel>
                      <div className="flex-col gap-2">
                        <FormControl>
                          <Textarea
                            {...field}
                            cols={80}
                            rows={10}
                            placeholder="Enter your study content here"
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              )
            }

            {footer && footer}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DailyStudiesForm;
