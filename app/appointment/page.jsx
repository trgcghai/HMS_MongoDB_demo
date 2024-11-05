'use client'
import { useAppContext } from '../context/Context'
import DialogAppointment from './components/DialogAppointment'
import FormSearchAppointment from './components/FormSearchAppointment'
import TableAppointment from './components/TableAppointment'

const AppointmentPage = () => {
    const { appointments, selectedSearchPatientId, selectedSearchDoctorId, resetAppointment } = useAppContext()
    console.log(selectedSearchPatientId, selectedSearchDoctorId)

    return (
        <>
            <div className="text-lg text-blue-500 ml-[200px] mt-8 px-4">
                <p className='text-slate-700 text-2xl font-bold'>Danh sách lịch hẹn khám bệnh</p>
                <div className='my-4 flex items-center justify-between'>
                    <FormSearchAppointment></FormSearchAppointment>
                    <DialogAppointment></DialogAppointment>
                </div>
                <TableAppointment></TableAppointment>
            </div>
        </>
    )
}

export default AppointmentPage