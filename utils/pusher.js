import Pusher from "pusher";
import config from './config';

const pusher = new Pusher({
  appId: config.pusher.PUSHER_APP_ID,
  key: config.pusher.PUSHER_KEY,
  secret: config.pusher.PUSHER_SECRET,
  cluster: config.pusher.PUSHER_CLUSTER,
  useTLS: true,
});

export default pusher;