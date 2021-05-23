import create from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist((set) => ({
    hasInsurance: null,
    provider: '',
    planNumber: '',
    groupNumber: '',
    visitChoice: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    setProvider: (provider) => set({ provider }),
    setPlanNumber: (planNumber) => set({ planNumber }),
    setGroupNumber: (groupNumber) => set({ groupNumber }),
    setVisitChoice: (visitChoice) => set({ visitChoice }),
  }))
)

export default useStore
