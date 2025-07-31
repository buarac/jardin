import Image from "next/image";
import type { Recolte, Culture } from "@/lib/prisma/client";
import { format } from "date-fns";

/**
 * Combined type representing a harvest together with its associated culture.
 * Prisma's query API allows you to include related records; this type makes
 * it easier to type those results in TypeScript.
 */
export interface HarvestWithCulture extends Recolte {
  culture: Culture;
}

/**
 * Utility function to format a JavaScript Date into the French date/time
 * format used in the application: DD/MM/YYYY HH:mm.
 */
function formatDate(date: Date) {
  return format(date, "dd/MM/yyyy HH:mm");
}

/**
 * A card component that displays a detailed view of a harvest. This is used
 * on the home screen for the most recent harvest. It shows the culture
 * illustration, name, date/time, weight, quantity (if any) and weather data.
 */
export function HarvestCardLarge({
  harvest,
}: {
  harvest: HarvestWithCulture;
}) {
  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow border border-border">
      <div className="flex items-center gap-4">
        <Image
          src={`/cultures/${harvest.culture.img}`}
          alt={harvest.culture.nom}
          width={64}
          height={64}
          className="rounded-md object-cover"
        />
        <div className="flex flex-col justify-center">
          <span className="font-semibold text-lg text-kaki-dark">
            {harvest.culture.nom}
          </span>
          <span className="text-sm text-muted-foreground">
            {formatDate(new Date(harvest.date))}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-foreground">
        <span>
          <span className="font-medium">Poids:&nbsp;</span>
          {(harvest.poids / 1000).toFixed(2)} kg
        </span>
        {harvest.quantite !== null && (
          <span>
            <span className="font-medium">Qté:&nbsp;</span>
            {harvest.quantite}
          </span>
        )}
      </div>
      <div className="grid grid-cols-5 gap-2 text-xs text-muted-foreground mt-2">
        <div className="flex flex-col items-center">
          <span className="font-medium">T°</span>
          <span>{harvest.meteoTemperature ?? "—"}°C</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-medium">Hum.</span>
          <span>{harvest.meteoHumidite ?? "—"}%</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-medium">Press.</span>
          <span>{harvest.meteoPression ?? "—"} hPa</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-medium">Vent</span>
          <span>{harvest.meteoVent ?? "—"} m/s</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-medium">UV</span>
          <span>{harvest.meteoUV ?? "—"}</span>
        </div>
      </div>
    </div>
  );
}

/**
 * A compact list item representing a harvest. Used below the large card on
 * the home screen to display the next three most recent harvests. Displays
 * the culture image, name, date/time and weight/quantity.
 */
export function HarvestCardSmall({
  harvest,
}: {
  harvest: HarvestWithCulture;
}) {
  return (
    <div className="flex items-center gap-3 p-2 bg-white rounded-md shadow border border-border">
      <Image
        src={`/cultures/${harvest.culture.img}`}
        alt={harvest.culture.nom}
        width={40}
        height={40}
        className="rounded-sm object-cover"
      />
      <div className="flex-1">
        <div className="flex justify-between">
          <span className="font-medium text-sm text-kaki-dark">
            {harvest.culture.nom}
          </span>
          <span className="text-xs text-muted-foreground">
            {(harvest.poids / 1000).toFixed(2)} kg
            {harvest.quantite !== null && ` / ${harvest.quantite}`}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          {formatDate(new Date(harvest.date))}
        </span>
      </div>
    </div>
  );
}