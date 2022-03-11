import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import PageLayout from "./components/PageLayout";
import MovieCard from "./components/MovieCard";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppHeader />
      <PageLayout title="Liste des films">
        <MovieCard />
      </PageLayout>
      <AppFooter />
    </ThemeProvider>
  );
}

export default App;
