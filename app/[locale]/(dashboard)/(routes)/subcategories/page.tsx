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
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useSubCategoryForm from "./hooks/use-subcategory-form";
import useCategoryForm from "../categories/hooks/use-category-form";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import SassySelect from "@/components/ui/sassy-select";

export default function Page() {
  const t = useI18n();
  const router = useRouter();

  const { setEditingDoc } = useSubCategoryForm();

  const { categories: parentCategories, setCategories: setParentCategories } =
    useCategoryForm();

  const [parentId, setParentId] = useState<string | undefined>(undefined);
  const [subcategories, setSubcategories] = useState<{
    state: RequestState;
    data: SubCategoryDocument[];
  }>({
    state: "loading",
    data: [],
  });

  const [deleteAlert, setDeleteAlert] = useState({
    isOpen: false,
    id: "",
  });

  useEffect(() => {
    if (parentCategories.length === 0) {
      getDocs(collection(firestore, "categories")).then((querySnapshot) => {
        setParentCategories(
          querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            } as CategoryDocument;
          })
        );
      });
    }
    /*
      Requirement:
        if parentId is not provided, then fetch all subcategories
        if parentId is provided, then fetch subcategories of that category
        Maybe we can use a query here
      */
    const q = parentId
      ? query(
          collection(firestore, "subcategories"),
          where("parentId", "==", parentId)
        )
      : query(collection(firestore, "subcategories"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const subcategories: SubCategoryDocument[] = [];

      querySnapshot.forEach((doc) => {
        subcategories.push({
          id: doc.id,
          ...doc.data(),
        } as SubCategoryDocument);
      });

      setSubcategories({
        state: "success",
        data: subcategories,
      });
    });

    return () => unsubscribe();
  }, [parentId]);

  const deleteChosenSubcategory = async () => {
    const coverImgRef = ref(
      fireStorage,
      "subcategories/" + deleteAlert.id + "-cover"
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

      await deleteDoc(doc(firestore, "subcategories", deleteAlert.id));
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
          <div className="flex items-center gap-2 basis-60">
            <span>{t("actions.search")}</span>
            <Input />
          </div>

          <SassySelect
            options={[
              {
                id: "",
                name: "All",
              },
              ...parentCategories,
            ]}
            labelKey="name"
            valueKey="id"
            placeholder="Select Parent Category"
            value={parentId}
            onValueChange={setParentId}
          />
        </div>
        <NavLink href={`/subcategories/add`} className={buttonVariants()}>
          Add Subcategory
          {/* {t("pages.categories.addCategory")} */}
        </NavLink>
      </div>

      <ListItem className="bg-primary mt-8 py-2 rounded-full">
        <span>{t("words.serialNo")}</span>
        <span>{t("words.subcategories")}</span>
        <span>{t("actions.edit")}</span>
      </ListItem>

      <div className="mt-6">
        {subcategories.state === "loading" ? (
          <Loader />
        ) : subcategories.data.length === 0 ? (
          <Alert>No subcategories found</Alert>
        ) : (
          <div className="space-y-4">
            {subcategories.data.map((data, index) => {
              return (
                <ListItem className="rounded-lg" key={data.id}>
                  <span>{index + 1}</span>
                  <span>{data.name}</span>
                  <ActionsDropdown
                    onEdit={() => {
                      setEditingDoc(data);
                      router.push(`/subcategories/edit`);
                    }}
                    onDelete={() => {
                      setDeleteAlert({
                        isOpen: true,
                        id: data.id,
                      });
                    }}
                    onContent={() => {
                      router.push(`/subcategories/${data.id}/content`);
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
        onConfirm={deleteChosenSubcategory}
      />
    </div>
  );
}
