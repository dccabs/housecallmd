const SENDGRID_API_URL = 'https://api.sendgrid.com/v3/mail/send'
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY

const sendMailToMe = async (
  recepient_email, // email_address to send mail
  name_, // from name on email
  subject = 'sample subject',
  client_message, // value we receive from our contact form
  client_email // value we receive from our contact form
) => {
  console.log('recepient_email', recepient_email)
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
              email: 'brentbagapuro@gmail.com',
            },
          ],
          subject: subject,
        },
      ],
      from: {
        email: 'dccabs@gmail.com',
        name: 'Dan Cabaniss',
      },
      content: [
        {
          type: 'text/html',
          value: `
            <img src="http://www.housecallmd.org/wp-content/themes/housecallmd/images/main-logo.png" width="150px" height="100px" /><br />
            <div style="color: #000;">
              <h2>Hello ${name_},</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro nostrum, quibusdam ut dolores laborum deserunt tempore magnam minima minus nihil.<br /><br />
                Ut quidem alias nobis magni ipsum natus pariatur minima odit aliquam vitae laborum rerum quaerat.
              </p><br />
            </div>
            <a href="http://www.housecallmd.org/"><button style="background-color: #0092b8; padding: 1em; border: 1px solid #0092b8; border-radius: 50px; color: #fff; cursor: pointer;">Go back to Housecall MD</button></a>
          `,
        },
        //   value: `<strong>Client Name: ${name_} </strong> \n <p>
        //           sent you a query regarding <strong>${subject} </strong></p>
        //           \n <p>Client's Message: <strong>${client_message}</strong><\p>
        //           <p>Client's Email : <strong> ${client_email} </strong></p>`,
        // },
      ],
    }),
  }).then((response) => {
    console.log('response', JSON.stringify(response))
  })
  return sgResponse
}

export { sendMailToMe }
