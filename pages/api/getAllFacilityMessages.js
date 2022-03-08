import { supabase } from '../../utils/initSupabase'

// Example of how to verify and get user data server-side.
const getAllFacilityMessages = async (req, res) => {
  // const token = req.headers.token
  const facilityId = req.body?.facilityId;
  const patientId = req.body?.patientId;
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

  if (facilityId && !patientId) {
    messagesQuery = supabase
      .from('facility_messages')
      .select('*')
      .or(`sender.eq.${facilityId},recipient.eq.${facilityId}`)
  } else if (!facilityId && patientId) {
    messagesQuery = supabase
      .from('facility_messages')
      .select('*')
      .eq('patient_id', patientId);
  }

  let { data: messages, messagesError } = await messagesQuery;

  const newMessages = messages.map(entry => {
    const patient_id = entry.patient_id;
    const patientMatch = patients.find(patient => {
      return patient.id === patient_id;
    })

    let sentFromHouseCall = false;
    let senderMatch = houseCallUsers.find(user => {
      if (user.uuid === entry.sender && user.role === 'admin') {
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

    let sentToHouseCall = false;

    if (!entry.recipient) {
      sentToHouseCall = true;
    }

    let recipientMatch = entry.recipient && houseCallUsers.find(user => {
      if ((user.uuid === entry.recipient && user.role === 'admin')) {
        sentToHouseCall = true;
        return true;
      }
    })

    if (!sentToHouseCall) {
      recipientMatch = facilities.find(facility => {
        return facility.auth_id === entry.recipient;
      })
    }


    const recipientObj = {
      name: sentToHouseCall && recipientMatch?.firstName ? `HouseCall MD - ${recipientMatch?.firstName} ${recipientMatch?.lastName}` : sentToHouseCall && !recipientMatch?.firstName ? 'HouseCall MD' : recipientMatch?.name,
    }


    return {
      patient_id: patientMatch.id,
      patient_name: `${patientMatch.first_name} ${patientMatch.last_name}`,
      message: entry.message,
      sender: senderObj,
      recipient: recipientObj,
      sentToHouseCall,
      sentFromHouseCall,
      timestamp: entry.created_at,
    }

  })

  const sortedMessages = newMessages.sort((a, b) => (b.timestamp > a.timestamp) ? 1 : -1)

  const newData = [
    ...sortedMessages,
  ];



  if (messagesError) return res.status(401).json({ error: messagesError.message })
  return res.status(200).json(newData)
}

export default getAllFacilityMessages
