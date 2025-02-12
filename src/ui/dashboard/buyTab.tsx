"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, InputBase, styled } from "@mui/material";
import Image from "next/image";
import usdt from "../../../public/images/dashboard/usdt.svg";
import usdc from "../../../public/images/dashboard/usdc.svg";
import bnb from "../../../public/images/dashboard/bnb.svg";
import eth from "../../../public/images/dashboard/eth.svg";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import mdcicon from '../../../public/images/dashboard/mdcicon.svg'




const useStyles = makeStyles({
    max_btn__wrap: {
        backgroundColor: '#101012',
        border: '1px solid #1D1D20',
        borderRadius: '12px',
        display: 'flex',
        padding: '2px',
        marginTop: '1.5rem'
    },
    max_btn: {
        background: 'linear-gradient(90deg, #1ab3e5 0%, #034f89 50%, #1ab3e5 100%) !important',
        color: '#fff',
        border: '1px solid #1ab3e5',
        borderRadius: '8px',
        padding: '12px 24px',
        fontWeight: 700,

    },
    flex___box: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    buy_btn: {
        background: 'linear-gradient(90deg, #1ab3e5 0%, #034f89 50%, #1ab3e5 100%) !important',
        color: '#fff',
        border: '1px solid #1ab3e5',
        borderRadius: '30px',
        padding: '12px 24px',
        fontWeight: 700,
        width: '100%'

    },
})

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const StyledBox = styled(Box)(() => ({
    marginTop: "2.2rem",
}));

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            sx={{ padding: "0rem", color: "#fff" }}
        >
            {value === index && <Box>{children}</Box>} {/* Replaced Typography with Box */}
        </Box>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

// Token data array for scalability
const tokens = [
    { label: "USDT", icon: usdt },
    { label: "USDC", icon: usdc },
    { label: "BNB", icon: bnb },
    { label: "ETH", icon: eth },
];

export default function ReferralTab() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [buyInput, setBuyInput] = useState("")
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleMax = () => {
        setBuyInput("0")
    }

    return (
        <Box
            sx={{
                background: "linear-gradient(180deg, #16A4D7, #034f894a)",
                padding: "1px",
                borderRadius: "12px",
                height: '100%'
            }}
        >
            <Box
                sx={{
                    backgroundColor: "#000",
                    borderRadius: "12px",
                    padding: "1rem",
                    height: '100%'
                }}
            >

                <Box textAlign={'center'} mt={2}>
                    <Typography variant="h4" fontWeight={700}>Buy MDC Coins</Typography>
                </Box>

                {tokens.map((token, index) => (
                    <CustomTabPanel key={index} value={value} index={index}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '1rem',
                            marginTop: '1rem',
                        }}>
                            <Typography>   {token.label} Price $0.0600</Typography>
                            <Typography>    MDC Coin Price $0.0170</Typography>
                        </Box>
                    </CustomTabPanel>
                ))}


                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="crypto tabs"
                    variant="fullWidth"
                    sx={{
                        marginTop: '1.5rem',
                        ".MuiTabs-flexContainer": {
                            gap: "1rem",
                        },
                        ".MuiButtonBase-root.MuiTab-root": {
                            flexDirection: "row",
                            minHeight: "40px",
                            padding: '8px 16px 2px 16px'
                        },
                        ".MuiTabs-indicator": {
                            display: "none",
                        },
                    }}
                >
                    {tokens.map((token, index) => (
                        <Tab
                            key={index}
                            sx={{
                                textTransform: "capitalize",
                                color: value === index ? "#fff !important" : "#fff",
                                background:
                                    value === index
                                        ? "linear-gradient(90deg, #1AB3E5,rgba(26, 178, 229, 0), #1AB3E5)"
                                        : "#101012",
                                borderRadius: "12px",
                                padding: "8px 16px",
                                minWidth: "100px",
                                border: value === index ? "1px solid #1AB3E5" : "1px solid #1D1D20",
                                fontWeight: "600",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    background:
                                        value === index
                                            ? "linear-gradient(90deg, #1AB3E5,rgba(26, 178, 229, 0), #1AB3E5)"
                                            : "#19191C",
                                },
                            }}
                            icon={<Image src={token.icon} alt={token.label} width={36} height={36} />}
                            label={token.label}
                            {...a11yProps(index)}
                        />
                    ))}
                </Tabs>

                {/* Tab Panels */}
                {tokens.map((token, index) => (
                    <CustomTabPanel key={index} value={value} index={index}>
                        <Box>
                            <Box className={classes.max_btn__wrap}>
                                <InputBase
                                    value={buyInput}
                                    onChange={(e) => setBuyInput(e.target.value)}
                                    sx={{
                                        flex: 1,
                                        color: '#fff',
                                        width: '100%',
                                        padding: '0.3rem 0.5rem',
                                        ':-moz-placeholder': {
                                            color: 'fff',
                                        },
                                        '& input[type=number]': {
                                            '-moz-appearance': 'textfield',
                                        },
                                        '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                            '-webkit-appearance': 'none',
                                            margin: 0,
                                        },
                                    }}
                                    fullWidth
                                    placeholder={'Enter Amount in RAMA'}
                                    type={'number'}
                                />
                                <Button className={classes.max_btn} onClick={handleMax} href={""} >Max</Button>
                            </Box>

                            <Box>
                                {tokens.map((token, index) => (
                                    <CustomTabPanel key={index} value={value} index={index}>
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            gap: '1.5rem',
                                            marginTop: '1rem'
                                        }}>
                                            <Box className={classes.flex___box}>
                                                <Image src={usdt} alt={""} width={30} height={30} />
                                                <Typography>COST: <Typography component={'span'} fontWeight={700}>$0.0600</Typography></Typography>
                                            </Box>
                                            <Box className={classes.flex___box}>
                                                <Image src={mdcicon} alt={""} width={30} height={30} />
                                                <Typography>Receive: <Typography component={'span'} fontWeight={700}>$0.0000</Typography></Typography>
                                            </Box>
                                        </Box>

                                        <Box>
                                            <Box height={20} />
                                            <Button className={classes.buy_btn} href={""} >Buy MDC Coin</Button>
                                        </Box>
                                    </CustomTabPanel>
                                ))}
                            </Box>
                        </Box>
                    </CustomTabPanel>
                ))}
            </Box>
        </Box>
    );
}