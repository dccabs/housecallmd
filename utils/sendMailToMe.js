const SENDGRID_API_URL = 'https://api.sendgrid.com/v3/mail/send'
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY

const sendMailToMe = async (
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
            <a href="http://www.housecallmd.org/"><button style="background-color: #0092b8; padding: 1em; border: 1px solid #0092b8; border-radius: 50px; color: #fff; cursor: pointer;">Go back to Housecall MD</button></a>
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
