exports = async function(ownerId){
  const ownersCollection = context.services.get("mongodb-atlas").db("Owners_DB").collection("Owners");
  const landHoldingsCollection = context.services.get("mongodb-atlas").db("Owners_DB").collection("LandHoldings");

  // Delete the owner
  const result = await ownersCollection.deleteOne({ _id: BSON.ObjectId(ownerId) });
  
  // If the owner was deleted, delete related land holdings
  if (result.deletedCount > 0) {
    await landHoldingsCollection.deleteMany({ ownerId: BSON.ObjectId(ownerId) });
  }
  
  return result;
};

