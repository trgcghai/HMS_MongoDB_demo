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

const DialogUpdateProfile = ({ profile }) => {
    const params = useParams()
    const { patients, setSubProfiles, selectedProfileID } = useAppContext()
    const [patientFetch, setPatientFetch] = useState()
    const [inputTreatment, setInputTreatment] = useState('')
    const [inputDisease, setInputDisease] = useState('')

    useEffect(() => {
        const patient = patients.find((patient) => patient._id == params.id)

        setPatientFetch({
            ...patient
        })
        setInputTreatment(profile.treatment)
        setInputDisease(profile.disease.join(', '))

    }, [patients, params])

    const fetchUpdateProfile = async () => {
        const updateProfile = {
            _id: profile.profile_id,
            treatment: inputTreatment,
            disease: inputDisease.split(', ')
        }

        console.log('>>> check updateProfile >>>', {updateProfile})

        const respone = await fetch('http://localhost:3000/api/profiles/' + profile.profile_id, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                patient: patientFetch,
                updateProfile
            })
        })
        const { updateSuccess, subProfiles } = await respone.json()
        if (updateSuccess) {
            setSubProfiles(subProfiles)
        }
    }

    const handleUpdateProfile = () => {
        if (profile.treatment.trim().length == 0 || inputDisease.trim().length == 0) return

        fetchUpdateProfile()
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
                        <Input id='treatment' value={inputTreatment} onChange={(e) => setInputTreatment(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="disease">Các bệnh</Label>
                        <Input id='disease' value={inputDisease} onChange={(e) => setInputDisease(e.target.value)} />
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