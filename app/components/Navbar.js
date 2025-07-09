"use client"
import React from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from 'react'


const Navbar = () => {
  const handleOut = () => {
    signOut({ callbackUrl: "/" })
  }

  const { data: session, status, } = useSession()

  const [showdropdown, setShowdropdown] = useState(false)
  if (status === 'loading') {
    return (
      <div className="px-6 py-4 text-gray-300 animate-pulse">
        Loading...
      </div>
    );
  }

  return (
    <div className='bg-[#080813] text-white '>

      {session && <>
        <div className='flex max-md:flex-col justify-between items-center px-5  max-md:mb-2'>
          <Link href="/">
            <div className='font-semibold flex justify-center items-center cursor-pointer text-lg'>
              ChaiTreat!
              <img className='mb-1.5' src="./tea.gif" width={39} alt="" />
            </div>
          </Link>
          <div className='relative  max-md:flex'>
            <button
              onClick={() => setShowdropdown(!showdropdown)} onBlur={() => {
                setTimeout(() => {
                  setShowdropdown(false)
                }, 100);
              }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white  bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300  mr-4.5 font-medium rounded-lg text-sm px-5 py-2.5  max-md:!py-0 max-md:!px-[10px] text-center mr- inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 " type="button">
              Welcome {session.user.email}
              <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>

            <div id="dropdown" className={`z-10 ${showdropdown ? "" : "hidden"} left-[130px] max-md:top-[80px] max-md:left-[110px] z-50 absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 `}>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <Link rel='preload' href="/Dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                </li>
                <li>
                  <Link rel='preload' href={`/${session.user.username}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                </li>
                <li>
                  <Link rel='preload' href="" onClick={() => { handleOut() }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                </li>
              </ul>
            </div>

            <button className="text-white  bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 max-md:!p-[10px] max-md:!text-sm text-center me-2 mb-2 mr-5 max-md:!mr-1 mt-2" onClick={() => { handleOut() }}>
              Log out
            </button>
          </div>
        </div>
      </>
      }

      {!session && <>
        <div className='flex justify-between  px-2 max-md:gap-30 items-center'>
          <div>

            <Link href="/">
              <div className='font-semibold flex justify-center items-center cursor-pointer text-lg'>
                ChaiTreat!
                <img className='mb-1.5' src="./tea.gif" width={39} alt="" />
              </div>
            </Link>

          </div>
          <div>

            <Link href="/login">
              <div className='p-1.5 max-md:!p-1'>
                <button type="button" className="text-white   bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5  py-2.5 text-center me-2 mb-2 mt-2">
                  Log In
                </button>
              </div>
            </Link>
          </div>
        </div>
      </>
      }


    </div>
  )
}

export default Navbar