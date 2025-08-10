export interface MobileRecolteData {
  nom: string;
  img: string;
  poids: number;
}

export interface MobileCultureData {
  id: string;
  nom: string;
  img: string;
  mode_recolte: string;
}

export interface MobileRecipientData {
  id: string;
  nom: string;
  poids: number;
}

export type MobilePeriod = "semaine" | "mois" | "annee";

export interface MobileThemeState {
  isDarkMode: boolean;
  theme: "soleil" | "lavande";
}
