import { Box, Container, Typography } from "@mui/material";
import PropTypes from "prop-types";

const PageLayout = ({ children, title }) => (
  <main>
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
        display: "flex",
        flexDirection: "column",
        minHeight: "95vh",
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          {title}
        </Typography>
      </Container>
      {children}
    </Box>
  </main>
);

PageLayout.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageLayout;
