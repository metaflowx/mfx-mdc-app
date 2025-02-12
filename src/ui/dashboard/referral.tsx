import { Box,  Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';
import r1 from '../../../public/images/dashboard/r1.svg'
import r2 from '../../../public/images/dashboard/r2.svg'
import r3 from '../../../public/images/dashboard/r3.svg'
import r4 from '../../../public/images/dashboard/r4.svg'
import r5 from '../../../public/images/dashboard/r5.svg'
import r6 from '../../../public/images/dashboard/r6.svg'
import Link from "next/link";
import Image from "next/image";




const useStyles = makeStyles({

    referral: {
        display: 'flex',
        alignItems: 'center',
        padding: '0.3rem 1rem',
        gap: '1rem'
    },


});


const Referral___List = [
    {
        id: 1,
        Name: "Your Referrals",
        Data: "0.00",
        Img: r1,
    },
    {
        id: 2,
        Name: "Your referral Earnings",
        Data: "0.00",
        Img: r1,
    },
    {
        id: 3,
        Name: "Your left side earnings",
        Data: "0.00",
        Img: r1,
    },
    {
        id: 4,
        Name: "Your right side earnings",
        Data: "0.00",
        Img: r1,
    },
    {
        id: 5,
        Name: "Your self earning",
        Data: "0.00",
        Img: r1,
    },
    {
        id: 6,
        Name: "Your eligible rewards",
        Data: "0.00",
        Img: r1,
    },

]

const Referral = () => {
    const classes = useStyles();


    return (
       
            <>
            <Box sx={{
                background: 'linear-gradient(180deg, #16A4D7, #034f894a)',
                padding:'1px',
                borderRadius:'12px',
                height:'100%'
            }}>
                <Box sx={{
                    backgroundColor:'#000',
                    borderRadius:'12px',
                    padding: '1rem 0.3rem',
                    height:'100%'
                }}>
                    {Referral___List.map((item) => (  // Removed index, using item.id
                        <Box key={item.id} className={classes.referral}>  
                            <Box sx={{ backgroundColor: 'transparent !important', display: 'grid' }}>
                                <Image src={item.Img} alt={""} width={50} />
                            </Box>
                            <Box>
                                <Typography color={'#B4B3B4'}>{item.Name}</Typography>
                                <Typography color={'#fff'} fontWeight={700} variant="h5">{item.Data}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </>
        
    )
}

export default Referral;