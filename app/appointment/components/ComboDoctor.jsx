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

const ComboDoctor = () => {
    const { doctors, selectedSearchDoctorId, setSelectedSearchDoctorId } = useAppContext()
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[250px] text-lg text-slate-500 justify-between"
                >
                    {selectedSearchDoctorId
                        ? doctors.find((doctor) => doctor._id === selectedSearchDoctorId).firstName + ' ' + doctors.find((doctor) => doctor._id === selectedSearchDoctorId).lastName
                        : "Chọn bác sĩ..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] text-lg p-0">
                <Command>
                    <CommandInput className="text-lg" placeholder="Tìm kiếm bác sĩ..." />
                    <CommandList>
                        <CommandEmpty className="text-lg p-2">Không tìm thấy bác sĩ nào</CommandEmpty>
                        <CommandGroup>
                            {doctors.map((doctor) => (
                                <CommandItem
                                    key={doctor._id}
                                    value={doctor._id}
                                    onSelect={(currentValue) => {
                                        setSelectedSearchDoctorId(currentValue === selectedSearchDoctorId ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                    className="text-lg"
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedSearchDoctorId === doctor._id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {doctor.firstName + ' ' + doctor.lastName}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default ComboDoctor