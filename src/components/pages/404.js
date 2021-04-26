import { Typography, Box } from "@material-ui/core";
import Container from "../Container";

const PageNotFound = () => {
  return (
    <Container>
      <Box p="1em">
        <Typography variant="h2">Page not found</Typography>
      </Box>
    </Container>
  );
};

export default PageNotFound;
