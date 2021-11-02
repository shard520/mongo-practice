const connection = require('./db/connection');
const yargs = require('yargs');

const addMovie = require('./utils');

const app = () => {
  try {
    switch (process.argv[2]) {
      case 'add':
        connection(addMovie, {
          title: yargs.argv.title,
          actor: yargs.argv.actor,
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
