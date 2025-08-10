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

// Nouveaux types pour la validation et les messages
export interface MobileFormState {
  poids: string;
  quantite: string;
}

export interface MobileMessage {
  id: string;
  type: "success" | "error" | "info";
  title: string;
  content: string;
  timestamp: number;
  autoHide?: boolean;
}

export interface MobileRecolteSummary {
  cultureNom: string;
  poids: number;
  quantite?: number;
  recipientNom?: string;
}
