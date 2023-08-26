"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/internationalization/client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { DefaultValues, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  action: z.enum(["add", "update"]),
  type: z.enum(["youtube", "whatsapp", "website"]),
  url: z.string().url(),
});
export type AddLinkFormState = z.infer<typeof formSchema>;

const INITIAL_VALUE: AddLinkFormState = {
  action: "add",
  type: "website",
  url: "www.google.com",
};

//Componenet Props
type AddlinksFormProps = {
  initialValues?: DefaultValues<AddLinkFormState>;
  action: "add" | "update";
  footer: React.ReactNode;
  onSubmit: (values: AddLinkFormState) => void;
};

const AddlinksForm = ({
  initialValues = INITIAL_VALUE,
  footer,
  onSubmit,
}: AddlinksFormProps) => {
  const t = useI18n();
  const form = useForm<AddLinkFormState>({
    defaultValues: initialValues,
    resolver: zodResolver(formSchema),
  });
  return (
    <div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-8">
            <div className="flex justify-between">
              <FormLabel>{t("pages.links.formTitle")}</FormLabel>

              
            </div>
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="flex gap-4 space-y-0 items-center">
                  <FormLabel className="basis-28 whitespace-nowrap">
                    {t("pages.links.websiteUrl")}:
                  </FormLabel>
                  <div className="flex-col gap-2">
                    <FormControl>
                      <Input {...field} className="w-[30vw]" />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="flex gap-2 space-y-0 ">
                  <FormLabel className="basis-28 whitespace-nowrap">
                    {t("pages.links.selectList")}:
                  </FormLabel>
                  <div className="space-y-10 w-52">
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
                        <SelectItem value="website">{t('pages.links.website')}</SelectItem>
                        <SelectItem value="youtube">{t('pages.links.youtube')}</SelectItem>
                        <SelectItem value="whatsapp">{t('pages.links.whatsapp')}</SelectItem>
                      </SelectContent>
                    </Select>

                   

                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <div className="absolute bottom-5 w-[95%]">
      {footer && footer}
      </div>
      
            </div>
            </form>
      </Form>
      
    </div>
  );
};

export default AddlinksForm;
