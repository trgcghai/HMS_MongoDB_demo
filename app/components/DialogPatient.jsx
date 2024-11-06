'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppContext } from '../context/Context';
import { DateTimePicker } from '@/components/ui/datetime-picker';

const DialogPatient = () => {
    const { patients, setPatients } = useAppContext()
    const [patient, setPatient] = useState({ _id: Math.floor(Math.random() * 1000000 + 1).toString(), firstName: '', lastName: '', dob: '', address: '', gender: '', phone: '', Profiles: [] })

    const fetchCreateNewPatient = async () => {
        const respone = await fetch('http://localhost:3000/api/patients', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ patient })
        })
        const res = await respone.json()
        if (res.createSuccess) {
            setPatients([...patients, patient])
        }
    }

    const handleAddNewPatient = () => {
        if (patient.firstName.trim().length == 0 || patient.lastName.trim().length == 0
            || patient.address.trim().length == 0 || patient.gender.trim().length == 0 || patient.phone.trim().length == 0) return

        if (!patient.phone.match(/[0-9]{10}/)) return

        // setPatient({
        //     ...patient,
        // })
        // setData([...data, patient])

        fetchCreateNewPatient()

        setPatient({
            ...patient,
            _id: '',
            firstName: '',
            lastName: '',
            dob: '',
            address: '',
            gender: '',
            phone: ''
        })
    }

    return (
        <Dialog>
            <DialogTrigger className="bg-blue-400 text-md hover:bg-blue-500 text-white py-1 px-2 rounded-md">
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Thêm bệnh nhân mới
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-lg">Thêm bệnh nhân mới</DialogTitle>
                </DialogHeader>
                <div>
                    <div className="mb-4">
                        <Label className="text-lg" htmlFor="firstName">Họ</Label>
                        <Input id='firstName' value={patient.firstName} onChange={(e) => { setPatient({ ...patient, firstName: e.target.value }) }} />
                    </div>
                    <div className="mb-4">
                        <Label className="text-lg" htmlFor="lastName">Tên</Label>
                        <Input id='lastName' value={patient.lastName} onChange={(e) => { setPatient({ ...patient, lastName: e.target.value }) }} />
                    </div>
                    <div className="mb-4">
                        <Label className="text-lg" htmlFor="dob">Ngày sinh</Label>
                        <DateTimePicker id='dob' hideTime={true} value={patient.dob} onChange={(e) => {
                            setPatient({ ...patient, dob: e })

                        }} />
                    </div>
                    <div className="mb-4">
                        <Label className="text-lg" htmlFor="phone">Số điện thoại</Label>
                        <Input id='phone' value={patient.phone} onChange={(e) => { setPatient({ ...patient, phone: e.target.value }) }} />
                    </div>
                    <div className="mb-4">
                        <Label className="text-lg" htmlFor="gender">Giới tính</Label>
                        <Input id='gender' value={patient.gender} onChange={(e) => { setPatient({ ...patient, gender: e.target.value }) }} />
                    </div>
                    <div className="mb-4">
                        <Label className="text-lg" htmlFor="address">Địa chỉ</Label>
                        <Input id='address' value={patient.address} onChange={(e) => { setPatient({ ...patient, address: e.target.value }) }} />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="bg-red-400 w-[120px] hover:bg-red-500">
                            Hủy
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button className="bg-blue-400 w-[120px] hover:bg-blue-500" onClick={handleAddNewPatient}>Xác nhận</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DialogPatient