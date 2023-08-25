"use client";

import React from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  deleteDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { fireStorage, firestore } from "@/lib/firebase/firebase-config";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import toast from "react-hot-toast";
import { useI18n } from "@/internationalization/client";
import SubcategoryForm, {
  SubcategoryFormState,
} from "../../components/subcategory-form";

export default function Page() {
  const t = useI18n();
  const router = useRouter();

  const [isUploading, setIsUploading] = React.useState(false);

  const onAddSubcategory = async (values: SubcategoryFormState) => {
    const loadingToastId = toast.loading("Adding Subcategory...");

    console.log("formvalues", { values });

    setIsUploading(true);
    /*
    We'll first add a document to subcategories collection and keep cover image empty.
    Then we'll update image cloud storage folder news with the document id as name like docid-image
    Then we'll update the document with the image url.

    If an error occurs during news addition, we'll delete the document from news collection and delete the image from storage.
    */

    const folderRef = ref(fireStorage, "subcategories");

    const categoriesCollection = collection(firestore, "subcategories");

    try {
      const docData: Partial<SubCategoryDocument> = {
        name: values.name,
        createdAt: serverTimestamp(),
        coverImage: "",
        parentId: values.parentId,
      };

      // adding new Doc
      const docRef = await addDoc(categoriesCollection, docData);

      const coverImgRef = ref(folderRef, `${docRef.id}-image`);

      try {
        await uploadBytes(coverImgRef, values.coverImage!);
        console.log("cover image uploaded");
        const fileCoverDownloadUrl = await getDownloadURL(coverImgRef);

        // updating the document
        const updatedDocData = {
          updatedAt: serverTimestamp(),
          coverImage: fileCoverDownloadUrl,
        };

        await updateDoc(docRef, updatedDocData);
      } catch (error) {
        console.log(error);
        setIsUploading(false);
        toast.dismiss(loadingToastId);
        toast.error("Error adding subcategory");
        // delete the document from news collection
        deleteDoc(docRef);
        return;
      }

      setIsUploading(false);

      toast.dismiss(loadingToastId);
      toast.success("Subcategory added successfully");

      // redirect to news page
      router.back();
    } catch (error) {
      setIsUploading(false);

      console.log({ error });
      toast.dismiss(loadingToastId);
      toast.error("Error adding subcategory");
    }
  };
  return (
    <SubcategoryForm
      action="add"
      onSubmit={onAddSubcategory}
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
