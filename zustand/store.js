import create from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist((set) => ({
    hasInsurance: null,
    isPolicyCardHolder: null,
    policyHolderFirstName: '',
    policyHolderLastName: '',
    policyHolderDob: '',
    policyHolderRelation: '',
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
    dob: '',
    reason: '',
    insuranceOptOut: false,
    setPolicyHolderFirstName: (policyHolderFirstName) =>
      set({ policyHolderFirstName }),
    setPolicyHolderLastName: (policyHolderLastName) =>
      set({ policyHolderLastName }),
    setPolicyHolderDob: (policyHolderDob) => set({ policyHolderDob }),
    setIsPolicyCardHolder: (isPolicyCardHolder) => set({ isPolicyCardHolder }),
    setPolicyHolderRelation: (policyHolderRelation) =>
      set({ policyHolderRelation }),
    setHasInsurance: (hasInsurance) => set({ hasInsurance }),
    setFirstName: (firstName) => set({ firstName }),
    setLastName: (lastName) => set({ lastName }),
    setDob: (dob) => set({ dob }),
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
    setReason: (reason) => set({ reason }),
    setInsuranceOptOut: (insuranceOptOut) => set({ insuranceOptOut }),
  }))
)

export default useStore
