import { MongoClient, ObjectId } from "mongodb";

export const dynamic = "force-static";

export async function GET() {
  const mongoClient = await MongoClient.connect(process.env.MONGODB_URI);
  const db = mongoClient.db(process.env.DB_NAME);
  const PrescriptionCollection = db.collection("Prescription");

  const allPrescriptions = await PrescriptionCollection.find({}).toArray();

  return Response.json({ querySuccess: true, prescriptions: allPrescriptions });
}

export async function POST(request) {
  const mongoClient = await MongoClient.connect(process.env.MONGODB_URI);
  const db = mongoClient.db(process.env.DB_NAME);
  const PrescriptionCollection = db.collection("Prescription");

  const { dosage, instructions, medicine } = await request.json();

  const prescriptionToInsert = {
    _id: new ObjectId(),
    dosage,
    instructions,
    medicine
  };

  const insertResult = await PrescriptionCollection.insertOne({...prescriptionToInsert});

  const allPrescriptions = await PrescriptionCollection.find({}).toArray();

  return Response.json({ querySuccess: true, prescriptions: allPrescriptions, insertResult });
}
