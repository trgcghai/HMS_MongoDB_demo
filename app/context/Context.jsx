'use client'
import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext()

const Context = ({ children }) => {
    const [patients, setPatients] = useState([])
    const [doctors, setDoctors] = useState([])
    const [appointments, setAppointments] = useState([])
    const [subProfiles, setSubProfiles] = useState([])
    const [selectedProfileID, setSelectedProfileID] = useState('')
    const [selectedSearchPatientId, setSelectedSearchPatientId] = useState('')
    const [selectedSearchDoctorId, setSelectedSearchDoctorId] = useState('')
    const [allProfiles, setAllProfiles] = useState([])
    const [medicines, setMedicines] = useState([])
    const [prescriptions, setPrescriptions] = useState([])
    const [createPrescriptions, setCreatePrescriptions] = useState([])
    const [updatePrescriptions, setUpdatePrescriptions] = useState([])


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
            allProfiles, setAllProfiles,
            formatDateString,
            medicines, setMedicines,
            prescriptions, setPrescriptions,
            createPrescriptions, setCreatePrescriptions,
            updatePrescriptions, setUpdatePrescriptions,
        }}>
            {children}
        </AppContext.Provider >
    )
}
export const useAppContext = () => useContext(AppContext);
export default Context