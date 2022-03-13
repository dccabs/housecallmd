import MaterialTable from 'material-table'

function AppointmentTable({ appointments }) {
  return (
    <MaterialTable
      title="Appointments"
      columns={[
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
      ]}
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
