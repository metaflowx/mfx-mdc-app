import Footer from "@/components/marketing/footer";
import Navbar from "@/components/marketing/navbar";
import { headers } from "next/headers";
import React from 'react';
import ContextProvider from "../context";

interface Props {
    children: React.ReactNode
}

const MarketingLayout =async ({ children }: Props) => {
    const headersObj =  await headers();
    const cookies = headersObj.get('cookie')
    return (
        <ContextProvider cookies={cookies}>

        <div className="w-full">
            <Navbar />
            <main className="mx-auto w-full z-40 relative">
                {children}
            </main>
            <Footer />
        </div>
        </ContextProvider>
    );
};

export default MarketingLayout
