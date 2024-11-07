import { MongoClient, ObjectId } from 'mongodb';

export const dynamic = 'force-static'

export async function GET() {
    const mongoClient = await MongoClient.connect(process.env.MONGODB_URI);
    const db = mongoClient.db(process.env.DB_NAME);
    const medicineCollection = db.collection('Medicine');

    const allMedicines = (await medicineCollection.find({}).toArray())

    return Response.json({ querySuccess: true, medicines: allMedicines })
}

export async function POST(request) {
    const mongoClient = await MongoClient.connect(process.env.MONGODB_URI);
    const db = mongoClient.db(process.env.DB_NAME);
    const medicineCollection = db.collection('Medicine');

    const {medicineName} = await request.json()

    const medicineToInsert = {
        _id: new ObjectId(),
        name: medicineName
    }

    const insertResult = await medicineCollection.insertOne({...medicineToInsert})

    const allMedicines = (await medicineCollection.find({}).toArray())

    return Response.json({querySuccess: true, medicines: allMedicines, insertResult})
}