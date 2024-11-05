'use client'
import React, { createContext, useContext, useState } from 'react'
import { patients } from '../data'

const AppContext = createContext()

const Context = ({ children }) => {
    const [data, setData] = useState(patients)
    const [phoneInput, setPhoneInput] = useState("")
    const [selectPatientID, setSelectedPatientID] = useState('')
    const [selectedProfileID, setSelectedProfileID] = useState('')

    const handleSearch = () => {
        if (!phoneInput.match(/[0-9]{10}/)) {
            alert("Phone invalid")
            return
        }
        const newData = data.filter((patient) => patient.phone == phoneInput)
        setData(newData)
        setPhoneInput('')
    }

    const handleCancel = () => {
        setData(patients)
        setPhoneInput('')
    }

    return (
        <AppContext.Provider value={{
            data, setData,
            phoneInput, setPhoneInput,
            selectPatientID, setSelectedPatientID,
            selectedProfileID, setSelectedProfileID,
            handleSearch,
            handleCancel,
        }}>
            {children}
        </AppContext.Provider >
    )
}
export const useAppContext = () => useContext(AppContext);
export default Context