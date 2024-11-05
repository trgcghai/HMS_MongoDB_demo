import { Button } from '@/components/ui/button'
import { DateTimePicker } from '@/components/ui/datetime-picker'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import ComboDoctorCreate from './createAppointment/ComboDoctorCreate'
import { ComboPatientCreate } from './createAppointment/ComboPatientCreate'
import { useAppContext } from '@/app/context/Context'

const DialogAppointment = () => {
    const { data, doctors, appointments, setAppointments } = useAppContext()
    const [patientId, setPatientId] = useState('')
    const [doctorId, setDoctorId] = useState('')
    const [date, setDate] = useState('')
    const [id] = useState(Math.floor(Math.random() * 1000000 + 1))

    function formatDateString(dateString) {
        const date = new Date(dateString).toLocaleDateString('en-CA')
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    }

    const handleCreateAppointment = () => {
        const patient = data.find((patient) => patient._id == patientId)
        const doc = doctors.find((doc) => doc._id == doctorId)

        if (!patient || !doc || !date || date.length == 0) return

        const newAppointment = {
            _id: id,
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
        setAppointments([...appointments, newAppointment])
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
                            <Label htmlFor="firstName">Bác sĩ</Label>
                        </div>
                        <ComboDoctorCreate doctorId={doctorId} setDoctorId={setDoctorId}></ComboDoctorCreate>
                    </div>
                    <div className="mb-4">
                        <div>
                            <Label htmlFor="lastName">Bệnh nhân</Label>
                        </div>
                        <ComboPatientCreate patientId={patientId} setPatientId={setPatientId}></ComboPatientCreate>
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="dob">Ngày khám</Label>
                        <DateTimePicker id='dob' hideTime={true} value={date} onChange={setDate} />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="bg-red-400 w-[120px] hover:bg-red-500">
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