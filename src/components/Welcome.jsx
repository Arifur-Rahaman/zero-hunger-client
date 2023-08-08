import { Button, Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'
import welcomeImage from '../assets/charity-logo-emblems-set_1284-8541.webp'
import React from 'react'

function Welcome() {
    return (
        <Container>
            <Grid container alignItems='center' columnSpacing={6} sx={{p:'96px 0'}}>
                <Grid item md = {6} >
                    <img src={welcomeImage} style={{width:'100%'}} alt=''/>
                </Grid>
                <Grid item md={6}>
                    <Typography variant='h4' sx={{mb:'32px'}}>Welcome To Our Donation Area</Typography>
                    <Typography variant='h6' sx={{mb:'32px'}}>
                    Welcome to "Zero Hunger," a transformative platform where each plate holds the promise of positive change. With our user-friendly web application, you can play a vital role in tackling food wastage and hunger within our communities. By effortlessly connecting food donors with dedicated volunteers, we're on a mission to ensure that valuable sustenance reaches those who need it most. Join us today and be part of a movement that makes a difference—one meal, one connection at a time.
                    </Typography>
                    <Button variant='contained'>Read more</Button>
                </Grid>

            </Grid>
        </Container>

    )
}

export default Welcome