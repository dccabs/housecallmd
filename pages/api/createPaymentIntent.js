import Stripe from 'stripe'
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET)

export default async (req, res) => {
  const { amount, email, visitChoice, lastName } = req.body

    const paymentIntent  = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: `Housecall services ${visitChoice} ${lastName}`,
      receipt_email: email,
    })

    res.send({
      clientSecret: paymentIntent.client_secret
    });
}
