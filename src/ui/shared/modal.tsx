import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from 'next/link';
import share from '../../../public/images/dashboard/share.svg'
import Image from 'next/image';
import { Box, styled, Typography } from '@mui/material';
import close from '../../icons/ib/close.svg'
import ClearIcon from '@mui/icons-material/Clear';

import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    XIcon,
} from "react-share";
import AddressCopy from './addressCopy';



const BoxSocial = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '2rem',
    padding: '0rem 2rem'
}));

export default function Modal({url,url1}:{url:any,url1:any}) {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

    const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };



    const descriptionElementRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const referLink = url

    return (
        <React.Fragment>


            <Box onClick={handleClickOpen('body')}>

                <Image src={share} alt={""} />
            </Box>
            <Dialog
                sx={{
                    backgroundColor: '#0000008f',
                    '& .MuiDialog-paperScrollBody': {
                        backgroundImage: 'linear-gradient(#000000, #000000)',
                        border: '1px solid #1AB3E5',
                        padding: '1rem',
                        borderRadius: '12px'
                    }
                }}
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <Box textAlign={'end'}>
                    <Link href={''} onClick={handleClose}><ClearIcon sx={{ color: '#fff' }} /></Link>
                </Box>
                <DialogContent dividers={scroll === 'paper'}>
                    <Box textAlign={'center'}>
                        <Typography sx={{
                            '@media(max-width : 900px)': { fontSize: '16px' }
                        }} variant='h5' color={'#1AB3E5'}  >Earn MDC Coin Coin by referring your friends and community!</Typography>
                        <Typography mt={2} color={'#fff'}>Share your unique link below and receive <Typography component={'span'}><Link style={{ textDecoration: 'none', color: '#1AB3E5' }} href={''}>10%</Link>  of all transactions realized with your link <Typography component={'span'}><Link style={{ textDecoration: 'none', color: '#1AB3E5' }} href={''}>instantly </Link>!</Typography></Typography></Typography>
                    </Box>
                </DialogContent>
                <Box textAlign={'center'}>
                    <Box sx={{
                        background: 'linear-gradient(90deg, #1ab3e5 0%, #034f89 50%, #1ab3e5 100%) !important',
                        border: '1px solid #1ab3e5',
                        padding: '10px',
                        borderRadius: '30px',
                        textAlign: 'center',
                        display: 'inline-flex',
                        justifyContent: 'center'
                    }}>
                        <AddressCopy textColor={'#000 !important'} text={url1} addresstext={'Reffer'} hrefLink={''} />
                    </Box>
                </Box>
                <BoxSocial>

                    <TwitterShareButton
                        url={referLink}
                    >
                        <XIcon size={32} round={true} />
                    </TwitterShareButton>

                    <WhatsappShareButton
                        url={referLink}
                    >
                        <WhatsappIcon size={32} round={true} />
                    </WhatsappShareButton>

                    {/* <Link href={'https://www.instagram.com/mumblechat/'} target='_blank'><Image src={instagram} alt={''} width={32}/></Link> */}

                    <FacebookShareButton
                        url={referLink}
                    >
                        <FacebookIcon size={32} round={true} />
                    </FacebookShareButton>

                    <LinkedinShareButton
                        url={referLink}
                    >
                        <LinkedinIcon size={32} round={true} />
                    </LinkedinShareButton>


                    <TelegramShareButton
                        url={referLink}
                    >
                        <TelegramIcon size={32} round={true} />
                    </TelegramShareButton>


                    {/* <Link href={'/'} target='_blank'><Image src={discord} alt={''} width={32}/></Link> */}
                    {/* <Link href={'/'} target='_blank'><Image src={github} alt={''} width={32}/></Link> */}

                </BoxSocial>
            </Dialog>
        </React.Fragment>
    );
}
