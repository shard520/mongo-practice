const addMovie = async (collection, dataObj) => {
  try {
    await collection.insertOne(dataObj);
    console.log('Successfully added: ', dataObj);
  } catch (err) {
    console.error(err);
  }
};

module.exports = addMovie;
