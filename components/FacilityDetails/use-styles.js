import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  h2: {
    marginTop: '.5em',
  },
  tableHead: {
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
}))

export default useStyles
