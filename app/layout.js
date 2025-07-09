import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SessionWrapper from "./components/SessionWrapper";
import Script from "next/script";

export const metadata = {
  title: "Chai Treat - A Sweet Way to Support Creators",
  description: "Chai-sized tips for creators you love.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950">
        <SessionWrapper>
          <Navbar/>

          {/* <div className="min-h-[91vh] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
          {children}
          </div> */}
          <main className="relative min-h-[calc(100vh-6rem)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]"></div>
            <div className="relative z-10">
              {children}
              <Script src="https://unpkg.com/flowbite@latest/dist/flowbite.min.js" strategy="afterInteractive" />
            </div>
          </main>

          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
