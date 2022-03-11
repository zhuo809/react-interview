import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  Checkbox,
  CardActions,
  CardHeader,
  Grid,
  Container,
  FormControl,
  OutlinedInput,
  ListItemText,
  Select,
  MenuItem,
  InputLabel,
  Stack,
  IconButton,
  Skeleton,
  TablePagination,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ClearIcon from "@mui/icons-material/Clear";

import DeleteDialog from "./DeleteDialog";
import { movies$ } from "../data/movies";

const MovieCard = () => {
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteFilmId, setDeleteFilmId] = useState();
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [catFilter, setCatFilter] = useState([]);
  const [films, setFilms] = useState([]);
  useEffect(() => {
    const run = async () => {
      await movies$.then((result) => {
        setFilms(result);
        setLoading(false);
        const cats = result.map((r) => r.category);
        const catsFil = [...new Set(cats)];
        setCategories(catsFil);
      });
    };
    run();
  }, []);

  const handleChangeFilter = (event) => {
    const {
      target: { value },
    } = event;
    setCatFilter(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeFilm = (film, valChange) => {
    film[valChange]++;

    const newFilms = films.map((f) => (f.id === film.id ? film : f));
    setFilms(newFilms);
  };

  const handleDelete = (filmId) => {
    setDeleteDialog(true);
    setDeleteFilmId(filmId);
  };
  const handleDeleteConfirm = () => {
    if (deleteFilmId && deleteFilmId > 0) {
      const newFilms = films.filter((f) => f.id !== deleteFilmId);
      setFilms(newFilms);
    }
    setDeleteDialog(false);
  };

  if (loading && films.length === 0)
    return (
      <Container sx={{ py: 8 }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Container>
    );

  const filteredFilms =
    catFilter.length > 0
      ? films.filter((f) => catFilter.includes(f.category))
      : films;

  return (
    <Container sx={{ py: 8 }}>
      <Stack
        direction="row"
        flexWrap="wrap-reverse"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      ></Stack>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <FormControl sx={{ minWidth: "250px" }}>
            <InputLabel id="category-select-label">Catégorie(s)</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              multiple
              value={catFilter}
              onChange={handleChangeFilter}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {categories.map((cat, i) => (
                <MenuItem key={`cat-${i}`} value={cat}>
                  <Checkbox checked={catFilter.indexOf(cat) > -1} />
                  <ListItemText primary={cat} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ textAlign: "right" }}
          display={{ xs: "none", lg: "block" }}
        >
          <FormControl sx={{ minWidth: "150px" }}>
            <InputLabel id="rowsPerPage-select-label">Afficher</InputLabel>
            <Select
              labelId="rowsPerPage-select-label"
              id="rowsPerPage-select"
              value={rowsPerPage}
              label="rowsPerPage"
              onChange={handleChangeRowsPerPage}
            >
              <MenuItem value={4}>4 par page</MenuItem>
              <MenuItem value={8}>8 par page</MenuItem>
              <MenuItem value={12}>12 par page</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {filteredFilms
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((film) => (
            <Grid item key={`card-${film.id}`} xs={12} sm={6}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardHeader title={film.title} subheader={film.category} />
                <CardMedia
                  component="img"
                  image="https://source.unsplash.com/random"
                  alt="random"
                  height="150"
                />

                <CardActions>
                  <IconButton
                    color="success"
                    aria-label="likes"
                    onClick={() => handleChangeFilm(film, "likes")}
                  >
                    <ThumbUpIcon />
                  </IconButton>{" "}
                  {film.likes ? film.likes : 0}
                  <IconButton
                    color="error"
                    aria-label="dislikes"
                    onClick={() => handleChangeFilm(film, "dislikes")}
                  >
                    <ThumbDownIcon />
                  </IconButton>{" "}
                  {film.dislikes ? film.dislikes : 0}
                  <IconButton
                    style={{ marginLeft: "auto" }}
                    aria-label="share"
                    onClick={() => handleDelete(film.id)}
                  >
                    <ClearIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>

      <DeleteDialog
        isOpen={deleteDialog}
        handleDeleteDialogClose={setDeleteDialog}
        handleDeleteDialogConfirm={handleDeleteConfirm}
      />

      <TablePagination
        rowsPerPageOptions={[4, 8, 12]}
        component="div"
        count={films.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Afficher par : "
      />
    </Container>
  );
};

export default MovieCard;
