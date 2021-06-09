const SENDGRID_API_URL = 'https://api.sendgrid.com/v3/mail/send'
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY

const sendNewAppointmentFetch = async (props) => {
  const {
    recepient_email, // email_address to send mail
    subject,
    hasInsurance,
    provider,
    planNumber,
    groupNumber,
    firstName,
    lastName,
    email,
    address,
    city,
    state,
    zip,
    phone,
  } = props;
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
        name: 'HouseCall MD Appointments',
      },
      content: [
        {
          type: 'text/html',
          value: `
            <img src="http://www.housecallmd.org/wp-content/themes/housecallmd/images/main-logo.png" width="150px" height="100px" /><br />
            <div style="color: #000;">
            
              <div style={{fontSize: '24px', fontWeight: 'bold, marginBottom: '20px'}}>
                Patient Information
              </div>
            
              <div style={{fontWeight: 'bold'}}>Patient Has Insurance: ${hasInsurance}</div>
              <div>First Name: ${firstName}</div>
              <div>Last Name: ${lastName}</div>
              <div>Provider: ${provider}</div>
              <div>Plan Number: ${planNumber}</div>
              <div>Group Number: ${groupNumber}</div>
              <div>Email: ${email}</div>
              <div>Address: ${address}</div>
              <div>City ${city}</div>
              <div>State: ${state}</div>
              <div>Zip: ${zip}</div>
              <div>Phone: ${phone}</div>
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

export { sendNewAppointmentFetch }