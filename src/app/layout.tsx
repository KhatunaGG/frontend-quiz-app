import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Context from "./context/Context";
import { Header, HomePage } from "./components";

const rubik = Rubik({ subsets: ["latin"], weight: ["300", "400", "500"] });


export const metadata: Metadata = {
  title: "frontend-quiz-app",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html  lang="en">
      <body className={`${rubik.className} bg-[#F4F6FA] dark:bg-[#313E51] transition-colors duration-700 ease-in-out relative`}>
        <Context>
          <div className="w-full h-screen absolute inset-0 -z-20">
            <HomePage />
          </div>
          <Header />
          {children}
        </Context>
      </body>
    </html>
  );
}
