import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import Link from "next/link";
import { getI18n } from "@/internationalization/server";

export default async function Home() {
  const t = await getI18n();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>{t("hello")}</Label>
        <Input />
      </div>

      <div className="space-y-2">
        <Label>About</Label>
        <Textarea />
      </div>

      <div className="space-x-4">
        <Button>Save</Button>
        <Button size="sm">Save</Button>
        <Button size="lg">Save</Button>
      </div>
      <p className="mt-6">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae sunt
        porro similique rem! Minus amet laudantium, odit excepturi repellat,
        distinctio, ratione debitis natus deserunt quasi sequi est inventore
        dolore ea. Officia aliquid numquam quibusdam praesentium hic cupiditate
        velit, fugiat, beatae consectetur voluptas impedit harum molestiae
        explicabo vero sunt modi officiis aperiam. Ipsam voluptatum officia qui
        quidem autem recusandae sint earum. Temporibus quam quisquam officia
        autem numquam dolorum eum excepturi amet rem quod? Sunt, neque
        repellendus vero odit laudantium dignissimos omnis est tempora cum esse
        corporis itaque consequatur doloribus ex fuga. Tenetur repellendus quia
        ipsa, dolorum dolor animi fugiat voluptatum assumenda nobis cupiditate
        maxime non sed, eos vel quis dicta quisquam perferendis et eius
        dignissimos deserunt natus aperiam! Totam, eum a? Impedit quisquam sequi
        cumque obcaecati.
      </p>
      <Link href="/he/login" className={buttonVariants()}>
        {t("auth.login")}
      </Link>
    </div>
  );
}
