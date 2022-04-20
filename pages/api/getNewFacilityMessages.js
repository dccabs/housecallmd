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

const getNewFacilityMessages = async (req, res) => {
  if (req.method === 'POST') {
    const { id } = req.body

    if (id) {
      const sgResponse = await sendEmail()

      const smsResponses = await sendSMS()

      res.status(200).send({ sgResponse, smsResponses })
    } else {
      let { data: user, error } = await supabase
        .from('UserList')
        .select('*')
        .eq('id', id)

      if (error) {
        return res.status(401).json({ error: error.message })
      } else {
        if (user.role === 'admin') {
          const sgResponse = await sendEmail()

          const smsResponses = await sendSMS()

          res.status(200).send({ sgResponse, smsResponses })
        }
      }
    }
  }

  res.status(400).send({ error: 'Bad request' })
}

export default getNewFacilityMessages
