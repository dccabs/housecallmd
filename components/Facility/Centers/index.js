import { useState, useEffect } from 'react'
import { Box, CircularProgress } from '@material-ui/core'
import MaterialTable from 'material-table'

const Centers = ({ user }) => {
  const [rowData, setRowData] = useState(false)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [centerData, setCenterData] = useState([])

  useEffect(async () => {
    if (user) {
      setLoading(true)
      const getFacilities = await fetch('/api/getFacilities', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ user }),
      })
      const data = getFacilities.json()
      data.then((centers) => {
        setCenterData(centers)
        setLoading(false)
      })
    }
  }, [user])

  const shiftEnums = {
    night: 'Night',
    day: 'Day',
    both: 'Both',
  }

  return (
    <div>
      {!loading && centerData ? (
        <>
          <MaterialTable
            title="Centers"
            columns={[
              {
                title: 'Name',
                field: 'name',
              },
              {
                title: 'Facility Phone',
                field: 'facility_phone',
              },
              {
                title: 'Address',
                field: 'address',
              },

              {
                title: 'City',
                field: 'city',
              },
              {
                title: 'State',
                field: 'state',
              },

              {
                title: 'Primary Contact Name',
                field: 'primary_contact_name',
              },
              {
                title: 'Primary Contact Phone',
                field: 'primary_contact_mobile_phone',
              },
              {
                title: 'Primary Contact Shift',
                field: 'primary_contact_shift',
                render: (rowData) => (
                  <>{shiftEnums[rowData.primary_contact_shift]}</>
                ),
              },

              {
                title: 'Secondary Contact Name',
                field: 'secondary_contact_name',
              },
              {
                title: 'Secondary Contact Phone',
                field: 'secondary_contact_mobile_phone',
              },
              {
                title: 'Secondary Contact Shift',
                field: 'secondary_contact_shift',
                render: (rowData) => (
                  <>{shiftEnums[rowData.secondary_contact_shift]}</>
                ),
              },
            ]}
            data={centerData}
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

export default Centers
