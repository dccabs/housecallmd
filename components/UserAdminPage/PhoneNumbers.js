import { useState, useEffect } from 'react'
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogContent,
} from '@material-ui/core'
import MaterialTable from 'material-table'
import { makeStyles } from '@material-ui/core/styles'

import UtilModal from '../UtilModal'
import AddPhoneNumber from '../AddPhoneNumber'

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

const PhoneNumbers = ({ user, openSnackBar }) => {
  const [phoneNumbers, setPhoneNumbers] = useState(false)
  const [loading, setLoading] = useState(false)
  const [rowData, setRowData] = useState()
  const [open, setOpen] = useState(false)
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [rowsToDelete, setRowsToDelete] = useState([])

  const classes = useStyles()

  useEffect(async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/getPhoneNumbers`, {
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

      setPhoneNumbers(data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const togglePhoneNumberStatus = async () => {
    const updatedPhoneNumber = {
      id: rowData.id,
      phoneNumber: rowData.phoneNumber,
      firstName: rowData.firstName,
      lastName: rowData.lastName,
      isActive: !rowData.isActive,
    }

    try {
      setLoading(true)
      const res = await fetch(`/api/updatePhoneNumber`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPhoneNumber),
      })
    } catch (error) {
      openSnackBar({ message: error, snackSeverity: 'error' })
    } finally {
      openSnackBar({
        message: 'Phone number updated successfuly',
        snackSeverity: 'success',
      })
      setLoading(false)
      setOpenUpdateDialog(false)
      const newNumbers = phoneNumbers.filter(
        (p) => p.id !== updatedPhoneNumber.id
      )
      setPhoneNumbers(
        [...newNumbers, updatedPhoneNumber].sort((a, b) =>
          a.lastName > b.lastName ? 1 : b.lastName > a.lastName ? -1 : 0
        )
      )
    }
  }

  const deleteRows = () => {
    const rows = [...phoneNumbers]
    const newRows = rows.filter((r) => !rowsToDelete.includes(r))

    const ids = rowsToDelete.map((row) => {
      return {
        id: row.id,
      }
    })

    ids.forEach((id) => {
      fetch('/api/deletePhone', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ id, user }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error)
          } else {
            openSnackBar({
              message: `You successfully deleted a phone number`,
              snackSeverity: 'success',
            })
          }
        })
        .catch((error) => {
          openSnackBar({ message: error, snackSeverity: 'error' })
        })
    })

    setPhoneNumbers(newRows)
    setOpenDeleteDialog(false)
  }

  return (
    <div>
      {!loading && phoneNumbers ? (
        <>
          <div>
            <Box my="1em">
              <Button
                color="secondary"
                variant="contained"
                onClick={() => setOpen(true)}
              >
                Add phone number
              </Button>
            </Box>

            <MaterialTable
              title="Phone Numbers"
              columns={[
                { title: 'Phone Numbers', field: 'phoneNumber' },
                {
                  title: 'Owner',
                  field: 'name',
                  render: (rowData) => (
                    <>
                      {rowData.lastName}, {rowData.firstName}
                    </>
                  ),
                },
                {
                  title: 'Status',
                  field: 'isActive',
                  render: (rowData) => (
                    <>
                      <FormControl component="fieldset">
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="secondary"
                              checked={rowData.isActive}
                              onChange={() => {
                                setOpenUpdateDialog(true)
                                setRowData(rowData)
                              }}
                            />
                          }
                          label={rowData.isActive ? 'Active' : 'Inactive'}
                          labelPlacement="end"
                        />
                      </FormControl>
                    </>
                  ),
                },
              ]}
              data={phoneNumbers}
              options={{
                paginationType: 'stepped',
                selection: true,
              }}
              actions={[
                {
                  tooltip: 'Remove All Selected Phone Numbers',
                  icon: 'delete',
                  onClick: (event, data) => {
                    setRowsToDelete(data)
                    setOpenDeleteDialog(true)
                  },
                },
              ]}
              // onRowClick={(event, rowData) => rowSelected(rowData)}
            />
          </div>

          <UtilModal
            open={open}
            setOpen={setOpen}
            component={
              <AddPhoneNumber
                setOpen={setOpen}
                phoneNumbers={phoneNumbers}
                setPhoneNumbers={setPhoneNumbers}
                openSnackBar={openSnackBar}
              />
            }
          />

          <Dialog
            open={openUpdateDialog}
            keepMounted
            onClose={() => setOpenUpdateDialog(false)}
          >
            <Box p="2em">
              <Typography variant="h4" align="center">
                Update phone number status?
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
                      onClick={() => setOpenUpdateDialog(!openUpdateDialog)}
                    >
                      Cancel
                    </Button>
                  </Box>
                  <Box m="1em" className={classes.buttonLinks}>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={togglePhoneNumberStatus}
                    >
                      Yes
                    </Button>
                  </Box>
                </Box>
              </DialogContent>
            </Box>
          </Dialog>

          <Dialog
            open={openDeleteDialog}
            keepMounted
            onClose={() => setOpenDeleteDialog(false)}
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
                      onClick={() => setOpenDeleteDialog(!openDeleteDialog)}
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
        </>
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
  )
}

export default PhoneNumbers
