import { create } from "zustand";
import type { Pokemon } from "../../cuadricula/interfaces/Pokemon.interface"


type EquipoState ={
    equipoDraft: Pokemon[];
    addPokemon: (pokemon: Pokemon) => void;
    deletePokemon: (idPokemon:number) => void;
    setDraft: (pokemon: Pokemon[]) => void;
    resetDraft: () => void;
};

export const useEquipoStore = create<EquipoState>((set) => ({
    equipoDraft: [],
    addPokemon: (pokemon) => 
        set((state) => {
            if(state.equipoDraft.length >= 6) return state;
            if(state.equipoDraft.some((p) => p.id === pokemon.id)) return state;
            return { equipoDraft: [...state.equipoDraft, pokemon] };
        }),
    deletePokemon: (idPokemon) => 
        set((state) => ({
            equipoDraft: state.equipoDraft.filter((p) => p.id !== idPokemon)
        })),
        setDraft: () => set({equipoDraft: []}),
        resetDraft: () => set({equipoDraft: []}),
}));