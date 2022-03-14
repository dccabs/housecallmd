import MaterialTable from 'material-table'

const genericCols = [
  {
    title: 'First Name',
    field: 'firstName',
  },
  {
    title: 'Last Name',
    field: 'lastName',
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
    title: 'Note',
    field: 'note',
  },
  {
    title: 'Date/Time',
    field: 'time',
  },
]

const patientCols = [
  {
    title: 'Visit Choice',
    field: 'visitChoice',
  },
  {
    title: 'Visit Reason',
    field: 'visitReason',
  },

  {
    title: 'Note',
    field: 'note',
  },
  {
    title: 'Date/Time',
    field: 'time',
  },
  {
    title: 'Status',
    field: 'completed',
    render: (rowData) => (rowData ? 'Completed' : 'Not Completed'),
  },
]

function AppointmentTable({ appointments, hideName }) {
  return (
    <MaterialTable
      title="Appointments"
      columns={hideName ? patientCols : genericCols}
      data={appointments}
      options={{
        paginationType: 'stepped',
        selection: true,
        pageSize: 50,
        pageSizeOptions: [50, 100, 200],
      }}
      // onRowClick={(event, rowData) => {
      //   const { id } = rowData
      //   router.push(`/facility/patient/${id}`)
      // }}
    />
  )
}

export default AppointmentTable
