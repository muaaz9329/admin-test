"use client";
import React from "react";
import SubcategoryForm, {
  SubcategoryFormState,
} from "../../components/subcategory-form";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { fireStorage, firestore } from "@/lib/firebase/firebase-config";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import toast from "react-hot-toast";
import { useI18n } from "@/internationalization/client";
import useCategoryForm from "../../hooks/use-subcategory-form";

export default function Page() {
  const t = useI18n();
  const router = useRouter();
  const { editingDoc } = useCategoryForm();

  const [isUploading, setIsUploading] = React.useState(false);

  const onUpdate = async (values: SubcategoryFormState) => {
    const loadingToastId = toast.loading("Updating category...");
    setIsUploading(true);

    const docRef = doc(firestore, "subcategories", editingDoc?.id!);
    const coverImgRef = ref(
      fireStorage,
      `subcategories/${editingDoc?.id}-image`
    );

    console.log({ values });

    try {
      let newCoverSrc;

      if (values.coverImage) {
        try {
          await uploadBytes(coverImgRef, values.coverImage);
          newCoverSrc = await getDownloadURL(coverImgRef);
        } catch (error) {
          console.log({ error });

          toast.dismiss(loadingToastId);
          toast.error("Error uploading cover image");
          return;
        }
      }

      const updatedDocData = {
        name: values.name,
        coverImage: newCoverSrc || editingDoc?.coverImage,
        parentId: values.parentId,
        updatedAt: serverTimestamp(),
      };

      await updateDoc(docRef, updatedDocData);

      toast.dismiss(loadingToastId);
      toast.success("category updated successfully");
      router.back();
    } catch (error) {
      console.log({ error });

      toast.dismiss(loadingToastId);
      toast.error("Error updating category");
    }
  };
  return (
    <SubcategoryForm
      onSubmit={onUpdate}
      initialValues={{
        action: "update",
        name: editingDoc?.name,
        coverImageSrc: editingDoc?.coverImage,
        parentId: editingDoc?.parentId,
      }}
      footer={
        <div className="mt-4 flex justify-between">
          <Button
            size={"lg"}
            variant="outline"
            type="reset"
            className="mx-4"
            disabled={isUploading}
            onClick={() => {
              router.back();
            }}
          >
            <X className="w-5 h-5 ml-1" />
            {t("actions.cancel")}
          </Button>

          <Button size={"lg"} type="submit" disabled={isUploading}>
            <Check className="w-5 h-5 ml-1" />
            {t("actions.save")}
          </Button>
        </div>
      }
    />
  );
}
