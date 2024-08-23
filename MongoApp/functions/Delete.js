exports = async function(ownerId) {
    const mongo = context.services.get("mongodb-atlas");
    const ownersCollection = mongo.db("Owners_DB").collection("Owners");
    const landHoldingsCollection = mongo.db("Owners_DB").collection("landHoldings");

    const result = await ownersCollection.deleteOne({ _id: BSON.ObjectId(ownerId) });
  
    if (result.deletedCount >= 0) {
        await landHoldingsCollection.deleteMany({ ownerId: BSON.ObjectId(ownerId) });
    }
  
    return result;
};
