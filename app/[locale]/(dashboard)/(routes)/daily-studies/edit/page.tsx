"use client";
import React from "react";
import DailyStudiesForm, {
  DailyStudiesFormState,
} from "../components/daily-studies-form";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { fireStorage, firestore } from "@/lib/firebase/firebase-config";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import toast from "react-hot-toast";
import { useI18n } from "@/internationalization/client";
import useDailyStudiesForm from "../components/hooks/use-daliy-studies-form";

export default function Page() {
  const t = useI18n();
  const router = useRouter();
  const { editingDoc } = useDailyStudiesForm();

  const [isUploading, setIsUploading] = React.useState(false);

  const onUpdateStudy = async (values: DailyStudiesFormState) => {
    const loadingToastId = toast.loading("Adding Studies...");
    setIsUploading(true);

    const studyDoc = doc(firestore, "daily-studies", editingDoc?.id!);
    const coverImgRef = ref(fireStorage, `${editingDoc?.id}-image`);
    const pdfRef = ref(fireStorage, `${editingDoc?.id}-pdf`);

    console.log({ values });

    try {
      let newCoverSrc, newPdfSrc;

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

      if (values.pdf) {
        try {
          await uploadBytes(pdfRef, values.pdf);
          newPdfSrc = await getDownloadURL(pdfRef);
        } catch (error) {
          console.log({ error });

          toast.dismiss(loadingToastId);
          toast.error("Error uploading pdf");
          return;
        }
      }

      const updatedDoc = {
        name: values.fileName,
        coverImage: newCoverSrc || editingDoc?.coverImage,
        pdfLink: newPdfSrc || editingDoc?.pdfLink,
        studyContent: values.studyContent,
        contentType: values.contentType,
        updatedAt: serverTimestamp(),
      };

      console.log({
        updatedDoc,
        values,
      });

      await updateDoc(studyDoc, updatedDoc);

      toast.dismiss(loadingToastId);
      toast.success("Daily study updated successfully");
      router.back();
    } catch (error) {
      console.log({ error });

      toast.dismiss(loadingToastId);
      toast.error("Error updating daily study");
    }
  };
  return (
    <DailyStudiesForm
      action="update"
      // @ts-ignore
      onSubmit={onUpdateStudy}
      initialValues={{
        action: "update",
        fileName: editingDoc?.name,
        coverImageSrc: editingDoc?.coverImage,
        pdfSrc: editingDoc?.pdfLink,
        studyContent: editingDoc?.studyContent,
        contentType: editingDoc?.studyContent ? "text" : "pdf",
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
