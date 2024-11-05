import React, { useState } from 'react'
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

const DialogProfile = () => {
    const { data, setData } = useAppContext()
    const { id } = useParams()
    const [profile, setProfile] = useState({ profile_id: '', treatment: '', disease: '', date: '' })

    const handleAddProfile = () => {
        const chosedPatient = data.find((patient) => patient._id == id)
        if (profile.treatment.trim().length == 0 || profile.disease.trim().length == 0) return
        chosedPatient.Profiles.push({
            ...profile,
            profile_id: Math.floor(Math.random() * 1000000 + 1).toString(),
            date: new Date().toLocaleDateString('en-CA'),
            disease: profile.disease.split(",")
        })
        setProfile({ treatment: '', disease: '' })
        setData(data.map((patient) => {
            if (patient._id == id) {
                return {
                    ...patient,
                    Profiles: chosedPatient.Profiles
                }
            } else {
                return patient
            }
        }))
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
                        <Label htmlFor="firstName">Phương pháp điều trị</Label>
                        <Input id='firstName' value={profile.treatment} onChange={(e) => setProfile({ ...profile, treatment: e.target.value })} />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="lastName">Các bệnh</Label>
                        <Input id='lastName' value={profile.disease} onChange={(e) => setProfile({ ...profile, disease: e.target.value })} />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="bg-red-400 w-[120px] hover:bg-red-500">
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