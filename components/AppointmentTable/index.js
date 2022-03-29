import MaterialTable from 'material-table'
import { useEffect } from 'react'

const publicWithName = [
  {
    title: 'First Name',
    field: 'firstName',
    render: (rowData) => rowData.facility_patients.first_name,
  },
  {
    title: 'Last Name',
    field: 'lastName',
    render: (rowData) => rowData.facility_patients.last_name,
  },
  {
    title: 'Visit Reason',
    field: 'visitReason',
  },
  {
    title: 'Date/Time',
    field: 'time',
  },
  {
    title: 'Status',
    field: 'completed',
    render: (rowData) => (rowData.completed ? 'Completed' : 'Not Completed'),
  },
]

const publicWithoutName = [
  {
    title: 'Visit Reason',
    field: 'visitReason',
  },
  {
    title: 'Date/Time',
    field: 'time',
  },
  {
    title: 'Status',
    field: 'completed',
    render: (rowData) => (rowData.completed ? 'Completed' : 'Not Completed'),
  },
]

const adminWithName = [
  {
    title: 'First Name',
    field: 'firstName',
    render: (rowData) => rowData.facility_patients.first_name,
  },
  {
    title: 'Last Name',
    field: 'lastName',
    hidden: true,
    render: (rowData) => rowData.facility_patients.last_name,
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
    render: (rowData) => (rowData.completed ? 'Completed' : 'Not Completed'),
  },
]

const adminWithoutName = [
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
    render: (rowData) => (rowData.completed ? 'Completed' : 'Not Completed'),
  },
]

function AppointmentTable({ appointments, hideName = false, admin = false, hideCompleted = false, hideNonCompleted}) {
  console.log('appointments', appointments);
  const nonCompleteAppointments = appointments.filter(appointment => {
    return appointment.completed === false;
  })

  const completedAppointments = appointments.filter(appointment => {
    return appointment.completed === true;
  })

  const displayAppointments = hideCompleted ? nonCompleteAppointments : hideNonCompleted ? completedAppointments : appointments;

  let columnData = [];
  if (admin) {
    if (hideName) {
      columnData = adminWithoutName;
    } else {
      columnData = adminWithName;
    }
  } else {
    if (hideName) {
      columnData = publicWithoutName;
    } else {
      columnData = publicWithName;
    }
  }
  return (
    <MaterialTable
      title="Appointments"
      columns={columnData}
      data={displayAppointments}
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
