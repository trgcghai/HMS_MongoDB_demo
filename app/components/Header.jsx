import React from 'react'

const Header = () => {
    return (
        <header className="w-full bg-blue-400 text-white px-8">
            <div className="text-lg text-right text-white">
                Xin chào Username
            </div>
            <div className="text-4xl text-center h-14 flex items-center justify-center">
                <div>
                    Hệ thống quản lý thông tin hồ sơ bệnh nhân của bệnh viện
                </div>
            </div>
        </header>
    )
}

export default Header