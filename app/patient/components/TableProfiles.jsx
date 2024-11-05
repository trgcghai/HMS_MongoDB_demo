import { useAppContext } from "@/app/context/Context"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import React, { useEffect, useState } from 'react'
import DialogUpdateProfile from "./DialogUpdateProfile";

const TableProfiles = () => {
    const { data, selectPatientID, setSelectedProfileID } = useAppContext()
    const [listProfile, setListProfile] = useState([])

    useEffect(() => {
        const patient = data.find((patient) => patient._id == selectPatientID)
        setListProfile(patient.Profiles)
    }, [data, selectPatientID])

    function formatDateString(dateString) {
        const date = new Date(dateString).toLocaleDateString('en-CA')
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    }


    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-lg font-bold w-[100px]">Phương pháp điều trị</TableHead>
                    <TableHead className="text-lg font-bold w-[100px]">Các bệnh gặp phải</TableHead>
                    <TableHead className="text-lg font-bold w-[100px]">Ngày lập</TableHead>
                    <TableHead className="text-lg font-bold w-[100px]">Sửa</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {listProfile && listProfile.map((profile) => {
                    console.log(profile.disease)
                    return (
                        <TableRow key={profile.profile_id}>
                            <TableCell className="text-lg text-slate-600">{profile.treatment}</TableCell>
                            <TableCell className="text-lg text-slate-600">{profile.disease.join(', ')}</TableCell>
                            <TableCell className="text-lg text-slate-600">{formatDateString(profile.date)}</TableCell>
                            <TableCell className="text-lg text-slate-600" onClick={() => setSelectedProfileID(profile.profile_id)}>
                                <DialogUpdateProfile></DialogUpdateProfile>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}

export default TableProfiles