"use client";

import { ActionsDropdown } from "@/components/ui/actions-dropdown";
import { buttonVariants } from "@/components/ui/button";
import { ListItem } from "@/components/ui/list-item";
import { fireStorage, firestore } from "@/lib/firebase/firebase-config";
import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { NavLink } from "@/components/ui/nav-link";
import React from "react";
import { Loader } from "@/components/ui/loader";
import { Alert } from "@/components/ui/alert";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";


export default function Page() {
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

  console.log({ studies });
  return (
    <div>
      <NavLink href="/daily-studies/add" className={buttonVariants()}>
        Add file
      </NavLink>

      <ListItem className=" bg-primary mt-4 rounded-lg">
        <span>lorem</span>
        <span>ipsum</span>
        <span>edit</span>
      </ListItem>
      {studies.state === "loading" ? (
        <Loader />
      ) : studies.data.length === 0 ? (
        <Alert>No daily studies content found</Alert>
      ) : (
        <div>
          {studies.data.map((data,index) => {
            return (
              <ListItem className="mt-4 rounded-lg">
                <span>{index+1}</span>
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
      <ConfirmationDialog
        isOpen={deleteAlert.isOpen}
        onClose={() =>
          setDeleteAlert({
            isOpen: false,
            id: "",
          })
        }
        onConfirm={async () => {
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
        }}
      />
    </div>
  );
};

export default page;
