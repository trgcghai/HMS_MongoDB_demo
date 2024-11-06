import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useAppContext } from '../context/Context'

const FormSearchPatient = () => {
    const { patients, setPatients } = useAppContext()
    const [phoneInput, setPhoneInput] = useState("")

    const handleSearch = () => {
        if (!phoneInput.match(/[0-9]{10}/)) {
            alert("Phone invalid")
            return
        }
        const newData = patients.filter((patient) => patient.phone.includes(phoneInput))
        console.log(newData)
        setPatients(newData)
        setPhoneInput('')
    }

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

    return (
        <div className="flex items-center justify-start gap-2 ">
            <Input placeholder="Nhập sđt bệnh nhân" className="w-[300px] text-slate-500" value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} />
            <Button type="button" className="bg-blue-400 w-[120px] hover:bg-blue-500" onClick={handleSearch}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                Tìm kiếm
            </Button>
            <Button type="button" className="bg-red-400 w-[120px] hover:bg-red-500" onClick={fetchPatient}>
                Hủy
            </Button>
        </div>
    )
}

export default FormSearchPatient