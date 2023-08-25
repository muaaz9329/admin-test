"use client";

import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  deleteDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { fireStorage, firestore } from "@/lib/firebase/firebase-config";

import CategoryForm, {
  CategoryFormState,
} from "../../components/category-form";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

export default function Page() {
  const [isUploading, setIsUploading] = React.useState(false);
  const router = useRouter();

  const onAddCategory = async (values: CategoryFormState) => {
    const loadingToastId = toast.loading("Adding Category...");

    console.log("formvalues", { values });

    setIsUploading(true);
    /*
    We'll first add a document to categories collection and keep cover image empty.
    Then we'll update image cloud storage folder news with the document id as name like docid-image
    Then we'll update the document with the image url.

    If an error occurs during news addition, we'll delete the document from news collection and delete the image from storage.
    */

    const folderRef = ref(fireStorage, "categories");

    const categoriesCollection = collection(firestore, "categories");

    try {
      const docData: Partial<CategoryDocument> = {
        name: values.name,
        createdAt: serverTimestamp(),
        coverImage: "",
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
        toast.error("Error adding category");
        // delete the document from collection
        deleteDoc(docRef);
        return;
      }

      setIsUploading(false);

      toast.dismiss(loadingToastId);
      toast.success("Category added successfully");

      // redirect to news page
      router.back();
    } catch (error) {
      setIsUploading(false);

      console.log({ error });
      toast.dismiss(loadingToastId);
      toast.error("Error adding category");
    }
  };
  return (
    <CategoryForm
      action="add"
      // @ts-ignore
      onSubmit={onAddCategory}
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
            Cancel
            {}
          </Button>

          <Button size={"lg"} type="submit" disabled={isUploading}>
            <Check className="w-5 h-5 ml-1" />
            Save
            {/* {t("actions.")} */}
          </Button>
        </div>
      }
    />
  );
}
