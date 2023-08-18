import React from "react";
import { Button } from "@/components/ui/button";
import EmailIcon from "./Components/EmailIcon";
import PasswordIcon from "./Components/PasswordIcon";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex flex-col items-center pt-10 bg-white w-[450px] h-[400px] rounded-2xl z-10">
      <text>כניסה למנהל מערכת</text>

      <div className="mt-[54px]">
        <div className="relative ">
          <input
            type="emain"
            id="default-search"
            className="block w-full p-4 pr-10 text-sm text-gray-900 border border-primary rounded-lg bg-white  focus:border-primary shadow-sm shadow-primary "
            placeholder="אימייל"
            required
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
           <EmailIcon Height={18} Width={18}/>
          </div>
        </div>
      </div>
      <div className="mt-[30px]">
        <div className="relative ">
          <input
            type="emain"
            id="default-search"
            className="block w-ful p-4 pr-10 p text-sm font-normal text-gray-900 border border-primary rounded-lg bg-white  focus:border-primary  shadow-sm shadow-primary"
            placeholder="סיסמה"
            required
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <PasswordIcon Height={18} Width={18}/>
          </div>
        </div>
      </div>
      <div className="mt-7" >
        <Button size={"default"} className="font-normal" >התחברות</Button>
      </div>
    </div>
  );
};

export default page;
