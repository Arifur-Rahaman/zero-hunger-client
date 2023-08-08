import { Box, Container, Stack, Typography } from '@mui/material';
import React from 'react';

const Footer = () => {
    return (
        <Box sx={{background:'#D9D9D9'}}>
            <Container>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography>Find us here: Mirpur-1, Dhaka, Bangladesh</Typography>
                    <Typography>Contact us here</Typography>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;