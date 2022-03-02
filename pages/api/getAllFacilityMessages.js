import { supabase } from '../../utils/initSupabase'

// Example of how to verify and get user data server-side.
const getAllFacilityMessages = async (req, res) => {
  // const token = req.headers.token
  const facilityId = req.body?.facilityId;

  console.log('facilityId', facilityId)
  //
  // if (!email || email === 'undefined') {
  //   throw Error('null data value')
  // }

  let { data: houseCallUsers, userListError } = await supabase
    .from('UserList')
    .select('*')

  let { data: users, error: usersError } = await supabase
    .from('users')
    .select('*')


  let facilityQuery = supabase
    .from('facilities')
    .select('*')

  if (facilityId) {
    facilityQuery = supabase
      .from('facilities')
      .select('*')
      .eq('auth_id', facilityId)
  }


  let { data: facilities, error: facilitiesError } = await facilityQuery;

  let { data: patients, error: patientsError } = await supabase
    .from('facility_patients')
    .select('*')

  let messagesQuery = supabase
    .from('facility_messages')
    .select('*')

  if (facilityId) {
    console.log('run this query')
    messagesQuery = supabase
      .from('facility_messages')
      .select('*')
      .or(`sender.eq.${facilityId},recipient.eq.${facilityId}`)
  }

  let { data: messages, messagesError } = await messagesQuery;

  const newMessages = messages.map(entry => {
    const patient_id = entry.patient_id;
    const patientMatch = patients.find(patient => {
      return patient.id === patient_id;
    })

    let sentFromHouseCall = false;
    let senderMatch = houseCallUsers.find(user => {
      if (user.uuid === entry.sender) {
        sentFromHouseCall = true;
        return true;
      }
      return user.uuid === entry.sender;
    })

    if (!sentFromHouseCall) {
      senderMatch = facilities.find(facility => {
        return facility.auth_id === entry.sender;
      })
    }

    const senderObj = {
      name: sentFromHouseCall ? `${senderMatch.firstName} ${senderMatch.lastName}` : senderMatch?.name,
    }


    return {
      patient_id: patientMatch.id,
      patient_name: `${patientMatch.first_name} ${patientMatch.last_name}`,
      message: entry.message,
      sender: senderObj,
      sentFromHouseCall,
      timestamp: entry.timestamp,
    }

  })

  const sortedMessages = newMessages.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1)


  const newData = [
    ...sortedMessages,
  ];



  if (messagesError) return res.status(401).json({ error: messagesError.message })
  return res.status(200).json(newData)
}

export default getAllFacilityMessages
