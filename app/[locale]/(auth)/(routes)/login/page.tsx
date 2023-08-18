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
  FormMessage,
} from "@/components/ui/form";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { Mail, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClientI18n } from "@/providers/client-i18n";
import { useScopedI18n } from "@/internationalization/client";
import { withClientI18n } from "@/components/hoc/with-client-i18n";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

type FormSchema = z.infer<typeof formSchema>;

function LoginPage({ params }: WithParamsLocale<{}>) {
  const t = useScopedI18n("auth");

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
    <ClientI18n params={params}>
      <Card className="w-[450px] rounded-2xl">
        <CardHeader className="text-center py-12">
          <CardTitle>{t("loginTitle")}</CardTitle>
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
                        placeholder={t("email")}
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
                        placeholder={t("password")}
                        icon={<Unlock width="21" />}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-center">
                <Button>{t("login")}</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </ClientI18n>
  );
}

export default withClientI18n(LoginPage);
