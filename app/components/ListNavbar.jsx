'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ListNavbar = () => {
    const path = usePathname()
    const router = useRouter()
    const [isLoginPage, setIsLoginPage] = useState(true)

    useEffect(() => {
        const lastItem = path.split('/').pop()
        setIsLoginPage(lastItem == 'login')
    }, [path])

    return (
        <>
            {isLoginPage ?
                <></>
                :
                <div className="fixed top-0 left-0 bottom-0 text-lg text-white bg-blue-400 w-[10vw]">
                    <div className='flex flex-col justify-between w-full h-full'>
                        <ul className="flex flex-col items-center justify-center gap-2 mt-[84px]">
                            <li
                                className={`w-full py-3 cursor-pointer hover:bg-white hover:text-blue-400 text-center ${path == '/' || path.includes('patient') ? 'bg-white text-blue-400' : ''}`}
                            >
                                <Link href={'/'}>Bệnh nhân</Link>
                            </li>
                            <li className={`w-full py-3 cursor-pointer hover:bg-white hover:text-blue-400 text-center ${path.includes('appointment') ? 'bg-white text-blue-400' : ''}`}>
                                <Link href={'/appointment'} >Lịch khám</Link>
                            </li>
                            <li className={`w-full py-3 cursor-pointer hover:bg-white hover:text-blue-400 text-center ${path.includes('prescription') ? 'bg-white text-blue-400' : ''}`}>
                                <Link href={'/prescription'} >Các đơn thuốc</Link>
                            </li>
                        </ul>

                        <div className='p-2'>
                            <Button className="w-full bg-white text-blue-400 text-lg" onClick={() => {
                                router.push('/login')
                                localStorage.removeItem('currentUser')
                            }}>Đăng xuất</Button>
                        </div>
                    </div>
                </div>}
        </>
    )
}

export default ListNavbar