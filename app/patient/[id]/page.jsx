'use client'
import { useAppContext } from '@/app/context/Context'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import TableProfiles from '../components/TableProfiles'
import DialogProfile from '../components/DialogProfile'
import Link from 'next/link'
import PatientInfo from './components/PatientInfo'

const Page = () => {
    const param = useParams()
    const { patients } = useAppContext()
    const [patient, setPatient] = useState()

    useEffect(() => {
        setPatient(patients.find((patient) => patient._id == param.id))
    }, [patients])

    return (
        <div className='text-lg text-blue-500 ml-[200px] mt-8 px-4'>
            {patient ?
                <PatientInfo patient={patient}></PatientInfo>
                :
                <div>Loading</div>}
            <p className='px-2 text-2xl font-bold text-slate-700'>Các hồ sơ bệnh nhân</p>
            <DialogProfile></DialogProfile>
            <TableProfiles></TableProfiles>
            <div className='flex items-center justify-center my-8'>
                {patient ?
                    <Link href={`/patient/${patient._id}/profiles`} className='border bg-blue-400 text-white text-lg py-2 px-3 rounded-md'>Xem tất cả hồ sơ</Link>
                    :
                    <div>Loading</div>
                }
            </div>
        </div>
    )
}

export default Page