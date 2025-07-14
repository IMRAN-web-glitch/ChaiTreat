"use client"
import React, { useState } from 'react'
import Script from 'next/script'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { initiate, fetchuser, fetchpayment } from '@/actions/useractions'
import { ToastContainer } from 'react-toastify'
import { Bounce } from 'react-toastify'
import { useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import 'react-toastify/dist/ReactToastify.css';


const PaymentPage = ({ username }) => {

    const router = useRouter()
    const SearchParams = useSearchParams()
    const { data: session } = useSession()
    const [paymentform, setpaymentform] = useState({ name: "", message: "", amount: "" })
    const [currentuser, setcurrentuser] = useState({})
    const [payment, setpayment] = useState([])


    const handleChange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        getData()
    }, [])


    useEffect(() => {


        if (SearchParams.get("paymentdone") == "true") {
            toast('Thank you for your donation', {
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
            getData()
        }
        wait()

    }, [])



    const getData = async () => {

        var usr = await username
        // console.log(usr)
        let u = await fetchuser(usr)
        setcurrentuser(u)
        let dbpayment = await fetchpayment(usr)
        setpayment(dbpayment)
        console.log(u, dbpayment)

    }
    const wait = async () => {
        let usr = await username;
        let name = usr.username;
        // console.log("wait ", name)
        router.push(`/${name}`)
        getData()
    }
    const reload = () => {
        getData()
        toast('Reloaded payments list succesfully', {
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


    const pay = async (amount) => {
        if (paymentform.name?.length < 3 || paymentform.message?.length < 3) {
            return  toast('Name and Message is required', {
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
        // Get the order Id 
        let v = await username
        let a = await initiate(amount, v, paymentform)
        var orderId = a.id
        console.log("Razorpay key: ", currentuser.razorpayid);

        var options = {
            "key": currentuser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Chai Treat !", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }

        var rzp1 = await new Razorpay(options);
        rzp1.open();

    }

    return (
        <>
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
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='text-white mb-30'>
                <div>
                    <img className='w-full h-[50vh] object-cover max-md:h-[25vh] max-md:w-[100vw] max-md:object-fill' src={currentuser.coverpic} alt="" />
                </div>
                <div className="profile relative flex justify-center  ">
                    <img width={200} className='w-[140px] h-[130px] rounded-lg absolute bottom-[-50px] border-white border' height={200} src={currentuser.profilepic} alt="" />
                </div>
                <div className="content flex flex-col justify-center items-center mt-13">
                    <h1 className='font-bold text-2xl' >{session && `@${session.user.username}`}</h1>
                    <p>{`Lets help get a chai!`}</p>
                    <p className='text-sm font-semibold text-slate-300'> {payment.length} Payments . ₹{payment.reduce((a, b) => a + b.amount, 0)} raised </p>

                </div>
                <div className='flex justify-center items-center gap-5 mt-5  max-md:flex-col-reverse'>
                    <div className='bg-[#020618] p-4 rounded-lg w-[40vw] h-[50vh] max-md:w-[90vw] overflow-auto'>
                        <h1 className='font-bold pt-3' >Top 10  Supporters</h1>
                        <ul>
                            {payment.length == 0 && <div><li className='max-md:mt-4'>No payments yet</li> <div className=' flex justify-center mx-auto p-1' > <button onClick={() => { reload() }} className='p-2 rounded-xl bg-black cursor-pointer mx-auto font-bold' > reload </button></div></div>}
                            {payment.map((p, i) => {
                                return <li key={i} className='flex items-center pt-5 gap-1 font-semibold pl-3' >
                                    <img src="./avatar.gif" width={29} alt="" /><p> {p.name} donated <strong>₹{p.amount}</strong> with a message &quot;{p.message}&quot;!</p>
                                </li>
                            })}
                        </ul>
                    </div>
                    <div className='bg-[#020618] p-4 rounded-lg w-[40vw] ,md:h-[50vh] max-md:w-[90vw]' >
                        <h1 className='font-bold pt-3' >Make Your Payment</h1>
                        <div className='pt-3 pl-3'>
                            <input onChange={handleChange} name='name' value={paymentform.name} className='p-1 rounded-xs bg-slate-800 placeholder:text-slate-300  mt-3 w-full outline-none' type="text" placeholder='Enter Name' />
                        </div>
                        <div className=' pl-3'>
                            <input onChange={handleChange} name='message' value={paymentform.message} className='p-1 rounded-xs bg-slate-800 placeholder:text-slate-300  mt-3 w-full outline-none' type="text" placeholder='Enter Message' />
                        </div>
                        <div className=' pl-3'>
                            <input onChange={handleChange} name='amount' value={paymentform.amount} className='p-1 rounded-xs bg-slate-800 placeholder:text-slate-300  mt-3 w-full outline-none' type="text" placeholder='Enter Amount' />
                        </div>
                        <div className="pl-3 w-full">
                            <button onClick={() => { pay(Number.parseInt(paymentform.amount) * 100) }} className="bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800  text-sm px-5 py-2.5 text-center font-bold w-full p-1.5 mt-4 rounded-xs cursor-pointer disabled:bg-slate-600 disabled:from-purple-100  " disabled={paymentform.name?.length < 3 || paymentform.message?.length < 3 || paymentform.amount?.length < 1} >Pay</button>
                        </div>
                        <div className="pl-3 w-full flex gap-5 items-center">
                            <button onClick={() => { pay(1000) }} className="bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium  text-sm px-5 py-2.5 text-center  p-2 mt-4 rounded-xs cursor-pointer " >Pay ₹10</button>
                            <button onClick={() => { pay(3000) }} className="bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium  text-sm px-5 py-2.5 text-center  p-2 mt-4 rounded-xs cursor-pointer " >Pay ₹30</button>
                            <button onClick={() => { pay(5000) }} className="bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium  text-sm px-5 py-2.5 text-center  p-2 mt-4 rounded-xs cursor-pointer " >Pay ₹50</button>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default PaymentPage

