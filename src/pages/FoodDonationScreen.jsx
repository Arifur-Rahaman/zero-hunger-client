import { Typography, Stack, Grid, TextField, Button, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createFood } from '../features/foods/foodSlice'
function FoodDonationScreen() {
    const { isLoading } = useSelector(state => state.food)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [foodInfo, setFoodInfo] = useState({
        address: '',
        description: '',
        foodName: '',
        area: '',
        location: {
            lat: '',
            lng: '',
        },
    })
    const { address, location, description, area, foodName } = foodInfo

    const handleInputChange = (e) => {
        const newFoodInfo = { ...foodInfo }
        newFoodInfo[e.target.name] = e.target.value;
        setFoodInfo(newFoodInfo);
    }

    const handleSubmit = (e) => {
        dispatch(createFood(foodInfo))
            .unwrap()
            .then(() => {
                toast.success('Food added')
                setFoodInfo({
                    address: '',
                    description: '',
                    foodName: '',
                    area: '',
                    location: {
                        lat: '',
                        lng: '',
                    },
                })
                navigate('/donations')
                
            })
        e.preventDefault()
    }

    //Access Location from user
    const getLocation = (position) => {
        const newFoodInfo = { ...foodInfo }
        newFoodInfo.location = {
            lat: +position.coords.latitude,
            lng: +position.coords.longitude
        };
        setFoodInfo(newFoodInfo);
    }
    const handleError = (err) => {
        toast.error(err)
    }
    const accessLocation = () => {
        console.log('Clicked access location')
        navigator.geolocation.getCurrentPosition(getLocation, handleError);
    }

    return (
        <Grid
            container
            direction='column'
            component='form'
            onSubmit={handleSubmit}
            sx={{ p: '32px' }}>
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
                            <Typography variant='subtitle'>Area </Typography>
                        </Grid>
                        <Grid item md='11'>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                size='small'
                                variant="outlined"
                                onChange={handleInputChange}
                                name='area'
                                value={area}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item md='1'>
                            <Typography variant='subtitle'>Address </Typography>
                        </Grid>
                        <Grid item md='11'>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                size='small'
                                variant="outlined"
                                onChange={handleInputChange}
                                name='address'
                                value={address}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item md='1'>

                        </Grid>
                        <Grid item md='11'>
                            <Button
                                onClick={accessLocation}
                                variant='contained'
                                type="button"
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
                                inputProps={
                                    { readOnly: true, }
                                }
                                onChange={handleInputChange}
                                value={location.lat}
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
                                inputProps={
                                    { readOnly: true, }
                                }
                                value={location.lng}
                            />
                        </Grid>
                    </Grid>
                    <Grid container direction='row' alignItems='center' spacing={4}>
                        <Grid item md='1'>
                            <Typography variant='subtitle'>Food Name</Typography>
                        </Grid>
                        <Grid item md='11'>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                size='small'
                                variant="outlined"
                                name='foodName'
                                value={foodName}
                                onChange={handleInputChange}
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
                                value={description}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item md='1'>

                        </Grid>
                        <Grid item>
                            <Grid item md='11'>
                                {
                                    isLoading
                                        ? <CircularProgress />
                                        : <Button
                                            variant='contained'
                                            size='large'
                                            type="submit"
                                        >
                                            Submit
                                        </Button>
                                }
                            </Grid>
                        </Grid>
                    </Grid>

                </Stack>
            </Grid>
        </Grid>
    )
}

export default FoodDonationScreen