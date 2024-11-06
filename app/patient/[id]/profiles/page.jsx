'use client'
import { useAppContext } from '@/app/context/Context'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import PatientInfo from '../components/PatientInfo'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import DialogUpdateProfile from '../../components/DialogUpdateProfile'

const Profiles = () => {
    const param = useParams()
    const { patients, formatDateString, allProfiles, setAllProfiles, setSelectedProfileID } = useAppContext()
    const [patient, setPatient] = useState()

    useEffect(() => {
        setPatient(patients.find((patient) => patient._id == param.id))
    }, [patients])

    useEffect(() => {
        const fetchProfiles = async () => {
            const respone = await fetch('http://localhost:3000/api/profiles', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            })
            const { profiles } = await respone.json()
            setAllProfiles(profiles.filter((profile) => {
                return profile.patient.patient_id == param.id
            }))
        }
        fetchProfiles()
    }, [])

    return (
        <div className='text-lg text-blue-500 ml-[200px] mt-8 px-4'>
            {patient ?
                <PatientInfo patient={patient}></PatientInfo>
                :
                <div>Loading</div>}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-lg font-bold w-[100px]">Phương pháp điều trị</TableHead>
                        <TableHead className="text-lg font-bold w-[100px]">Các bệnh gặp phải</TableHead>
                        <TableHead className="text-lg font-bold w-[50px]">Ngày lập</TableHead>
                        <TableHead className="text-lg font-bold w-[250px]">Đơn thuốc</TableHead>
                        <TableHead className="text-lg font-bold w-[100px]">Sửa</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allProfiles && allProfiles.sort((a, b) => new Date(b.date) - new Date(a.date)).map((profile) => {
                        return (
                            <TableRow key={profile._id}>
                                <TableCell className="text-lg text-slate-600">{profile.treatment}</TableCell>
                                <TableCell className="text-lg text-slate-600">{profile.disease.join(', ')}</TableCell>
                                <TableCell className="text-lg text-slate-600">{formatDateString(profile.date)}</TableCell>
                                <TableCell className="text-lg text-slate-600">{
                                    profile.prescriptions && profile.prescriptions.length != 0 && profile.prescriptions.map((prescription) => {
                                        return <div>{prescription.medicine.name + ' ' + prescription.dosage + ' ' + prescription.instructions}</div>
                                    })}
                                </TableCell>
                                <TableCell className="text-lg text-slate-600" onClick={() => setSelectedProfileID(profile.profile_id)}>
                                    <DialogUpdateProfile profile={profile} ></DialogUpdateProfile>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}

export default Profiles