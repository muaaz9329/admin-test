"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, deleteDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";

import { fireStorage, firestore } from "@/lib/firebase/firebase-config";
import { useI18n } from "@/internationalization/client";

import { Button } from "@/components/ui/button";
import PopupNewsForm, {
  PopupNewsFormState,
} from "../components/popup-news-form";
import { Check, X } from "lucide-react";

export default function Page() {
  const t = useI18n();
  const router = useRouter();

  const [isUploading, setIsUploading] = React.useState(false);

  const onNewsSubmission = async (values: PopupNewsFormState) => {
    const loadingToastId = toast.loading("Adding news...");
    setIsUploading(true);

    /*
    We'll first add a document to news collection and keep image and video fields empty.
    Then we'll update image and video to cloud storage folder news with the document id as name like docid-image, docid-video
    Then we'll update the document with the image and video urls.

    If an error occurs during news addition, we'll delete the document from news collection and delete the image and video from storage.
    */

    // creating a reference to news folder in storage
    const folderRef = ref(fireStorage, "news");

    // creating a reference to news collection in firestore
    const newsCollection = collection(firestore, "news");

    try {
      // adding a document to news collection
      const newsDoc = await addDoc(newsCollection, {
        content: values.newsContent,
        image: "",
        video: "",
      });

      // creating a reference to image and video in storage
      const imageRef = ref(folderRef, `${newsDoc.id}-image`);
      const videoRef = ref(folderRef, `${newsDoc.id}-video`);

      // * we don't need any file upload progress for now

      // const imageUploadTask = uploadBytesResumable(imageRef, values.newsImage);
      // // const videoUploadTask = uploadBytesResumable(videoRef, values.newsVideo);

      // imageUploadTask.on(
      //   "state_changed",
      //   (snapshot) => {
      //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      //     const progress =
      //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //     toast.loading(`Uploading image ${progress.toFixed(2)}%`);
      //   },
      //   (error) => {
      //     // Handle unsuccessful uploads
      //     console.log({ error });
      //     toast.dismiss(loadingToastId);
      //     toast.error("Error while uploading image");
      //     // delete the document from news collection
      //     deleteDoc(newsDoc);
      //   },
      //   () => {
      //     // Handle successful uploads on complete
      //     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      //     getDownloadURL(imageUploadTask.snapshot.ref).then((downloadURL) => {
      //       console.log("File available at", downloadURL);
      //       updateDoc(newsDoc, {
      //         image: downloadURL,
      //       });
      //     });
      //   }
      // );

      // * promise method for my own reference
      // uploadBytes(imageRef, values.newsImage)
      //   .then((snapshot) => {
      //     console.log("News image uploaded");

      //     console.log("image", { snapshot });

      //     getDownloadURL(imageRef).then((downloadURL) => {
      //       console.log("File available at", downloadURL);
      //       updateDoc(newsDoc, {
      //         image: downloadURL,
      //       });
      //     });
      //   })
      //   .catch((error) => {
      //     console.log({ error });
      //     toast.dismiss(loadingToastId);
      //     toast.error("Error while uploading image");
      //     // delete the document from news collection
      //     deleteDoc(newsDoc);
      //   });

      // trying to upload image to storage and update the document with the image url. if error occurs, delete the document from news collection and return from the function
      try {
        await uploadBytes(imageRef, values.newsImage);
        console.log("News image uploaded");

        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(newsDoc, {
          image: downloadURL,
        });
      } catch (error) {
        console.log({ error });

        setIsUploading(false);
        toast.dismiss(loadingToastId);
        toast.error("News cannot be added. Error while uploading image.");
        // delete the document from news collection
        deleteDoc(newsDoc);

        return;
      }

      // trying to upload video to storage and update the document with the video url. if error occurs, delete the document from news collection and return from the function
      try {
        await uploadBytes(videoRef, values.newsVideo);
        console.log("News video uploaded");

        const downloadURL = await getDownloadURL(videoRef);
        await updateDoc(newsDoc, {
          video: downloadURL,
        });
      } catch (error) {
        setIsUploading(false);

        console.log({ error });
        toast.dismiss(loadingToastId);
        toast.error("News cannot be added. Error while uploading video.");
        // delete the document from news collection
        deleteDoc(newsDoc);

        return;
      }

      // if everything is successful, dismiss the loading toast and show success toast
      setIsUploading(false);

      toast.dismiss(loadingToastId);
      toast.success("News added successfully");

      // redirect to news page
      router.back();
    } catch (error) {
      setIsUploading(false);

      console.log({ error });
      toast.dismiss(loadingToastId);
      toast.error("Error adding news");
    }
  };

  return (
    <div className="flex flex-col gap-4 ">
      <span className="font-md text-md">
        {t("pages.newsPopup.formTitle")} :
      </span>

      <div className="mt-8">
        <PopupNewsForm
          onSubmit={onNewsSubmission}
          className="pr-10"
          footer={
            <div className="mt-4 flex justify-between">
              <Button
                size={"lg"}
                variant="outline"
                type="reset"
                disabled={isUploading}
                onClick={() => {
                  router.back();
                }}
              >
                <X className="w-5 h-5 ml-1" />
                {t("actions.cancel")}
              </Button>

              <Button size={"lg"} type="submit" disabled={isUploading}>
                <Check className="w-5 h-5 ml-1" />
                {t("actions.done")}
              </Button>
            </div>
          }
        />
      </div>
    </div>
  );
}
