"use client";

import React from "react";
import {
  Droplets,
  Thermometer,
  Sun,
  Wind,
  CloudSun,
} from "lucide-react";
import WeatherDisplayCard from "@/components/WeatherDisplayCard";

export default function DemoPage() {
  const weather = {
    temperature: 21.4,
    humidity: 65,
    pressure: 1013,
    windspeed: 7.8,
    sunshine: 4.3,
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Zone 1 - En-tête */}
      <header className="p-4 border-b">
        <h1 className="text-xl font-semibold">Page de Démonstration</h1>
      </header>

      {/* Zone 2 - Contenu principal */}
      <main className="flex-1 p-4 space-y-4">
        <WeatherDisplayCard
          temperature={21.4}
          humidity={65}
          pressure={1013}
          windspeed={7.8}
          uvIndex={4.5}
        />
        <WeatherDisplayCard
          temperature={28.9}
          humidity={52}
          pressure={1009}
          windspeed={5.4}
          uvIndex={7.2}
        />
      </main>

      {/* Zone 3 - Optionnel : Footer ou navigation */}
      <footer className="p-4 border-t text-sm text-center text-muted-foreground">
        Zone de pied de page ou navigation de test
      </footer>
    </div>
  );
}