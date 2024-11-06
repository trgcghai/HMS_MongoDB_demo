import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import ComboDoctorCreate from './createAppointment/ComboDoctorCreate'
import { ComboPatientCreate } from './createAppointment/ComboPatientCreate'
import { useAppContext } from '@/app/context/Context'
import { DateTimePicker } from '@/components/ui/datetime-picker'

const DialogAppointment = () => {
    const { patients, doctors, appointments, setAppointments } = useAppContext()
    const [patientId, setPatientId] = useState('')
    const [doctorId, setDoctorId] = useState('')
    const [date, setDate] = useState('')

    const fetchCreateAppointment = async (appointment) => {
        const respone = await fetch('http://localhost:3000/api/appointments', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ appointment })
        })
        const {querySuccess, allAppointment} = await respone.json()
        
        if (querySuccess) {
            setAppointments(allAppointment)

            console.log(appointments)
        }
    }

    const handleCreateAppointment = () => {
        const patient = patients.find((patient) => patient._id == patientId)
        const doc = doctors.find((doc) => doc._id == doctorId)

        if (!patient || !doc || !date || date.length == 0) return

        const newAppointment = {
            date,
            patient: {
                patient_id: patient._id,
                firstName: patient.firstName,
                lastName: patient.lastName,
                dob: patient.dob,
                phone: patient.phone,
                gender: patient.gender
            },
            doctor: {
                doctor_id: doc._id,
                firstName: doc.firstName,
                lastName: doc.lastName,
                specialize: doc.specialize
            }
        }

        fetchCreateAppointment(newAppointment)

        setDoctorId('')
        setPatientId('')
        setDate(null)
    }

    const handleCancel = () => {
        setDoctorId('')
        setPatientId('')
        setDate(null)
    }

    return (
        <Dialog>
            <DialogTrigger className="bg-blue-400 text-md hover:bg-blue-500 text-white py-1 px-2 rounded-md">
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Tạo lịch khám mới
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-lg">Tạo lịch khám mới</DialogTitle>
                </DialogHeader>
                <div>
                    <div className="mb-4">
                        <div>
                            <Label className="text-lg" htmlFor="firstName">Bác sĩ</Label>
                        </div>
                        <ComboDoctorCreate doctorId={doctorId} setDoctorId={setDoctorId}></ComboDoctorCreate>
                    </div>
                    <div className="mb-4">
                        <div>
                            <Label className="text-lg" htmlFor="lastName">Bệnh nhân</Label>
                        </div>
                        <ComboPatientCreate patientId={patientId} setPatientId={setPatientId}></ComboPatientCreate>
                    </div>
                    <div className="mb-4">
                        <Label className="text-lg" htmlFor="dob">Ngày khám</Label>
                        <DateTimePicker id='dob' hideTime={true} value={date} onChange={setDate} />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="bg-red-400 w-[120px] hover:bg-red-500" onClick={handleCancel}>
                            Hủy
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button className="bg-blue-400 w-[120px] hover:bg-blue-500" onClick={handleCreateAppointment}>Xác nhận</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DialogAppointment