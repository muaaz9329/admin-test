"use client";

import { Button } from "@/components/ui/button";
import {
  DEFAULT_ACCEPTED_IMAGE_TYPES,
  DEFAULT_IMAGE_MAX_SIZE,
} from "@/constants/general-schemas";
import { ONE_MB } from "@/constants/sizes";
import { useI18n } from "@/internationalization/client";
import { fireStorage, firestore } from "@/lib/firebase/firebase-config";
import { DocumentData, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function SettingsPage() {
  const t = useI18n();

  const [settings, setSettings] = useState<{
    state: RequestState;
    data: DocumentData | undefined;
  }>({
    state: "loading",
    data: undefined,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newSelectedLogo, setNewSelectedLogo] = useState<File | undefined>(
    undefined
  );

  const settingsDoc = doc(firestore, "appconfig", "panel-settings");

  useEffect(() => {
    const unsubscribe = onSnapshot(settingsDoc, (doc) => {
      setSettings({
        state: "success",
        data: doc.data(),
      });
    });

    return () => unsubscribe();
  }, []);

  const handleSaveSettings = async () => {
    // checking if the user has selected a new logo
    if (newSelectedLogo) {
      // validating image type and size
      if (
        !DEFAULT_ACCEPTED_IMAGE_TYPES.includes(newSelectedLogo.type) ||
        newSelectedLogo.size > DEFAULT_IMAGE_MAX_SIZE
      ) {
        toast.error(
          // t("messages.invalidLogoTypeOrSize")
          `Only images of type ${DEFAULT_ACCEPTED_IMAGE_TYPES.join(
            ", "
          )} and size less than ${
            DEFAULT_IMAGE_MAX_SIZE / ONE_MB
          } mbs are allowed`
        );
        return;
      }

      const loadingToastId = toast.loading("Saving settings...");

      try {
        // creating a reference to adminLogo in storage
        const adminLogoRef = ref(fireStorage, "adminLogo");

        // uploading the logo to storage
        await uploadBytes(adminLogoRef, newSelectedLogo);

        // getting the download url of the logo
        const downloadUrl = await getDownloadURL(adminLogoRef);

        // updating the logo url in firestore
        await updateDoc(settingsDoc, {
          adminLogo: downloadUrl,
        });

        toast.dismiss(loadingToastId);
        toast.success("Settings saved successfully");
      } catch (error) {
        console.error(error);
        toast.dismiss(loadingToastId);
        toast.error("An error occurred while saving settings");
      }
    }

    setIsEditing(false);
  };

  return (
    <section>
      <h2 className="font-medium text-md">
        {t("pages.settingsForm.settingsFormTitle")}
      </h2>

      <div className="pr-10 mt-8">
        <div className="flex gap-4">
          <h3 className="font-medium">{t("pages.settingsForm.adminLogo")}</h3>
          <div>
            <Image
              src={
                isEditing && newSelectedLogo
                  ? URL.createObjectURL(newSelectedLogo)
                  : settings.data?.adminLogo
              }
              alt="Admin Logo"
              width={400}
              height={400}
              className="rounded-2xl h-96 w-96 object-cover border"
            />

            {isEditing && (
              <div className="mt-4 text-center">
                <Button className="relative">
                  {t("actions.change")}

                  <input
                    type="file"
                    accept={DEFAULT_ACCEPTED_IMAGE_TYPES.join(",")}
                    className="absolute top-0 left-0 opacity-0 w-full h-full"
                    onChange={(e) => setNewSelectedLogo(e.target.files?.[0])}
                  />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-8">
        {isEditing && (
          <Button
            variant="outline"
            // disabled={isUploading}
            className="ml-auto"
            onClick={() => {
              setIsEditing(false);
            }}
          >
            <X className="w-5 h-5 ml-1" />
            {t("actions.cancel")}
          </Button>
        )}

        <Button
          variant={isEditing ? "default" : "outline"}
          onClick={() => {
            if (isEditing) handleSaveSettings();
            else setIsEditing(true);
          }}
        >
          {isEditing ? t("actions.done") : t("actions.edit")}
        </Button>
      </div>
    </section>
  );
}
