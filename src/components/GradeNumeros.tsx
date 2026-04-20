import type { NumeroRifa } from "../hooks/useRifa";

type Props = {
  numeros: NumeroRifa[];
};

export function GradeNumeros({ numeros }: Props) {
  return (
    <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
      {numeros.map((item) => (
        <div
          key={item.numero}
          title={`Número ${item.numero} — ${item.status}`}
          className={`
            flex items-center justify-center
            rounded-lg p-2 text-sm font-bold
            select-none transition-transform hover:scale-105
            ${item.status === "DISPONÍVEL"
              ? "bg-green-500 text-white shadow-md"
              : "bg-gray-400 text-gray-100 opacity-60"
            }
          `}
        >
          {item.numero}
        </div>
      ))}
    </div>
  );
}
