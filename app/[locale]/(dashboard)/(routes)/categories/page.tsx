"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
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
import useCategoryForm from "./hooks/use-category-form";

export default function Page() {
  const t = useI18n();
  const router = useRouter();
  const { setEditingDoc, setCategories: setCategoriesInCtx } =
    useCategoryForm();

  const [categories, setCategories] = useState<{
    state: RequestState;
    data: CategoryDocument[];
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
      collection(firestore, "categories"),
      (snapshot) => {
        const categories: CategoryDocument[] = [];

        snapshot.forEach((doc) => {
          categories.push({ id: doc.id, ...doc.data() } as CategoryDocument);
        });

        setCategories({
          state: "success",
          data: categories,
        });
        setCategoriesInCtx(categories);
      }
    );

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteChosenCategory = async () => {
    const categoryCoverRef = ref(
      fireStorage,
      "categories" + deleteAlert.id + "-cover"
    );

    try {
      try {
        await deleteObject(categoryCoverRef);
        console.log("category cover image deleted");
      } catch (error: any) {
        if (error.code === "storage/object-not-found") {
          console.log("image not found. continuing...");
        }
      }

      await deleteDoc(doc(firestore, "categories", deleteAlert.id));
    } catch (error) {
      console.log(error);

      // toast.error(t("pages.newsPopup.deleteError"));
      toast.error("There was an error deleting this file");
    }
  };

  console.log({ categories });

  return (
    <div>
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span>{t("actions.search")}</span>
          <Input />
        </div>

        <NavLink href="/categories/add" className={buttonVariants()}>
          {t("pages.categories.addCategory")}
        </NavLink>
      </div>

      <ListItem className="bg-primary mt-8 py-2 rounded-full">
        <span>{t("words.serialNo")}</span>
        <span>{t("words.categories")}</span>
        <span>{t("actions.edit")}</span>
      </ListItem>

      <div className="mt-6">
        {categories.state === "loading" ? (
          <Loader />
        ) : categories.data.length === 0 ? (
          <Alert>No categories found</Alert>
        ) : (
          <div className="space-y-4">
            {categories.data.map((data, index) => {
              return (
                <ListItem className="rounded-lg" key={data.id}>
                  <span>{index + 1}</span>
                  <span>{data.name}</span>
                  <ActionsDropdown
                    onEdit={() => {
                      setEditingDoc(data);
                      router.push("/categories/edit");
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
        onConfirm={deleteChosenCategory}
      />
    </div>
  );
}
