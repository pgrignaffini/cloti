import { create } from "zustand";
import { maleModel } from "~/components/Models";

interface ClotiStoreState {
    selectedModel: {
        id: string;
        file: string;
    } | null;
    selectedTop: {
        id: string;
        image: string;
    } | null;
    selectedBottom: {
        id: string;
        image: string;
    } | null;
}

interface ClotiStoreActions {
    setSelectedModel: (model: { id: string; file: string; }) => void;
    setSelectedTop: (top: { id: string; image: string; }) => void;
    setSelectedBottom: (bottom: { id: string; image: string; }) => void;
}


const useClotiStore = create<ClotiStoreState & ClotiStoreActions>()((set) => ({
    selectedModel: maleModel,
    selectedTop: null,
    selectedBottom: null,
    setSelectedModel: (model) => set({ selectedModel: model }),
    setSelectedTop: (top) => set({ selectedTop: top }),
    setSelectedBottom: (bottom) => set({ selectedBottom: bottom }),
}));

export default useClotiStore;