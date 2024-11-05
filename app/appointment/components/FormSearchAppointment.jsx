import React from 'react'
import { ComboPatient } from './ComboPatient'
import ComboDoctor from './ComboDoctor'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/components/ui/button'
import { useAppContext } from '@/app/context/Context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FormSearchAppointment = () => {
    const { selectedSearchPatientId, setSelectedSearchPatientId, selectedSearchDoctorId, setSelectedSearchDoctorId, appointments, setAppointments, resetAppointment } = useAppContext()

    const handleSearch = () => {
        if (selectedSearchDoctorId && selectedSearchPatientId) {
            setAppointments(appointments.filter((appointments) => appointments.patient.patient_id == selectedSearchPatientId && appointments.doctor.doctor_id == selectedSearchDoctorId))
        } else if (selectedSearchPatientId) {
            setAppointments(appointments.filter((appointments) => appointments.patient.patient_id == selectedSearchPatientId))
        } else if (selectedSearchDoctorId) {
            setAppointments(appointments.filter((appointments) => appointments.doctor.doctor_id == selectedSearchDoctorId))
        }
    }

    const handleCancel = () => {
        resetAppointment()
        setSelectedSearchPatientId("")
        setSelectedSearchDoctorId("")
    }

    return (
        <div className='mt-4 flex items-center gap-6'>
            <div>
                <ComboPatient></ComboPatient>
            </div>
            <div>
                <ComboDoctor></ComboDoctor>
            </div>
            <div className='flex items-center gap-4'>
                <Button type="button" className="bg-blue-400 w-[120px] hover:bg-blue-500" onClick={handleSearch}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    Tìm kiếm
                </Button>
                <Button type="button" className="bg-red-400 w-[120px] hover:bg-red-500" onClick={handleCancel}>
                    Hủy
                </Button>
            </div>
        </div>
    )
}

export default FormSearchAppointment