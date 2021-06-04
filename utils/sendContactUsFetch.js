const SENDGRID_API_URL = 'https://api.sendgrid.com/v3/mail/send'
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY

const sendContactUsFetch = async (
  {
    recepient_email, // email_address to send mail
    name, // from name on email
    subject = 'sample subject',
    email,
    client_message,
    phone = "",
  }
) => {
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
              email: recepient_email,
            },
          ],
          subject: subject,
        },
      ],
      from: {
        email: recepient_email,
        name,
      },
      content: [
        {
          type: 'text/html',
          value: `
            <img src="http://www.housecallmd.org/wp-content/themes/housecallmd/images/main-logo.png" width="150px" height="100px" /><br />
            <div style="color: #000;">
              <p>
                ${client_message}
              </p>
              <p>${name}</p>
              <p>Email: ${email}</p>
              <p>Phone: ${phone}</p>
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

export { sendContactUsFetch }
