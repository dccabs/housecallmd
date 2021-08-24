import { useState, useEffect, useContext } from 'react'
import { Auth } from '@supabase/ui'


const Appointments = ({openSnackBar}) => {
  const [appointments, setAppointments] = useState(false)
  const [loading, setLoading] = useState(false)
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
          console.log('data', data)
        })
        .catch((error) => {
          openSnackBar({ message: error.toString(), snackSeverity: 'error' })
        })
    }
  },[user]);

  return <div>Completed Appointments</div>
}

export default Appointments
