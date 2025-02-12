import { Box } from "@mui/material";
import Topheader from "../shared/topheader";
import Dsboard from "./dsboard";
import RefBottom from "../shared/refBottom";








const Dashboardcmp = () => {



    return (
        <>
            <Box className='dsboard'>
                <Topheader />
                <Dsboard />
                

            </Box>


        </>
    )
}

export default Dashboardcmp;