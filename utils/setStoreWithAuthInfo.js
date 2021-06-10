const clearStore = ({store , user}) => {
  const {
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
    setHasInsurance,
  } = store;

  setFirstName(user.firstName);
  setLastName(user.lastName);
  setEmail(user.email);
  setAddress(user.address);
  setCity(user.city);
  setState(user.state);
  setZip(user.zip);
  setPhone(user.phone);
  setProvider(user.provider);
  setPlanNumber(user.planNumber);
  setGroupNumber(user.groupNumber);
  setHasInsurance(user.hasInsurance);
}

export default clearStore
