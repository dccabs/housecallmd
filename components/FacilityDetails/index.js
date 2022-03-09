import { Table, TableCell, TableRow, Typography, Box } from '@material-ui/core'
import MaterialTable from 'material-table'
import React from 'react'
import useStyles from './use-styles'
import tableCols from './table-cols'
import Container from '../Container'
import { useRouter } from 'next/router'

const FacilityDetails = ({ facility }) => {
  const router = useRouter()

  const classes = useStyles({
    h2: {
      paddingBottom: 60,
      color: 'red',
    },
  })
  return (
    <>
      <Container>

        <Typography variant="h2" className={classes.h2}>
          {facility?.name}
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
            <TableCell>{facility?.primary_contact_mobile_phone}</TableCell>
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
              <TableCell>{facility?.secondary_contact_mobile_phone}</TableCell>
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
      </Container>
    </>
  )
}

export default FacilityDetails
