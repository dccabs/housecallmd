import React, { useEffect, useState } from 'react'
import { NextSeo } from 'next-seo'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import { Typography, Box, CircularProgress } from '@material-ui/core'
import xhrHeader from '../../../constants/xhrHeader'
import Container from '../../../components/Container'
import FacilityDetails from '../../../components/FacilityDetails'

const FacilityDetailsPage = () => {
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
        <>
          {loading ? (
            <Box
              my="1em"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <FacilityDetails facility={facility} />
            </>
          )}
        </>
      )}
    </>
  )
}

export default FacilityDetailsPage
