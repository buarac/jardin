import { ThemeSwitch } from "@/components/ThemeSwitch"

export default function ParametresPage() {
  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold mb-6">⚙️ Préférences d’apparence</h1>
      <ThemeSwitch />
    </div>
  )
}
