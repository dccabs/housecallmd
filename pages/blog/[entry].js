/**
 * Caution: Consider this file when using NextJS or GatsbyJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using react-scripts
 */
import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import moment from 'moment';


import { createClient } from 'contentful';
import { Box, makeStyles, Typography } from '@material-ui/core'
import Container from '../../components/Container'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID, // ID of a Compose-compatible space to be used \
  accessToken: process.env.CONTENTFUL_DELIVERY_API_TOKEN, // delivery API key for the space \
})

const useStyles = makeStyles((theme) => ({
  body: {
    '& p': {
      padding: '.5em 0',
    },
  },
}));

const BlogPage = ({entry}) => {
  const {
    title,
    date,
    body
  } = entry.fields;

  const classes = useStyles()

  const bodyHtml = body.content.map((item, index) => {
    return (
      <React.Fragment key={`body-${index}`}>
        {documentToReactComponents(item)}
      </React.Fragment>
    )
  })

  return (
    <Container component="main">
      <Box my="3em" justifyContent="center" alignItems="center">
        <Box>
          <Typography variant="h3" gutterBottom>
            {title}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom>
            {moment(date).format('LL')}
          </Typography>
        </Box>
        <Typography variant="body1">
          <div className={classes.body}>
            {bodyHtml}
          </div>
        </Typography>
      </Box>
    </Container>
  )
};

export default BlogPage;

export async function getStaticPaths() {
  const blogPosts = await client.getEntries({ content_type: 'blogPost' });
  const params =  blogPosts.items.map(job => {
    let path = job.fields.title;
    path = path.toLowerCase();
    path = path.replace(/[^a-z0-9]+/g, '-');
    path = path.replace(/^-+|-+$/g, '');
    return {
      params: {
        entry: path,
      }
    }
  })

  return {
    paths: params,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const blogPostsPage = await client.getEntries({ content_type: 'blogPost' });

  const match = blogPostsPage.items.find(item => {
    let path = item.fields.title;
    path = path.toLowerCase();
    path = path.replace(/[^a-z0-9]+/g, '-');
    path = path.replace(/^-+|-+$/g, '');
    return path === params.entry
  })

  const entry = await client.getEntry(match?.sys.id);

  if (!entry) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      entry,
    },
    revalidate: 10,
  }
}
