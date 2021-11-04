const config = {
    default: {
        host: process.env.NEXT_PUBLIC_VIDEO_HOST
    },
    twilio: {
        AUTH_TOKEN: process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN
    },
    pusher: {
        PUSHER_APP_ID: process.env.NEXT_PUBLIC_PUSHER_APP_ID,
        PUSHER_KEY: process.env.NEXT_PUBLIC_PUSHER_KEY,
        PUSHER_SECRET: process.env.NEXT_PUBLIC_PUSHER_SECRET,
        PUSHER_CLUSTER: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    }
}

export default config;
