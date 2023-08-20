"use client";
import React from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/internationalization/client";
import NewsPopupForm, {
  NewsPopupFormState,
} from "./components/news-popup-form";

export default function Page() {
  const t = useI18n();

  const onNewsSubmission = async (values: NewsPopupFormState) => {
    console.log({ values });
  };

  return (
    <div className="flex flex-col gap-4 ">
      <span className="font-md text-md">
        {t("pages.newsPopup.formTitle")} :
      </span>

      <div className="mt-8">
        <NewsPopupForm
          onSubmit={onNewsSubmission}
          className="pr-10"
          footer={
            <div className="mt-4 flex justify-end">
              <Button size={"lg"} type="submit">
                <Check className="w-5 h-5 ml-1" />
                {t("actions.done")}
              </Button>
            </div>
          }
        />

        {/* <div className=" flex flex-row">
          <div className="flex flex-row content-start mx-4">
            <text className="text-lg">{t("words.video")} :</text>
            <label htmlFor="VideoInput">
              <div className="w-[calc(30vw-8rem)] h-[calc(35vh-6rem)] cursor-pointer border-2 border-primary mr-10 rounded-2xl flex flex-row justify-center items-center">
                <text className=" font-normal text-2xl text-[#7B7B7B]">
                  {" "}
                  {t("actions.uploadVideo")}
                </text>
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  id="VideoInput"
                />
              </div>
            </label>
          </div>
          <div className="flex flex-row content-start mx-4">
            <text className="text-lg">{t("words.image")} :</text>
            <label htmlFor="PictureInput">
              <div className="w-[calc(30vw-8rem)] h-[calc(35vh-6rem)] cursor-pointer border-2 border-primary mr-10 rounded-2xl flex flex-row justify-center items-center">
                <text className=" font-normal text-2xl text-[#7B7B7B]">
                  {" "}
                  {t("actions.uploadImage")}
                </text>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  className="hidden"
                  id="PictureInput"
                />
              </div>
            </label>
          </div>
        </div> */}
        {/* <div className="mt-8">
          <div className="flex flex-row content-start ml-12">
            <text className="text-lg">{t("words.text")} :</text>

            <textarea
              className="w-[calc(50vw-8rem)] h-[calc(43vh-6rem)] pt-4 border-2 border-primary mr-10 rounded-2xl pr-4"
              value={
                " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae suntporro similique rem! Minus amet laudantium, odit excepturi repellat,distinctio, ratione debitis natus deserunt quasi sequi est inventoredolore ea. Officia aliquid numquam quibusdam praesentium hic cupiditatevelit, fugiat, beatae consectetur voluptas impedit harum molestiaeexplicabo vero sunt modi officiis aperiam. Ipsam voluptatum officia  "
              }
            />
          </div>
        </div> */}
      </div>
    </div>
  );
}
