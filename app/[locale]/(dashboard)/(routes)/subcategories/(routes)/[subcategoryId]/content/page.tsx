"use client";

import { ActionsDropdown } from "@/components/ui/actions-dropdown";
import { Alert } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { ListItem } from "@/components/ui/list-item";
import { Loader } from "@/components/ui/loader";
import { NavLink } from "@/components/ui/nav-link";
import { useI18n } from "@/internationalization/client";
import { fireStorage, firestore } from "@/lib/firebase/firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import useSubcategoryContentForm from "./hooks/use-subcategory-content-form";

/**
 * Subcategory Content Page
 */
export default function Page({
  params,
}: {
  params: { subcategoryId: string };
}) {
  const t = useI18n();
  const router = useRouter();
  const subcategoryId = params.subcategoryId;

  const { setEditingDoc } = useSubcategoryContentForm();

  const [subcategory, setSubcategory] = useState<{
    state: RequestState;
    data: SubCategoryDocument | undefined;
  }>({
    state: "loading",
    data: undefined,
  });

  const [subcategoryContent, setSubcategoryContent] = useState<{
    state: RequestState;
    data: SubcategoryContentDocument[];
  }>({
    state: "loading",
    data: [],
  });
  const [deleteAlert, setDeleteAlert] = useState({
    isOpen: false,
    id: "",
  });

  useEffect(() => {
    // validating if the subcategory exists
    const subcategoryRef = doc(firestore, "subcategories", subcategoryId);
    let subcategoryDoc;
    getDoc(subcategoryRef)
      .then((doc) => {
        if (doc.exists()) {
          subcategoryDoc = doc.data() as SubCategoryDocument;
          setSubcategory({
            state: "success",
            data: subcategoryDoc,
          });
        } else {
          console.log("No such document!");
          toast.error("Subcategory not found");
          router.push("/404");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    // querying the subcategory content from 'category-content' collection where the parentId is equal to the subcategory id
    const contentQuery = query(
      collection(firestore, "category-content"),
      where("parentId", "==", subcategoryId)
    );

    const unsubscribe = onSnapshot(contentQuery, (querySnapshot) => {
      setSubcategoryContent({
        state: "success",
        data: querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          } as SubcategoryContentDocument;
        }),
      });
    });

    return () => unsubscribe();
  }, [subcategoryId, router]);

  const deleteContent = async () => {
    const coverImgRef = ref(
      fireStorage,
      "category-content/" + deleteAlert.id + "-cover"
    );
    const pdfRef = ref(
      fireStorage,
      "category-content/" + deleteAlert.id + "-pdf"
    );

    try {
      try {
        await deleteObject(coverImgRef);
        console.log("cover image deleted");
      } catch (error: any) {
        if (error.code === "storage/object-not-found") {
          console.log("image not found. continuing...");
        }
      }

      try {
        await deleteObject(pdfRef);
        console.log("pdf deleted");
      } catch (error: any) {
        if (error.code === "storage/object-not-found") {
          console.log("pdf not found. continuing...");
        }
      }

      await deleteDoc(doc(firestore, "category-content", deleteAlert.id));
    } catch (error) {
      console.log(error);

      // toast.error(t("pages.newsPopup.deleteError"));
      toast.error("There was an error deleting this file");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center gap-4">
        <div className="flex gap-3">
          <div className="whitespace-nowrap flex flex-col">
            <span>
              {t("words.subcategory")} {t("words.name")}:{" "}
            </span>
            {
              <span className="font-semibold">
                {subcategory.state === "loading"
                  ? "Loading..."
                  : subcategory.data?.name}
              </span>
            }
          </div>
        </div>
        <NavLink
          href={`/subcategories/${subcategoryId}/content/add`}
          className={buttonVariants()}
        >
          {t("words.addContent")}
        </NavLink>
      </div>

      <ListItem className="bg-primary mt-8 py-2 rounded-full">
        <span>{t("words.serialNo")}</span>
        <span>{t("words.fileName")}</span>
        <span>{t("actions.edit")}</span>
      </ListItem>

      <div className="mt-6">
        {subcategoryContent.state === "loading" ? (
          <Loader />
        ) : subcategoryContent.data.length === 0 ? (
          <Alert>{t("words.noContent")}</Alert>
        ) : (
          <div className="space-y-4">
            {subcategoryContent.data.map((data, index) => {
              return (
                <ListItem className="rounded-lg" key={data.id}>
                  <span>{index + 1}</span>
                  <span>{data.name}</span>
                  <ActionsDropdown
                    onEdit={() => {
                      setEditingDoc(data);
                      router.push(
                        `/subcategories/${data.parentId}/content/edit`
                      );
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
        onConfirm={deleteContent}
      />
    </div>
  );
}
