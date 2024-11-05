'use client'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Header = () => {
    const path = usePathname()
    const [isLoginPage, setIsLoginPage] = useState(true)
    const [userName, setUserName] = useState('')

    useEffect(() => {
        const lastItem = path.split('/').pop()
        setIsLoginPage(lastItem == 'login')
    }, [path])

    useEffect(() => {
        if (!isLoginPage) {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'))
            setUserName(currentUser.firstName + ' ' + currentUser.lastName)
        }
    }, [isLoginPage])


    return (
        <>
            {isLoginPage ?
                <></>
                :
                <header className="w-full bg-blue-400 text-white px-8">
                    <div className="text-lg text-right text-white">
                        Xin chào {userName}
                    </div>
                    <div className="text-4xl text-center h-14 flex items-center justify-center">
                        <div>
                            Hệ thống quản lý thông tin hồ sơ bệnh nhân của bệnh viện
                        </div>
                    </div>
                </header>}
        </>
    )
}

export default Header