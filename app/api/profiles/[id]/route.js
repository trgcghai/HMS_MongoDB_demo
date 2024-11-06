import { MongoClient, ObjectId } from "mongodb";
import mongoose from "mongoose";

export const dynamic = "force-static";

export async function POST(request) {
    const mongoClient = await MongoClient.connect(process.env.MONGODB_URI);
    const db = mongoClient.db(process.env.DB_NAME);
    const patientProfileCollection = db.collection("Patient_profile");
    const patientCollection = db.collection("Patient");
    const { updateProfile, patient } = await request.json();
    
    const objectId = new ObjectId(updateProfile._id);

    const resultUpdateMain = await patientProfileCollection.updateOne({ _id: objectId._id }, {
        $set: {
            treatment: updateProfile.treatment,
            disease: updateProfile.disease
        }
    });

    console.log(
        patient._id, objectId._id, updateProfile.treatment,updateProfile.disease
    )

    const resultUpdateSub = await patientCollection.updateOne({_id: patient._id, "Profiles.profile_id": objectId._id}, {
        $set: {
            "Profiles.$.treatment": updateProfile.treatment,
            "Profiles.$.disease": updateProfile.disease
            }
        });

    const foundPatient = await patientCollection.find({_id: patient._id}).toArray();
    let subProfiles = foundPatient[0].Profiles    

    return Response.json({ updateSuccess: true, subProfiles, resultUpdateMain, resultUpdateSub});
}
