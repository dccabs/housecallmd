const clearStore = ({store , user}) => {
  const {
    setPolicyHolderFirstName,
    setPolicyHolderLastName,
    setPolicyHolderDob,
    setIsPolicyCardHolder,
    setPolicyHolderRelation,
    setHasInsurance,
    setFirstName,
    setLastName,
    setDob,
    setEmail,
    setAddress,
    setCity,
    setState,
    setZip,
    setPhone,
    setProvider,
    setPlanNumber,
    setGroupNumber,
    setCardInformationImage,
  } = store;

  setIsPolicyCardHolder(user.isPolicyCardHolder);
  setPolicyHolderFirstName(user.policyHolderFirstName);
  setPolicyHolderLastName(user.policyHolderLastName);
  setPolicyHolderDob(user.policyHolderDob);
  setPolicyHolderRelation(user.policyHolderRelation)
  setDob(user.dob);
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
  setCardInformationImage(user.card_information_image);
}

export default clearStore
