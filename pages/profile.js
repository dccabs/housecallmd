import { useState, useEffect } from 'react'
import {
  Typography,
  Box,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core'
import Container from '../components/Container'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  table: {
    border: '1px solid rgba(0, 0, 0, 0.2)',

    '& td': {
      border: '1px solid rgba(0, 0, 0, 0.2)',
    },
  },
  tableHead: {
    backgroundColor: theme.palette.primary.main,

    '& th': {
      color: '#fff',
    },
  },
}))

const profile = () => {
  const [users, setUsers] = useState()
  const classes = useStyles()

  useEffect(async () => {
    try {
      const res = await fetch(`/api/getAllUsers`)
      const data = await res.json()
      console.log(data)
      data && setUsers(data)
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <Container>
      <Box>
        <TableContainer>
          <Table size="small" className={classes.table}>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell size="medium">Name</TableCell>

                <TableCell size="medium">Email</TableCell>

                <TableCell size="medium">Has Insurance</TableCell>

                <TableCell size="medium">Provider</TableCell>

                <TableCell size="medium">Plan Number</TableCell>

                <TableCell size="medium">Group Number</TableCell>

                <TableCell size="medium">Phone</TableCell>

                <TableCell size="medium">Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users &&
                (users.length
                  ? users.map((u, i) => (
                      <TableRow key={i}>
                        <TableCell size="medium">{`${u.lastName}, ${u.firstName}`}</TableCell>

                        <TableCell size="medium">{u.email}</TableCell>

                        <TableCell size="medium">
                          {u.hasInsurance ? 'Yes' : 'No'}
                        </TableCell>

                        <TableCell size="medium">{u.provider}</TableCell>

                        <TableCell size="medium">{u.planNumber}</TableCell>

                        <TableCell size="medium">{u.groupNumber}</TableCell>

                        <TableCell size="medium">{u.phone}</TableCell>

                        <TableCell size="medium">
                          {`${u.address}, ${u.city}, ${u.state}, ${u.zip}`}
                        </TableCell>
                      </TableRow>
                    ))
                  : null)}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  )
}

export default profile
