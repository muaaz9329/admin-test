import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Name</Label>
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
        cumque obcaecati. Magnam totam ex deleniti, excepturi maiores
        exercitationem, atque sit fuga esse optio quaerat amet eveniet? Officia
        quaerat modi odit repellat magnam, beatae atque? Tenetur, accusamus!
        Quae aliquam sint minus, odit consequatur vitae eligendi sequi ea
        consequuntur distinctio voluptate velit quos repellat alias tenetur
        aspernatur, dignissimos quasi et, similique eveniet in laboriosam ut
        praesentium perferendis? Quod. Asperiores adipisci unde facere, nemo
        reprehenderit mollitia perspiciatis? Rem temporibus explicabo esse quas
        at quisquam facere iste, ut, non beatae, consequuntur repudiandae eum
        qui cum laudantium fugiat voluptates error culpa. Ex magni quisquam fuga
        eveniet inventore error eius accusamus doloremque ut libero. Fugiat
        tenetur impedit reprehenderit adipisci culpa, incidunt quae dolore
        maiores dicta nulla earum, nisi vitae praesentium doloribus qui. Modi
        veniam ducimus expedita provident, nam dignissimos iure fuga architecto
        recusandae facere nemo inventore eius eos similique et, quo nihil aut
        error consectetur assumenda sed quia. Ex eos vitae repellat. Quasi
        corporis fugit excepturi doloribus quidem obcaecati omnis soluta
        impedit! Molestiae nesciunt impedit nisi ducimus ullam dolorum tempore,
        veniam explicabo, quaerat, dicta porro beatae delectus tempora deleniti
        sunt ad debitis.
      </p>
    </div>
  );
}
