import { useAppContext } from '@/app/context/Context'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

const DialogMedicine = () => {
    const { setMedicines } = useAppContext()
    const [medicineName, setMeidcineName] = useState('')

    const fetchAddMedicine = async () => {
        const response = await fetch('http://localhost:3000/api/medicines', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ medicineName })
        })
        const {querySuccess, medicines, insertResult} = await response.json()
        if (querySuccess) {
            console.log({insertResult})
            setMedicines(medicines)
        }
    }

    const handleCancel = () => {
        setMeidcineName('')
    }

    const handleAddMedicine = () => {
        if (medicineName.trim().length == 0) return

        fetchAddMedicine()

        setMeidcineName('')
    }

    return (
        <Dialog>
            <DialogTrigger className="w-2/3 text-center cursor-pointer p-2 my-4 text-lg text-slate-700 border rounded-md hover:bg-blue-400 hover:text-white">
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Thêm thuốc mới
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-lg">Thêm thuốc mới</DialogTitle>
                </DialogHeader>
                <div>
                    <div className="mb-4">
                        <Label className="text-lg" htmlFor="firstName">Tên thuốc</Label>
                        <Input id='firstName' value={medicineName} onChange={(e) => { setMeidcineName(e.target.value) }} />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="bg-red-400 w-[120px] hover:bg-red-500" onClick={handleCancel} >
                            Hủy
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button className="bg-blue-400 w-[120px] hover:bg-blue-500" onClick={handleAddMedicine} >Xác nhận</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DialogMedicine