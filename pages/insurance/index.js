import { Typography, Box, Button } from '@material-ui/core'
import Container from '../../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import useStore from '../../zustand/store'
import { useRouter } from 'next/router'


const useStyles = makeStyles((theme) => ({
  h2: {
    marginTop: '.5em',
  },
  buttonLinks: {
    '& button': {
      padding: '1em',
      fontWeight: 600,
      width: '16rem',
      margin: '1em',

      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  disclaimer: {
    color: '#666',
  },
}))

const Insurance = () => {
  const classes = useStyles()
  const { setHasInsurance } = useStore()
  const router = useRouter()

  const handleNoClick = () => {
    setHasInsurance(false);
    router.push('/enter-profile-information');
  }

  const handleYesClick = () => {
    setHasInsurance(true);
    router.push('/insurance/policy-cardholder');
  }

  return (
    <Container>
      <Box>
        <Typography variant="h2" className={classes.h2}>Insurance</Typography>
        <Box
          mt="2em"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h4">Will you be using insurance?</Typography>
          <Box className={classes.disclaimer} mt="1em">
            You do not need to have insurance to use this service.
          </Box>
          <Box
            className={classes.buttonLinks}
            mt="2em"
            display="flex"
            justifyContent="center"
            flexWrap="wrap"
          >

            <Button
              onClick={handleYesClick}
              color="secondary"
              variant="contained"
            >
              Yes
            </Button>
            <Button
              onClick={handleNoClick}
              color="secondary"
              variant="contained"
            >
              No
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default Insurance
