import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useAppContext } from '../context/Context'

const FormSearchPatient = () => {
    const { phoneInput, setPhoneInput, handleSearch, handleCancel } = useAppContext()
    return (
        <div className="flex items-center justify-start gap-2 ">
            <Input placeholder="Nhập sđt bệnh nhân" className="w-[300px] text-slate-500" value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} />
            <Button type="button" className="bg-blue-400 w-[120px] hover:bg-blue-500" onClick={handleSearch}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                Tìm kiếm
            </Button>
            <Button type="button" className="bg-red-400 w-[120px] hover:bg-red-500" onClick={handleCancel}>
                Hủy
            </Button>
        </div>
    )
}

export default FormSearchPatient