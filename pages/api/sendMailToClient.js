import { sendMailToClientFetch } from '../../utils/sendMailToClientFetch'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const body = req.body

      if (typeof body.email === 'undefined') {
        console.log(' ************* Invalid Data received ************ ')

        return res
          .status(400)
          .send({ error: 'bad request, missing required data!' })
      } else {
        //  Data received as expected
        try {
          const sendGridResponse = await sendMailToClientFetch(body)

          return res.status(200).send({
            sg_response: sendGridResponse,
          })
        } catch (err) {
          console.log('ERROR WHILE SENDING MAIL THROUGH WEB API >> ', err)

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
