import React, { useContext, useEffect, useState } from 'react'
import { NextSeo } from 'next-seo'
import xhrHeader from '../../../constants/xhrHeader'
import { Typography, Box, Table, TableRow, TableCell } from '@material-ui/core'
import Container from '../../../components/Container'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import MaterialTable from 'material-table'
import { Skeleton } from '@material-ui/lab'
const useStyles = makeStyles((theme) => ({
  h2: {
    marginTop: '.5em',
  },
  textFields: {
    width: '100%',
    marginTop: '2em',
    maxWidth: '34rem',
  },
  tableHead: {
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
  buttonLinks: {
    '@media screen and (max-width: 700px)': {
      '&:nth-child(2)': {
        order: -1,
      },
    },

    '& button': {
      padding: '1em',
      fontWeight: 600,
      width: '16rem',

      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}))

const FacilityDetails = () => {
  const classes = useStyles()
  const [facility, setFacility] = useState()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  useEffect(async () => {
    if (!facility) {
      const { facility_uuid } = router.query
      if (facility_uuid) {
        const fetchFacilityData = await fetch('/api/getFacilityById', {
          ...xhrHeader,
          body: JSON.stringify({ id: facility_uuid }),
        })

        const data = await fetchFacilityData.json()
        if (data.error) {
          console.error('ERROR:', data.error)
          setError(true)
          setLoading(false)
        } else {
          setFacility(data)
          setLoading(false)
        }
      }
    }
  })

  return (
    <>
      <NextSeo
        title="My Facility Account | House Call MD"
        description="My Facility Account |  House Call MD."
        canonical="https://www.housecallmd.org"
        openGraph={{
          type: 'website',
          title: 'My Facility Account | House Call MD',
          description: 'My Facility Account in House Call MD',
          locale: 'en_US',
          url: `https://www.housecallmd.org/facility/facility-details`,
        }}
      />
      {error ? (
        <Container>
          <Typography variant="body1" className={classes.error}>
            Sorry, there has been an error
          </Typography>
        </Container>
      ) : (
        <Container>
          {loading ? (
            <Typography>
              {/*@TODO: MAKE THIS LOOK NICER*/}
              <Skeleton variant="text" height="10em" animation="wave" />
            </Typography>
          ) : (
            <>
              <Typography variant="h2" className={classes.h2}>
                {facility?.name}
              </Typography>

              <Typography variant="h3" className={classes.h2}>
                Facility Information
              </Typography>
              <Table>
                <TableRow>
                  <TableCell variant="head" className={classes.tableHead}>
                    Address:
                  </TableCell>
                  <TableCell>
                    {facility?.address}
                    <br />
                    {facility?.city}, {facility?.state} {facility?.zip}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" className={classes.tableHead}>
                    Primary Contact Name:
                  </TableCell>
                  <TableCell>{facility?.primary_contact_name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" className={classes.tableHead}>
                    Primary Contact Phone:
                  </TableCell>
                  <TableCell>
                    {facility?.primary_contact_mobile_phone}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" className={classes.tableHead}>
                    Primary Contact Shift:
                  </TableCell>
                  <TableCell>{facility?.primary_contact_shift}</TableCell>
                </TableRow>
                {facility?.secondary_contact_name && (
                  <TableRow>
                    <TableCell variant="head" className={classes.tableHead}>
                      Secondary Contact Name:
                    </TableCell>
                    <TableCell>{facility?.secondary_contact_name}</TableCell>
                  </TableRow>
                )}

                {facility?.secondary_contact_mobile_phone && (
                  <TableRow>
                    <TableCell variant="head" className={classes.tableHead}>
                      Secondary Contact Phone:
                    </TableCell>
                    <TableCell>
                      {facility?.secondary_contact_mobile_phone}
                    </TableCell>
                  </TableRow>
                )}

                {facility?.secondary_contact_shift && (
                  <TableRow>
                    <TableCell variant="head" className={classes.tableHead}>
                      Secondary Contact Shift:
                    </TableCell>
                    <TableCell>{facility?.secondary_contact_shift}</TableCell>
                  </TableRow>
                )}
              </Table>
              <MaterialTable
                title="Patient Information"
                columns={[
                  {
                    title: 'First Name',
                    field: 'first_name',
                  },
                  {
                    title: 'Last Name',
                    field: 'last_name',
                  },
                  {
                    title: 'Email',
                    field: 'email',
                  },
                  {
                    title: 'Gender',
                    field: 'gender',
                  },
                  {
                    title: 'Phone',
                    field: 'phone',
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
                    title: 'Zip',
                    field: 'zip',
                  },
                ]}
                data={facility?.patients}
              />
            </>
          )}
        </Container>
      )}
    </>
  )
}

export default FacilityDetails
