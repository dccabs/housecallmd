import MaterialTable from 'material-table'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import { findIndex } from 'lodash'

const publicWithName = [
  {
    title: 'First Name',
    field: 'facility_patients.first_name',
  },
  {
    title: 'Last Name',
    field: 'facility_patients.last_name',
  },
  {
    title: 'Visit Reason',
    field: 'visitReason',
  },
  {
    title: 'Visit Summary / Orders',
    field: 'orders',
  },
  {
    title: 'Date/Time',
    field: 'created_at',
    render: (rowData) => moment(rowData.created_at).format('LLL'),
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
    title: 'Visit Summary / Orders',
    field: 'orders',
  },
  {
    title: 'Date/Time',
    field: 'created_at',
    render: (rowData) => moment(rowData.created_at).format('LLL'),
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
    field: 'facility_patients.first_name',
  },
  {
    title: 'Last Name',
    field: 'facility_patients.last_name',
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
    title: 'Visit Summary / Orders',
    field: 'orders',
  },
  {
    title: 'Date/Time',
    field: 'created_at',
    render: (rowData) => moment(rowData.created_at).format('LLL'),
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
    title: 'Visit Summary / Orders',
    field: 'orders',
  },
  {
    title: 'Date/Time',
    field: 'time',
    render: (rowData) => moment(rowData.created_at).format('LLL'),
  },
  {
    title: 'Status',
    field: 'completed',
    render: (rowData) => (rowData.completed ? 'Completed' : 'Not Completed'),
  },
]

const useStyles = makeStyles((theme) => ({
  materialTable: {
    display: 'none'
  }
}))

const AppointmentTable = ({
  appointments,
  hideName = false,
  admin = false,
  hideCompleted = false,
  hideNonCompleted,
  hideOrders = false,
}) => {
  const classes = useStyles()
  const router = useRouter()

  const nonCompleteAppointments = appointments.filter((appointment) => {
    return appointment.completed === false
  })

  const completedAppointments = appointments.filter((appointment) => {
    return appointment.completed === true
  })

  let displayAppointments = hideCompleted
    ? nonCompleteAppointments
    : hideNonCompleted
    ? completedAppointments
    : appointments

  displayAppointments = displayAppointments.sort(function (a, b) {
    return new Date(b.created_at) - new Date(a.created_at)
  })

  let columnData = []
  if (admin) {
    if (hideName) {
      columnData = adminWithoutName
    } else {
      columnData = adminWithName
    }
  } else {
    if (hideName) {
      columnData = publicWithoutName
    } else {
      columnData = publicWithName
    }
    const index = columnData.findIndex((item) => {
      return item.field === 'orders'
    })

    columnData[index].hidden = hideOrders ? true : false
  }

  return (
    <MaterialTable
      title="Appointments"
      columns={columnData}
      className={classes.materialTable}
      data={displayAppointments}
      options={{
        paginationType: 'stepped',
        selection: false,
        pageSize: 50,
        pageSizeOptions: [50, 100, 200],
      }}
      onRowClick={(event, rowData) => {
        const { id } = rowData
        const appointmentUrl = admin
          ? `/facility/admin/appointment/${id}`
          : `/facility/appointment/${id}`
        router.push(appointmentUrl)
      }}
    />
  )
}

export default AppointmentTable
