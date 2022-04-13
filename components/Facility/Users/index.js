import { useState, useEffect } from 'react'
import { Box, CircularProgress } from '@material-ui/core'
import MaterialTable from 'material-table'
import xhrHeader from 'constants/xhrHeader'
import router from 'next/router'

const index = ({ user }) => {
  const [users, setUsers] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(async () => {
    if (user) {
      setLoading(true)

      const getUsers = await fetch('/api/getAllFacilityPatients', {
        ...xhrHeader,
        body: JSON.stringify({ user }),
      })
      const data = getUsers.json()
      data.then((usersData) => {
        setUsers(usersData)
        setLoading(false)
      })
    }
  }, [user])

  const handleClick = (id) => {
    router.push({
      pathname: `/facility/admin/user-details/${id}`,
    })
  }

  return (
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
                  {rowData.last_name}, {rowData.first_name}
                </>
              ),
            },
            {
              title: 'Sex',
              field: 'sex',
            },
            {
              title: 'Data of Birth',
              field: 'date_of_birth',
            },
            {
              title: 'Policy Provider',
              field: 'policy_provider',
            },
            {
              title: 'Policy Number',
              field: 'policy_number',
            },
            {
              title: 'Secondary Policy Provider',
              field: 'secondary_policy_provider',
            },
            {
              title: 'Secondary Policy Number',
              field: 'secondary_policy_number',
            },
            {
              title: 'Power of Attorney Name',
              field: 'poa_name',
            },
            {
              title: 'Power of Attorney Phone',
              field: 'poa_phone_number',
            },
          ]}
          data={users}
          options={{
            paginationType: 'stepped',
            sorting: true,
            pageSize: 50,
            pageSizeOptions: [50, 100, 200],
          }}
          onRowClick={(event, rowData) => handleClick(rowData.id)}
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
  )
}

export default index
