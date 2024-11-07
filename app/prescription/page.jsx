'use client'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/Context'
import DialogMedicine from './components/DialogMedicine'
import DialogPrescription from './components/DialogPrescription'

const PrescriptionPage = () => {
    const { medicines, setMedicines, prescriptions, setPrescriptions } = useAppContext()
    const [displayedPrescriptions, setDisplayedPrescriptions] = useState([])
    const [selectedMedicineId, setSelectedMedicineId] = useState('')

    const fetchMedicines = async () => {
        const response = await fetch('http://localhost:3000/api/medicines', { method: 'GET' })
        const res = await response.json()

        if (res.querySuccess) {
            setMedicines(res.medicines)
        }
    }

    const fetchPrescription = async () => {
        const response = await fetch('http://localhost:3000/api/prescriptions', { method: 'GET' })
        const res = await response.json()

        if (res.querySuccess) {
            setPrescriptions(res.prescriptions)
        }
    }

    useEffect(() => {
        fetchMedicines()
        fetchPrescription()
    }, [])

    const handleSearchPrescription = (medicineId) => {
        setSelectedMedicineId(medicineId)
        setDisplayedPrescriptions(prescriptions.filter((prescription) => prescription.medicine.id == medicineId))
    }

    return (
        <div className='text-lg text-blue-500 ml-[200px] mt-8 px-4'>
            <p className='px-2 text-2xl font-bold text-slate-700'>Các đơn thuốc</p>
            <div className='flex items-start mt-8 gap-8'>
                <div className='w-[350px]'>
                    <p className='px-2 text-lg font-bold text-slate-700'>Tên thuốc</p>
                    <DialogMedicine></DialogMedicine>
                    {medicines && medicines.sort((a, b) => a.name.localeCompare(b.name)).map((medicine) => {
                        return (
                            <div
                                key={medicine._id}
                                className={`w-2/3 text-center cursor-pointer p-2 my-4 text-lg text-slate-700 border rounded-md ${selectedMedicineId == medicine._id ? 'bg-blue-400 text-white' : ''}`}
                                onClick={() => { handleSearchPrescription(medicine._id) }}
                            >
                                {medicine.name}
                            </div>
                        )
                    })}
                </div>
                <div>
                    <p className='px-2 text-lg font-bold text-slate-700'>Các liều lượng và hướng dẫn sử dụng</p>
                    <DialogPrescription selectedMedicineId={selectedMedicineId} setDisplayedPrescriptions={setDisplayedPrescriptions}></DialogPrescription>
                    {displayedPrescriptions ? displayedPrescriptions.map((prescription) => {
                        return (
                            <div key={prescription._id} className='text-center cursor-pointer my-4 p-2 text-lg text-slate-700 border rounded-md'>
                                {prescription.dosage + ' ' + prescription.instructions}
                            </div>
                        )
                    }) : <></>}
                </div>
            </div>
        </div>
    )
}

export default PrescriptionPage