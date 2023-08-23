"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/ui/loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DEFAULT_ACCEPTED_IMAGE_TYPES,
  DEFAULT_IMAGE_MAX_SIZE,
} from "@/constants/general-schemas";
import { useI18n } from "@/internationalization/client";
import { fireStorage, firestore } from "@/lib/firebase/firebase-config";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type DocumentDataType = {
  refreshInterval: number;
  images: {
    name: string;
    url: string;
  }[];
};

export default function HomeSlider() {
  const t = useI18n();

  const [sliderData, setSliderData] = useState<{
    state: RequestState;
    data: DocumentDataType | undefined;
  }>({
    state: "loading",
    data: undefined,
  });

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isEditingSlider, setIsEditingSlider] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(firestore, "appconfig", "home-slider"),
      (doc) => {
        if (doc.exists())
          setSliderData({
            state: "success",
            data: doc.data() as DocumentDataType,
          });
      }
    );

    return () => unsubscribe();
  }, []);

  /**
   * Deletes an image from the home slider
   */
  const handleDeleteImage = async (index: number, imageName: string) => {
    // if its the last image, then revert the delete action. else update home slider doc
    // with this image removed
    if (sliderData.data?.images.length === 1) {
      // toast.error(t("pages.homeSlider.lastImageError"));
      toast.error("A slider must have at least one image");
      return;
    }

    const loadingToastId = toast.loading("Deleting image from the slider");

    const imageRef = ref(fireStorage, `slider-images/${imageName}`);
    const homeSliderDoc = doc(firestore, "appconfig", "home-slider");

    // trying to delete image from storage
    try {
      await deleteObject(imageRef);

      // update home slider doc with this image removed
      const updatedImages = sliderData.data?.images.filter(
        (_, i) => i !== index
      );

      await updateDoc(homeSliderDoc, {
        images: updatedImages,
      });

      setSelectedImageIndex(0);

      toast.remove(loadingToastId);
    } catch (error) {
      console.log(error);

      toast.dismiss(loadingToastId);
      // toast.error(t("pages.homeSlider.deleteImageError"));
      toast.error("Failed to delete image");
    }
  };

  /**
   * Adds an image to the home slider
   */
  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const loadingToastId = toast.loading("Adding image to the slider");

    if (e.target.files?.length) {
      const file = e.target.files[0];

      // validating file type and size
      if (!file.type.includes("image")) {
        // toast.error(t("pages.homeSlider.invalidImageType"));
        toast.dismiss(loadingToastId);
        toast.error("Invalid image type");
        return;
      }

      if (file.size > DEFAULT_IMAGE_MAX_SIZE) {
        // toast.error(t("pages.homeSlider.invalidImageSize"));
        toast.dismiss(loadingToastId);
        toast.error("Invalid image size");
        return;
      }

      const imageRef = ref(fireStorage, `slider-images/${file.name}`);
      const homeSliderDoc = doc(firestore, "appconfig", "home-slider");

      try {
        await uploadBytes(imageRef, file);
        const downloadURL = await getDownloadURL(imageRef);

        const updatedImages = [
          ...sliderData.data!.images,
          { name: file.name, url: downloadURL },
        ];

        try {
          await updateDoc(homeSliderDoc, {
            images: updatedImages,
          });

          toast.dismiss(loadingToastId);
          toast.success("Image added successfully");
        } catch (error) {
          // document update failed, so delete the image from storage
          await deleteObject(imageRef);
          console.log(error);
          // toast.error(t("pages.homeSlider.addImageError"));
          toast.dismiss(loadingToastId);
          toast.error("Failed to add image");
        }
      } catch (error) {
        console.log(error);
        // toast.error(t("pages.homeSlider.addImageError"));
        toast.dismiss(loadingToastId);
        toast.error("Failed to add image");
      }
    }
  };

  return (
    <section>
      <div className="space-y-4">
        <div className="flex justify-between items-center gap-4">
          <h3>{t("pages.homeSlider.imageSlider")}</h3>

          <div className="flex items-center gap-3">
            <Label>
              <span>{t("pages.homeSlider.refreshInterval")}: </span>
            </Label>

            <Select
              dir="rtl"
              disabled={!isEditingSlider}
              onValueChange={(value) => {
                setSliderData((prev) => ({
                  ...prev,
                  data: {
                    ...prev.data!,
                    refreshInterval: Number(value),
                  },
                }));

                updateDoc(doc(firestore, "appconfig", "home-slider"), {
                  refreshInterval: Number(value),
                });
              }}
              defaultValue={`${sliderData.data?.refreshInterval}`}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder={t("pages.homeSlider.refreshInterval")}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2000">
                  {t("intervals.seconds", { count: 2 })}
                </SelectItem>
                <SelectItem value="5000">
                  {t("intervals.seconds", { count: 5 })}
                </SelectItem>
                <SelectItem value="10000">
                  {t("intervals.seconds", { count: 10 })}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          {sliderData.state === "loading" ? (
            <Loader />
          ) : (
            <div className="flex flex-col items-center gap-8 mt-8">
              <div className="flex-grow">
                <Image
                  src={sliderData.data?.images?.[selectedImageIndex]?.url || ""}
                  alt="slider image"
                  height="400"
                  width="400"
                  className="rounded-2xl h-96 w-96 object-cover border"
                />
              </div>
              <div className="flex items-center gap-4">
                {sliderData.data?.images.map((image, index: number) => (
                  <div
                    key={index}
                    className={`relative w-16 h-16 rounded-2xl border border-accent ${
                      index === selectedImageIndex ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={image.url}
                      alt={image.name}
                      height="400"
                      width="400"
                      className="rounded-2xl h-full w-full object-cover"
                    />
                    {isEditingSlider && (
                      <button
                        className="absolute -top-1 -left-1 bg-destructive text-white flex justify-center items-center h-4 w-4 rounded-full"
                        onClick={() => handleDeleteImage(index, image.name)}
                      >
                        <Minus size={24} />
                      </button>
                    )}
                  </div>
                ))}

                {isEditingSlider && (
                  <div className="relative w-16 h-16 rounded-2xl border border-accent">
                    <input
                      type="file"
                      accept={DEFAULT_ACCEPTED_IMAGE_TYPES.join(",")}
                      className="absolute top-0 left-0 opacity-0 w-full h-full"
                      onChange={handleAddImage}
                    />
                    <div className="flex justify-center items-center h-full w-full">
                      <Plus size={24} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end mt-4">
            <Button
              onClick={() => setIsEditingSlider((prev) => !prev)}
              variant={isEditingSlider ? "default" : "outline"}
            >
              {isEditingSlider ? t("actions.done") : t("actions.edit")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
