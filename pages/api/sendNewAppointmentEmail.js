import { sendNewAppointmentFetch } from '../../utils/sendNewAppointmentFetch'
const SENDGRID_DEFAULT_EMAIL = process.env.SENDGRID_DEFAULT_EMAIL


export default async function handler(req, res) {
  if (req.method === 'POST') {
    // req.body carries all the data

    try {
      const { newUser } = req.body

      if (
        typeof newUser === 'undefined'
      ) {
        console.log(' ************* Invalid Data received ************ ')

        return res
          .status(400)
          .send({ error: 'bad request, missing required data!' })
      } else {
        //  Data received as expected
        try {
          const payload = {
            recepient_email: SENDGRID_DEFAULT_EMAIL,
            subject: `${newUser.firstName} ${newUser.lastName} just signed up for an appointment`,
            ...newUser
          }
          const sendGridResponse = await sendNewAppointmentFetch(payload);

          return res.status(200).send({
            sg_response: sendGridResponse,
          })
        } catch (err) {
          console.log(
            'ERROR WHILE SENDING MAIL TO *YOU* THROUGH WEB API >> ',
            err
          )

          return res.status(400).send({
            err_message: 'bad request',
          })
        }
      }
    } catch (err) {
      console.log('Err while sending Mail through send grid >> ', err)
      return res
        .status(400)
        .send({ error: 'Error in sendgrid Service.', errMsg: err })
    }
  }

  res.status(400).send({ error: 'bad request' })
}
