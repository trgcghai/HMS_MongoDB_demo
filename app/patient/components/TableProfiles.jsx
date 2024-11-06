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
import { useParams } from "next/navigation";

const TableProfiles = () => {
    const params = useParams()
    const { patients, formatDateString,  subProfiles, setSubProfiles } = useAppContext()
    const [patient] = useState(patients.find((patient) => patient._id == params.id))

    useEffect(() => {
        if (patient) {
            setSubProfiles(patient.Profiles)
        }
    }, [patient])

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-lg font-bold w-[100px]">Phương pháp điều trị</TableHead>
                    <TableHead className="text-lg font-bold w-[100px]">Các bệnh gặp phải</TableHead>
                    <TableHead className="text-lg font-bold w-[100px]">Ngày lập</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {subProfiles && subProfiles.sort((a, b) => new Date(b.date) - new Date(a.date)).map((profile) => {
                    return (
                        <TableRow key={profile.profile_id}>
                            <TableCell className="text-lg text-slate-600">{profile.treatment}</TableCell>
                            <TableCell className="text-lg text-slate-600">{profile.disease.join(', ')}</TableCell>
                            <TableCell className="text-lg text-slate-600">{formatDateString(profile.date)}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}

export default TableProfiles