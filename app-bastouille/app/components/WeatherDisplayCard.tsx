import React from "react";
import {
  Droplets,
  Thermometer,
  SunMedium,
  Wind,
  CloudSun
} from "lucide-react";

interface WeatherDisplayCardProps {
  temperature: number;
  humidity: number;
  pressure: number;
  windspeed: number;
  uvIndex: number;
}

export default function WeatherDisplayCard({
  temperature,
  humidity,
  pressure,
  windspeed,
  uvIndex,
}: WeatherDisplayCardProps) {
  return (
    <div className="grid grid-cols-5 gap-4 p-4 border rounded-md bg-muted text-center text-sm">
      <div className="flex flex-col items-center">
        <Thermometer className="w-6 h-6 text-skin-accent" />
        <span>{temperature} °C</span>
      </div>
      <div className="flex flex-col items-center">
        <Droplets className="w-6 h-6 text-skin-accent" />
        <span>{humidity} %</span>
      </div>
      <div className="flex flex-col items-center">
        <SunMedium className="w-6 h-6 text-skin-accent" />
        <span>{uvIndex}</span>
      </div>
      <div className="flex flex-col items-center">
        <Wind className="w-6 h-6 text-skin-accent" />
        <span>{windspeed} km/h</span>
      </div>
      <div className="flex flex-col items-center">
        <CloudSun className="w-6 h-6 text-skin-accent" />
        <span>{pressure} hPa</span>
      </div>
    </div>
  );
}