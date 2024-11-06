import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import ComboMedicine from './ComboMedicine'
import ComboPrescription from './ComboPrescription'
import { useAppContext } from '@/app/context/Context'

const DialogUpdatePrescription = ({ displayedPrescriptions, setDisplayedPrescriptions }) => {
    const { updatePrescriptions, setUpdatePrescriptions } = useAppContext()
    const [prescriptionId, setPrescriptionId] = useState('')
    const [medicineId, setMedicineId] = useState('')

    const fetchPrescription = async () => {
        const response = await fetch('http://localhost:3000/api/prescriptions', { method: 'GET' })
        const { querySuccess, prescriptions } = await response.json()
        
        if (querySuccess) {
            setDisplayedPrescriptions([...displayedPrescriptions, ...prescriptions.filter(prescription => updatePrescriptions.includes(prescription._id))])
        }
    }

    useEffect(() => {
        fetchPrescription()
    }, [updatePrescriptions])

    const handleCancel = () => {
        setPrescriptionId('')
        setMedicineId('')
    }

    const handleAddPrescription = () => {
        if (!prescriptionId) return
        if (!medicineId) return

        let newCreatePrescriptions = [...updatePrescriptions]
        newCreatePrescriptions.push(prescriptionId)
        setUpdatePrescriptions([...newCreatePrescriptions])

        fetchPrescription()

        setPrescriptionId('')
        setMedicineId('')
    }

    return (
        <Dialog>
            <DialogTrigger className="bg-white border text-slate-700 border-slate-700 my-3 text-md hover:bg-blue-400 w-full hover:text-white py-1 px-2 rounded-md">
                Thêm thuốc
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-lg">Thêm thuốc</DialogTitle>
                </DialogHeader>
                <div>
                    <div className="mb-4">
                        <div>
                            <Label className="text-lg" htmlFor="firstName">Loại thuốc</Label>
                        </div>
                        <ComboMedicine medicineId={medicineId} setMedicineId={setMedicineId}></ComboMedicine>
                    </div>
                    <div className="mb-4">
                        <div>
                            <Label className="text-lg" htmlFor="firstName">Liều lượng và hướng dẫn sử dụng</Label>
                        </div>
                        <ComboPrescription prescriptionId={prescriptionId} setPrescriptionId={setPrescriptionId}></ComboPrescription>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="bg-red-400 w-[120px] hover:bg-red-500" onClick={handleCancel}>
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

export default DialogUpdatePrescription