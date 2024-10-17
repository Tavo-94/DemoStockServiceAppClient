import { create } from "zustand";

export const useStocksAbmStore = create((set) => ({
  estado: {
    stocks: [],
    labels: [],
  },
  setStocks: (stocks) => set((state) => ({
      estado : {
          ...state.estado, stocks: stocks
      }
  })),
  setLabels: (labels) => set((state) => ({
    estado: {
      ...state.estado,
      labels: labels,
    },
  })),
  addStock: (stock) => set((state) => ({
      estado: {
          ...state.estado,
          stocks: [...state.estado.stocks, stock]
      }
  })
),
  removeStock: (id) =>
    set((state) => ({
        estado: {
            ...state.estado,
            stocks: state.estado.stocks.filter((stock) => stock.id !== id),
        }
    })),
  editStock: (stock) =>
    set((state) => ({
        estado: {
            ...state.estado,
            stocks: state.estado.stocks.map((s) =>
                s.id === stock.id ? stock : s
            ),
        }
    })),
}));
