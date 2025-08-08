// components/SplashScreen.tsx
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Attendre que TOUTES les images visibles soient chargées
    const images = Array.from(document.images);
    const promises = images.map(
      (img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((res) => {
              img.onload = img.onerror = res;
            })
    );

    Promise.all(promises).then(() => {
      // Un petit timeout pour un fondu fluide (optionnel)
      setTimeout(() => setLoaded(true), 500);
    });
  }, []);

  
  return (
    <div
      className={`fixed inset-0 z-50 py-16 px-16 flex items-center justify-center bg-black transition-opacity duration-1000 ${
        loaded ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <img
        src="/splash-screen-tv.png"
        alt="Chargement"
        className="w-full h-full object-cover"
        style={{ filter: "drop-shadow(0 0 10px white)" }}
      />
    </div>
  );
}