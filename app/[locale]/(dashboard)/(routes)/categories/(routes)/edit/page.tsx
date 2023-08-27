"use client";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { fireStorage, firestore } from "@/lib/firebase/firebase-config";

import { useI18n } from "@/internationalization/client";
import useCategoryForm from "../../hooks/use-category-form";

import CategoryForm, {
  CategoryFormState,
} from "../../components/category-form";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

export default function Page() {
  const t = useI18n();
  const router = useRouter();
  const { editingDoc } = useCategoryForm();

  const [isUploading, setIsUploading] = React.useState(false);

  const onUpdate = async (values: CategoryFormState) => {
    const loadingToastId = toast.loading("Updating category...");
    setIsUploading(true);

    const docRef = doc(firestore, "categories", editingDoc?.id!);
    const coverImgRef = ref(fireStorage, `categories/${editingDoc?.id}-image`);

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
    <CategoryForm
      action="update"
      // @ts-ignore
      onSubmit={onUpdate}
      initialValues={{
        action: "update",
        name: editingDoc?.name,
        coverImageSrc: editingDoc?.coverImage,
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
