"use client";
import React from "react";
import useConsulForm from "../components/hooks/useConsulForm";
import AddFileForm, { AddFileFormState } from "../components/add-file-form";
import { useRouter } from "next/navigation";
import { useI18n } from "@/internationalization/client";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import toast from "react-hot-toast";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { fireStorage, firestore } from "@/lib/firebase/firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Page = () => {
  const { editingForm } = useConsulForm();
  console.log(editingForm);
  const t = useI18n();
  const router = useRouter();

  const [isUploading, setIsUploading] = React.useState(false);

  function parseNumber(input: string) {
    // Check if the input is a valid number string
    if (/^\d+$/.test(input)) {
      return parseInt(input);
    } else {
      return "undefined";
    }
  }

  const onUpdate = async (values: AddFileFormState) => {
    console.log(values);
    const loadingToastId = toast.loading("Updating Form...");
    setIsUploading(true);

    const studyDoc = doc(firestore, "consultation", editingForm?.id!);
    const coverImgRef = ref(
      fireStorage,
      `consultation/${editingForm?.id}-image`
    );

    try {
      const updatedDoc: Partial<ConsultationDoc> = {
        fileType: values.fileType,
        fileName: values.fileName,
        content: values.content,
        createdAt: serverTimestamp(),
      };
      if (parseNumber(values.amount) !== "undefined") {
        updatedDoc["amount"] = parseNumber(values.amount) as number;
      } else {
        throw new Error("Amount is not a number");
      }

      let newCoverSrc: string | undefined = undefined;
      if (values.coverImage) {
        try {
          await uploadBytes(coverImgRef, values.coverImage);
          newCoverSrc = await getDownloadURL(coverImgRef);
          console.log("image uploaded");
        } catch (error) {
          console.log({ error });

          toast.dismiss(loadingToastId);
          toast.error("Error uploading cover image");
          setIsUploading(false);
          return;
        }
      }

      (updatedDoc["coverImage"] = newCoverSrc || editingForm?.coverImage),
        console.log(updatedDoc);

      await updateDoc(studyDoc, updatedDoc);
      toast.dismiss(loadingToastId);
      toast.success("Consultation updated successfully");
      router.back();
    } catch (error: any) {
      if (error.message === "Amount is not a number") {
        toast.error("Amount is not a number");
      } else {
        toast.error("Error Updating Consultation");
      }
      toast.dismiss(loadingToastId);
      setIsUploading(false);
    }
  };

  return (
    <div>
      <AddFileForm
        initialValues={{
          action: "update",
          content: editingForm?.content,
          fileType: editingForm?.fileType,
          amount: String(editingForm?.amount),
          coverImageSrc: editingForm?.coverImage,
          fileName: editingForm?.fileName,
        }}
        action="update"
        onSubmit={onUpdate}
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
    </div>
  );
};

export default Page;
