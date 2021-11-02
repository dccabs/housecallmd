import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber'

const formatPhoneNumberE164 = (phone) => {
  const formattedPhone = PhoneNumberUtil.getInstance().format(
    PhoneNumberUtil.getInstance().parseAndKeepRawInput(phone, 'US'),
    PhoneNumberFormat.E164
  );
  return formattedPhone;
}

export default formatPhoneNumberE164;
