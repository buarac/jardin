"use client"
import { useState } from "react";
import { Header } from "@/components/Header";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { weatherCodeToLabel } from "@/components/WeatherCodeToLabel";

export default function SettingsPage() {
  const [weather, setWeather] = useState<any>(null);

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Paramétrage" backHref="/" />
      <div className="p-4">
        <ThemeSwitcher />
        <div className="mt-6">
          <button
            className="px-4 py-2 bg-skin-accent text-white rounded"
            onClick={async () => {
              const res = await fetch("/api/meteo");
              const data = await res.json();
              setWeather(data);
            }}
          >
            Récupérer la météo
          </button>
          {weather && (
            <div className="mt-4 border p-3 rounded text-sm space-y-1 bg-skin-muted">
              <div>🌡️ Température : {weather.temperature} °C</div>
              <div>💧 Humidité : {weather.humidite} %</div>
              <div>💨 Vent : {weather.vent} km/h</div>
              <div>🌧️ Précipitations : {weather.qte_pluie} mm</div>
              <div>🔆 UV : {weather.indice_uv}</div>
              {(() => {
                const WeatherIcon = weatherCodeToLabel(weather.weathercode).icon;
                const WeatherLabel = weatherCodeToLabel(weather.weathercode).label;
                return (
                  <div className="flex items-center gap-2">
                    {WeatherIcon && (
                      <WeatherIcon className="w-6 h-6 text-skin-accent" />
                    )}
                    <span>{WeatherLabel}</span>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}