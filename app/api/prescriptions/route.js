import { MongoClient } from 'mongodb';

export const dynamic = 'force-static'

export async function GET() {
    const mongoClient = await MongoClient.connect(process.env.MONGODB_URI);
    const db = mongoClient.db(process.env.DB_NAME);
    const PrescriptionCollection = db.collection('Prescription');

    const allPrescriptions = (await PrescriptionCollection.find({}).toArray())

    return Response.json({ querySuccess: true, prescriptions: allPrescriptions })
}