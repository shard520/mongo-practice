const connection = require('./db/connection');
const yargs = require('yargs');
const { omitBy, isUndefined } = require('lodash');

const { addMovie, listMovies, updateMovie } = require('./utils');

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
        const newEntry = omitBy(
          { title: yargs.argv.newTitle, actor: yargs.argv.newActor },
          isUndefined
        );
        connection(updateMovie, {
          oldEntry: { title: yargs.argv.title },
          newEntry: newEntry,
        });
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
