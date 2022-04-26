import { supabase } from 'utils/initSupabase'
import { sendMailToMe } from 'utils/sendMailToMe'
import sendMessage from './lib/services/sendMessage'
const SENDGRID_DEFAULT_EMAIL = process.env.SENDGRID_DEFAULT_EMAIL

const sendEmail = async () => {
  try {
    const payload = {
      recipient_email: SENDGRID_DEFAULT_EMAIL,
      name: 'HousecallMD',
      subject: 'HouseCall Message Summary',
      message: `You have messages in the past two hours`,
      email: SENDGRID_DEFAULT_EMAIL,
    }

    return await sendMailToMe(payload)
  } catch (err) {
    console.log('ERROR WHILE SENDING MAIL TO *YOU* THROUGH WEB API >> ', err)
  }
}

const sendSMS = async () => {
  try {
    const adminPhones = await supabase
      .from('adminPhones')
      .select(`*`)
      .eq('isActive', true)

    return adminPhones.map(async (phone) => {
      const result = await sendMessage({
        to: phone,
        body: `You have messages in the past two hours`,
      })

      if (result.success)
        return { message: `SMS successfuly sent to ${phone}`, result }
      else return { message: `Error sending SMS to ${phone}`, result }
    })
  } catch (err) {
    console.log('Error sending sms ', err)
  }
}

const getNewFacilityMessages = async () => {
  const now = new Date()
  const date = new Date()
  const timeOffset = date.setHours(date.getHours() - 2)
  const delay = new Date(timeOffset)

  try {
    const newMessages = await supabase
      .from('facility_messages')
      .select('*')
      .lt('created_at', now.toUTCString())
      .gt('created_at', delay.toUTCString())

    if (newMessages.length) {
      newMessages.forEach(async (msg) => {
        if (!msg.recipient) {
          const sgResponse = await sendEmail()
          const smsResponses = await sendSMS()
          console.log(`${sgResponse}\n${smsResponses}`)
        } else {
          let { data: user, error } = await supabase
            .from('UserList')
            .select('*')
            .eq('id', msg.recipient)

          if (error) {
            console.log(error)
          } else {
            if (user.role === 'admin') {
              const sgResponse = await sendEmail()
              const smsResponses = await sendSMS()
              console.log(`${sgResponse}\n${smsResponses}`)
            }
          }
        }
      })
    }
  } catch (err) {
    console.log(err)
  }
}

export default getNewFacilityMessages
