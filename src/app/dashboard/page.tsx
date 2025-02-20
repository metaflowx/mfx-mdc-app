 
"use client"
import Dashboardcmp from "@/ui/dashboard/dashboardcmp";
import Aos from "aos";
import { useEffect } from "react";



 
const Dashboard = () => {
      useEffect(() => {
         Aos.init({ duration: 1000, once: true });
       }, []);
    return (
        <>
        <Dashboardcmp/>
        </>
    )
};

export default Dashboard
