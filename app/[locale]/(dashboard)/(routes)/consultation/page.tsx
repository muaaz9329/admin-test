"use client";
import { ActionsDropdown } from "@/components/ui/actions-dropdown";
import { Alert } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { Input } from "@/components/ui/input";
import { ListItem } from "@/components/ui/list-item";
import { Loader } from "@/components/ui/loader";
import { NavLink } from "@/components/ui/nav-link";
import { useI18n } from "@/internationalization/client";
import { fireStorage, firestore } from "@/lib/firebase/firebase-config";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import {  Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConsulForm from "./components/hooks/useConsulForm";



const Page = () => {
  const t = useI18n();

  const router = useRouter();
  const {setForm} = useConsulForm()

  const [consult, setConsult] = useState<{
    state: RequestState;
    data: ConsultationDoc[];
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
      collection(firestore, "consultation"),
      (snapshot) => {
        const studyData: ConsultationDoc[] = [];

        snapshot.forEach((doc) => {
          studyData.push({ id: doc.id, ...doc.data() } as ConsultationDoc);
        });

        setConsult({
          state: "success",
          data: studyData,
        });
      }
    );

    return () => unsubscribe();
  }, []);

  const deleteConsultFile = async () => {
    console.log("deleteConsultFile", deleteAlert.id);
    const ConsultImgRef =  ref(
      fireStorage,
      "consultation/" + deleteAlert.id + "-image"
    )
    try{
      try{
        deleteObject(ConsultImgRef)
        console.log('deleted image')
      }
      catch(e:any){
        if (e.code === "storage/object-not-found") {
          console.log("studies image not found. continuing...");
        }
      }
      await deleteDoc(doc(firestore,'consultation',deleteAlert.id))
    }
    catch(e){
      console.error(e)
      toast.error("There was an error deleting this file");
    }
  }
  return (
    <div>
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span>{t("actions.search")}</span>
          <Input />
        </div>

        <NavLink href="/consultation/add" className={buttonVariants()}>
          {t("pages.consultation.addBtn")}
          <Plus className="mr-2" size={16} />
        </NavLink>
      </div>

      <ListItem className="bg-primary mt-8 py-2 rounded-full">
        <span>{t("words.serialNo")}</span>
        <span>{t("pages.consultation.files")}</span>
        <span>{t("pages.requests.type")}</span>
        <span>{t("actions.edit")}</span>
      </ListItem>
      <div className="mt-6">
        {consult.state === "loading" ? (
          <Loader />
        ) : consult.data.length === 0 ? (
          <Alert>No daily studies content found</Alert>
        ) : (
          <div className="space-y-4">
            {consult.data.map((data, index) => {
              return (
                <ListItem className="rounded-lg" key={data.id}>
                  <span>{index + 1}</span>
                  <span>{data.fileName}</span>
                  {data.fileType === "free" ? (
                    <span className="text-green-500">{data.fileType} </span>
                  ) : (
                    <span className="text-red-500"> {data.fileType}</span>
                  )}
                  <ActionsDropdown
                    onEdit={() => {
                      setForm(data)
                      router.push("/consultation/edit");
                      console.log('edit')
                    }}
                    onDelete={() => {
                      setDeleteAlert({
                        isOpen: true,
                        id: data.id,
                      });
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
        onConfirm={deleteConsultFile}
      />
    </div>
  );
};

export default Page;
