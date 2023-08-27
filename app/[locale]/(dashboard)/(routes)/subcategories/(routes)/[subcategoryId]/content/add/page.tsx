"use client";
import React from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { fireStorage, firestore } from "@/lib/firebase/firebase-config";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import toast from "react-hot-toast";
import SubcategoryContentForm, {
  SubcategoryContentFormState,
} from "../components/subcategory-content-form";

export default function Page({
  params,
}: {
  params: { subcategoryId: string };
}) {
  const router = useRouter();
  const { subcategoryId } = params;

  const [isUploading, setIsUploading] = React.useState(false);

  React.useEffect(() => {
    // validating if the subcategory exists
    const subcategoryRef = doc(firestore, "subcategories", subcategoryId);
    getDoc(subcategoryRef)
      .then((doc) => {
        if (!doc.exists()) {
          console.log("No such document!");
          toast.error("Subcategory not found");
          router.push("/404");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [subcategoryId, router]);

  const onAddContent = async (values: SubcategoryContentFormState) => {
    const loadingToastId = toast.loading("Adding content...");

    setIsUploading(true);
    /*
    We'll first add a document to collection and keep image and pdfFile fields empty.
    Then we'll update image and pdfFile to cloud storage folder news with the document id as name like docid-image, docid-pdf
    Then we'll update the document with the image and pdf urls.

    If an error occurs during news addition, we'll delete the document from news collection and delete the image and video from storage.
    */

    const folderRef = ref(fireStorage, "category-content");

    const contentCollection = collection(firestore, "category-content");

    try {
      const studyFile: Partial<SubcategoryContentDocument> = {
        name: values.fileName,
        contentType: values.contentType,
        timeToRead: values.timeToRead,
        parentId: subcategoryId,
        createdAt: serverTimestamp(),
      };

      if (values.contentType === "text") {
        studyFile["studyContent"] = values.studyContent;
        studyFile["pdf"] = "";
      }

      // adding new Doc
      const studyDoc = await addDoc(contentCollection, studyFile);

      const coverImgRef = ref(folderRef, `${studyDoc.id}-image`);
      const pdfRef = ref(folderRef, `${studyDoc.id}-pdf`);

      try {
        await uploadBytes(coverImgRef, values.coverImage!);
        console.log("study file cover image uploaded");
        const fileCoverDownloadUrl = await getDownloadURL(coverImgRef);

        let filePdfDownloadUrl;

        if (values.contentType === "pdf") {
          await uploadBytes(pdfRef, values.pdf!);
          console.log("study file pdf uploaded");

          filePdfDownloadUrl = await getDownloadURL(pdfRef);
        }

        // updating the document
        const updatedDoc = {
          updatedAt: serverTimestamp(),
          coverImage: fileCoverDownloadUrl,
          ...(values.contentType === "pdf"
            ? { pdfLink: filePdfDownloadUrl, studyContent: "" }
            : {}),
        };

        await updateDoc(studyDoc, updatedDoc);
      } catch (error) {
        console.log(error);
        setIsUploading(false);
        toast.dismiss(loadingToastId);
        toast.error("Error adding content");
        // delete the document from news collection
        deleteDoc(studyDoc);
        return;
      }

      setIsUploading(false);

      toast.dismiss(loadingToastId);
      toast.success("Content added successfully");

      // redirect to news page
      router.back();
    } catch (error) {
      setIsUploading(false);

      console.log({ error });
      toast.dismiss(loadingToastId);
      toast.error("Error adding content");
    }
  };
  return (
    <SubcategoryContentForm
      action="add"
      // @ts-ignore
      onSubmit={onAddContent}
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
            Upload
            {}
          </Button>
        </div>
      }
    />
  );
}
