import "cleave.js/dist/addons/cleave-phone.us";
import Cleave from 'cleave.js/react'

const phoneField = (props) => {
  const { options, inputRef, ...other } = props;
  return (
    <Cleave
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      placeholder="Enter phone number"
      options={{
        phone: true,
        phoneRegionCode: 'US'
      }}
      {...other}
    />
  )
}

export default phoneField;
