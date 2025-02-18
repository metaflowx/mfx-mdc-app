'use client'

import Link from 'next/link'
import { Box, styled } from '@mui/material'
import { usePathname } from 'next/navigation';

const ListBox = styled('ul')(({ theme }) => ({
    padding: 0,
    listStyle: 'none',
    display: 'flex',
    gap: '1rem',
    '@media(max-width : 900px)': {
        overflowX: 'scroll',
        width: '100%'
    }
}));

const ListItem = styled('li')(({ theme }) => ({
    'a': {
        padding: '12px 16px',
        display: 'inline-block',
        color: theme.palette.primary.contrastText,
        textDecoration: 'none',
        borderRadius: '6px',
        width: 'max-content'
    }
}));

const NavbarList = [
    {
        id: 1,
        Name: "Dashboard",
        Url: "/dashboard",
        Gradient: "linear-gradient(90deg, #1ab3e5 0%, #034f89 50%, #1ab3e5 100%)",
        Border: "1px solid #1ab3e5",
        Redius: "30px"
    },
    {
        id: 2,
        Name: "Earning",
        Url: "/dashboard/earning",
        Gradient: "linear-gradient(90deg, #1ab3e5 0%, #034f89 50%, #1ab3e5 100%)",
        Border: "1px solid #1ab3e5",
        Redius: "30px"
    },
    {
        id: 3,
        Name: "Staking",
        Url: "/dashboard/staking",
        Gradient: "linear-gradient(90deg, #1ab3e5 0%, #034f89 50%, #1ab3e5 100%)",
        Border: "1px solid #1ab3e5",
        Redius: "30px"
    },
    {
        id: 4,
        Name: "Referral",
        Url: "/dashboard/referral",
        Gradient: "linear-gradient(90deg, #1ab3e5 0%, #034f89 50%, #1ab3e5 100%)",
        Border: "1px solid #1ab3e5",
        Redius: "30px"
    },
    {
        id: 5,
        Name: "Profile",
        Url: "/dashboard/profile",
        Gradient: "linear-gradient(90deg, #1ab3e5 0%, #034f89 50%, #1ab3e5 100%)",
        Border: "1px solid #1ab3e5",
        Redius: "30px"
    }
];

const Navbar = () => {
    const pathname = usePathname();

    return (
        <Box>
            <ListBox>
                {NavbarList.map((item) => (
                    <ListItem key={item.id}>
                        <Link
                            style={{
                                background: pathname === item.Url ? item.Gradient : '',
                                color: pathname === item.Url ? '#fff' : '',
                                border: pathname === item.Url ? item.Border : '',
                                borderRadius: item.Redius
                            }}
                            href={item.Url}>
                            {item.Name}
                        </Link>
                    </ListItem>
                ))}
            </ListBox>
        </Box>
    );
};

export default Navbar;
