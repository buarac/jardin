"use client";

import React, { useEffect, useState } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { MobileMessage } from "@/types/mobile";

interface MobileMessageZoneProps {
  messages: MobileMessage[];
  onRemoveMessage: (messageId: string) => void;
  className?: string;
}

export const MobileMessageZone: React.FC<MobileMessageZoneProps> = ({
  messages,
  onRemoveMessage,
  className = "",
}) => {
  const [visibleMessages, setVisibleMessages] = useState<MobileMessage[]>([]);

  // Gérer l'auto-hide des messages
  useEffect(() => {
    const autoHideMessages = messages.filter(m => m.autoHide);
    
    autoHideMessages.forEach(message => {
      const timer = setTimeout(() => {
        onRemoveMessage(message.id);
      }, 5000); // Auto-hide après 5 secondes

      return () => clearTimeout(timer);
    });
  }, [messages, onRemoveMessage]);

  // Filtrer les messages visibles (pas plus de 3 à la fois)
  useEffect(() => {
    setVisibleMessages(messages.slice(-3));
  }, [messages]);

  if (visibleMessages.length === 0) return null;

  const getMessageIcon = (type: MobileMessage["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getMessageStyles = (type: MobileMessage["type"]) => {
    switch (type) {
      case "success":
        return "border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800";
      case "error":
        return "border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800";
      case "info":
        return "border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800";
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {visibleMessages.map((message) => (
        <div
          key={message.id}
          className={`flex items-start gap-3 p-3 rounded-lg border ${getMessageStyles(message.type)} animate-in slide-in-from-top-2 duration-300`}
        >
          {/* Icône */}
          <div className="flex-shrink-0 mt-0.5">
            {getMessageIcon(message.type)}
          </div>

          {/* Contenu */}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm text-[var(--color-text)]">
              {message.title}
            </h4>
            <p className="text-sm text-[var(--color-text)] opacity-80 mt-1">
              {message.content}
            </p>
          </div>

          {/* Bouton fermer */}
          <button
            onClick={() => onRemoveMessage(message.id)}
            className="flex-shrink-0 p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            aria-label="Fermer le message"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
