import { MongoClient } from 'mongodb';

export const dynamic = 'force-static'

export async function GET() {
    const mongoClient = await MongoClient.connect(process.env.MONGODB_URI);
    const db = mongoClient.db(process.env.DB_NAME);
    const doctorCollection = db.collection('Doctor');

    const allDoctor = await doctorCollection.find({}).toArray()

    return Response.json({querySuccess: true, doctors: allDoctor})
}
