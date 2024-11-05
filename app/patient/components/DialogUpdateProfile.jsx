import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Input } from '@/components/ui/input';
import { DialogClose } from "@radix-ui/react-dialog";
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/app/context/Context';
import { useParams } from 'next/navigation';

const DialogUpdateProfile = () => {
    const { data, setData, selectPatientID, selectedProfileID } = useAppContext()
    const [profile, setProfile] = useState({ profile_id: '', treatment: '', disease: [], date: '' })

    useEffect(() => {
        const patient = data.find((patient) => patient._id == selectPatientID)
        const patientProfiles = patient.Profiles.find((profile) => profile.profile_id == selectedProfileID)
        setProfile({
            ...patientProfiles
        })
    }, [data, selectPatientID, selectedProfileID])

    const handleUpdateProfile = () => {
        let patient = data.find((patient) => patient._id == selectPatientID)
        let patientProfile = patient.Profiles.find((profile) => profile.profile_id == selectedProfileID)
        patientProfile = {
            ...patientProfile,
            ...profile,
            disease: profile.disease.split(',')
        }
        patient = {
            ...patient,
            Profiles: patient.Profiles.map((profile) => {
                if (profile.profile_id == selectedProfileID) {
                    return { ...patientProfile }
                } else {
                    return { ...profile }
                }
            })
        }
        setData(data.map((pat) => {
            if (pat._id == selectPatientID) {
                return { ...patient }
            } else {
                return { ...pat }
            }
        }))
    }

    return (
        <Dialog>
            <DialogTrigger>
                <FontAwesomeIcon icon={faEllipsis} />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-lg">Sửa thông tin hồ sơ</DialogTitle>
                </DialogHeader>
                <div>
                    <div className="mb-4">
                        <Label htmlFor="treatment">Phương pháp điều trị</Label>
                        <Input id='treatment' value={profile.treatment} onChange={(e) => setProfile({ ...profile, treatment: e.target.value })} />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="disease">Các bệnh</Label>
                        <Input id='disease' value={profile.disease} onChange={(e) => setProfile({ ...profile, disease: e.target.value })} />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="bg-red-400 w-[120px] hover:bg-red-500">
                            Hủy
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button className="bg-blue-400 w-[120px] hover:bg-blue-500" onClick={handleUpdateProfile}>Xác nhận</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DialogUpdateProfile