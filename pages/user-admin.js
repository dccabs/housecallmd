import { useState, useEffect } from 'react'
import { Box } from '@material-ui/core'
import MaterialTable from 'material-table'
import Container from '../components/Container'

const UserAdmin = () => {
  const [users, setUsers] = useState()

  useEffect(async () => {
    try {
      const res = await fetch(`/api/getAllUsers`)
      const data = await res.json()
      const users = await data.map((u) => {
        return {
          name: `${u.lastName}, ${u.firstName}`,
          email: u.email,
          hasInsurance: u.hasInsurance ? 'Yes' : 'No',
          provider: u.provider,
          planNumber: u.planNumber,
          groupNumber: u.groupNumber,
          phone: u.phone,
          address: `${u.address}, ${u.city}, ${u.state}, ${u.zip}`,
        }
      })

      setUsers(users)
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <Container>
      <Box>
        {users && (
          <MaterialTable
            title="Users"
            columns={[
              { title: 'Name', field: 'name' },
              { title: 'Email', field: 'email' },
              { title: 'Has Insurance', field: 'hasInsurance' },
              { title: 'Provider', field: 'provider' },
              { title: 'Plan Number', field: 'planNumber' },
              { title: 'Group Number', field: 'groupNumber' },
              { title: 'Phone', field: 'phone' },
              { title: 'Address', field: 'address' },
            ]}
            data={users}
            editable={{
              onRowUpdate: async (updatedRow, oldRow) => {
                const email = await oldRow.email
                const rows = [...users]
                const newRows = rows.map((r) => {
                  if (r.email === email) r = updatedRow
                  return r
                })
                await setUsers(newRows)
              },
              onRowDelete: async (selectedRow) => {
                const email = await selectedRow.email
                const rows = [...users]
                const newRows = rows.filter((r) => r.email !== email)
                await setUsers(newRows)
              },
            }}
            options={{
              paginationType: 'stepped',
              actionsColumnIndex: -1,
            }}
          />
        )}
      </Box>
    </Container>
  )
}

export default UserAdmin
