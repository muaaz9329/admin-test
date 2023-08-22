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
import { imageSchema } from "@/constants/general-schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileInputBox } from "@/components/ui/file-input-box";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
type dailyStudiesFormPorps = {
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

const INTIAL_VALUES: DailyStudiesFormState = {
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
  initialValues = INTIAL_VALUES,
}: dailyStudiesFormPorps) => {
  const form = useForm<DailyStudiesFormState>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-row justify-between my-10">
                <FormLabel>
                Daily studies form
                </FormLabel>
                <div className="flex flex-row">
                    
                    
                </div>
            </div>
          <div className=" flex flex-row gap-x-5 w-[calc(55vw-8rem)]">
            <FormLabel>Study content:</FormLabel>
            <Textarea
              {...form.register("studyContent")}
              className="h-[calc(50vh-8rem)]"
            />
          </div>
          <div>
            <div className=" flex flex-row mt-10 gap-x-8 w-[calc(30vw-8rem)">
              <FormLabel>File name :</FormLabel>
              <input
                className="flex h-12  rounded-md shadow-sm border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-placeholder focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[calc(30vw-8rem)"
                type="text"
                {...form.register("fileName")}
              />
            </div>
            <div>
              <div className="mt-5 gap-x-5">
                <FormField
                  control={form.control}
                  name="coverImage"
                  render={({ field }) => (
                    <FormItem className="space-y-0 flex gap-2">
                      <FormLabel>Add cover: </FormLabel>
                      <div className="space-y-5 mr-5">
                        <FormControl>
                          <FileInputBox fileType="image" {...field} />
                        </FormControl>

                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div></div>
          {footer && footer}
        </form>
        
      </Form>
    </div>
  );
};

export default DailyStudiesForm;
