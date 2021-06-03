import { useState, useEffect } from 'react'
import {
  Typography,
  Box,
  Button,
  Dialog,
  DialogContent,
} from '@material-ui/core'
import MaterialTable from 'material-table'
import { makeStyles } from '@material-ui/core/styles'

import Container from '../components/Container'
import UtilModal from '../components/UtilModal'

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

const UserAdmin = () => {
  const [users, setUsers] = useState()
  const [open, setOpen] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [rowData, setRowData] = useState({})
  const [rowsToDelete, setRowsToDelete] = useState([])
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

  const rowSelected = (rowData) => {
    setRowData(rowData)
    setOpen(true)
  }

  const deleteRows = () => {
    const rows = [...users]
    const newRows = rows.filter((r) => !rowsToDelete.includes(r))

    setUsers(newRows)
    setOpenDialog(false)
  }
  return (
    <Container>
      <Box>
        {users && (
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