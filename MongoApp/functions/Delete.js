exports = async function({ ownerId }) {
    const mongo = context.services.get("mongodb-atlas");
    const ownersCollection = mongo.db("Owners_DB").collection("Owners");
    const landHoldingsCollection = mongo.db("Owners_DB").collection("LandHoldings");

    const { ObjectId } = require('mongodb');

    try {
        // Convert the ownerId to ObjectId
        const ownerObjectId = new ObjectId(ownerId);

        // Delete all land holdings associated with the owner
        await landHoldingsCollection.deleteMany({ ownerId: ownerObjectId });

        // Delete the owner
        const deleteResult = await ownersCollection.deleteOne({ _id: ownerObjectId });

        if (deleteResult.deletedCount === 1) {
            return { status: "success", message: "Owner and associated land holdings deleted successfully." };
        } else {
            return { status: "error", message: "Owner deletion failed. Owner may not exist." };
        }
    } catch (err) {
        return { status: "error", message: `Failed to delete owner: ${err.message}` };
    }
};