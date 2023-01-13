import {
    Typography,
    Grid,
    TextField,
    Button,
    CircularProgress,
    Container,
    Paper
} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createFood } from '../features/foods/foodSlice'

import donation_image from '../assets/donation_box.jpg'

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
        <Container sx={{mb: '32px'}}>
            <Grid container direction='column'>
                <Grid item container justifyContent='center'>
                    <img
                        src={donation_image}
                        alt='donation_pic'
                        style={{height:'200px'}}
                    />
                </Grid>
                <Grid
                    item
                >
                    <Paper sx={{ p: '32px' }}>
                        <Grid
                            container
                            direction='column'
                            rowGap={'2rem'}
                            component='form'
                            onSubmit={handleSubmit}
                            sx={{width:'100%'}}
                        >
                            <Grid item sx={{mb: '32px'}}>
                                <Typography
                                    variant='h4'
                                    align='center'
                                    sx={{
                                        borderBottom: '1px solid lightGray',
                                        pb: '2rem',
                                    }}>
                                    Food Donation
                                </Typography>
                            </Grid>
                            <Grid item >
                                <Button
                                    onClick={accessLocation}
                                    variant='contained'
                                    type="button"
                                    endIcon={<LocationOnIcon/>}
                                >
                                    Acces Location
                                </Button>
                            </Grid>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"                                  
                                    variant="outlined"
                                    label='Enter donation area'
                                    placeholder='Donation area'
                                    onChange={handleInputChange}
                                    name='area'
                                    value={area}
                                />
                            </Grid>
                            <Grid item >
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    variant="outlined"
                                    label='Enter donation address'
                                    placeholder='Donation address'
                                    onChange={handleInputChange}
                                    name='address'
                                    value={address}
                                />
                            </Grid>
                            
                            <Grid item>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    name='lat'
                                    label='Click access location button to fill this field by latitude value of your location'
                                    variant="outlined"
                                    inputProps={
                                        { readOnly: true, }
                                    }
                                    onChange={handleInputChange}
                                    value={location.lat}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    name='lng'
                                    variant="outlined"
                                    label="Click access location button to fill this field by longitude value of your location"
                                    inputProps={
                                        { readOnly: true, }
                                    }
                                    value={location.lng}
                                />
                            </Grid>
                            <Grid item >
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    variant="outlined"
                                    label='Enter food name'
                                    placeholder='Enter food name'
                                    name='foodName'
                                    value={foodName}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    id="outlined-basic"
                                    variant="outlined"
                                    label='Enter food description'
                                    name='description'
                                    value={description}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item>
                                <Grid item >
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
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default FoodDonationScreen