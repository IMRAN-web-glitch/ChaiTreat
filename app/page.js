import Link from "next/link";
export default function Home() {
  return (
    <div className="text-white mb-20">
      <div className="h-[44vh] max-md:h-[40vh] pt-15 max-md:pt-20" >
        <span className="flex justify-center items-center gap-1" >
          <h1 className="text-3xl text-center text-white font-bold" >
            Chai Me Up!
          </h1>
          <img src="/tea.gif" width={50} alt="" />
        </span>
        <p className="text-center font-semibold p-1">
          A crowdfunding platform for creators to fund their projects.
        </p>
        <span className="flex items-center justify-center gap-2.5 p-1">
          <Link href={"/login"}>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Get Started</button>
          </Link>
          <Link href={"/about"}>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read more</button>
          </Link>
        </span>

      </div>
      <div className="bg-[#bbbbcb] opacity-10 w-full h-1 mb-8 max-md:!mb-3"></div>
      <div className="mb-10" >
        <h1 className="text-center p-3 font-bold text-lg" >Yours Fans Can Buy You a Chai!</h1>
        <div className="flex justify-around items-center md:pt-1.5 max-md:text-sm max-md:mb-5 max-md:h-[20vh]">
          <div className="font-semibold flex flex-col justify-center items-center">
            <img src="/man.gif" width={55} alt="" className="bg-slate-400 rounded-full p-1 " />
            <p > Fund Yourself </p>
            <p className="text-center font-normal">Your fans are willing to fund your work</p>
          </div>
          <div className="font-semibold flex flex-col justify-center items-center">
            <img src="/coin.gif" width={55} alt="" className="bg-slate-400 rounded-full p-1 " />
            <p > Fund Yourself </p>
            <p className="text-center font-normal">Your fans are willing to contribute financially</p>
          </div>
          <div className="font-semibold flex flex-col justify-center items-center">
            <img src="/group.gif" width={55} alt="" className="bg-slate-400 rounded-full p-1 " />
            <p > Fund Yourself </p>
            <p className="text-center font-normal">Your fans are ready to collaborate with you</p>
          </div>
        </div>
      </div>
      <div className="bg-[#bbbbcb] opacity-10 w-full h-1 my-8  "></div>
      <div>
        <h1 className="text-center p-3 font-bold text-lg" >Learn More About Us</h1>
        <div className="flex justify-center items-center w-[90%] h-[90vh] max-md:w-[90%] max-md:h-[50%] m-auto" >

          <iframe className="w-full h-full" src="https://www.youtube.com/embed/8lFFHe5nrY8" title="Support Me - Buy Me a Coffee" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

        </div>
      </div>
    </div >

  );
}
