import { supabase } from 'utils/initSupabase'
import { sendMailToMe } from 'utils/sendMailToMe'
const SENDGRID_DEFAULT_EMAIL = process.env.SENDGRID_DEFAULT_EMAIL

const sendMessage = async () => {
  try {
    const payload = {
      recipient_email: SENDGRID_DEFAULT_EMAIL,
      name,
      subject,
      message: `You have messages in the past two hours`,
      email,
    }

    return await sendMailToMe(payload)
  } catch (err) {
    console.log('ERROR WHILE SENDING MAIL TO *YOU* THROUGH WEB API >> ', err)
  }
}

const getNewFacilityMessages = async (req, res) => {
  if (req.method === 'POST') {
    const { id } = req.body

    if (id) {
      sendMessage().then((sendGridResponse) => {
        return res.status(200).send({
          sg_response: sendGridResponse,
        })
      })
    } else {
      let { data: user, error } = await supabase
        .from('UserList')
        .select('*')
        .eq('id', id)

      if (error) {
        return res.status(401).json({ error: error.message })
      } else {
        if (user.role === 'admin') {
          sendMessage().then((sendGridResponse) => {
            return res.status(200).send({
              sg_response: sendGridResponse,
            })
          })
        }
      }
    }
  }

  res.status(400).send({ error: 'Bad request' })
}

export default getNewFacilityMessages
