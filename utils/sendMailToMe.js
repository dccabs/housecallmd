const SENDGRID_API_URL = 'https://api.sendgrid.com/v3/mail/send'
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY

const sendMailToMe = async ({
  recipient_email, // email_address to send mail
  name, // from name on email
  subject = 'sample subject',
  email,
  message,
}) => {
  const sgResponse = await fetch(SENDGRID_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [
            {
              email: recipient_email,
            },
          ],
          subject: subject,
        },
      ],
      from: {
        email,
        name,
      },
      content: [
        {
          type: 'text/html',
          value: `
            <img src="/logo-vertical.png" width="150px" /><br /><br />
            <div style="color: #000;">
              <p>
                ${message}
              </p>
            </div>
          `,
        },
      ],
    }),
  }).then((response) => {
    console.log('response', JSON.stringify(response))
  })
  return sgResponse
}

export { sendMailToMe }
