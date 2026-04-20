import { useState, useCallback } from "react";
import { CONFIG } from "../config";

export type NumeroRifa = {
  numero: string;
  status: "DISPONÍVEL" | "VENDIDO";
};

type EstadoRifa = {
  numeros: NumeroRifa[];
  carregando: boolean;
  erro: string | null;
  ultimaAtualizacao: Date | null;
};

// Converte o CSV bruto em array de NumeroRifa
function parsearCSV(texto: string): NumeroRifa[] {
  const linhas = texto.trim().split("\n");
  // Ignora cabeçalho caso exista
  const inicio = linhas[0].toLowerCase().includes("número") || linhas[0].toLowerCase().includes("status") ? 1 : 0;

  return linhas.slice(inicio).map((linha) => {
    const colunas = linha.split(",").map((c) => c.trim().replace(/"/g, ""));
    const numero = colunas[0] || "";
    // Coluna B vazia = disponível, qualquer valor (ex: "x") = vendido
    const status: NumeroRifa["status"] = (colunas[1] || "").trim() !== "" ? "VENDIDO" : "DISPONÍVEL";
    return { numero, status };
  }).filter((n) => n.numero !== "");
}

export function useRifa() {
  const [estado, setEstado] = useState<EstadoRifa>({
    numeros: [],
    carregando: false,
    erro: null,
    ultimaAtualizacao: null,
  });

  const buscarDados = useCallback(async () => {
    setEstado((prev) => ({ ...prev, carregando: true, erro: null }));

    try {
      // Cache-bust para garantir dados frescos do Google Sheets
      const url = `${CONFIG.planilhaUrl}&t=${Date.now()}`;
      const resposta = await fetch(url);

      if (!resposta.ok) {
        throw new Error(`Erro ao buscar planilha (HTTP ${resposta.status})`);
      }

      const texto = await resposta.text();

      if (!texto.trim()) {
        throw new Error("A planilha retornou vazia. Verifique se ela foi publicada corretamente.");
      }

      const numeros = parsearCSV(texto);

      setEstado({
        numeros,
        carregando: false,
        erro: null,
        ultimaAtualizacao: new Date(),
      });
    } catch (err) {
      setEstado((prev) => ({
        ...prev,
        carregando: false,
        erro: err instanceof Error ? err.message : "Erro desconhecido ao carregar dados.",
      }));
    }
  }, []);

  return { ...estado, buscarDados };
}
