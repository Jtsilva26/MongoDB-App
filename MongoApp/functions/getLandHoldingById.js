exports = async function(landHoldingId) {
    const mongo = context.services.get("mongodb-atlas");
    const collection = mongo.db("Owners_DB").collection("landHoldings");
    
    // Validate the provided ID
    if (!landHoldingId) {
        throw new Error("landHoldingId is required");
    }

    // Convert the string ID to ObjectId
    const BSON = require('bson');
    const objectId = BSON.ObjectId(landHoldingId);

    // Fetch the land holding by ID
    const landHolding = await collection.findOne({ _id: objectId });

    // Return the land holding or throw an error if not found
    if (!landHolding) {
        throw new Error("Land holding not found");
    }
    
    return landHolding;
};