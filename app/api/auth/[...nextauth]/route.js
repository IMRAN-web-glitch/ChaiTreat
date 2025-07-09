import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github";
import User from '@/app/models/User';
import ConnectDb from '@/app/db/ConnectDb';


const authoptions = NextAuth({
  providers: [
    // OAuth authentication providers...
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === "github") {
        //connecting to database
        await ConnectDb()
        //check already exists or not
        const currentuser = await User.findOne({ email: user.email })
        if (!currentuser) {
          //create new user
          const newuser = await new User({
            name: user.name,
            username: user.email.split("@")[0],
            email: user.email,
            profilepic: user.image,
            coverpic: user.image,
            razorpayid: "",
            // razorpaysecret: process.env.RAZORPAY_SECRET,

          })
          await newuser.save()
          user.name = newuser.username
        }
        else {
          user.name = currentuser.username
        }
      }
      return true
    },
    async session({ session, token }) {
      await ConnectDb()
      const dbuser = await User.findOne({ email: session.user.email })
      // console.log(dbuser)
      session.user.username = dbuser.username
      return session
    },
  }
})

export { authoptions as GET, authoptions as POST }




