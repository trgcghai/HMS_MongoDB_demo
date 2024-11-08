'use client'
import React, { useEffect } from 'react'
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
    const { patients, setPatients, formatDateString } = useAppContext()
    const router = useRouter()

    useEffect(() => {
        const fetchPatient = async () => {
            const response = await fetch('http://localhost:3000/api/patients', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            })
            const res = await response.json()
            setPatients(res.patients)
        }
        fetchPatient()
    }, [])

    const handleClick = (id) => {
        router.push('/patient/' + id)
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-lg font-bold w-[100px]">Họ</TableHead>
                    <TableHead className="text-lg font-bold w-[100px]">Tên</TableHead>
                    <TableHead className="text-lg font-bold w-[100px]">Ngày sinh</TableHead>
                    <TableHead className="text-lg font-bold w-[100px]">Số điện thoại</TableHead>
                    <TableHead className="text-lg font-bold w-[100px]">Giới tính</TableHead>
                    <TableHead className="text-lg font-bold w-[100px]">Địa chỉ</TableHead>
                    <TableHead className="text-lg font-bold w-[100px]">Thông tin hồ sơ</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {patients && patients.map((patient) => {
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