const SENDGRID_API_URL = 'https://api.sendgrid.com/v3/mail/send'
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
const SENDGRID_DEFAULT_EMAIL = process.env.SENDGRID_DEFAULT_EMAIL

const sendMailToClientFetch = async (props) => {
  const { name, email, roomUrl } = props
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
              email: email,
            },
          ],
          subject: 'HouseCall has invited you to join a meeting',
        },
      ],
      from: {
        email: SENDGRID_DEFAULT_EMAIL,
        name: 'HouseCall MD Appointments',
      },
      content: [
        {
          type: 'text/html',
          value: `
            <img src="https://housecallmd.vercel.app/logo-vertical.png" width="150px" /><br /><br />
            <div style="color: #000;">

              <p>Hi ${name},</p>

              <br />
              <br />

              <p>
                Please click on the following link to join the meeting.
              </p>

              <p>${roomUrl}</p>
              
              <br />
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

export { sendMailToClientFetch }
