"use client";
import React, { useEffect } from "react";
import useRequestForm from "../components/use-request-form";

import { useI18n } from "@/internationalization/client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "@/lib/firebase/firebase-config";

type Props = {};

function Page({}: Props) {
  const t = useI18n();
  const router = useRouter();

  const { editingDoc } = useRequestForm();
  const [incomingDoc, setIncomingDoc] = React.useState<RequestsData | null>(
    null
  );
  const [isUploading, setIsUploading] = React.useState(false);

  useEffect(() => {
    if (editingDoc) {
      console.log(editingDoc);
      setIncomingDoc(editingDoc);
    } else {
      console.log("no doc");
    }
  }, []);

  const handleSubmit = async (id: string) => {
    const loadingToastId = toast.loading("Approving...");

    setIsUploading(true);

    const requestRef = doc(firestore, "requests", id); // gets the request doc
    try {
      await updateDoc(requestRef, {
        approve: true,
        updatedAt: serverTimestamp(),
      }); // updates the request doc
      toast.dismiss(loadingToastId);
      toast.success("Request approved successfully");
      router.back();
    } catch (error) {
      console.log(error); // logs the error if error occurs
      toast.dismiss(loadingToastId);
      toast.error("Error approving request");
    }
  };
  return (
    <div>
      <div className="space-y-8">
        <div className="flex justify-between">
          <Label>{t("pages.requests.formTitle")}</Label>
        </div>
        <div className="mt-18">
          {incomingDoc !== null && (
            <div>
              <div className="flex flex-row items-center mt-4 ">
                <Label className="basis-36 text-base whitespace-nowrap font-medium">
                  {t("pages.requests.name")}:
                </Label>
                <p className="text-base ">{incomingDoc.userInfo.name}</p>
              </div>
              <div className="flex flex-row items-center mt-4 ">
                <Label className="basis-36 text-base whitespace-nowrap font-medium ">
                  {t("pages.requests.email")}:
                </Label>
                <p className="text-base ">{incomingDoc.userInfo.email}</p>
              </div>
              <div className="flex flex-row items-center mt-4 ">
                <Label className="basis-36 text-base whitespace-nowrap font-medium">
                  {t("pages.requests.phoneNumber")}:
                </Label>
                <p className="text-base ">{incomingDoc.userInfo.phoneNo}</p>
              </div>
              <div className="flex flex-row items-center mt-4 ">
                <Label className="basis-36 text-base whitespace-nowrap font-medium">
                  {t("pages.requests.address")}:
                </Label>
                <p className="text-base ">{incomingDoc.userInfo.address}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 w-[95%]">
        <footer className="mt-8 flex justify-between ">
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

          <Button
            size={"lg"}
            onClick={() => {
              handleSubmit(incomingDoc?.id as string);
            }}
            disabled={isUploading}
          >
            <Check className="w-5 h-5 ml-1" />
            {t("actions.approve")}
            {}
          </Button>
        </footer>
      </div>
    </div>
  );
}

export default Page;
