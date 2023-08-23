"use client";
import React, { useEffect, useState } from "react";
import useRequestForm from "./components/use-request-form";
import { useRouter } from "next/navigation";
import { useI18n } from "@/internationalization/client";
import toast from "react-hot-toast";

import { firestore } from "@/lib/firebase/firebase-config";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";

import { ActionsDropdown } from "@/components/ui/actions-dropdown";
import { Alert } from "@/components/ui/alert";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { Input } from "@/components/ui/input";
import { ListItem } from "@/components/ui/list-item";
import { Loader } from "lucide-react";




export default function Page() {
  const t = useI18n();
  const router = useRouter();
  const { setEditingDoc } = useRequestForm();

  const [requests, setRequests] = useState<{
    state: RequestState;
    data: RequestsData[];
  }>({
    state: "loading",
    data: [],
  });

  const [deleteAlert, setDeleteAlert] = useState({
    isOpen: false,
    id: "",
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "requests"),
      (snapshot) => {
        const studyData: RequestsData[] = [];

        snapshot.forEach((doc) => {
          studyData.push({ id: doc.id, ...doc.data() } as RequestsData);
        });

        const filteredData: RequestsData[] = studyData.filter(
          (data) => data.approve === false
        );

        setRequests({
          state: "success",
          data: filteredData,
        });
      }
    ); //* gets all the requests and filter them if they are already approved



    return () => unsubscribe();
  }, []);

  const deleteRequest = async () => {
    try {
      await deleteDoc(doc(firestore, "requests", deleteAlert.id));
    } catch (error) {
      console.log(error);

      toast.error("There was an error deleting this file");
    }
  };

  return (
    <div>
      <div className="flex flex-row-reverse justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span>{t("actions.search")}</span>
          <Input />
        </div>
      </div>
      <ListItem className="bg-primary mt-8 py-2 rounded-full">
        <span>{t("words.serialNo")}</span>
        <span>{t("words.requests")}</span>
        <span>{t("pages.requests.type")}</span>
        <span>{t("actions.edit")}</span>
      </ListItem>
      <div className="mt-6">
        {requests.state === "loading" ? (
          <Loader />
        ) : requests.data.length === 0 ? (
          <Alert>No daily studies content found</Alert>
        ) : (
          <div className="space-y-4">
            {requests.data.map((data, index) => {
              return (
                <ListItem className="rounded-lg" key={data.id}>
                  <span>{index + 1}</span>
                  <span>{data.fileName}</span>
                  {data.type === "free" || data.type === "חינם" ? (
                    <span className="text-green-500">{data.type} </span>
                  ) : (
                    <span className="text-red-500"> {data.type}</span>
                  )}
                  <ActionsDropdown
                    onApprove={() => {
                      setEditingDoc(data);
                      router.push("/requests/approve");
                    }}
                    onDelete={() => {
                      setDeleteAlert({
                        isOpen: true,
                        id: data.id,
                      });
                      console.log("delete");
                    }}
                  />
                </ListItem>
              );
            })}
          </div>
        )}
      </div>
      <ConfirmationDialog
        isOpen={deleteAlert.isOpen}
        onClose={() =>
          setDeleteAlert({
            isOpen: false,
            id: "",
          })
        }
        onConfirm={deleteRequest}
      />
    </div>
  );
}
