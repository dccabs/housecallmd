import { Typography, Box, Button, TextField } from '@material-ui/core'
import Container from '../components/Container'
import { useRouter } from 'next/router'
import { useState } from 'react';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



export async function getServerSideProps() {
  const contacts = await prisma.contact.findMany();
  return {
    props: {
      initialContacts: contacts,
    }
  }
}

const Pharmacy = (props) => {
  console.log('props', props)
  return (
    <Container>
      <Box p="1em">
        <Typography variant="h2">Prisma test</Typography>
        <Container>
          {props.initialContacts.map((item, x) => {
            return (
              <div key={x}>
                {item.firstName} {item.lastName}
              </div>
            )
          })}
        </Container>
      </Box>
    </Container>
  )
}

export default Pharmacy
