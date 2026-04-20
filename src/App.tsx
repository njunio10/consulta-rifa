import { useEffect } from "react";
import { CONFIG } from "./config";
import { useRifa } from "./hooks/useRifa";
import { GradeNumeros } from "./components/GradeNumeros";
import { Contador } from "./components/Contador";
import { Legenda } from "./components/Legenda";
import { SobreARifa } from "./components/SobreARifa";

export default function App() {
  const { numeros, carregando, erro, ultimaAtualizacao, buscarDados } = useRifa();

  // Busca os dados assim que o componente monta
  useEffect(() => {
    buscarDados();
  }, [buscarDados]);

  const disponiveis = numeros.filter((n) => n.status === "DISPONÍVEL").length;
  const total = numeros.length;

  const formatarHora = (data: Date) =>
    data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      {/* Cabeçalho */}
      <header className="bg-blue-700 text-white pt-10 pb-8 px-4 text-center shadow-lg">
        <img
          src="/fudfigma-Photoroom.png"
          alt="Escudo FUD FC"
          className="mx-auto mb-4 w-32 sm:w-40 drop-shadow-lg"
        />
        <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
          Rifa Solidária Autismo
        </h1>
        <p className="mt-1 text-blue-200 text-sm italic">veja abaixo os números disponíveis</p>

        <div className="mt-4 inline-block bg-white/10 rounded-xl px-5 py-2">
          <p className="text-xs text-blue-200 uppercase tracking-widest mb-0.5">Prêmio</p>
          <p className="text-xl font-bold">{CONFIG.premio}</p>
        </div>

        <img
          src="/CAMISA-AUTISMO.jpeg"
          alt="Camisa exclusiva FUD FC - Abril Azul"
          className="mx-auto mt-6 w-72 sm:w-96 rounded-2xl shadow-xl"
        />
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">

        {/* Botão de atualizar + hora da última atualização */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <button
            onClick={buscarDados}
            disabled={carregando}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm
              transition-colors
              ${carregando
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow"
              }
            `}
          >
            {carregando ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Atualizando...
              </>
            ) : (
              <>⟳ Atualizar</>
            )}
          </button>

          {ultimaAtualizacao && (
            <p className="text-xs text-gray-400">
              Atualizado às {formatarHora(ultimaAtualizacao)}
            </p>
          )}
        </div>

        {/* Mensagem de erro */}
        {erro && (
          <div className="bg-red-50 border border-red-300 text-red-700 rounded-xl p-4 text-sm">
            <strong>Não foi possível carregar os dados.</strong>
            <br />
            {erro}
            <br />
            <span className="text-xs text-red-400 mt-1 block">
              Verifique se a planilha está publicada em: Arquivo → Compartilhar → Publicar na web.
            </span>
          </div>
        )}

        {/* Contador */}
        {!carregando && !erro && total > 0 && (
          <Contador disponiveis={disponiveis} total={total} />
        )}

        {/* Loading inicial */}
        {carregando && numeros.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-gray-400">
            <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
            <p>Carregando números da rifa...</p>
          </div>
        )}

        {/* Grade de números */}
        {numeros.length > 0 && (
          <section className="bg-white rounded-2xl shadow p-4 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-lg font-bold text-gray-700">Números da Rifa</h2>
              <Legenda />
            </div>
            <GradeNumeros numeros={numeros} />
          </section>
        )}

        {/* Sobre a Rifa */}
        <SobreARifa />
      </main>

      <footer className="text-center text-xs text-gray-400 pb-8">
        FUD FC · Rifa Solidária {new Date().getFullYear()}
      </footer>
    </div>
  );
}
