type Props = {
  disponiveis: number;
  total: number;
};

export function Contador({ disponiveis, total }: Props) {
  const vendidos = total - disponiveis;
  const porcentagem = total > 0 ? Math.round((vendidos / total) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col gap-3">
      <div className="flex justify-around text-center">
        <div>
          <p className="text-3xl font-extrabold text-green-600">{disponiveis}</p>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Disponíveis</p>
        </div>
        <div className="w-px bg-gray-200" />
        <div>
          <p className="text-3xl font-extrabold text-gray-500">{vendidos}</p>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Vendidos</p>
        </div>
        <div className="w-px bg-gray-200" />
        <div>
          <p className="text-3xl font-extrabold text-blue-600">{total}</p>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Total</p>
        </div>
      </div>

      {/* Barra de progresso */}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-blue-500 h-3 rounded-full transition-all duration-700"
          style={{ width: `${porcentagem}%` }}
        />
      </div>
      <p className="text-center text-xs text-gray-400">{porcentagem}% vendido</p>
    </div>
  );
}
