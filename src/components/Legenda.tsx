export function Legenda() {
  return (
    <div className="flex gap-4 text-sm text-gray-600">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded bg-green-500" />
        <span>Disponível</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded bg-gray-400 opacity-60" />
        <span>Vendido</span>
      </div>
    </div>
  );
}
