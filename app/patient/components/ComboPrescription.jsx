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

const ComboPrescription = ({prescriptionId, setPrescriptionId}) => {
    const { prescriptions, setPrescriptions } = useAppContext()
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        const fetchPrescription = async () => {
            const response = await fetch('http://localhost:3000/api/prescriptions', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            })
            const res = await response.json()
            setPrescriptions(res.prescriptions)
        }
        fetchPrescription()
    }, [])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[462px] text-lg text-slate-500 justify-between"
                >
                    {prescriptionId
                        ? prescriptions.find((prescription) => prescription._id === prescriptionId).dosage + ' ' + prescriptions.find((prescription) => prescription._id === prescriptionId).instructions
                        : "Chọn liều lượng..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[462px] text-lg p-0">
                <Command>
                    <CommandInput className="text-lg" placeholder="Tìm kiếm liều lượng..." />
                    <CommandList>
                        <CommandEmpty className="text-lg p-2">Không tìm thấy liều lượng nào</CommandEmpty>
                        <CommandGroup>
                            {prescriptions && prescriptions.map((prescription) => (
                                <CommandItem
                                    key={prescription._id}
                                    value={prescription._id}
                                    onSelect={(currentValue) => {
                                        setPrescriptionId(currentValue === prescriptionId ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                    className="text-lg"
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            prescriptionId === prescription._id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {prescription.dosage + ' ' + prescription.instructions}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default ComboPrescription