"use client";

import React, { useEffect, useState } from "react";
import AddlinksForm, { AddLinkFormState } from "../components/add-links-form";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { firestore } from "@/lib/firebase/firebase-config";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { ILink, Links } from "../components/types";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();
  const [isUploading, setIsUploading] = React.useState(false);
  const [Doclink, setlinks] = useState<{
    state: RequestState;
    data: Links | null;
  }>({
    state: "loading",
    data: null,
  });
  const [alreadyAlert, setAlreadyAlert] = useState<{
    isOpen: boolean;
    data: AddLinkFormState | null;
  }>({
    isOpen: false,
    data: null,
  });
  var loadingToastId: any;

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(firestore, "appconfig", "app-links"),
      (doc) => {
        if (doc.exists()) {
          console.log("Document data:", doc.data());
          setlinks({
            state: "success",
            data: doc.data() as Links,
          });
        }
      }
    );

    return () => unsubscribe();
  }, []); // fetching data from firestore

  const handleOverride = async () => { // this function will run and over write the exsisting value for the same value key pair
    const linkDoc = doc(firestore, "appconfig", "app-links");
    const filterValues = Doclink.data?.links.filter(
      (link, index) => link.type !== alreadyAlert.data?.type
    ); // filter the values that are not equal to the type of the new link
    // will return the values that are not equal to the type of the new link , for example if the new link is youtube then it will return the values that are not youtube such as whatsapp and website
    await updateDoc(linkDoc, {
      links: [
        ...(filterValues as ILink[]),
        {
          type: alreadyAlert.data?.type,
          url: alreadyAlert.data?.url,
        },
      ],
    });
    toast.success("Link Added Successfully");
    toast.dismiss(loadingToastId);
    router.back();
  };

  const onSubmitLink = async (values: AddLinkFormState) => {
    loadingToastId = toast.loading("Adding Links...");
    console.log("formvalues", { values });
    setIsUploading(true);

    const linkDoc = doc(firestore, "appconfig", "app-links");

    const AlreadyInDoc = Doclink.data?.links.filter((link, index) => {
      if (link.type === values.type && link.url !== "") {
        return link;
      }
    }); // check weather this value is already have a url in the doc or not
    
    if (AlreadyInDoc?.length !== 0) {
      setAlreadyAlert({
        isOpen: true,
        data: values,
      }); // if the value is already in the doc then set the alert to true
    } else {
      try {
        const filterValues = Doclink.data?.links.filter(
          (link, index) => link.type !== values.type
        ); // filter the values that are not equal to the type of the new link
        // will return the values that are not equal to the type of the new link , for example if the new link is youtube then it will return the values that are not youtube such as whatsapp and website
        await updateDoc(linkDoc, {
          links: [
            ...(filterValues as ILink[]),
            {
              type: values.type,
              url: values.url,
            },
          ],
        });
        toast.success("Link Added Successfully");
        toast.dismiss(loadingToastId);
        router.back();
      } catch (error) {
        console.log(error);
        toast.dismiss(loadingToastId);
        toast.error("There was an error adding this link");
      }
    }
  };
  return (
    <>
      <AddlinksForm
        action="add"
        // @ts-ignore
        onSubmit={onSubmitLink}
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
      <ConfirmationDialog
        isOpen={alreadyAlert.isOpen}
        onClose={() => {
          setAlreadyAlert({
            isOpen: false,
            data: null,
          });
          toast.dismiss(loadingToastId);
          setIsUploading(false);
        }}
        onConfirm={handleOverride}
      />
    </>
  );
};

export default Page;
