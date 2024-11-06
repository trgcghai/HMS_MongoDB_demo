import { MongoClient, ObjectId } from 'mongodb';

export const dynamic = 'force-static'

export async function GET() {
    const mongoClient = await MongoClient.connect(process.env.MONGODB_URI);
    const db = mongoClient.db(process.env.DB_NAME);
    const appointmentCollection = db.collection('Appointment');

    const allAppointment = await appointmentCollection.find({}).toArray()

    return Response.json({querySuccess: true, appointments: allAppointment})
}

export async function POST(request) {
    const mongoClient = await MongoClient.connect(process.env.MONGODB_URI);
    const db = mongoClient.db(process.env.DB_NAME);
    const appointmentCollection = db.collection('Appointment');
    const req = await request.json()

    const appointmentToInsert = {
        ...req.appointment,
        _id: new ObjectId()
    }
    const insertResult = await appointmentCollection.insertOne({...appointmentToInsert})
    const allAppointment = await appointmentCollection.find({}).toArray()

    return Response.json({querySuccess: true, insertResult, allAppointment})
}
