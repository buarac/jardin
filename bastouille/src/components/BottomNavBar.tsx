import Link from "next/link";

export default function BottomNavBar() {
  return (
    <div className="flex justify-around items-center h-16 border-t bg-gray-100">
      <Link href="/">
        <button className="flex flex-col items-center text-sm">
          <span>🏠</span>
          <span>Accueil</span>
        </button>
      </Link>
      <Link href="/recolte">
        <button className="flex flex-col items-center text-sm">
          <span>🌾</span>
          <span>Récolte</span>
        </button>
      </Link>
      <Link href="/cultures">
        <button className="flex flex-col items-center text-sm">
          <span>🌱</span>
          <span>Cultures</span>
        </button>
      </Link>
      <Link href="/historique">
        <button className="flex flex-col items-center text-sm">
          <span>📜</span>
          <span>Historique</span>
        </button>
      </Link>
    </div>
  );
}