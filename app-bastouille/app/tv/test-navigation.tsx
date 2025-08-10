"use client"
import React, { useState } from 'react';

export const TestNavigation: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 hover:bg-blue-700"
      >
        🧪 Test Navigation
      </button>
    );
  }

  return (
    <div className="fixed top-4 right-4 bg-black bg-opacity-70 text-white p-4 rounded-lg shadow-lg z-50 max-w-xs">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-lg font-bold text-blue-400">🧪 Test Navigation TV</h4>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="text-sm text-gray-300 mb-4">
        <p>Navigation native TizenOS</p>
        <p>Utilisez la télécommande directement</p>
      </div>

      {/* Instructions de test */}
      <div className="text-xs text-gray-400">
        <p>✅ Flèches : Navigation native</p>
        <p>✅ OK : Sélection native</p>
        <p>✅ Retour : Navigation arrière</p>
        <p>⚠️ Pas de transformation souris→touches</p>
      </div>
    </div>
  );
};
