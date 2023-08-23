"use client";
import React from "react";
import DailyStudiesForm, {
  DailyStudiesFormState,
} from "../components/daily-studies-form";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, deleteDoc, updateDoc } from "firebase/firestore";
import { fireStorage, firestore } from "@/lib/firebase/firebase-config";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import toast from "react-hot-toast";

export default function Page() {
  const [isUploading, setIsUploading] = React.useState(false);
  const router = useRouter();

  const onStudySubmission = async (values: DailyStudiesFormState) => {
    const loadingToastId = toast.loading("Adding Studies...");

    console.log("formvalues", { values });

    setIsUploading(true);
    /*
    We'll first add a document to daily-studies collection and keep image and pdfFile fields empty.
    Then we'll update image and pdfFile to cloud storage folder news with the document id as name like docid-image, docid-pdf
    Then we'll update the document with the image and pdf urls.

    If an error occurs during news addition, we'll delete the document from news collection and delete the image and video from storage.
    */

    const folderRef = ref(fireStorage, "daily-studies");

    const dailyStudiesCollection = collection(firestore, "daily-studies");

    try {
      const studyFile = {
        name: values.fileName,
      };

      if (values.contentType === "text") {
        // @ts-ignore
        studyFile["studyContent"] = values.studyContent;
      }

      // adding new Doc
      const studyDoc = await addDoc(dailyStudiesCollection, studyFile);

      const coverImgRef = ref(folderRef, `${studyDoc.id}-image`);
      const pdfRef = ref(folderRef, `${studyDoc.id}-pdf`);

      try {
        await uploadBytes(coverImgRef, values.coverImage);
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
          coverImage: fileCoverDownloadUrl,
          ...(values.contentType === "pdf"
            ? { pdfFile: filePdfDownloadUrl }
            : {}),
        };

        await updateDoc(studyDoc, updatedDoc);
      } catch (error) {
        console.log(error);
        setIsUploading(false);
        toast.dismiss(loadingToastId);
        toast.error(
          "An error occurred while adding daily studies. Please try again later."
        );
        // delete the document from news collection
        deleteDoc(studyDoc);
        return;
      }

      setIsUploading(false);

      toast.dismiss(loadingToastId);
      toast.success("Daily studies added successfully");

      // redirect to news page
      router.back();
    } catch (error) {
      setIsUploading(false);

      console.log({ error });
      toast.dismiss(loadingToastId);
      toast.error("Error adding daily study");
    }
  };
  return (
    <DailyStudiesForm
      onSubmit={onStudySubmission}
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
