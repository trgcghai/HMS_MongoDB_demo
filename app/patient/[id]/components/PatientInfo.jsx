import { useAppContext } from '@/app/context/Context'
import React from 'react'

const PatientInfo = ({ patient }) => {
    const {formatDateString} = useAppContext()
    return (
        <div className='mb-4 px-2'>
            <p className='text-slate-700 text-2xl font-bold'>Thông tin bệnh nhân</p>
            <div className='flex items-start gap-20'>
                <div>
                    <p className='text-slate-500 text-xl my-2'>Họ và tên: {patient.firstName + ' ' + patient.lastName}</p>
                    <p className='text-slate-500 text-xl my-2'>Ngày sinh: {formatDateString(patient.dob)}</p>
                    <p className='text-slate-500 text-xl my-2'>Giới tính: {patient.gender}</p>
                </div>
                <div>
                    <p className='text-slate-500 text-xl my-2'>Số điện thoại: {patient.phone}</p>
                    <p className='text-slate-500 text-xl my-2'>Địa chỉ: {patient.address}</p>
                </div>
            </div>
        </div>
    )
}

export default PatientInfo