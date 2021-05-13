import create from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist((set) => ({
    provider: '',
    planNumber: '',
    groupNumber: '',
    visitChoice: '',
    setProvider: (provider) => set({ provider }),
    setPlanNumber: (planNumber) => set({ planNumber }),
    setGroupNumber: (groupNumber) => set({ groupNumber }),
    setVisitChoice: (visitChoice) => set({ visitChoice }),
  }))
)

export default useStore
