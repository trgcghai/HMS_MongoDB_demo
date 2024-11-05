'use client'
import { useAppContext } from '@/app/context/Context'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import TableProfiles from '../components/TableProfiles'
import DialogProfile from '../components/DialogProfile'

const Page = () => {
    const param = useParams()
    const { data } = useAppContext()
    const [patient, setPatient] = useState()

    useEffect(() => {
        setPatient(data.find((patient) => patient._id == param.id))
    }, [])

    function formatDateString(dateString) {
        const date = new Date(dateString).toLocaleDateString('en-CA')
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    }

    return (
        <>
            {patient ?
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
                :
                <div>Loading</div>}
            <p className='px-2 text-2xl font-bold text-slate-700'>Các hồ sơ bệnh nhân</p>
            <DialogProfile></DialogProfile>
            <TableProfiles></TableProfiles>
        </>
    )
}

export default Page