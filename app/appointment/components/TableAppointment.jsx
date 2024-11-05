import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useAppContext } from '@/app/context/Context';

const TableAppointment = () => {
    const { appointments } = useAppContext()

    function formatDateString(dateString) {
        const date = new Date(dateString).toLocaleDateString('en-CA')
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-lg font-bold w-[100px]">Tên bệnh nhân</TableHead>
                    <TableHead className="text-lg font-bold w-[100px]">Ngày sinh</TableHead>
                    <TableHead className="text-lg font-bold w-[100px]">Giới tính</TableHead>
                    <TableHead className="text-lg font-bold w-[100px]">Số điện thoại</TableHead>
                    <TableHead className="text-lg font-bold w-[100px]">Tên bác sĩ</TableHead>
                    <TableHead className="text-lg font-bold w-[100px]">Chuyên ngành bác sĩ</TableHead>
                    <TableHead className="text-lg font-bold w-[100px]">Ngày khám</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {appointments && appointments.map((appointment) => {
                    return <TableRow key={appointment._id}>
                        <TableCell className="text-lg text-slate-600">{appointment.patient.firstName + ' ' + appointment.patient.lastName}</TableCell>
                        <TableCell className="text-lg text-slate-600">{formatDateString(appointment.patient.dob)}</TableCell>
                        <TableCell className="text-lg text-slate-600">{appointment.patient.gender}</TableCell>
                        <TableCell className="text-lg text-slate-600">{appointment.patient.phone}</TableCell>
                        <TableCell className="text-lg text-slate-600">{appointment.doctor.firstName + ' ' + appointment.doctor.lastName}</TableCell>
                        <TableCell className="text-lg text-slate-600">{appointment.doctor.specialize}</TableCell>
                        <TableCell className="text-lg text-slate-600">{formatDateString(appointment.date)}</TableCell>
                    </TableRow>
                })}
            </TableBody>
        </Table>
    )
}

export default TableAppointment