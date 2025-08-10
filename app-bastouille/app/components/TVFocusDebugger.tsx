"use client";

import React, { useState, useEffect } from "react";

interface TVFocusEvent {
  timestamp: number;
  element: string;
  timeSinceLast: number;
}

export const TVFocusDebugger: React.FC = () => {
  const [focusEvents, setFocusEvents] = useState<TVFocusEvent[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleFocusIn = (event: globalThis.FocusEvent) => {
      const target = event.target as HTMLElement;
      if (!target || !target.hasAttribute('data-focusable')) return;

      const now = Date.now();
      const lastEvent = focusEvents[focusEvents.length - 1];
      const timeSinceLast = lastEvent ? now - lastEvent.timestamp : 0;

      const newEvent: TVFocusEvent = {
        timestamp: now,
        element: target.getAttribute('data-culture-name') || target.textContent?.slice(0, 20) || 'Inconnu',
        timeSinceLast
      };

      setFocusEvents(prev => {
        const newEvents = [...prev, newEvent];
        if (newEvents.length > 10) {
          return newEvents.slice(-10);
        }
        return newEvents;
      });

      console.log(`🎯 Focus TV: ${newEvent.element} (${timeSinceLast}ms depuis dernier)`);
    };

    document.addEventListener('focusin', handleFocusIn);
    
    return () => {
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, [focusEvents]);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-8 right-8 bg-red-600 text-white px-4 py-2 rounded-full shadow-lg z-50 hover:bg-red-700"
      >
        🐛 Debug TV
      </button>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 bg-black bg-opacity-90 text-white p-4 rounded-lg shadow-2xl z-50 max-w-md max-h-96 overflow-y-auto">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-lg font-bold text-red-400">🐛 Debug Navigation TV</h4>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>
      
      {/* Événements de focus */}
      <div className="space-y-2 text-sm">
        <div className="text-xs text-[var(--color-accent)] font-bold mb-2">🎯 Événements de Focus:</div>
        {focusEvents.length === 0 ? (
          <div className="text-gray-400">Aucun événement de focus détecté</div>
        ) : (
          focusEvents.map((event, index) => (
            <div key={index} className="border-l-2 border-red-400 pl-3">
              <div className="font-mono text-xs text-gray-300">
                {new Date(event.timestamp).toLocaleTimeString()}
              </div>
              <div className="text-white">{event.element}</div>
              {event.timeSinceLast > 0 && (
                <div className="text-green-400 text-xs">
                  +{event.timeSinceLast}ms
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-gray-600 text-xs text-gray-400">
        <div>🎯 Événements de focus en temps réel</div>
        <div>📺 Pour déboguer la navigation TV</div>
        <div>🔄 Rafraîchit automatiquement</div>
        <div className="text-yellow-400 mt-2">
          ⚠️ Navigation native TizenOS (pas de transformation souris→touches)
        </div>
      </div>
    </div>
  );
};
