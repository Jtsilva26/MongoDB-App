exports = async function({ ownerName, entityType, ownerType, address, totalLandHoldings }) {
    const mongo = context.services.get("mongodb-atlas");
    const collection = mongo.db("Owners_DB").collection("Owners");

    const existingOwner = await collection.findOne({ 
        ownerName: ownerName, 
        address: address 
    });

    if (existingOwner) {
        throw new Error("An Owner with the same Name and Address already exists.");
    }

    await collection.insertOne({
        ownerName,
        entityType,
        ownerType,
        address,
        totalLandHoldings
    });

    return { status: "success", message: "Owner created successfully!" };
};