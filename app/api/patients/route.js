import { MongoClient } from "mongodb";

export const dynamic = 'force-static'

export async function GET() {
    const mongoClient = await MongoClient.connect(process.env.MONGODB_URI);
    const db = mongoClient.db(process.env.DB_NAME);
    const patientCollection = db.collection('Patient');
    const allPatient = await patientCollection.find({}).toArray()

    return Response.json({ patients: allPatient })
}

export async function POST(request) {
    const mongoClient = await MongoClient.connect(process.env.MONGODB_URI);
    const db = mongoClient.db(process.env.DB_NAME);
    const patientCollection = db.collection('Patient');
    const req = await request.json()
    const result = await patientCollection.insertOne({...req.patient})
    console.log(result)
    return Response.json({createSuccess: true, result})
}