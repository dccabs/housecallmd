/**
 * Caution: Consider this file when using NextJS or GatsbyJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using react-scripts
 */
import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import moment from 'moment';
import Link from 'next/link'

import { createClient } from 'contentful';
import { Box, makeStyles, Typography } from '@material-ui/core'
import Container from '../../components/Container'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID, // ID of a Compose-compatible space to be used \
  accessToken: process.env.CONTENTFUL_DELIVERY_API_TOKEN, // delivery API key for the space \
})

const useStyles = makeStyles((theme) => ({
  body: {
    height: 200,
    '& p': {
      padding: '.5em 0',
    },
  },
}));

const BlogPage = ({blogPostsPage}) => {
  const {
    items,
  } = blogPostsPage;


  const classes = useStyles()

  return (
    <Container component="main">
      {items.map((item, index) => {
        const { title, date, body } = item.fields;
        let path = title;
        path = path.toLowerCase();
        path = path.replace(/[^a-z0-9]+/g, '-');
        path = path.replace(/^-+|-+$/g, '');
        return (
          <Box my="3em" justifyContent="center" alignItems="center" key={`entry-${index}`}>
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
                {documentToReactComponents(body.content[0])}
                <div>
                  <Link href={`/blog/${path}`}>
                    <a>Read More</a>
                  </Link>
                </div>
              </div>
            </Typography>
          </Box>
        )
      })}
    </Container>
  )
};

export default BlogPage;

export async function getStaticProps({ params }) {
  const blogPostsPage = await client.getEntries({ content_type: 'blogPost' });

  return {
    props: {
      blogPostsPage,
    },
    revalidate: 10,
  }
}
