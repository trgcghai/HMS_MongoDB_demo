import { MongoClient, ObjectId } from "mongodb";

export const dynamic = "force-static";

export async function GET() {
    const mongoClient = await MongoClient.connect(process.env.MONGODB_URI);
    const db = mongoClient.db(process.env.DB_NAME);
    const patientProfileCollection = db.collection("Patient_profile");
    const allProfiles = await patientProfileCollection.find({}).toArray();

    return Response.json({ profiles: allProfiles });
}

export async function POST(request) {
    const mongoClient = await MongoClient.connect(process.env.MONGODB_URI);
    const db = mongoClient.db(process.env.DB_NAME);
    const patientProfileCollection = db.collection("Patient_profile");
    const patientCollection = db.collection("Patient");
    const { profile, patient } = await request.json();

    const profileToInsertMain = {
        _id: new ObjectId(),
        date: new Date(),
        treatment: profile.treatment,
        disease: profile.disease,
        prescriptions: [],
        patient: {
            patient_id: patient._id,
            firstName: patient.firstName,
            lastName: patient.lastName,
            dob: patient.dob,
            phone: patient.phone,
            gender: patient.gender,
        },
        schema_version: 1,
    };

    const profileToInsertSub = {
        profile_id: profileToInsertMain._id,
        date: profileToInsertMain.date,
        treatment: profileToInsertMain.treatment,
        disease: profileToInsertMain.disease,
    };

    await patientProfileCollection.insertOne({ ...profileToInsertMain });
    await patientCollection.updateOne(
        {
            _id: patient._id,
        },
        {
            $push: {
                Profiles: profileToInsertSub,
            }
        }
    );
    const foundPatient = await patientCollection.find({_id: patient._id}).toArray();
    let subProfiles = foundPatient[0].Profiles
    subProfiles = subProfiles.slice(-5)

    await patientCollection.updateOne(
        {
            _id: patient._id,
        },
        {
            $set: {
                Profiles: subProfiles,
            }
        }
    );

    return Response.json({ createSuccess: true, subProfiles});
}
