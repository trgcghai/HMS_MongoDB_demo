'use client'
import React, { createContext, useContext, useState } from 'react'
import { patients, doctor, appointment } from '../data'

const AppContext = createContext()

const Context = ({ children }) => {
    const [data, setData] = useState(patients)
    const [doctors, setDoctors] = useState(doctor)
    const [appointments, setAppointments] = useState(appointment)
    const [selectPatientID, setSelectedPatientID] = useState('')
    const [selectedProfileID, setSelectedProfileID] = useState('')
    const [selectedSearchPatientId, setSelectedSearchPatientId] = useState('')
    const [selectedSearchDoctorId, setSelectedSearchDoctorId] = useState('')

    const resetPatient = () => {
        setData(patients)
    }

    const resetAppointment = () => {
        setAppointments(appointment)
    }

    return (
        <AppContext.Provider value={{
            data, setData,
            doctors, setDoctors,
            selectPatientID, setSelectedPatientID,
            selectedProfileID, setSelectedProfileID,
            selectedSearchPatientId, setSelectedSearchPatientId,
            selectedSearchDoctorId, setSelectedSearchDoctorId,
            appointments, setAppointments,
            resetPatient,
            resetAppointment
        }}>
            {children}
        </AppContext.Provider >
    )
}
export const useAppContext = () => useContext(AppContext);
export default Context