"use client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

import { fireStorage, firestore } from "@/lib/firebase/firebase-config";

import { NavLink } from "@/components/ui/nav-link";
import { Loader } from "@/components/ui/loader";
import { Alert } from "@/components/ui/alert";
import { ActionsDropdown } from "@/components/ui/actions-dropdown";
import { buttonVariants } from "@/components/ui/button";
import { ListItem } from "@/components/ui/list-item";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { useI18n } from "@/internationalization/client";
import { Input } from "@/components/ui/input";

export default function Page() {
  const t = useI18n();

  const [studies, setStudies] = useState<{
    state: RequestState;
    data: DocumentData[];
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
      collection(firestore, "daily-studies"),
      (snapshot) => {
        const studyData: DocumentData[] = [];

        snapshot.forEach((doc) => {
          studyData.push({ id: doc.id, ...doc.data() });
        });

        setStudies({
          state: "success",
          data: studyData,
        });
      }
    );

    return () => unsubscribe();
  }, []);

  const deleteStudyFile = async () => {
    const studiesImageRef = ref(
      fireStorage,
      "daily-studies/" + deleteAlert.id + "-image"
    );
    //   const newsVideoRef = ref(
    //     fireStorage,
    //     "news/" + deleteAlert.id + "-video"
    //   );

    try {
      await deleteObject(studiesImageRef);
      console.log("studies image deleted");

      // await deleteObject(newsVideoRef);
      // console.log("news video deleted");

      await deleteDoc(doc(firestore, "daily-studies", deleteAlert.id));
    } catch (error) {
      console.log(error);
      // toast.error(t("pages.newsPopup.deleteError"));
      toast.error("There was an error deleting this file");
    }
  };

  console.log({ studies });

  return (
    <div>
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span>{t("actions.search")}</span>
          <Input />
        </div>

        <NavLink href="/daily-studies/add" className={buttonVariants()}>
          {t("actions.addFile")}
        </NavLink>
      </div>

      <ListItem className="bg-primary mt-8 py-2 rounded-full">
        <span>{t("words.serialNo")}</span>
        <span>{t("words.dailyStudies")}</span>
        <span>{t("actions.edit")}</span>
      </ListItem>

      <div className="mt-6">
        {studies.state === "loading" ? (
          <Loader />
        ) : studies.data.length === 0 ? (
          <Alert>No daily studies content found</Alert>
        ) : (
          <div className="space-y-4">
            {studies.data.map((data, index) => {
              return (
                <ListItem className="rounded-lg" key={data.id}>
                  <span>{index + 1}</span>
                  <span>{data.name}</span>
                  <ActionsDropdown
                    onEdit={() => {
                      console.log("edit");
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
        onConfirm={deleteStudyFile}
      />
    </div>
  );
}
