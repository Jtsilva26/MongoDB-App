exports = async function() {
    const mongo = context.services.get("mongodb-atlas");
    const collection = mongo.db("Owners_DB").collection("Owners");

    return await collection.find({}).toArray(); // Returns all owners as an array
};