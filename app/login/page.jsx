'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const LoginPage = () => {
    const [accountId, setAccountId] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleLogin = async () => {
        if (accountId.trim().length == 0 || password.trim().length == 0) return
        const res = await fetch('http://localhost:3000/api/login', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ accountId, password })
        })
        const respone = await res.json()
        if (respone.loginSucces) {
            localStorage.setItem('currentUser', JSON.stringify(respone.doctor))
            router.push('/')
        } else {
            alert(respone.message)
        }
    }

    return (
        <div className='w-[100vw] h-[100vh] flex items-center justify-center'>
            <div className='p-4 border w-[400px] rounded-md'>
                <p className='text-2xl font-bold text-slate-700 text-center mb-4'>Đăng nhập</p>
                <div className='mb-4'>
                    <Label className="text-lg" className="text-lg mb-2">Tài khoản</Label>
                    <Input value={accountId} onChange={(e) => { setAccountId(e.target.value) }} />
                </div>
                <div className='mb-8'>
                    <Label className="text-lg" className="text-lg mb-2">Mật khẩu</Label>
                    <Input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <div className=''>
                    <Button className="bg-blue-400 text-lg hover:bg-blue-500 w-full" onClick={handleLogin}>Đăng nhập</Button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage