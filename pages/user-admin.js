import { useState, useEffect, useContext } from 'react'
import {
  Typography,
  Box,
  Button,
  Dialog,
  DialogContent,
  CircularProgress,
} from '@material-ui/core'
import MaterialTable from 'material-table'
import { makeStyles } from '@material-ui/core/styles'

import Container from '../components/Container'
import UtilModal from '../components/UtilModal'
import { SnackBarContext } from '../components/SnackBar'
import { Auth } from '@supabase/ui'
import setStoreWithAuthInfo from '../utils/setStoreWithAuthInfo'

const useStyles = makeStyles((theme) => ({
  buttonLinks: {
    '@media screen and (max-width: 700px)': {
      '&:nth-child(2)': {
        order: -1,
      },
    },

    '& button': {
      height: '100%',
      padding: '1em',
      fontWeight: 600,
      width: '16rem',

      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}))

const UserAdmin = (props) => {
  const [users, setUsers] = useState()
  const [open, setOpen] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [rowData, setRowData] = useState({})
  const [rowsToDelete, setRowsToDelete] = useState([])
  const [loading, setLoading] = useState(false)
  const classes = useStyles()
  const openSnackBar = useContext(SnackBarContext)
  const { user } = Auth.useUser()

  useEffect(async () => {
    if (user) {
      fetch('/api/getSingleUser', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ email: user.email }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.role === 'admin') {
            getUsers()
          } else {
            openSnackBar({
              message: 'you are not authorized to view this page',
              snackSeverity: 'error',
            })
          }
        })
    }
  }, [user])

  const getUsers = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/getAllUsers`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        credentials: 'same-origin',
        body: JSON.stringify({
          user,
        }),
      })
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
    } finally {
      setLoading(false)
    }
  }

  const rowSelected = (rowData) => {
    setRowData(rowData)
    setOpen(true)
  }

  const deleteRows = async () => {
    const rows = [...users]
    const newRows = rows.filter((r) => !rowsToDelete.includes(r))

    const emails = rowsToDelete.map((row) => {
      return {
        email: row.email,
      }
    })

    await emails.forEach((email) => {
      fetch('/api/deleteUser', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ email: email.email }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            throw Error(data.error)
          } else {
            openSnackBar({
              message: `You successfully deleted a user`,
              snackSeverity: 'success',
            })
          }
        })
        .catch((error) => {
          openSnackBar({ message: error, snackSeverity: 'error' })
        })
    })

    setUsers(newRows)
    setOpenDialog(false)
  }
  return (
    <Container>
      <Box>
        {!loading && users ? (
          <MaterialTable
            title="Users"
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
            // editable={{
            //   onRowUpdate: async (updatedRow, oldRow) => {
            //     const email = await oldRow.email
            //     const rows = [...users]
            //     const newRows = rows.map((r) => {
            //       if (r.email === email) r = updatedRow
            //       return r
            //     })
            //     await setUsers(newRows)
            //   },
            //   onRowDelete: async (selectedRow) => {
            //     const email = await selectedRow.email
            //     const rows = [...users]
            //     const newRows = rows.filter((r) => r.email !== email)
            //     await setUsers(newRows)
            //   },
            // }}
            options={{
              paginationType: 'stepped',
              selection: true,
              //actionsColumnIndex: -1,
            }}
            actions={[
              {
                tooltip: 'Remove All Selected Users',
                icon: 'delete',
                onClick: (event, data) => {
                  setRowsToDelete(data)
                  setOpenDialog(true)
                },
              },
            ]}
            onRowClick={(event, rowData) => rowSelected(rowData)}
          />
        ) : (
          <Box
            my="1em"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Box>
        )}
      </Box>

      <UtilModal
        open={open}
        setOpen={setOpen}
        rowData={rowData}
        users={users}
        setUsers={setUsers}
      />

      <Dialog
        open={openDialog}
        keepMounted
        onClose={() => setOpenDialog(false)}
      >
        <Box p="2em">
          <Typography variant="h4" align="center">
            Delete Users?
          </Typography>
          <DialogContent>
            <Box
              mt="2em"
              display="flex"
              justifyContent="center"
              flexWrap="wrap"
            >
              <Box m="1em" className={classes.buttonLinks}>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => setOpenDialog(!openDialog)}
                >
                  Cancel
                </Button>
              </Box>
              <Box m="1em" className={classes.buttonLinks}>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={deleteRows}
                >
                  Yes
                </Button>
              </Box>
            </Box>
          </DialogContent>
        </Box>
      </Dialog>
    </Container>
  )
}

export default UserAdmin
