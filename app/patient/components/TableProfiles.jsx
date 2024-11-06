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
import { useParams } from "next/navigation";

const TableProfiles = () => {
    const params = useParams()
    const { patients, setSelectedProfileID, formatDateString,  subProfiles, setSubProfiles } = useAppContext()
    const [patient, setPatient] = useState(patients.find((patient) => patient._id == params.id))

    useEffect(() => {
        setSubProfiles(patient.Profiles)
    }, [patient])

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
                {subProfiles && subProfiles.map((profile) => {
                    return (
                        <TableRow key={profile.profile_id}>
                            <TableCell className="text-lg text-slate-600">{profile.treatment}</TableCell>
                            <TableCell className="text-lg text-slate-600">{profile.disease.join(', ')}</TableCell>
                            <TableCell className="text-lg text-slate-600">{formatDateString(profile.date)}</TableCell>
                            <TableCell className="text-lg text-slate-600" onClick={() => setSelectedProfileID(profile.profile_id)}>
                                <DialogUpdateProfile profile={profile} ></DialogUpdateProfile>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}

export default TableProfiles