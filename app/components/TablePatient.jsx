'use client'
import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from '../context/Context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const TablePatient = () => {
    const { data, setSelectedPatientID } = useAppContext()

    const router = useRouter()

    function formatDateString(dateString) {
        const date = new Date(dateString).toLocaleDateString('en-CA')
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    }

    const handleClick = (id) => {
        setSelectedPatientID(id)
        router.push('/patient/' + id)
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-lg font-bold w-[100px]">First Name</TableHead>
                    <TableHead className="text-lg font-bold w-[100px]">Last Name</TableHead>
                    <TableHead className="text-lg font-bold w-[100px]">Date of birth</TableHead>
                    <TableHead className="text-lg font-bold w-[100px]">Phone</TableHead>
                    <TableHead className="text-lg font-bold w-[100px]">Gender</TableHead>
                    <TableHead className="text-lg font-bold w-[100px]">Address</TableHead>
                    <TableHead className="text-lg font-bold w-[100px]">Profiles</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((patient) => {
                    return <TableRow key={patient._id}>
                        <TableCell className="text-lg text-slate-600">{patient.firstName}</TableCell>
                        <TableCell className="text-lg text-slate-600">{patient.lastName}</TableCell>
                        <TableCell className="text-lg text-slate-600">{
                            formatDateString(patient.dob)
                        }</TableCell>
                        <TableCell className="text-lg text-slate-600">{patient.phone}</TableCell>
                        <TableCell className="text-lg text-slate-600">{patient.gender}</TableCell>
                        <TableCell className="text-lg text-slate-600">{patient.address}</TableCell>
                        <TableCell className="text-lg text-slate-600">
                            <Button variant="outlined" onClick={() => handleClick(patient._id)}>
                                <FontAwesomeIcon icon={faEllipsis} className="text-slate-600" />
                            </Button>
                        </TableCell>
                    </TableRow>
                })}
            </TableBody>
        </Table>
    )
}

export default TablePatient