import { useState, useEffect } from 'react'
import { Typography, Box, Button, CircularProgress } from '@material-ui/core'
import MaterialTable from 'material-table'

const CompletedAppointments = () => {
  const [completedAppointments, setCompletedAppointments] = useState(false)
  const [loading, setLoading] = useState(false)

  return <div>Competed Appointments</div>
}

export default CompletedAppointments
