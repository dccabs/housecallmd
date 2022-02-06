import { useState, useEffect } from 'react'
import {
  Typography,
  Box,
  Button,
  Dialog,
  DialogContent,
  CircularProgress, FormControl, FormControlLabel, Checkbox
} from '@material-ui/core'
import MaterialTable from 'material-table'
import { makeStyles } from '@material-ui/core/styles'
import { Promise } from 'bluebird';

// import UtilModal from '../UtilModal'
import CustomModal from '../CustomModal/CustomModal'
import UserInformationContent from '../UserInformationContent'
import PersonIcon from '@material-ui/icons/Person'
import { supabase } from '../../utils/initSupabase'

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
  const [smsToggleLoading, setSmsToggleLoading] = useState(false);
  const [image, setImage] = useState();

  const classes = useStyles()

  useEffect(async () => {
    getUsers()
  }, [])


  const getUsers = async () => {
    try {
      let dataWithImage = [];
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

      await Promise.map(data, async (i) => {
        let imageUrl = null;
        if (i.card_information_image !== null) {
          const imageFilePath = i.card_information_image.replace('card-information/', '');
          console.log(imageFilePath);
          
          const { data: blobImage, err } = await supabase.storage.from('card-information').download(imageFilePath);


          if (!err) {
            imageUrl = URL.createObjectURL(blobImage);
          }

          console.log('err', err);
          
        }


        console.log('here', {
          ...i,
          newImagePath: imageUrl
        });

        dataWithImage.push({
          ...i,
          newImagePath: imageUrl
        })
      });
      
      setUsers(dataWithImage);


    } catch (err) {
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

  const handleSmsChange = (e, rowData) => {
    setSmsToggleLoading(true);
    const checked = e.target.checked;
    const payload = {
      id: rowData.id,
      sms_enabled: e.target.checked,
    }
    fetch('/api/toggleSMS', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw Error(data.error)
        } else {

          const usersCopy = Object.assign(users, {})

          const match = usersCopy.find(user => {
            return user.id === rowData.id;
          })

          match.sms_enabled = checked;

          setUsers(usersCopy);
          setSmsToggleLoading(false);

          // openSnackBar({
          //   message: `SMS communications has been set to ${e.target.checked ? 'active' : 'inactive'}`,
          //   snackSeverity: 'success',
          // })
        }
      })
      .catch((error) => {
        setSmsToggleLoading(false);
        openSnackBar({ message: error, snackSeverity: 'error' })
      })
  }

  return (
    <>
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
                customFilterAndSearch: (term, rowData) => {
                  if (rowData.lastName.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                    rowData.firstName.toLowerCase().indexOf(term.toLowerCase()) > -1) {
                    return true;
                  }
                }
              },
              {
                title: 'SMS',
                field: 'sms_enabled',
                render: (rowData) => (
                  <>
                    <FormControl component="fieldset">
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="secondary"
                            checked={rowData.sms_enabled}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            onChange={(e) => {
                              handleSmsChange(e, rowData);
                            }}
                            disabled={smsToggleLoading}
                          />
                        }
                        label="Active"
                        labelPlacement="end"
                      />
                    </FormControl>
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
              pageSize: 50,
              pageSizeOptions: [50, 100, 200],
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

      <CustomModal
        open={open}
        title={'Update User Information'}
        onClose={() => setOpen(false)}
        icon={<PersonIcon fontSize="small" />}
        component={
          <UserInformationContent
            setOpen={() => setOpen(false)}
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
        <Box>
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
    </>
  )
}

export default Users
