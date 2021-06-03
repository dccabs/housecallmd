const clearStore = (store) => {
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
    setVisitChoice,
    setHasInsurance,
  } = store;

  setFirstName('');
  setLastName('');
  setEmail('');
  setAddress('');
  setCity('');
  setState('');
  setZip('');
  setPhone('');
  setProvider('');
  setPlanNumber('');
  setGroupNumber('');
  setVisitChoice('');
  setHasInsurance(false);
}

export default clearStore
