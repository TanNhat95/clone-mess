import { create } from "zustand"

type ActiveListStore = {
    members: string[],
    add: (id: string) => void
    remove: (id: string) => void
    set: (id: string[]) => void
}

const useActiveList = create<ActiveListStore>((set) => ({
    members: [],
    add: (id) => set((state) => ({ members: [...state.members,id]})),
    remove: (id) => set((state) => ({ members: state.members.filter((memberID) => memberID !== id) })),
    set: (ids) => set({ members: ids})
}))

export default useActiveList