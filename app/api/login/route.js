import { MongoClient } from 'mongodb';

export const dynamic = 'force-static'

export async function POST(request) {
    const mongoClient = await MongoClient.connect(process.env.MONGODB_URI);
    const db = mongoClient.db(process.env.DB_NAME);
    const accountCollection = db.collection('Account');
    const req = await request.json()

    const foundAccount = (await accountCollection.find({account_name: req.accountId}).toArray())
    
    if (foundAccount[0].password == req.password) {
        const doctorCollection = db.collection('Doctor')
        const doctor = await doctorCollection.find({account_id: foundAccount[0]._id}).toArray()
        return Response.json({loginSucces: true, message: 'Login successfully', doctor: doctor[0]})
    }

    return Response.json({ loginSucces: false, message: 'Something is wrong !!' })
}