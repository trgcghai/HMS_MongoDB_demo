'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const ListNavbar = () => {
    const path = usePathname()
    return (
        <div className="fixed top-0 left-0 bottom-0 text-lg text-white bg-blue-400 w-[10vw]">
            <ul className="flex flex-col items-center justify-center gap-2 mt-[84px]">
                <li
                    className={`w-full py-3 cursor-pointer hover:bg-white hover:text-blue-400 text-center ${path == '/' || path.includes('patient') ? 'bg-white text-blue-400' : ''}`}
                >
                    <Link href={'/'}>Bệnh nhân</Link>
                </li>
                <li className={`w-full py-3 cursor-pointer hover:bg-white hover:text-blue-400 text-center ${path.includes('appointment') ? 'bg-white text-blue-400' : ''}`}>
                    <Link href={'/appointment'} >Lịch khám</Link>
                </li>
                <li className={`w-full py-3 cursor-pointer hover:bg-white hover:text-blue-400 text-center`}>
                    <Link href={'/prescription'}>Đơn thuốc</Link>
                </li>
            </ul>
        </div>
    )
}

export default ListNavbar