

export default function TopBar({ title, version, showBack = false }) {
  return (
    <div className="flex items-center justify-between px-4 py-4 border-b">
      <div className="w-1/3 text-left">
        {showBack && <span className="text-blue-500">&lt; Retour</span>}
      </div>
      <div className="w-1/3 text-center font-semibold">{title}</div>
      <div className="w-1/3 text-right text-sm text-green-500">{version}</div>
    </div>
  );
}