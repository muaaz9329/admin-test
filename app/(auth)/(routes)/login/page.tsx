"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { Mail, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

type FormSchema = z.infer<typeof formSchema>;

export default function LoginPage() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormSchema) => {
    console.log(values);
  };

  return (
    <Card className="w-[450px] rounded-2xl">
      <CardHeader className="text-center py-12">
        <CardTitle>כניסה למנהל מערכת</CardTitle>
      </CardHeader>
      <CardContent className="pb-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputWithIcon
                      {...field}
                      placeholder="אימייל"
                      icon={<Mail width={21} />}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputWithIcon
                      {...field}
                      placeholder="סיסמה"
                      icon={<Unlock width="21" />}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-center">
              <Button>התחברות</Button>
            </div>
          </form>
        </Form>
      </CardContent>

      {/* <div className="mt-[54px]">
        <div className="relative ">
          <input
            type="emain"
            id="default-search"
            className="block w-full p-4 pr-10 text-sm text-gray-900 border border-primary rounded-lg bg-white  focus:border-primary shadow-sm shadow-primary "
            placeholder="אימייל"
            required
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <EmailIcon Height={18} Width={18} />
          </div>
        </div>
      </div>
      <div className="mt-[30px]">
        <div className="relative ">
          <input
            type="emain"
            id="default-search"
            className="block w-ful p-4 pr-10 p text-sm font-normal text-gray-900 border border-primary rounded-lg bg-white  focus:border-primary  shadow-sm shadow-primary"
            placeholder="סיסמה"
            required
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <PasswordIcon Height={18} Width={18} />
          </div>
        </div>
      </div>
      <div className="mt-7">
        <Button size={"default"} className="font-normal">
          התחברות
        </Button>
      </div> */}
    </Card>
  );
}
