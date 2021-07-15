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
  const { setIsPolicyCardHolder } = useStore()
  const router = useRouter()

  const handleNoClick = () => {
    setIsPolicyCardHolder(false);
    router.push('/insurance/primary-cardholder-information');
  }

  const handleYesClick = () => {
    setIsPolicyCardHolder(true);
    router.push('/insurance/choose-provider');
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
          <Typography variant="h4">Are you the primary policy card holder on your insurance?</Typography>
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
