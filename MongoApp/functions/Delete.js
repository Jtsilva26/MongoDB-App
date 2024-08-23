exports = async function(ownerId) {
    const mongo = context.services.get("mongodb-atlas");
    const ownersCollection = mongo.db("Owners_DB").collection("Owners");
    const landHoldingsCollection = mongo.db("Owners_DB").collection("landHoldings");

    const ownerObjectId = BSON.ObjectId(ownerId);
    const result = await ownersCollection.deleteOne({ _id: ownerObjectId });
  
    let deletedCount = 0;

    if (result.deletedCount > 0) {
        const deleteResult = await landHoldingsCollection.deleteMany({ ownerId: ownerObjectId });
        deletedCount = deleteResult.deletedCount;
    }
  
    return { deletedCount };
};
