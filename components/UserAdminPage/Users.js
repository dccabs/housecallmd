import { useState, useEffect } from 'react'
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

import UtilModal from '../UtilModal'
import UserInformationContent from '../UserInformationContent'

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

const Users = ({ user, openSnackBar }) => {
  const [users, setUsers] = useState()
  const [open, setOpen] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [rowData, setRowData] = useState({})
  const [rowsToDelete, setRowsToDelete] = useState([])
  const [loading, setLoading] = useState(false)

  const classes = useStyles()

  useEffect(async () => {
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
      setUsers(data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }, [])

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
        body: JSON.stringify({ email: email.email, user }),
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
    <div>
      <div>
        {!loading && users ? (
          <MaterialTable
            title="Users"
            columns={[
              {
                title: 'Name',
                field: 'name',
                render: (rowData) => (
                  <>
                    {rowData.lastName}, {rowData.firstName}
                  </>
                ),
              },
              { title: 'Email', field: 'email' },
              {
                title: 'Has Insurance',
                field: 'hasInsurance',
                render: (rowData) => <>{rowData.hasInsurance ? 'Yes' : 'No'}</>,
              },
              { title: 'Provider', field: 'provider' },
              { title: 'Plan Number', field: 'planNumber' },
              { title: 'Group Number', field: 'groupNumber' },
              { title: 'Phone', field: 'phone' },
              {
                title: 'Address',
                field: 'address',
                render: (rowData) => (
                  <>
                    {rowData.address}
                    <br />
                    {rowData.city}, {rowData.state} {rowData.zip}
                  </>
                ),
              },
            ]}
            data={users}
            options={{
              paginationType: 'stepped',
              selection: true,
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
      </div>

      <UtilModal
        open={open}
        setOpen={setOpen}
        component={
          <UserInformationContent
            setOpen={setOpen}
            rowData={rowData}
            users={users}
            setUsers={setUsers}
          />
        }
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
    </div>
  )
}

export default Users
