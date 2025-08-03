"use client";
import { useState } from "react";
import { Header } from "@/components/Header";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import weatherCodeToLabel from "@/components/WeatherCodeToLabel";

export default function SettingsPage() {
  const [weather, setWeather] = useState<any>(null);

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Paramétrage" backHref="/" />
      <div className="p-4">
        <ThemeSwitcher />
      </div>
    </div>
  );
}
