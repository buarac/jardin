"use client";

import React, { useEffect, useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

type Recipient = {
  id: string;
  nom: string;
  img: string;
  poids: number;
};

type RecipientSelectorProps = {
  value: string | null;
  onChange: (id: string) => void;
};

export default function RecipientSelector({ value, onChange }: RecipientSelectorProps) {
  const [recipients, setRecipients] = useState<Recipient[]>([]);

  useEffect(() => {
    fetch("/api/recipients")
      .then((res) => res.json())
      .then((data) => {
        const pasDeRecipient: Recipient = {
          id: "none",
          nom: "Pas de récipient",
          img: "none.png", // Prévois une image placeholder si nécessaire
          poids: 0,
        };

        const fullList = [...data, pasDeRecipient];
        const defaultIndex = fullList.findIndex(r => r.nom.toLowerCase() === "plastique noir");
        setRecipients(fullList);

        // Sélectionner "Plastique noir" par défaut si value est null
        if (value === null && defaultIndex !== -1) {
          onChange(fullList[defaultIndex].id);
        }
      });
  }, [value, onChange]);

  const selectedRecipient = recipients.find((r) => r.id === value) || null;

  return (
    <div className="w-full">
      <Listbox value={selectedRecipient} onChange={(r: Recipient) => onChange(r.id)}>
        <div className="relative">
          <Listbox.Button className="relative w-full h-16 flex items-center rounded-md bg-[var(--color-card)] px-3 pr-10 text-left text-[var(--color-text)] border border-gray-300">
            <div className="flex items-center gap-4">
              {selectedRecipient ? (
                <div className="flex items-center gap-3">
                  <img
                    src={`/images/recipients/${selectedRecipient.img}`}
                    alt={selectedRecipient.nom}
                    className="h-12 w-12 object-contain"
                  />
                  <span  className="text-lg leading-tight">{selectedRecipient.nom}</span>
                </div>
              ) : (
                <span className="text-[var(--color-text-muted)]">Sélectionner un récipient</span>
              )}
            </div>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDown className="h-5 w-5 text-[var(--color-text-muted)]" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-[var(--color-card)] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
              {recipients.map((recipient) => (
                <Listbox.Option
                  key={recipient.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-[13px] pl-10 pr-4 ${
                      active ? "bg-[var(--color-accent)] text-white" : "text-[var(--color-text)]"
                    }`
                  }
                  value={recipient}
                >
                  {({ selected }) => (
                    <>
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                        <img
                          src={`/images/recipients/${recipient.img}`}
                          alt={recipient.nom}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      </span>
                      <span
                        className={`block truncate ${selected ? "font-medium" : "font-normal"} ml-16 text-lg leading-tight`}
                      >
                        {recipient.nom} ({recipient.poids}g)
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