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
import MaterialTable from 'material-table'
import { AddBox, ArrowDownward } from '@material-ui/icons'
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

const UserAdmin = () => {
  const [users, setUsers] = useState()
  const classes = useStyles()

  useEffect(async () => {
    try {
      const res = await fetch(`/api/getAllUsers`)
      const data = await res.json()
      const users = await data.map((u) => {
        return {
          name: `${u.lastName}, ${u.firstName}`,
          email: u.email,
          hasInsurance: u.hasInsurance ? 'Yes' : 'No',
          provider: u.provider,
          planNumber: u.planNumber,
          groupNumber: u.groupNumber,
          phone: u.phone,
          address: `${u.address}, ${u.city}, ${u.state}, ${u.zip}`,
        }
      })

      setUsers(users)
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <Container>
      <Box>
        <MaterialTable
          columns={[
            { title: 'Name', field: 'name' },
            { title: 'Email', field: 'email' },
            { title: 'Has Insurance', field: 'hasInsurance' },
            { title: 'Provider', field: 'provider' },
            { title: 'Plan Number', field: 'planNumber' },
            { title: 'Group Number', field: 'groupNumber' },
            { title: 'Phone', field: 'phone' },
            { title: 'Address', field: 'address' },
          ]}
          data={users}
          title="Users"
        />

        {/* <TableContainer>
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
        </TableContainer> */}
      </Box>
    </Container>
  )
}

export default UserAdmin
