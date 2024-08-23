exports = async function({ name, size }) {
    const mongo = context.services.get("mongodb-atlas");
    const collection = mongo.db("Owners_DB").collection("landHoldings");

    // Check for duplicates
    const existing = await collection.findOne({ name });
    if (existing) {
        throw new Error("A land holding with this name already exists.");
    }

    // Insert new land holding
    const result = await collection.insertOne({ name, size });
    return { status: "success", message: "Land holding created successfully!", id: result.insertedId };
};