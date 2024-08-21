exports = async function (newOwner){
  const ownersCollection = context.services.get("mongodb-atlas").db("Owners_DB").collection("Owners");

  const existingOwner = await ownersCollection.findOne({
    name: newOwner.name,
    address: newOwner.address
  });

  if(existingOwner){
    throw new Error("Owner with same name and address already exist.");
  }

  const result = await ownersCollection.insertOne(newOwner);
  return result;
};