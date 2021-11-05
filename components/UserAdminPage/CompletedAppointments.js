import { useState, useEffect } from 'react'
import { Box, CircularProgress } from '@material-ui/core'
import { Auth } from '@supabase/ui'
import MaterialTable from 'material-table'
import moment from 'moment'

// import UtilModal from '../UtilModal'
import CustomModal from '../CustomModal/CustomModal'
import { AssignmentTurnedIn as AssignmentTurnedInIcon } from '@material-ui/icons'
import CompletedAppointmentsModalContent from '../CompletedAppointmentsModalContent'

const CompletedAppointments = ({ openSnackBar }) => {
  const [completedAppointments, setCompletedAppointments] = useState(false)
  const [rowData, setRowData] = useState(false)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const { user } = Auth.useUser()

  useEffect(async () => {
    if (user) {
      await fetch('/api/getAppointments', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({
          user,
          completed: true,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setCompletedAppointments(data)
        })
        .catch((error) => {
          openSnackBar({ message: error.toString(), snackSeverity: 'error' })
        })
    }
  }, [user])

  return (
    <div>
      {!loading && completedAppointments ? (
        <>
          <MaterialTable
            title="Completed Appointments"
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
                render: (rowData) => (
                  <>{moment(rowData.time).format('MM/DD/YYYY - h:mm a')}</>
                ),
                defaultSort: 'asc',
              },
            ]}
            data={completedAppointments}
            options={{
              paginationType: 'stepped',
              sorted: true,
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
            onClose={() => setOpen(false)}
            icon={<AssignmentTurnedInIcon fontSize="small" />}
            component={
              <CompletedAppointmentsModalContent
                setOpen={() => setOpen(false)}
                rowData={rowData}
                completedAppointments={completedAppointments}
                setCompletedAppointments={setCompletedAppointments}
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

export default CompletedAppointments
