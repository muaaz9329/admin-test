"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileInputBox } from "@/components/ui/file-input-box";
import { useI18n } from "@/internationalization/client";
import { Input } from "@/components/ui/input";

type dailyStudiesFormProps = {
  footer: React.ReactNode;

  /* a className to apply to the form */
  className?: string;

  /* a function to call when the form is submitted */
  onSubmit: (values: DailyStudiesFormState) => void;

  /* the initial values of the form */
  initialValues?: DailyStudiesFormState;
};

const formSchema = z.object({
  studyContent: z.string(),
  pdf: z.instanceof(File).optional(),
  coverImage: z.instanceof(File),
  fileName: z.string().nonempty(),
  timeToRead: z.string().optional(),
});

export type DailyStudiesFormState = z.infer<typeof formSchema>;

const INITIAL_VALUES: DailyStudiesFormState = {
  studyContent: "",
  pdf: new File([], ""),
  coverImage: new File([], ""),
  fileName: "",
  timeToRead: "",
};

const DailyStudiesForm = ({
  footer,
  onSubmit,
  className = "",
  initialValues = INITIAL_VALUES,
}: dailyStudiesFormProps) => {
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

            {/* <div className=" flex flex-row gap-x-5 w-[calc(55vw-8rem)]">
          <FormLabel>
              {t("pages.dailyStudies.studyContent")}
            </FormLabel>
            <Textarea
              {...form.register("studyContent")}
              className="h-[calc(50vh-8rem)]"
            />
          </div> */}

            <FormField
              control={form.control}
              name="studyContent"
              render={({ field }) => (
                <FormItem className="flex gap-4 space-y-0">
                  <FormLabel>{t("pages.dailyStudies.studyContent")}:</FormLabel>
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

            <FormField
              control={form.control}
              name="fileName"
              render={({ field }) => (
                <FormItem className="flex gap-4 space-y-0">
                  <FormLabel>{t("words.fileName")}:</FormLabel>
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
                  <FormLabel>{t("actions.addCover")}:</FormLabel>
                  <div className="space-y-5">
                    <FormControl>
                      <FileInputBox fileType="image" {...field} />
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
