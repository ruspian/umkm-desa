"use client";

import { Users } from "@/types/user";
import { Globe, MapIcon, Shield } from "lucide-react";
import { useState } from "react";
import TabUmumUser from "./TabUmumUser";

const SettingUserClient = ({ user }: { user: Users }) => {
  const [activeTab, setActiveTab] = useState("Umum");

  // Menu Navigasi
  const menuItems = [
    { label: "Umum", icon: <Globe size={20} /> },
    { label: "Alamat", icon: <MapIcon size={20} /> },
    { label: "Keamanan", icon: <Shield size={20} /> },
  ];
  return (
    <div className="p-4 md:p-10 max-w-400 mx-auto space-y-10 animate-in fade-in duration-700">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 dark:border-gray-800 pb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
            Konfigurasi <span className="text-orange-600">Sistem</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Atur pengaturan sistem AsliSini.
            <span className="text-orange-600 font-bold">{activeTab}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* SIDEBAR NAVIGATION */}
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`flex items-center gap-4 px-6 py-5 rounded-[1.8rem] font-black text-sm transition-all duration-300 ${
                activeTab === item.label
                  ? "bg-white dark:bg-gray-900 text-orange-600 shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 scale-105"
                  : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:translate-x-2"
              }`}
            >
              <span
                className={`${activeTab === item.label ? "text-orange-600" : "text-gray-400"}`}
              >
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* CONTENT AREA */}
        <div className="lg:col-span-3 min-h-150">
          {/*  UMUM */}
          {activeTab === "Umum" && (
            <div className="">
              <TabUmumUser userSetting={user} />
            </div>
          )}

          {activeTab === "Alamat" && (
            <div className="">
              <p>ini adalah tab Alamat</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingUserClient;
