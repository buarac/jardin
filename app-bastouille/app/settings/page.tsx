import { Header } from "../components/Header";
import { ThemeSwitcher } from "../components/ThemeSwitcher";

export default function SettingsPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Header title="Paramétrage" backHref="/" />
      <div className="p-4">
        <ThemeSwitcher />
      </div>
    </div>
  );
}