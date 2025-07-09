"use server"

import Razorpay from "razorpay"
import payment from "@/app/models/payment"
import ConnectDb from "@/app/db/ConnectDb"
import User from "@/app/models/User"


export const initiate = async (amount, to_username, paymentform) => {
    await ConnectDb()
    // fetch the secret of the user who is getting the payment 
    console.log("to_username", to_username)

    let user = await User.findOne({ username: to_username })
    console.log(user.razorpayid, user.razorpaysecret)

    const secret = user.razorpaysecret
    console.log("key id:", user.razorpayid)

    var instance = new Razorpay({ key_id: user.razorpayid, key_secret: secret })

    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }

    let x = await instance.orders.create(options)

    // create a payment object which shows a pending payment in the database
    await payment.create({ oid: x.id, amount: amount / 100, name: paymentform.name, to_user: to_username, message: paymentform.message })

    return x

}

export const fetchuser = async ({ username }) => {
    await ConnectDb();

    // console.log("Username:", username);
    let u = await User.findOne({ username: username })
    // console.log(u)
    let user = u.toObject({ flattenObjectIds: true });
    return user;
}

export const fetchpayment = async ({ username }) => {
    await ConnectDb();
    await username
    let p = await payment.find({ to_user: username, isdone: true }).sort({ amount: -1 }).limit(10).lean()
    const cleanData = p.map(item => ({
        _id: item._id.toString(),
        name: item.name,
        to_user: item.to_user,
        oid: item.oid,
        message: item.message,
        amount: item.amount,
        isdone: item.isdone,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
    }));

    return cleanData
}

export const updateProfile = async (data, oldusername) => {
    await ConnectDb()
    let ndata = Object.fromEntries(data)

    // If the username is being updated, check if username is available
    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username already exists" }
        }
        await User.updateOne({ email: ndata.email }, ndata)
        // Now update all the usernames in the Payments table 
        await payment.updateMany({ to_user: oldusername }, { to_user: ndata.username })
    }
    else {
        await User.updateOne({ email: ndata.email }, ndata)
        await payment.updateMany({ to_user: oldusername }, { to_user: ndata.username })
    }
}



