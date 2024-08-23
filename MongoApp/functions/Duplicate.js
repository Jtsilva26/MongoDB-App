exports = async function({ ownerName, entityType, ownerType, address, totalLandHoldings }) {
    const mongo = context.services.get("mongodb-atlas");
    const collection = mongo.db("Owners_DB").collection("Owners");

    const existingOwner = await collection.findOne({ 
        ownerName: ownerName, 
        address: address 
    });

    if (existingOwner) {
        throw new Error("exists");
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