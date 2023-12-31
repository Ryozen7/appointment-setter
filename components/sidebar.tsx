// @ts-nocheck
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const Sidebar = ({ children }: any) => {
  const [collapse, setCollapse] = useState(false);
  const router = useRouter();
  const navigations = [
    { title: "Home", route: "/", srcIcon: "home" },
    { title: "Appointments", route: "/appointments", srcIcon: "appointment" },
    { title: "Messages", route: "/messages", srcIcon: "messages" },
    { title: "Contacts", route: "/contacts", srcIcon: "contacts" },
    {
      title: "Data Analytics",
      route: "/data-analytics",
      srcIcon: "data-analytics",
    },
    { title: "Subscription", route: "/subscription", srcIcon: "subscription" },
    { title: "Help Center", route: "/help-center", srcIcon: "help-center" },
    { title: "Settings", route: "/settings", srcIcon: "settings" },
  ];

  return (
    <div
      className={`${
        collapse ? "w-[120px]" : "w-[240px]"
      } h-screen bg-primary relative`}
    >
      <div className="h-[116px] w-full flex justify-center py-10 border-b-[1.5px] border-b-gray-700">
        <Link
          href={'/'}
        >
          <Image
            src={`${collapse ? "/images/logo.svg" : "/images/logo-name.svg"}`}
            height={collapse ? 40 : 50}
            width={collapse ? 40 : 150}
            alt="logo"
            priority={true}
          />
        </Link>
      </div>
      <div
        className={`w-full flex flex-col my-10 ${
          collapse ? "items-center" : ""
        }`}
      >
        {navigations.map((item) => (
          <div
            key={item.title}
            className={`w-full hover:text-secondary hover:border-r-secondary hover:border-r-2 ${
              item.route === router.pathname
                ? "text-secondary border-r-2 border-r-secondary"
                : " text-white"
            }`}
          >
            <Link
              href={item.route}
              className={`w-full mt-1 py-2 flex items-center ${
                collapse ? "pl-0 justify-center" : "pl-8"
              }`}
            >
              <div className="mr-2 h-[24px]">
                <Image
                  src={item.srcIcon ? `/images/${item.srcIcon}.svg` : ""}
                  width={20}
                  height={20}
                  alt={item.title}
                  priority={true}
                />
              </div>

              <div className={`${collapse ? "hidden" : "flex -mt-1"}`}>
                {item.title}
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div
        className={`w-[40px] h-[40px] absolute flex justify-center items-center opacity-90 bg-primary rounded-[8px] right-[-20px] bottom-[50vh] cursor-pointer ${
          collapse ? "rotate-180" : "rotate-0"
        }`}
        onClick={() => setCollapse((v) => !v)}
      >
        <Image
          src={`/images/double-arrow.svg`}
          height={20}
          width={20}
          alt="logo"
          priority={true}
        />
      </div>

      <div className="w-full flex flex-col items-center justify-center absolute bottom-0 py-10 border-t-[1.5px] border-t-gray-700">
        <Image
          src={"/images/logo.svg"}
          height={20}
          width={20}
          alt="logo"
          priority={true}
        />
        <span className="text-gray-600 text-[14px] mt-2">© Lorem 2023 </span>
      </div>
    </div>
  );
};

export default Sidebar;
