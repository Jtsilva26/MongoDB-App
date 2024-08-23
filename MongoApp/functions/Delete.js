exports = async function({ ownerId }) {
    const mongo = context.services.get("mongodb-atlas");
    const ownersCollection = mongo.db("Owners_DB").collection("Owners");
    const landHoldingsCollection = mongo.db("Owners_DB").collection("LandHoldings");

    try {
        const ownerObjectId = BSON.ObjectId(ownerId);

        // Delete all land holdings associated with the owner
        const deleteLandHoldingsResult = await landHoldingsCollection.deleteMany({ ownerId: ownerObjectId });

        // Delete the owner
        const deleteOwnerResult = await ownersCollection.deleteOne({ _id: ownerObjectId });

        if (deleteOwnerResult.deletedCount === 1) {
            if (deleteLandHoldingsResult.deletedCount > 0) {
                return { status: "success", message: "Owner and all associated land holdings deleted successfully." };
            } else {
                return { status: "warning", message: "Owner deleted, but no associated land holdings were found." };
            }
        } else {
            return { status: "error", message: "Owner deletion failed. Owner may not exist." };
        }
    } catch (err) {
        return { status: "error", message: `Failed to delete owner and land holdings: ${err.message}` };
    }
};