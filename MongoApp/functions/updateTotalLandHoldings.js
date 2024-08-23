exports = async function({ ownerId }) {
    const mongo = context.services.get("mongodb-atlas");
    const ownersCollection = mongo.db("Owners_DB").collection("Owners");

    // Fetch the owner document
    const owner = await ownersCollection.findOne({ _id: ownerId });
    if (!owner) {
        throw new Error("Owner not found");
    }

    // Calculate the size of the landHoldings array
    const totalLandHoldings = owner.landHoldings ? owner.landHoldings.length : 0;

    // Update the totalLandHoldings field
    await ownersCollection.updateOne(
        { _id: ownerId },
        { $set: { totalLandHoldings: totalLandHoldings } }
    );

    return { status: "success", message: "Total land holdings updated successfully." };
};