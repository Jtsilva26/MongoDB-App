exports = async function({ ownerName, entityType, ownerType, address, totalLandHoldings }) {
    const mongo = context.services.get("mongodb-atlas");
    const collection = mongo.db("Owners_DB").collection("Owners");

    // Check for duplicates by Name and Address
    const existingOwner = await collection.findOne({ 
        ownerName: ownerName, 
        address: address 
    });

    if (existingOwner) {
        throw new Error("An Owner with the same Name and Address already exists.");
    }

    // Insert new Owner
    await collection.insertOne({
        ownerName,
        entityType,
        ownerType,
        address,
        totalLandHoldings
    });

    return { status: "success", message: "Owner created successfully!" };
};