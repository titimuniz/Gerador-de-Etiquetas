import { MenuItem } from "../types";
import { INITIAL_ITEMS } from "../constants";

const DB_KEY = "menu-items-db";
const BG_KEY = "menu-background-image";

export const database = {
  // Carrega os itens do banco de dados local
  loadItems: (): MenuItem[] => {
    try {
      const saved = localStorage.getItem(DB_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Erro ao carregar banco de dados:", e);
    }
    // Se não houver nada salvo, retorna os itens iniciais padrão
    return INITIAL_ITEMS;
  },

  // Salva a lista atualizada no banco de dados local
  saveItems: (items: MenuItem[]) => {
    try {
      localStorage.setItem(DB_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Erro ao salvar no banco de dados:", e);
      alert("Erro ao salvar dados. Seu armazenamento local pode estar cheio.");
    }
  },

  // Carrega a imagem de fundo salva
  loadBackground: (): string | null => {
    try {
      return localStorage.getItem(BG_KEY);
    } catch (e) {
      console.error("Erro ao carregar fundo:", e);
      return null;
    }
  },

  // Salva a imagem de fundo
  saveBackground: (dataUrl: string | null) => {
    try {
      if (dataUrl) {
        localStorage.setItem(BG_KEY, dataUrl);
      } else {
        localStorage.removeItem(BG_KEY);
      }
    } catch (e) {
      console.warn("Imagem de fundo muito grande para salvar no cache local:", e);
      // Não alertamos o usuário aqui para não interromper o fluxo, apenas não salva a persistência
    }
  },

  // Reseta para os padrões de fábrica (útil para debug)
  resetDatabase: () => {
    localStorage.removeItem(DB_KEY);
    localStorage.removeItem(BG_KEY);
    return INITIAL_ITEMS;
  }
};