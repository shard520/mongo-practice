const addMovie = async (collection, dataObj) => {
  try {
    await collection.insertOne(dataObj);
    console.log('Successfully added: ', dataObj);
  } catch (err) {
    console.error(err);
  }
};

const listMovies = async (collection, dataObj) => {
  try {
    const movieList = await collection.find(dataObj).toArray();
    console.log('Your movies: ', movieList);
  } catch (err) {
    console.error(err);
  }
};

const updateMovie = async (
  collection,
  { oldEntry: oldEntry, newEntry: newEntry }
) => {
  try {
    await collection.updateOne(oldEntry, {
      $set: newEntry,
    });
    console.log('Update successful');
  } catch (err) {
    console.error(err);
  }
};

const deleteMovie = async (collection, dataObj) => {
  try {
    const result = await collection.deleteOne(dataObj);
    if (result.deletedCount === 1) {
      console.log('Successfully deleted movie.');
    } else {
      console.log('No movies matched the query. Deleted 0 movies.');
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { addMovie, listMovies, updateMovie, deleteMovie };
