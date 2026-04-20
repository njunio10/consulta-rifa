import { CONFIG } from "../config";

export function SobreARifa() {
  // Divide o texto em parágrafos pela quebra de linha dupla
  const paragrafos = CONFIG.sobre.split("\n\n");

  return (
    <section className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
      <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
        <span>💙</span> Sobre a Rifa
      </h2>
      <div className="space-y-3 text-gray-700 leading-relaxed">
        {paragrafos.map((paragrafo, i) => (
          <p key={i}>{paragrafo}</p>
        ))}
      </div>
    </section>
  );
}
