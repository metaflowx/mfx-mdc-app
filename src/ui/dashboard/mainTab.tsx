"use client";

import * as React from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import BuyTab from "./buyTab";
import Swap from "./swap";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

// 🔹 Styled Tabs (remove underline)
const StyledTabs = styled(Tabs)({
    "& .MuiTabs-indicator": {
        display: "none", // hide the underline
    },
});

// 🔹 Styled Tab (button-like with bg color)
const StyledTab = styled(Tab)(({ theme }) => ({
    textTransform: "none",
    fontWeight: 600,
    borderRadius: "8px",
    marginRight: theme.spacing(1),
    color: "#fff",
    backgroundColor: "#101012",
    border: '1px solid #1D1D20',
    "&.Mui-selected": {
        background: "linear-gradient(90deg, rgb(26, 179, 229) 0%, rgb(3, 79, 137) 50%, rgb(26, 179, 229) 100%)",
        border: '1px solid rgb(26, 179, 229)',
        color: "#fff",
    },
}));


const StyledBox = styled(Box)({
    background: "linear-gradient(180deg, #16A4D7, #034f894a)",
    padding: "1px",
    borderRadius: "12px",
    height: "100%",
});

const InnerBox = styled(Box)({
    backgroundColor: "#000",
    borderRadius: "12px",
    padding: "1rem",
    height: "100%",
});
export default function MainTab() {
    const [value, setValue] = React.useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <StyledBox>
            <InnerBox>
                <Box sx={{ width: "100%" }}>
                    {/* Tabs Header */}
                    <StyledTabs value={value} onChange={handleChange} aria-label="buy swap tabs">
                        <StyledTab label="Buy" {...a11yProps(0)} />
                        <StyledTab label="Swap" {...a11yProps(1)} />
                    </StyledTabs>

                    {/* Tabs Content */}
                    <TabPanel value={value} index={0}>
                        <Box mt={2}>
                            <BuyTab />
                        </Box>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Box mt={2}>
                            <Swap />
                        </Box>
                    </TabPanel>
                </Box>
            </InnerBox>
        </StyledBox>
    );
}
