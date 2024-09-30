// Realm Function to insert a new file document
exports = async function (ownerId, fileUrl) {
  const mongodb = context.services.get("mongodb-atlas");
  const filesCollection = mongodb.db("Owners_DB").collection("File");

  try {
    const fileDocument = {
      ownerId: new BSON.ObjectId(ownerId), // Use BSON for ObjectId
      fileUrl: fileUrl,
      uploadDate: new Date(), // Current date and time
    };

    const result = await filesCollection.insertOne(fileDocument);

    return { success: true, message: "File uploaded successfully", fileId: result.insertedId };
  } catch (error) {
    console.error('Error inserting file:', error);
    throw new Error("Internal Server Error");
  }
};
