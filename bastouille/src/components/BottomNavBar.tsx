import { Home, Sprout, Leaf, History } from "lucide-react";
import Link from "next/link";

export default function BottomNavBar() {
  return (
    <div className="flex justify-around items-center pb-8">
      <Link href="/">
        <button className="flex flex-col items-center text-sm">
          <Home className="w-5 h-5" />
          <span>Accueil</span>
        </button>
      </Link>
      <Link href="/recolte">
        <button className="flex flex-col items-center text-sm">
          <Sprout className="w-5 h-5" />
          <span>Récolte</span>
        </button>
      </Link>
      <Link href="/cultures">
        <button className="flex flex-col items-center text-sm">
          <Leaf className="w-5 h-5" />
          <span>Cultures</span>
        </button>
      </Link>
      <Link href="/historique">
        <button className="flex flex-col items-center text-sm">
          <History className="w-5 h-5" />
          <span>Historique</span>
        </button>
      </Link>
    </div>
  );
}