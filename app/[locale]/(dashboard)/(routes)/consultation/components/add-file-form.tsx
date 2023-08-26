'use client';

import { FileInputBox } from '@/components/ui/file-input-box';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { DEFAULT_ACCEPTED_IMAGE_TYPES, fileSchema } from '@/constants/general-schemas'
import { useI18n } from '@/internationalization/client'
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { DefaultValues, useForm } from 'react-hook-form'
import { z } from 'zod'


const formSchema = z.object({
    action: z.enum(["add", "update"]),
    content: z.string().nonempty(),
    fileType:z.enum(['free','paid']),
    amount:z.string().nonempty(),
    coverImage:z.optional(
        fileSchema({
            acceptedTypes: DEFAULT_ACCEPTED_IMAGE_TYPES,
        })
    ),
    coverImageSrc : z.string(),
    fileName: z.string().nonempty(),
})


export type AddFileFormState = z.infer<typeof formSchema>


const INITIAL_VALUES : DefaultValues<AddFileFormState> = {
    action: "add",
    content: "",
    fileType:"free",
    amount:'0',
    coverImageSrc : "",
    coverImage:undefined,
    fileName: "",
}


//component props
type AddFileFormProps = {
    onSubmit: (data: AddFileFormState) => void
    action : "add" | "update"
    initialValues?: DefaultValues<AddFileFormState>
    footer: React.ReactNode
}

const AddFileForm = ({
    onSubmit,
    footer,
    initialValues = INITIAL_VALUES,
}: AddFileFormProps) => {
  const t =useI18n();

  const form = useForm<AddFileFormState>({
    defaultValues: initialValues,
    resolver: zodResolver(formSchema),
  })
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-8">
            <div className="flex justify-between">
              <FormLabel>{t("pages.consultation.formTitle")}:</FormLabel>

            
            </div>
            <FormField
              control={form.control}
              name="fileName"
              render={({ field }) => (
                <FormItem className="flex gap-4 space-y-0  items-center">
                  <FormLabel className="basis-28 whitespace-nowrap">
                    {t("words.fileName")}:
                  </FormLabel>
                  <div className="flex-col gap-2">
                    <FormControl>
                      <Input {...field}  />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex gap-4 space-y-0">
                <FormLabel className="basis-28 whitespace-nowrap">
                  {t("pages.consultation.files")}:
                </FormLabel>
                <div className="flex-col gap-2">
                  <FormControl>
                    <Textarea
                      {...field}
                      cols={60}
                      rows={10}
                      placeholder="Enter your study content here"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <div className='flex'>

          
          <FormField
              control={form.control}
              name="fileType"
              render={({ field }) => (
                <FormItem className="flex gap-2 space-y-0 items-center">
                  <FormLabel className="basis-28 whitespace-nowrap">
                    {"file Type"}:
                  </FormLabel>
                  <div className="space-y-2 w-32 items-center">
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
                        <SelectItem value="free">{t("pages.consultation.free")}</SelectItem>
                        <SelectItem value="paid">{t("pages.consultation.paid")}</SelectItem>
                      </SelectContent>
                    </Select>

                    

                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
               <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="flex gap-4 space-y-0 mr-32 items-center">
                  <FormLabel className="basis-28 whitespace-nowrap">
                    {t("pages.consultation.amount")}:
                  </FormLabel>
                  <div className="flex-col gap-2">
                    <FormControl>
                      <Input {...field} className='w-28' />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            </div>
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
    </div>
    {footer && footer}
    </form>
    </Form>
    </div>
  )
}

export default AddFileForm





        

          
         