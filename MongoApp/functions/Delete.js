exports = async function({ ownerId }) {
    const mongo = context.services.get("mongodb-atlas");
    const ownersCollection = mongo.db("Owners_DB").collection("Owners");
    const landHoldingsCollection = mongo.db("Owners_DB").collection("LandHoldings");

    // Delete all land holdings associated with the owner
    await landHoldingsCollection.deleteMany({ ownerId: ownerId });

    // Delete the owner
    await ownersCollection.deleteOne({ ownerId: ownerId });

    return { status: "success", message: "Owner and associated land holdings deleted successfully." };
};