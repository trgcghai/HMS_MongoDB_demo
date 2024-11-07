import { useAppContext } from '@/app/context/Context'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

const DialogPrescription = ({selectedMedicineId, setDisplayedPrescriptions}) => {
    const { medicines } = useAppContext()
    const [dosage, setDosage] = useState('')
    const [instructions, setInstructions] = useState('')

    const fetchAddPrescription = async () => {
        const medicine = medicines.find((medicine) => medicine._id == selectedMedicineId)
        const response = await fetch('http://localhost:3000/api/prescriptions', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ dosage, instructions, medicine: {id: medicine._id, name: medicine.name} })
        })
        const {querySuccess, prescriptions, insertResult} = await response.json()
        if (querySuccess) {
            console.log({insertResult})
            setDisplayedPrescriptions(prescriptions.filter((prescription) => prescription.medicine.id == selectedMedicineId))
        }
    }

    const handleCancel = () => {
        setDosage('')
        setInstructions('')
    }

    const handleAddPrescription = () => {
        if (dosage.trim().length == 0 || instructions.trim().length == 0) return

        fetchAddPrescription()

        setDosage('')
        setInstructions('')
    }

    return (
        <Dialog>
            <DialogTrigger className="text-center cursor-pointer p-2 my-4 text-lg text-slate-700 border rounded-md hover:bg-blue-400 hover:text-white">
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Thêm liều lượng và hướng dẫn sử dụng
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-lg">Thêm liều lượng và hướng dẫn sử dụng mới</DialogTitle>
                </DialogHeader>
                <div>
                    <div className="mb-4">
                        <Label className="text-lg" htmlFor="firstName">Liều lượng</Label>
                        <Input id='firstName' value={dosage} onChange={(e) => { setDosage(e.target.value) }} />
                    </div>
                    <div className="mb-4">
                        <Label className="text-lg" htmlFor="firstName">Hướng dẫn sử dụng</Label>
                        <Input id='firstName' value={instructions} onChange={(e) => { setInstructions(e.target.value) }} />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="bg-red-400 w-[120px] hover:bg-red-500" onClick={handleCancel} >
                            Hủy
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button className="bg-blue-400 w-[120px] hover:bg-blue-500" onClick={handleAddPrescription} >Xác nhận</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DialogPrescription