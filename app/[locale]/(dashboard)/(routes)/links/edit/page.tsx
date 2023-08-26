"use client";

import React, { useEffect, useState } from "react";
import AddlinksForm, { AddLinkFormState } from "../components/add-links-form";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import useLinkData from "../components/hooks/useLinkData";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebase/firebase-config";
import { ILink, Links } from "../components/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Page = () => {
  const router = useRouter();
  const { editingLink } = useLinkData();
  const [isUploading, setIsUploading] = React.useState(false);
  const [Doclink, setlinks] = useState<{
    state: RequestState;
    data: Links | null;
  }>({
    state: "loading",
    data: null,
  });

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

  const onUpdateLink = async (values: AddLinkFormState) => {
    const loadingToastId = toast.loading("Adding Link...");
    console.log("formvalues", { values });
    setIsUploading(true);

    const linkDoc = doc(firestore, "appconfig", "app-links");

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
  };
  return (
    <>
      <AddlinksForm
        action="add"
        // @ts-ignore
        onSubmit={onUpdateLink}
        initialValues={{
          action: "update",
          type: editingLink?.type,
          url: editingLink?.url,
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
    </>
  );
};

export default Page;
