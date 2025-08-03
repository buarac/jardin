"use client";

import { JSX, useEffect, useState } from "react";
import { ArrowUp, ArrowDown, BadgeCheck, CircleX, EyeOff, Activity, Clock } from "lucide-react";
import { cn } from "@lib/utils";

type LogJob = {
  started_at: string | null;
  ended_at: string | null;
  job_name: string;
  message: string;
  log: string;
  status: "OK" | "KO" | "IGNORED" | "PARTIAL" | "PENDING";
};

const statusIcons: Record<LogJob["status"], JSX.Element> = {
  OK: <BadgeCheck className="text-green-500" />,
  KO: <CircleX className="text-red-500" />,
  IGNORED: <EyeOff className="text-gray-400" />,
  PARTIAL: <Activity className="text-yellow-500" />,
  PENDING: <Clock className="text-blue-500" />,
};

export default function LogJobsPage() {
  const [data, setData] = useState<LogJob[]>([]);
  const [sortKey, setSortKey] = useState<keyof LogJob>("ended_at");
  const [sortDesc, setSortDesc] = useState(true);

  useEffect(() => {
    fetch("/api/jobs/logs")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const sorted = [...data].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    if (aVal === null || bVal === null) {
      if (aVal === null && bVal === null) return 0;
      return aVal === null ? 1 : -1;
    }

    if (aVal > bVal) return sortDesc ? -1 : 1;
    if (aVal < bVal) return sortDesc ? 1 : -1;
    return 0;
  });

  const handleSort = (key: keyof LogJob) => {
    if (key === sortKey) setSortDesc(!sortDesc);
    else {
      setSortKey(key);
      setSortDesc(false);
    }
  };

  const headers: { key: keyof LogJob; label: string }[] = [
    { key: "status", label: "Statut" },
    { key: "started_at", label: "Début" },
    { key: "ended_at", label: "Fin" },
    { key: "job_name", label: "Script" },
    { key: "message", label: "Message" },
    { key: "log", label: "Détails techniques" },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Historique des jobs</h1>
      <div className="max-h-[70vh] overflow-y-auto">
        <table className="min-w-full table-auto border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {headers.map((header) => (
              <th
                key={header.key}
                className="p-2 cursor-pointer text-left"
                onClick={() => handleSort(header.key)}
              >
                {header.label}
                {sortKey === header.key && (sortDesc ? <ArrowDown className="inline ml-1 w-4 h-4" /> : <ArrowUp className="inline ml-1 w-4 h-4" />)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((job, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="p-2">{statusIcons[job.status]}</td>
              <td className="p-2">{job.started_at ? new Date(job.started_at).toLocaleString("fr-FR") : "-"}</td>
              <td className="p-2">{job.ended_at ? new Date(job.ended_at).toLocaleString("fr-FR") : "-"}</td>
              <td className="p-2 font-mono text-sm">{job.job_name}</td>
              <td className="p-2 text-sm">{job.message}</td>
              <td
                className="p-2 text-xs truncate max-w-xs font-mono text-gray-700 cursor-pointer"
                onClick={() => {
                  if (job.log) alert(job.log);
                }}
                title="Cliquer pour voir le détail"
              >
                {typeof job.log === "string"
                  ? job.log.length > 100
                    ? job.log.slice(0, 100) + "…"
                    : job.log
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
}