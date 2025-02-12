 
"use client" 
import { Box } from "@mui/material"
import AddressCopy from "./addressCopy";
import Modal from "./modal";
import { makeStyles } from "@mui/styles";
 


const useStyles = makeStyles({

    ref__link: {
        background: "linear-gradient(90deg,rgba(10, 77, 102, 0), #0A4E66,rgba(10, 77, 102, 0))",
        border:'1px solid #0D5972',
        padding: "5px 5px 5px 10px",
        borderRadius: "12px",
        display:'flex !important',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:'1rem'
         
    },


});

const RefBottom = () => {
    const classes = useStyles();
    
    return (
        <>
            <Box className={classes.ref__link}>
                 <AddressCopy hrefLink={`https://ico.mdccoin.com/dashboard/?ref=${'address'}`}  text={`https://ico.mdccoin.com/dashboard/?ref=${'address'}`} addresstext={`https://ico.mdccoin.com/dashboard/?ref=${''}`} /> 
                <Modal />
            </Box>
        </>
    )
}

export default RefBottom