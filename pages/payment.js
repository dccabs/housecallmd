import { Typography, Box } from '@material-ui/core'
import Container from '../components/Container'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import PaymentForm from '../components/PaymentForm'

const stripePromise = loadStripe(
  'pk_live_51IqepQFtNrzuZqBfxnjNvc1UOqAC0LUV1hSfkd5ZXAlV0x8PAqHwbjKKxhaxVo2wZKTJcNFuWaqet1txKfT25jvf00TKny1Ns2'
)

const Payment = () => {
  return (
    <Container>
      <Box>
        <Typography variant="h2">Payment</Typography>
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      </Box>
    </Container>
  )
}

export default Payment
