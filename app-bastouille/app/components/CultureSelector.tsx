"use client";

import React, { useEffect, useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

type Culture = {
  id: string;
  nom: string;
  img: string;
};

type CultureSelectorProps = {
  value: string | null;
  onChange: (id: string) => void;
};

export default function CultureSelector({
  value,
  onChange,
}: CultureSelectorProps) {
  const [cultures, setCultures] = useState<Culture[]>([]);

  useEffect(() => {
    fetch("/api/cultures")
      .then((res) => res.json())
      .then((data) => setCultures(data));
  }, []);

  const selectedCulture = cultures.find((c) => c.id === value) || null;

  return (
    <div className="w-full">
      <Listbox
        value={selectedCulture}
        onChange={(c: Culture) => onChange(c.id)}
      >
        <div className="relative">
          <Listbox.Button className="relative w-full h-16 flex items-center rounded-md bg-[var(--color-card)] px-3 pr-10 text-left text-[var(--color-text)] border border-gray-300">
            <div className="flex items-center gap-4">
              {selectedCulture ? (
                <div className="flex items-center gap-3">
                  <img
                    src={`/images/cultures/${selectedCulture.img}`}
                    alt={selectedCulture.nom}
                    className="h-14 w-14 object-contain"
                  />
                  <span className="text-lg leading-tight">
                    {selectedCulture.nom}
                  </span>
                </div>
              ) : (
                <span className="text-[var(--color-text-muted)]">
                  Sélectionner une culture
                </span>
              )}
            </div>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDown
                className="h-5 w-5 text-[var(--color-text-muted)]"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-96 w-full overflow-auto rounded-md bg-[var(--color-card)] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
              {cultures.map((culture) => (
                <Listbox.Option
                  key={culture.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-[13px] pl-10 pr-4 ${
                      active
                        ? "bg-[var(--color-accent)] text-white"
                        : "text-[var(--color-text)]"
                    }`
                  }
                  value={culture}
                >
                  {({ selected }) => (
                    <>
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 transform">
                        <img
                          src={`/images/cultures/${culture.img}`}
                          alt={culture.nom}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      </span>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        } ml-16 text-lg leading-tight`}
                      >
                        {culture.nom}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-white">
                          <Check className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
