import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Draft = {
  title: string;
  content: string;
  tag: string;
};

const initialDraft: Draft = {
  title: "",
  content: "",
  tag: "Todo",
};

type NoteStore = {
  draft: Draft;
  setDraft: (partial: Partial<Draft>) => void;
  clearDraft: () => void;
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (partial) =>
        set((state) => ({ draft: { ...state.draft, ...partial } })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "notehub-note-store-v1",
      storage: createJSONStorage(() =>
        typeof window === "undefined"
          ? {
              getItem: async () => null,
              setItem: async () => {},
              removeItem: async () => {},
            }
          : localStorage
      ),
    }
  )
);

export { initialDraft };
