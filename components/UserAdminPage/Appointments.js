import { useState, useEffect } from 'react'
import { Box, CircularProgress } from '@material-ui/core'
import { Auth } from '@supabase/ui'
import MaterialTable from 'material-table'
import moment from 'moment-timezone';
import tz from 'moment-timezone';

// import UtilModal from '../UtilModal'
import CustomModal from '../CustomModal/CustomModal'
import AppointmentsModalContent from '../AppointmentsModalContent'
import { AssignmentInd as AssignmentIndIcon } from '@material-ui/icons'

const Appointments = ({ openSnackBar }) => {
  const [appointments, setAppointments] = useState(false)
  const [rowData, setRowData] = useState(false)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const { user } = Auth.useUser()

  useEffect(async () => {
    if (user) {
      setLoading(true)
      await fetch('/api/getAppointments', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({
          user,
          completed: false,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setAppointments(data)
          setLoading(false)
        })
        .catch((error) => {
          openSnackBar({ message: error.toString(), snackSeverity: 'error' })
        })
    }
  }, [user])

  return (
    <div>
      {!loading && appointments ? (
        <>
          <MaterialTable
            title="Appointments"
            columns={[
              {
                title: 'Name',
                field: 'name',
                render: (rowData) => (
                  <>
                    {rowData.UserList.lastName}, {rowData.UserList.firstName}
                  </>
                ),
              },
              {
                title: 'Visit Choice',
                field: 'visitChoice',
              },
              {
                title: 'Visit Reason',
                field: 'visitReason',
              },
              {
                title: 'Client Notes',
                field: 'clientNotes',
              },
              {
                title: 'Using Insurance',
                field: 'usingInsurance',
                render: (rowData) => (
                  <>{rowData.usingInsurance ? 'Yes' : 'No'}</>
                ),
              },
              {
                title: 'Date/Time',
                field: 'time',
                render: (rowData) => {
                  const date = rowData.time;
                  var stillUtc = moment.utc(date).toDate();
                  var local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
                  return (
                    <>{moment(local).format('MM/DD/YYYY - h:mm a')}</>
                  )
                },
                defaultSort: 'desc',
              },
            ]}
            data={appointments}
            options={{
              paginationType: 'stepped',
              sorting: true,
              pageSize: 50,
              pageSizeOptions: [50, 100, 200],
            }}
            onRowClick={(event, rowData) => {
              setOpen(true)
              setRowData(rowData)
            }}
          />

          <CustomModal
            open={open}
            title={'Update Appointment'}
            icon={<AssignmentIndIcon fontSize="small" />}
            onClose={() => setOpen(false)}
            component={
              <AppointmentsModalContent
                setOpen={() => setOpen(false)}
                rowData={rowData}
                appointments={appointments}
                setAppointments={setAppointments}
                openSnackBar={openSnackBar}
              />
            }
          />
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

export default Appointments
