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
        return "border-green-300 bg-green-50/80 dark:bg-green-900/30 dark:border-green-700";
      case "error":
        return "border-red-300 bg-red-50/80 dark:bg-red-900/30 dark:border-red-700";
      case "info":
        return "border-blue-300 bg-blue-50/80 dark:bg-blue-900/30 dark:border-blue-700";
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {visibleMessages.map((message) => (
        <div
          key={message.id}
          className={`flex items-start gap-3 p-3 rounded-lg border ${getMessageStyles(message.type)} animate-in slide-in-from-top-2 duration-300`}
          style={{
            backgroundColor: 'var(--color-card)',
            borderColor: 'var(--color-muted)',
            color: 'var(--color-text)'
          }}
        >
          {/* Icône */}
          <div className="flex-shrink-0 mt-0.5">
            {getMessageIcon(message.type)}
          </div>

          {/* Contenu */}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm" style={{ color: 'var(--color-text)' }}>
              {message.title}
            </h4>
            <p className="text-sm opacity-80 mt-1" style={{ color: 'var(--color-text)' }}>
              {message.content}
            </p>
          </div>

          {/* Bouton fermer */}
          <button
            onClick={() => onRemoveMessage(message.id)}
            className="flex-shrink-0 p-1 rounded-full transition-colors"
            style={{
              color: 'var(--color-text)',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-muted)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            aria-label="Fermer le message"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
