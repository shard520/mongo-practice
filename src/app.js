const connection = require('./db/connection');
const yargs = require('yargs');
const { omitBy, isUndefined } = require('lodash');

const {
  addMovie,
  listMovies,
  updateMovie,
  deleteMovie,
  searchMovies,
} = require('./utils');

const app = () => {
  try {
    switch (process.argv[2]) {
      case 'add':
        // filter argv properties that are undefined
        const newMovie = omitBy(
          {
            title: yargs.argv.title,
            actor: yargs.argv.actor,
            genre: yargs.argv.genre,
            rating: yargs.argv.rating,
          },
          isUndefined
        );
        connection(addMovie, newMovie);
        break;
      case 'list':
        connection(listMovies, {});
        break;
      case 'update':
        // filter argv properties that are undefined
        const newEntry = omitBy(
          {
            title: yargs.argv.newTitle,
            actor: yargs.argv.newActor,
            genre: yargs.argv.newGenre,
            rating: yargs.argv.newRating,
          },
          isUndefined
        );
        connection(updateMovie, {
          oldEntry: { title: yargs.argv.title },
          newEntry: newEntry,
        });
        break;
      case 'delete':
        connection(deleteMovie, { title: yargs.argv.title });
        break;
      case 'search':
        // filter argv properties that are undefined
        const searchQuery = omitBy(
          {
            title: yargs.argv.title,
            actor: yargs.argv.actor,
            genre: yargs.argv.genre,
            rating: yargs.argv.rating,
          },
          isUndefined
        );
        connection(searchMovies, searchQuery);
        break;
      case 'minRating':
        connection(searchMovies, { rating: { $gte: yargs.argv.rating } });
        break;
      default:
        console.log('Incorrect command');
        break;
    }
  } catch (err) {
    console.error(err);
  }
};

app();
