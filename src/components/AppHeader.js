import { AppBar, Toolbar, Typography } from "@mui/material";
import TheatersIcon from "@mui/icons-material/Theaters";

const AppHeader = () => (
  <AppBar position="relative">
    <Toolbar>
      <TheatersIcon sx={{ mr: 2 }} />
      <Typography variant="h6" color="inherit" noWrap>
        Films
      </Typography>
    </Toolbar>
  </AppBar>
);

export default AppHeader;
