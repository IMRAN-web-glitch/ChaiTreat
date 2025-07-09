import React from 'react'
// import { useSession } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import { useEffect } from 'react'
// import { redirect } from 'next/navigation'
import PaymentPage from '@/app/components/PaymentPage'
import { notFound } from 'next/navigation'
import ConnectDb from '../db/ConnectDb'
import User from '../models/User'

const Page = async ({ params }) => {
  const checkuser = async () => {
    await ConnectDb()
    await params
    let u = await User.findOne({ username: params.username })
    if (!u) {
      return notFound()
    }
  }
  await checkuser()


  return (<>
    <PaymentPage username={params}>

    </PaymentPage>
  </>
  )
}

export default Page

export async function generateMetadata() {
  return {
    title: `Support - Get Me A Chai`,
  }
}
