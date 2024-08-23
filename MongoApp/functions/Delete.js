exports = async function(ownerId) {
    const mongo = context.services.get("mongodb-atlas");
    const ownersCollection = mongo.db("Owners_DB").collection("Owners");
    const landHoldingsCollection = mongo.db("Owners_DB").collection("landHoldings");

    // Convert ownerId to ObjectId
    const ownerObjectId = BSON.ObjectId(ownerId); // Ensure ownerId is a valid ObjectId
    const result = await ownersCollection.deleteOne({ _id: ownerObjectId });
  
    let deletedCount = 0;

    if (result.deletedCount > 0) {
        // Delete associated land holdings
        const deleteResult = await landHoldingsCollection.deleteMany({ ownerId: ownerObjectId });
        deletedCount = deleteResult.deletedCount; // Get number of land holdings deleted
    }
  
    return { deletedCount }; // Return the deleted count for both owner and land holdings
};
