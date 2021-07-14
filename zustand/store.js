import create from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist((set) => ({
        hasInsurance: null,
        isPrimaryCardHolder: null,
        primaryHolderFirstName: '',
        primaryHolderLastName: '',
        primaryHolderDob: '',
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
        isAuthenticated: '',
        setPrimaryHolderFirstName: (primaryHolderFirstName) => set({ primaryHolderFirstName }),
        setPrimaryHolderLastName: (primaryHolderLastName) => set( { primaryHolderLastName }),
        setPrimaryHolderDob: (primaryHolderDob) => set( { primaryHolderDob }),
        setHasInsurance: (hasInsurance) => set({ hasInsurance }),
        setFirstName: (firstName) => set({ firstName }),
        setLastName: (lastName) => set({ lastName }),
        setEmail: (email) => set({ email }),
        setAddress: (address) => set({ address }),
        setCity: (city) => set({ city }),
        setState: (state) => set({ state }),
        setZip: (zip) => set({ zip }),
        setPhone: (phone) => set({ phone }),
        setProvider: (provider) => set({ provider }),
        setPlanNumber: (planNumber) => set({ planNumber }),
        setGroupNumber: (groupNumber) => set({ groupNumber }),
        setVisitChoice: (visitChoice) => set({ visitChoice }),
        setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  }))
)

export default useStore
