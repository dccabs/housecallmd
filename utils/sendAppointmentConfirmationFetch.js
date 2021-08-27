const SENDGRID_API_URL = 'https://api.sendgrid.com/v3/mail/send'
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY

const sendAppointmentConfirmationFetch = async (props) => {
  const { subject, recipient_email, email } = props
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
          subject: subject,
        },
      ],
      from: {
        email: recipient_email,
        name: 'HouseCall MD Appointments',
      },
      content: [
        {
          type: 'text/html',
          value: `
            <img src="https://housecallmd.vercel.app/logo-vertical.png" width="150px" /><br /><br />
            <div style="color: #000;">
            
              <p>
                Housecall MD received your request for an appointment. A representative from HouseCall MD will be contacting you shortly with more information. If you need to reach out to us sooner, please email contact@housecallmd.org. If this is an emergency, please call 9-1-1.
              </p>
              
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

export { sendAppointmentConfirmationFetch }
