"use client"
import { Box, Container, Grid, Typography, useTheme, } from "@mui/material"
import { makeStyles } from '@mui/styles';
import Referral from "./referral";
import BuyTab from "./buyTab";
import RefBottom from "../shared/refBottom";
import Dsfooter from "../shared/dsfooter";









const useStyles = makeStyles({
    mainDiv: {
        margin: '3rem 30px 20px 30px',

        '@media(max-width : 1200px)': {
            margin: '20px 20px 20px 20px',

        }
    },
    step__two: {
        marginTop: '1rem',
    },
    list___bx: {
        background: 'linear-gradient(145deg, #16A4D7, #034F89)',
        padding: '1rem',
        borderRadius: '12px',
        textAlign: 'center',
        height: '100%',
        transition: '0.5s',
        '&:hover': {
            transform: 'translateY(-5px)'
        }
    },

});



const Box__list = [
    {
        id: 1,
        title: 'Your Wallet Balance',
        data: "0.000",
        valueInUsd: "$0.000"
    },
    {
        id: 2,
        title: 'Self Staking Income',
        data: "0.000 MDC",
        valueInUsd: "$0.000"
    },
    {
        id: 3,
        title: 'Your Spot Income',
        data: "0.000 MDC",
        valueInUsd: "$0.000"
    },

]




const Dsboard = () => {
    const classes = useStyles();

    return (
        <>
            <Box sx={{
                 paddingTop:'7rem'
            }}>
                <Container>

                    <Box className={classes.step__two}>
                        <Grid container spacing={2}>
                            {Box__list.map((item, index) => (
                                <Grid key={index} item lg={4} md={4} sm={12} xs={12}>
                                    <Box className={classes.list___bx}>
                                        <Box sx={{
                                            backgroundColor: '#034F89',
                                            padding: '10px',
                                            borderRadius: '6px',
                                            border: '1px solid #1AB3E5'
                                        }}>
                                            <Typography color={'#fff'}>{item.title}</Typography>
                                        </Box>
                                        <Typography color={'#fff'} fontWeight={700} variant="h5" mt={1.5}>{item.data} MDC</Typography>
                                        <Typography color={'#ffffff73'}>{item.valueInUsd}</Typography>
                                    </Box>
                                </Grid>
                            ))}

                        </Grid>
                    </Box>





                    <Box sx={{
                        marginTop: '1rem'
                    }}>
                        <Grid container spacing={2}>
                            <Grid item lg={8} md={8} sm={12} xs={12}>
                                <BuyTab />
                                
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <Referral />
                            </Grid>
                        </Grid>
                    </Box>

                    <RefBottom/>
                    <Dsfooter/>
                </Container>
            </Box>

        </>
    )
}

export default Dsboard