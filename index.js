const express = require("express");
const app = express();

app.use(express.json());

const movies = [
  {
    id: 1,
    name: "Tenet",
  },
  {
    id: 2,
    name: "Interception",
  },
  {
    id: 3,
    name: "Don",
  },
  {
    id: 4,
    name: "DDLJ",
  },
  {
    id: 5,
    name: "Dhoom",
  },
];

const getMovies = (req, res) => {
  res.send(movies);
};
const getMovie = (req, res) => {
  const movie = movies.find((movie) => movie.id === parseInt(req.params.id));
  if (!movie) {
    return res.status(404).send("Resource not found!");
  }
  res.send(movie);
};

const addMovie = (req, res) => {
  const name = req.body.name;

  const movie = {
    id: movies.length + 1,
    name: name,
  };
  movies.push(movie);
  res.send(movie);
};
const updateMovie = (req, res) => {
  const movie = movies.find((movie) => movie.id === parseInt(req.params.id));
  if (!movie) {
    return res.status(404).send("Resource not found!");
  }

  movie.name = req.body.name;
  res.send(movie);
};
// read data
app.get("/", (req, res) => {
  res.send("Ew");
});
app.get("/api/movies", getMovies);

app.get("/api/movies/:id", getMovie);

// add a new movie
app.post("/api/movies", addMovie);

// update a movie that already exists
app.put("/api/movies/:id", updateMovie);

// delete a movie
app.delete("/api/movies/:id", (req, res) => {
  const movie = movies.find((movie) => movie.id === parseInt(req.params.id));
  if (!movie) {
    return res.status(404).send("Resource not found!");
  }

  const index = movies.indexOf(movie);
  movies.splice(index, 1);

  res.send(movie);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port - ${PORT}...`);
});
