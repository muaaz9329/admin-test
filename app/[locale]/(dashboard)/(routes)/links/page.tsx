"use client";

import { buttonVariants } from "@/components/ui/button";
import { ListItem } from "@/components/ui/list-item";

import { NavLink } from "@/components/ui/nav-link";
import { useI18n } from "@/internationalization/client";
import { firestore } from "@/lib/firebase/firebase-config";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ILink, Links } from "./components/types";
import { Loader } from "@/components/ui/loader";
import { Alert } from "@/components/ui/alert";
import { ActionsDropdown } from "@/components/ui/actions-dropdown";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useLinkData from "./components/hooks/useLinkData";

const Page = () => {
  const t = useI18n();
  const router = useRouter();
  const { setEditingLink } = useLinkData();

  const [appLinks, setAppLinks] = useState<{
    state: RequestState;
    data: ILink[] | null;
    rawData: Links | null;
  }>({
    state: "loading",
    data: null,
    rawData: null,
  });

  const [deleteAlert, setDeleteAlert] = useState<{
    isOpen: boolean;
    type: string;
  }>({
    isOpen: false,
    type: "",
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(firestore, "appconfig", "app-links"),
      (doc) => {
        if (doc.exists()) {
          console.log("Document data:", doc.data());

          const filteredData = doc
            .data()
            ?.links.filter((data: ILink) => data.url !== ""); //* filter the empty links

          setAppLinks({
            state: "success",
            data: filteredData,
            rawData: doc.data() as Links,
          });
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const deleteLink = async () => {
    const linkDoc = doc(firestore, "appconfig", "app-links");

    const filterValues = appLinks.rawData?.links?.filter(
      (link, index) => link.type !== deleteAlert.type
    );
    try {
      await updateDoc(linkDoc, {
        links: [
          ...(filterValues as ILink[]),
          {
            type: deleteAlert.type,
            url: "",
          },
        ],
      });
    } catch (error) {
      console.log(error);

      toast.error("There was an error deleting this link");
    }
  };

  const typeToTitle = {
    youtube: t("pages.links.youtube"),
    website: t("pages.links.website"),
    whatsapp: t("pages.links.whatsapp"),
    youtubePlaylist: t("pages.links.youtubePlaylist"),
  };

  return (
    <div>
      <div className="flex justify-between items-center gap-4 flex-row-reverse">
        <NavLink href="/links/add" className={buttonVariants()}>
          {t("pages.links.formTitle")}
          <Plus className="mr-2" size={16} />
        </NavLink>
      </div>

      <ListItem className="bg-primary mt-8 py-2 rounded-full">
        <span>{t("words.serialNo")}</span>
        <span>{t("words.links")}</span>
        <span>{t("actions.edit")}</span>
      </ListItem>
      <div className="mt-6">
        {appLinks.state === "loading" ? (
          <Loader />
        ) : appLinks.data?.length === 0 ? (
          <Alert>You have not added any links yet.</Alert>
        ) : (
          <div className="space-y-4">
            {appLinks.data?.map((data, index) => {
              return (
                <ListItem className="rounded-lg" key={data.url}>
                  <span>{index + 1}</span>
                  <span>{typeToTitle[data.type]}</span>
                  <ActionsDropdown
                    onEdit={() => {
                      setEditingLink(data);
                      router.push("/links/edit");
                    }}
                    onDelete={() => {
                      setDeleteAlert({
                        isOpen: true,
                        type: data.type,
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
            type: "",
          })
        }
        onConfirm={deleteLink}
      />
    </div>
  );
};

export default Page;
