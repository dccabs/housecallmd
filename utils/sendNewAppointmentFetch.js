const SENDGRID_API_URL = 'https://api.sendgrid.com/v3/mail/send'
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY

const sendNewAppointmentFetch = async (props) => {
  const {
    recipient_email, // email_address to send mail
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
    visitChoice,
    amount,
    dob,
    isPolicyCardHolder,
    policyHolderFirstName,
    policyHolderLastName,
    policyHolderDob,
    policyHolderRelation,
    insuranceOptOut,
    reason,
  } = props
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
        email: recipient_email,
        name: 'HouseCall MD Appointments',
      },
      content: [
        {
          type: 'text/html',
          value: `
            <img src="https://housecallmd.vercel.app/logo-vertical.png" width="150px" /><br /><br />
            <div style="color: #000;">
            
              <div style="font-weight: bold; font-size: 24px">
                Patient Information
              </div>
              <br><br>
              
             <div style="font-weight: bold">Patient Using Insurance: ${
               hasInsurance && !insuranceOptOut
             }</div>
             
             
              <div style="font-weight: bold">Reason for Visit: ${reason}</div>

              <br><br>
              <div style="font-weight: bold">Visit Choice: ${visitChoice}</div>
              <div style="font-weight: bold">Amount Paid: ${amount}</div>
              <div style={{fontWeight: 'bold'}}>Patient Has Insurance: ${hasInsurance}</div>
              <div>First Name: ${firstName}</div>
              <div>Last Name: ${lastName}</div>
              <div>Date of Birth: ${dob}
              <div>Provider: ${provider}</div>
              <div>Plan Number: ${planNumber}</div>
              <div>Group Number: ${groupNumber}</div>
              <div>Email: ${email}</div>
              <div>Address: ${address}</div>
              <div>City ${city}</div>
              <div>State: ${state}</div>
              <div>Zip: ${zip}</div>
              <div>Phone: ${phone}</div>
              
              <br><br>
              <div style="font-weight: bold">Policy cardholder: ${isPolicyCardHolder}</div>
              ${
                !isPolicyCardHolder
                  ? `<div>Policy cardholder first name: ${policyHolderFirstName}</div>
                <div>Policy card holder last name: ${policyHolderLastName}</div>
                <div>Policy card holder date of birth: ${policyHolderDob}</div>
                <div>Gurantor's Relationship to patient: ${policyHolderRelation}</div>`
                  : ''
              }
              
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
