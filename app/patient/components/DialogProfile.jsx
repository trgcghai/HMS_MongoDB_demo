import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@/components/ui/button'
import { useAppContext } from '@/app/context/Context';
import { useParams } from 'next/navigation';
import DialogPrescription from './DialogPrescription';

const DialogProfile = () => {
    const { patients, setSubProfiles, setCreatePrescriptions } = useAppContext()
    const { id } = useParams()
    const [profile, setProfile] = useState({ treatment: '', disease: '' })
    const [displayedPrescriptions, setDisplayedPrescriptions] = useState([])

    console.log("check displayedPrescriptions >> ", { displayedPrescriptions })

    const fetchCreateNewProfile = async () => {
        const respone = await fetch('http://localhost:3000/api/profiles', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                profile: {
                    treatment: profile.treatment,
                    disease: profile.disease.split(','),
                    prescriptions: displayedPrescriptions
                },
                patient: patients.find((patient) => patient._id == id)
            })
        })
        const { createSuccess, subProfiles } = await respone.json()
        if (createSuccess) {
            setSubProfiles(subProfiles)
        }
    }

    const handleAddProfile = () => {
        if (profile.treatment.trim().length != 0 && profile.disease.trim().length != 0) {
            fetchCreateNewProfile()
        }

        setProfile({ treatment: '', disease: '' })
        setDisplayedPrescriptions([])
        setCreatePrescriptions([])
    }

    const handleCancel = () => {
        setProfile({ treatment: '', disease: '' })
        setDisplayedPrescriptions([])
        setCreatePrescriptions([])
    }

    return (
        <Dialog>
            <DialogTrigger className="bg-blue-400 my-3 text-md hover:bg-blue-500 text-white py-1 px-2 rounded-md">
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Tạo hồ sơ mới
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-lg">Tạo hồ sơ bệnh nhân mới</DialogTitle>
                </DialogHeader>
                <div>
                    <div className="mb-4">
                        <Label className="text-lg" htmlFor="firstName">Phương pháp điều trị</Label>
                        <Input id='firstName' value={profile.treatment} onChange={(e) => setProfile({ ...profile, treatment: e.target.value })} />
                    </div>
                    <div className="mb-4">
                        <Label className="text-lg" htmlFor="lastName">Các bệnh</Label>
                        <Input id='lastName' value={profile.disease} onChange={(e) => setProfile({ ...profile, disease: e.target.value })} />
                    </div>
                    <div className="mb-4">
                        <div>
                            <Label className="text-lg" htmlFor="lastName">Đơn thuốc</Label>
                        </div>
                        {displayedPrescriptions && displayedPrescriptions.map((prescription) => {
                            return (
                                <div
                                    key={prescription._id}
                                    className='bg-white border text-slate-700 border-slate-700 my-3 text-md w-full py-1 px-2 rounded-md'
                                >
                                    {prescription.medicine.name}: {prescription.dosage + ' ' + prescription.instructions}
                                </div>
                            )
                        })}
                        <DialogPrescription displayedPrescriptions={displayedPrescriptions} setDisplayedPrescriptions={setDisplayedPrescriptions}></DialogPrescription>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="bg-red-400 w-[120px] hover:bg-red-500" onClick={handleCancel}>
                            Hủy
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button className="bg-blue-400 w-[120px] hover:bg-blue-500" onClick={handleAddProfile} >Xác nhận</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DialogProfile