const connection = require('./db/connection');
const yargs = require('yargs');
const { omitBy, isUndefined } = require('lodash');

const { addMovie, listMovies, updateMovie, deleteMovie } = require('./utils');

const app = () => {
  try {
    switch (process.argv[2]) {
      case 'add':
        connection(addMovie, {
          title: yargs.argv.title,
          actor: yargs.argv.actor,
        });
        break;
      case 'list':
        connection(listMovies, {});
        break;
      case 'update':
        // filter argv properties that are undefined
        const newEntry = omitBy(
          { title: yargs.argv.newTitle, actor: yargs.argv.newActor },
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
      default:
        console.log('Incorrect command');
        break;
    }
  } catch (err) {
    console.error(err);
  }
};

app();
