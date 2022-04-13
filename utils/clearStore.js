const clearStore = (store) => {
  const {
    setPolicyHolderFirstName,
    setPolicyHolderLastName,
    setPolicyHolderDob,
    setIsPolicyCardHolder,
    setPolicyHolderRelation,
    setHasInsurance,
    setFirstName,
    setLastName,
    setEmail,
    setAddress,
    setCity,
    setState,
    setZip,
    setPhone,
    setProvider,
    setPlanNumber,
    setGroupNumber,
    setVisitChoice,
    setIsAuthenticated,
  } = store

  setPolicyHolderFirstName(''),
    setPolicyHolderLastName(''),
    setPolicyHolderDob(''),
    setIsPolicyCardHolder(false),
    setPolicyHolderRelation(''),
    setFirstName('')
  setLastName('')
  setEmail('')
  setAddress('')
  setCity('')
  setState('')
  setZip('')
  setPhone('')
  setProvider('')
  setPlanNumber('')
  setGroupNumber('')
  setVisitChoice('')
  setHasInsurance(false)
  setIsAuthenticated(false)
}

export default clearStore
