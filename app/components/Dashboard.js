"use client"

import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { fetchuser, updateProfile } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify'
import { Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {

  const { data: session, update } = useSession()
  const router = useRouter()
  useEffect(() => {
    // console.log(session)
    if (session === undefined) return; 

    if (!session) {
      router.push('/login')
    }
    else {
      getData()
    }
  }, [session, router])

  const oldUsername = session?.user?.username || ""
  const [form, setform] = useState({})

  const getData = async () => {
    if (!session?.user?.username) return;
    console.log(session.user.username)
    // console.log(form.username)
    let u = await fetchuser({ username: session.user.username })
    setform(u)

  }
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {

    let a = await updateProfile(e, oldUsername)
    await update({ username: form.username })

    toast('Profile Updated', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }


  return (
    <div className='text-white mb-20'>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="main flex flex-col justify-center items-center gap-2.5 pb-5">
        <h1 className='font-bold text-2xl pt-5'>Welcome To Your Dashboard</h1>
        <form action={(e) => { handleSubmit(e) }}>
          <div className='flex flex-col justify-center  w-[40vw] max-md:w-[90vw]'>
            <label htmlFor="name" className='font-semibold'>Name</label>
            <input name="name" value={form.name ? form.name : ""} onChange={(e) => { handleChange(e) }} type="name" id='name' className='bg-slate-300 rounded-lg p-1 text-black outline-none w-full' />
          </div>
          <div className='flex flex-col justify-center  w-[40vw] max-md:w-[90vw]'>
            <label htmlFor="email" className='font-semibold'>Email</label>
            <input name='email' value={form.email ? form.email : ""} onChange={(e) => { handleChange(e) }} type="email" id='email' className='bg-slate-300 rounded-lg p-1 text-black outline-none w-full' />
          </div>
          <div className='flex flex-col justify-center  w-[40vw] max-md:w-[90vw]  '>
            <label htmlFor="username" className='font-semibold'>Username</label>
            <input name='username' value={form.username ? form.username : ""} onChange={(e) => { handleChange(e) }} type="text" id='username' className='bg-slate-300 rounded-lg p-1 text-black outline-none w-full' />
          </div>
          <div className='flex flex-col justify-center  w-[40vw] max-md:w-[90vw] '>
            <label htmlFor="dp" className='font-semibold'>Profile Picture</label>
            <input name='profilepic' value={form.profilepic ? form.profilepic : ""} onChange={(e) => { handleChange(e) }} type="text" id='dp' className='bg-slate-300 rounded-lg p-1 text-black outline-none w-full' />
          </div>
          <div className='flex flex-col justify-center  w-[40vw] max-md:w-[90vw] '>
            <label htmlFor="CP" className='font-semibold'>Cover Picture</label>
            <input name='coverpic' value={form.coverpic ? form.coverpic : ""} onChange={(e) => { handleChange(e) }} type="text" id='CP' className='bg-slate-300 rounded-lg p-1 text-black outline-none w-full' />
          </div>
          <div className='flex flex-col justify-center  w-[40vw] max-md:w-[90vw] '>
            <label htmlFor="ID" className='font-semibold'>Razorpay Id</label>
            <input name='razorpayid' value={form.razorpayid ? form.razorpayid : ""} onChange={(e) => { handleChange(e) }} type="Phone" id='ID' className='bg-slate-300 rounded-lg p-1 text-black outline-none w-full' />
          </div>
          <div className='flex flex-col justify-center  w-[40vw] max-md:w-[90vw] '>
            <label htmlFor="Secret" className='font-semibold'>Razopay Secret</label>
            <input name='razorpaysecret' value={form.razorpaysecret ? form.razorpaysecret : ""} onChange={(e) => { handleChange(e) }} type="password" id='Secret' className='bg-slate-300 rounded-lg p-1 text-black outline-none w-full' />
          </div>
          <div className='w-[40vw] flex justify-between items-center max-md:justify-center max-md:w-[90vw]  '>
            <button className='w-full font-bold rounded-lg bg-blue-500 h-9 mt-2.5 cursor-pointer '>Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Dashboard

export const metadata = {
  title: "Profile - Chai Treat!",
}
