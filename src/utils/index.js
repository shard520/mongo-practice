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
    if (movieList.length > 0) {
      console.log('Your movies: ', movieList);
    } else {
      console.log('No movies found, please add some movies to your list.');
    }
  } catch (err) {
    console.error(err);
  }
};

const updateMovie = async (collection, { oldEntry, newEntry }) => {
  try {
    const result = await collection.updateOne(oldEntry, {
      $set: newEntry,
    });
    if (result.modifiedCount === 1) {
      console.log('Update successful');
    } else {
      console.log('No movies matched the query. Updated 0 movies.');
    }
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

const searchMovies = async (collection, searchQuery) => {
  try {
    const searchResults = await collection.find(searchQuery).toArray();
    if (searchResults.length > 0) {
      console.log(
        `${searchResults.length} movies found that match your search`,
        searchResults
      );
    } else {
      console.log('No movies found that matched your search.');
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  addMovie,
  listMovies,
  updateMovie,
  deleteMovie,
  searchMovies,
};
