"use client";

import React from "react";
import AddFileForm, { AddFileFormState } from "../components/add-file-form";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { fireStorage, firestore } from "@/lib/firebase/firebase-config";
import {
  addDoc,
  collection,
  deleteDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

function parseNumber(input: string) {
  // Check if the input is a valid number string
  if (/^\d+$/.test(input)) {
    return parseInt(input);
  } else {
    return "undefined";
  }
}

const Page = () => {
  const [isUploading, setIsUploading] = React.useState(false);
  const router = useRouter();

  const onSubmit = async (values: AddFileFormState) => {
    const loadingToastId = toast.loading("Adding Consultation...");

    setIsUploading(true);

    const folderRef = ref(fireStorage, "consultation");
    const consultationCollection = collection(firestore, "consultation");

    try {
      const consultFile: Partial<ConsultationDoc> = {
        fileName: values.fileName,
        fileType: values.fileType,
        createdAt: serverTimestamp(),
        content: values.content,
      };

      if (parseNumber(values.amount) !== "undefined") {
        consultFile["amount"] = parseNumber(values.amount) as number;
      } else {
        throw new Error("Amount is not a number");
      }
      // adding new Doc
      const consultDoc = await addDoc(consultationCollection, consultFile);
      const coverImgRef = ref(folderRef, `${consultDoc.id}-image`);

      try {
        await uploadBytes(coverImgRef, values.coverImage!);
        console.log("image uploaded");
        const fileCoverDownloadUrl = await getDownloadURL(coverImgRef);
        const updatedDoc = {
          updatedAt: serverTimestamp(),
          coverImage: fileCoverDownloadUrl,
        };

        await updateDoc(consultDoc, updatedDoc);
      } catch (error) {
        console.log(error);
        setIsUploading(false);
        toast.dismiss(loadingToastId);
        toast.error("Error adding consultataion");
        // delete the document from news collection
        deleteDoc(consultDoc);
        return;
      }

      setIsUploading(false);

      toast.dismiss(loadingToastId);
      toast.success("Consultataion added successfully");

      // redirect to news page
      router.back();
    } catch (error: any) {
      if (error.message === "Amount is not a number") {
        toast.error("Amount is not a number");
      } else {
        toast.error("Error adding Consultation");
      }
      toast.dismiss(loadingToastId);
      setIsUploading(false);
    }
  };
  return (
    <AddFileForm
      onSubmit={onSubmit}
      action="add"
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
};

export default Page;
