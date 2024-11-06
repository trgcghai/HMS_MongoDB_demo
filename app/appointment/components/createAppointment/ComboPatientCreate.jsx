"use client"
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
import { useAppContext } from "@/app/context/Context"

export function ComboPatientCreate({ patientId, setPatientId }) {
    const [open, setOpen] = React.useState(false)
    const { patients, setPatients } = useAppContext()

    React.useEffect(() => {
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
        fetchPatient()
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
                    {patientId
                        ? patients.find((patient) => patient._id === patientId).firstName + ' ' + patients.find((patient) => patient._id === patientId).lastName
                        : "Chọn bệnh nhân..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[462px] text-lg p-0">
                <Command>
                    <CommandInput className="text-lg" placeholder="Tìm kiếm bệnh nhân..." />
                    <CommandList>
                        <CommandEmpty className="text-lg p-2">Không tìm thấy bệnh nhân nào</CommandEmpty>
                        <CommandGroup>
                            {patients.map((patient) => (
                                <CommandItem
                                    key={patient._id}
                                    value={patient._id}
                                    onSelect={(currentValue) => {
                                        setPatientId(currentValue === patientId ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                    className="text-lg"
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            patientId === patient._id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {patient.firstName + ' ' + patient.lastName}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
