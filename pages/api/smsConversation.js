import { supabase } from '../../utils/initSupabase'
import moment from 'moment';

require('dotenv').config()
const client = require('twilio')(
  process.env.NEXT_PUBLIC_TWILIO_SID,
  process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN
)

export default async (req, res) => {
  try {

    // const conv = await client.conversations.conversations
    //     .create({ friendlyName: 'First Conversation' })
      
    //   console.log('conv', conv);

    const conv2 = await client.conversations.conversations('CH3f36ea4fcf574555bc0f9e8fec6c61c2')
        .participants
    .create({identity: 'valerie'})
    
      console.log(conv2);
    
      
  } catch (error) {
    console.log(error);
  }
  
}

// conv {
//     accountSid: 'AC3be529739e390b3025b88a1e48be5739',
//     chatServiceSid: 'IS9d87537c2fd548319f3e821c32f0ec3b',
//     messagingServiceSid: 'MG21f5ae0f4d1eb4b62e04e92a747e8620',
//     sid: 'CH3f36ea4fcf574555bc0f9e8fec6c61c2',
//     friendlyName: 'First Conversation',
//     uniqueName: null,
//     attributes: '{}',
//     state: 'active',
//     dateCreated: 2021-09-21T14:17:48.000Z,
//     dateUpdated: 2021-09-21T14:17:48.000Z,
//     timers: {},
//     url: 'https://conversations.twilio.com/v1/Conversations/CH3f36ea4fcf574555bc0f9e8fec6c61c2',
//     links: {
//       participants: 'https://conversations.twilio.com/v1/Conversations/CH3f36ea4fcf574555bc0f9e8fec6c61c2/Participants',
//       messages: 'https://conversations.twilio.com/v1/Conversations/CH3f36ea4fcf574555bc0f9e8fec6c61c2/Messages',
//       webhooks: 'https://conversations.twilio.com/v1/Conversations/CH3f36ea4fcf574555bc0f9e8fec6c61c2/Webhooks'
//     }
//   }

// twilio token:chat --identity valerie --chat-service-sid IS9d87537c2fd548319f3e821c32f0ec3b --profile project-danger

// CH3f36ea4fcf574555bc0f9e8fec6c61c2

// participant = MBe9e4a8bfad2f4d3b8f2260f6032d98fb