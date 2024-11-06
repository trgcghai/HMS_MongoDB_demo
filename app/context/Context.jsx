'use client'
import React, { createContext, useContext, useState } from 'react'
import { patients as patientsData, doctor, appointment } from '../data'

const AppContext = createContext()

const Context = ({ children }) => {
    const [patients, setPatients] = useState(patientsData)
    const [doctors, setDoctors] = useState(doctor)
    const [appointments, setAppointments] = useState(appointment)
    const [subProfiles, setSubProfiles] = useState([])
    const [selectedProfileID, setSelectedProfileID] = useState('')
    const [selectedSearchPatientId, setSelectedSearchPatientId] = useState('')
    const [selectedSearchDoctorId, setSelectedSearchDoctorId] = useState('')

    const resetAppointment = () => {
        setAppointments(appointment)
    }

    function formatDateString(dateString) {
        const date = new Date(dateString).toLocaleDateString('en-CA')
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    }

    return (
        <AppContext.Provider value={{
            patients, setPatients,
            doctors, setDoctors,
            selectedProfileID, setSelectedProfileID,
            selectedSearchPatientId, setSelectedSearchPatientId,
            selectedSearchDoctorId, setSelectedSearchDoctorId,
            appointments, setAppointments,
            subProfiles, setSubProfiles,
            resetAppointment,
            formatDateString,
        }}>
            {children}
        </AppContext.Provider >
    )
}
export const useAppContext = () => useContext(AppContext);
export default Context