'use client'
import { useAppContext } from '@/app/context/Context'
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const ComboMedicine = ({medicineId, setMedicineId}) => {
    const { medicines, setMedicines, setPrescriptions } = useAppContext()
    const [open, setOpen] = React.useState(false)

    const fetchPrescription = async () => {
        const response = await fetch('http://localhost:3000/api/prescriptions', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        const res = await response.json()
        setPrescriptions(res.prescriptions.filter((prescription) => prescription.medicine.id == medicineId))
    }

    React.useEffect(() => {
        const fetchMedicines = async () => {
            const response = await fetch('http://localhost:3000/api/medicines', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            })
            const res = await response.json()
            setMedicines(res.medicines)
        }
        fetchMedicines()
    }, [])

    React.useEffect(() => {
        fetchPrescription()
    }, [medicineId])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[462px] text-lg text-slate-500 justify-between"
                >
                    {medicineId
                        ? medicines.find((medicine) => medicine._id === medicineId).name
                        : "Chọn loại thuốc..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[462px] text-lg p-0">
                <Command>
                    <CommandInput className="text-lg" placeholder="Tìm kiếm loại thuốc..." />
                    <CommandList>
                        <CommandEmpty className="text-lg p-2">Không tìm thấy loại thuốc nào</CommandEmpty>
                        <CommandGroup>
                            {medicines.map((medicine) => (
                                <CommandItem
                                    key={medicine._id}
                                    value={medicine._id}
                                    onSelect={(currentValue) => {
                                        setMedicineId(currentValue === medicineId ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                    className="text-lg"
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            medicineId === medicine._id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {medicine.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default ComboMedicine