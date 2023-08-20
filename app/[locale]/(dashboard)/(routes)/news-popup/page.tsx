"use client";

import { Button } from "@/components/ui/button";
import { useScopedI18n } from "@/internationalization/client";
import { Check } from "lucide-react";
import React from "react";

type Props = {};

export default function Page({}: Props) {
  const scopedT = useScopedI18n("pages.newsPopup");

  return (
    <div>
      <text className="font-normal text-md">{scopedT("form")} :</text>
      <div className="mr-[94px] mt-[35px] ">
        <div className=" flex flex-row">
          <div className="flex flex-row content-start mx-4">
            <text className="text-lg">{scopedT("video")} :</text>
            <label htmlFor="VideoInput">
              <div className="w-[calc(30vw-8rem)] h-[calc(35vh-6rem)] cursor-pointer border-2 border-primary mr-10 rounded-2xl flex flex-row justify-center items-center">
                <text className=" font-normal text-2xl text-[#7B7B7B]">
                  {" "}
                  {scopedT("uploadVideo")}
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
            <text className="text-lg">{scopedT("image")} :</text>
            <label htmlFor="PictureInput">
              <div className="w-[calc(30vw-8rem)] h-[calc(35vh-6rem)] cursor-pointer border-2 border-primary mr-10 rounded-2xl flex flex-row justify-center items-center">
                <text className=" font-normal text-2xl text-[#7B7B7B]">
                  {" "}
                  {scopedT("uploadImage")}
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
        </div>
        <div className="mt-8">
          <div className="flex flex-row content-start ml-12">
            <text className="text-lg">{scopedT("Text")} :</text>

            <textarea
              className="w-[calc(50vw-8rem)] h-[calc(43vh-6rem)] pt-4 border-2 border-primary mr-10 rounded-2xl pr-4"
              value={
                " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae suntporro similique rem! Minus amet laudantium, odit excepturi repellat,distinctio, ratione debitis natus deserunt quasi sequi est inventoredolore ea. Officia aliquid numquam quibusdam praesentium hic cupiditatevelit, fugiat, beatae consectetur voluptas impedit harum molestiaeexplicabo vero sunt modi officiis aperiam. Ipsam voluptatum officia  "
              }
            />
          </div>
        </div>
        <div className="mt-4" dir="ltr">
          <Button size={"lg"}>
            {scopedT("Done")}
            <Check className="w-5 h-5 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
