import { Box, Typography, Stack, Grid, TextField, Button } from '@mui/material'
import React, { useState } from 'react'
import MainLayout from '../layouts/MainLayout'
function FoodDonationScreen() {

    const [foodInfo, setFoodInfo] = useState({})

    const handleInputChange = (e) => {
        const newFoodInfo = { ...foodInfo }
        newFoodInfo[e.target.name] = e.target.value;
        setFoodInfo(newFoodInfo);
    }

    const handleLocationInputChange = (e) => {
        const newFoodInfo = { ...foodInfo }
        newFoodInfo.location = {
            ...foodInfo.location,
            [e.target.name]: Number(e.target.value)
        };
        setFoodInfo(newFoodInfo);
    }

    const handleLocation = () => {
        const getLocation = (position) => {
            const newFoodInfo = { ...foodInfo }
            newFoodInfo.location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            setFoodInfo(newFoodInfo);
        }
        const handleError = (err) => {
            console.log(err)
        }
        navigator.geolocation.getCurrentPosition(getLocation, handleError);
    }

    const handleUpdateProfileInfo = () => {

    }

    return (
        <MainLayout>
            <Grid container direction='column' sx={{ p: '32px' }}>
                <Grid item>
                    <Typography variant='subtitle1' sx={{ border: '1px solid #ddd', borderBottom: 'none', p: '16px' }}>
                        Basic Info
                    </Typography>
                    <Stack rowGap='16px' sx={{ border: '1px solid #ddd', p: '16px' }}>
                        <Grid container>
                            <Grid item md='1'>
                                <Typography variant='subtitle'>Name</Typography>
                            </Grid>
                            <Grid md='11'>
                                <TextField
                                    fullWidth size='small'
                                    variant="outlined"
                                    name='name'
                                    value={foodInfo?.name}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container direction='row' alignItems='center' spacing={4}>
                            <Grid item md='1'>
                                <Typography variant='subtitle'>Phone</Typography>
                            </Grid>
                            <Grid item md='11'>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    size='small'
                                    variant="outlined"
                                    name='phone'
                                    value={foodInfo?.phone}
                                    onChange={handleInputChange} />
                            </Grid>
                        </Grid>
                    </Stack>
                </Grid>
                <Grid item>
                    <Typography
                        variant='subtitle1'
                        sx={{
                            border: '1px solid #ddd',
                            borderBottom: 'none',
                            p: '16px'
                        }}>
                        Food Info
                    </Typography>
                    <Stack rowGap='16px' sx={{ border: '1px solid #ddd', p: '16px' }}>
                        <Grid container>
                            <Grid item md='1'>
                                <Typography variant='subtitle'>Address </Typography>
                            </Grid>
                            <Grid md='11'>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    size='small'
                                    variant="outlined"
                                    onChange={handleInputChange}
                                    name='address'
                                    value={foodInfo?.address}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item md='1'>

                            </Grid>
                            <Grid item md='11'>
                                <Button
                                    onClick={handleLocation}
                                    variant='contained'
                                >
                                    Acces Location
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item md='1'>
                                <Typography variant='subtitle'>Latitude </Typography>
                            </Grid>
                            <Grid md='11'>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    size='small'
                                    name='lat'
                                    variant="outlined"
                                    onChange={handleLocationInputChange}
                                    value={foodInfo?.location?.lat}
                                />
                            </Grid>
                        </Grid>
                        <Grid container direction='row' alignItems='center' spacing={4}>
                            <Grid item md='1'>
                                <Typography variant='subtitle'>Longitude</Typography>
                            </Grid>
                            <Grid item md='11'>
                                <TextField

                                    fullWidth
                                    id="outlined-basic"
                                    size='small'
                                    name='lng'
                                    variant="outlined"
                                    onChange={handleLocationInputChange}
                                    value={foodInfo?.location?.lng}
                                />
                            </Grid>
                        </Grid>
                        <Grid container direction='row' alignItems='center' spacing={4}>
                            <Grid item md='1'>
                                <Typography variant='subtitle'>Full food Description</Typography>
                            </Grid>
                            <Grid item md='11'>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    size='small'
                                    variant="outlined"
                                    name='description'
                                    value={foodInfo?.description}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                        </Grid>
                        <Grid container>
                            <Grid item md='1'> 

                            </Grid>
                            <Grid item>
                                <Grid item md='11'>
                                    <Button
                                        onClick={handleUpdateProfileInfo}
                                        variant='contained'
                                        size='large'
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Stack>
                </Grid>
            </Grid>
        </MainLayout>
    )
}

export default FoodDonationScreen