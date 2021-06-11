import Stripe from 'stripe'
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET)

export default async (req, res) => {
  const { id, amount } = req.body

    const paymentIntent  = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: 'Housecall services',
      payment_method: id,
      confirm: true,
    })

    res.send({
      clientSecret: paymentIntent.client_secret
    });
}
