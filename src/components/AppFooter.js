import { Box, Container, Typography } from "@mui/material";

const AppFooter = () => (
  <Box
    component="footer"
    sx={{
      py: 3,
      px: 2,
      mt: "auto",
      backgroundColor: (theme) =>
        theme.palette.mode === "light"
          ? theme.palette.grey[200]
          : theme.palette.grey[800],
    }}
  >
    <Container maxWidth="sm">
      <Typography variant="body1">TEST react-interview</Typography>
      <Typography variant="body2" color="text.secondary">
        Copyright © Zhuo ZHANG - 2022
      </Typography>
    </Container>
  </Box>
);

export default AppFooter;
