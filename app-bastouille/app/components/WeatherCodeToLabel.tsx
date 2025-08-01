export type WeatherCode =
  | 0 | 1 | 2 | 3
  | 45 | 48
  | 51 | 53 | 55
  | 56 | 57
  | 61 | 63 | 65
  | 66 | 67
  | 71 | 73 | 75
  | 77
  | 80 | 81 | 82
  | 85 | 86
  | 95 | 96 | 99;

import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudHail
} from "lucide-react";

function weatherCodeToLabelInternal(code: WeatherCode) {
  if (code === 0) return { icon: Sun, label: "Ensoleillé" };
  if (code === 1) return { icon: CloudSun, label: "Principalement clair" };
  if (code === 2) return { icon: CloudSun, label: "Partiellement nuageux" };
  if (code === 3) return { icon: Cloud, label: "Couvert" };

  if (code === 45 || code === 48) return { icon: CloudFog, label: "Brouillard" };

  if (code >= 51 && code <= 57) return { icon: CloudDrizzle, label: "Bruine" };
  if (code >= 61 && code <= 67) return { icon: CloudRain, label: "Pluie" };
  if (code >= 71 && code <= 77) return { icon: CloudSnow, label: "Neige" };

  if (code === 80 || code === 81 || code === 82) return { icon: CloudRain, label: "Averses" };

  if (code === 95) return { icon: CloudLightning, label: "Orage" };
  if (code === 96 || code === 99) return { icon: CloudHail, label: "Orage avec grêle" };

  return { icon: Cloud, label: "Inconnu" };
}

export default function WeatherCodeToLabel({ code, large = false, hideText = false }: { code: WeatherCode; large?: boolean; hideText?: boolean }) {
  const { icon: Icon, label } = weatherCodeToLabelInternal(code);
  console.log("WeatherCodeToLabel → code:", code, "label:", label, "icon:", Icon.name);
  return (
    <div className="flex flex-col items-center justify-center">
      <Icon className={`${large ? "w-10 h-10" : "w-6 h-6"} text-skin-accent`} />
      {!hideText && <span className="text-sm">{label}</span>}
    </div>
  );
}