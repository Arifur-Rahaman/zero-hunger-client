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
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createFood, updateFoodById } from '../features/foods/foodSlice'

import donation_image from '../assets/donation_box.jpg'
import axios from 'axios';
import { getErrorMessage } from '../utils/getErrorMessage';

function FoodForm({ data }) {
    const { isLoading } = useSelector(state => state.food)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { foodId } = useParams()
    const [sameLocation, setSameLocation] = useState(true)
    const [showWarning, setShowWarning] = useState(true)
    const [manualLocation, setManualLocation] = useState('')
    const [isUploading, setIsUploading] = useState(false)
    const [fileData, setFileData] = useState(null)

    const [foodInfo, setFoodInfo] = useState({
        address: '',
        description: '',
        foodName: '',
        imageURL: '',
        area: '',
        quantity: '1',
        location: {
            lat: '',
            lng: '',
        },
    })
    useEffect(() => {
        if (data) {
            setFoodInfo(data)
            setManualLocation(`${data.location.lat}, ${data.location.lng}`)
        }
    }, [data])
    const { address, location, description, area, foodName, quantity, imageURL } = foodInfo

    const handleInputChange = (e) => {
        const newFoodInfo = { ...foodInfo }
        newFoodInfo[e.target.name] = e.target.value;
        setFoodInfo(newFoodInfo);
    }

    const handleManualLocationChange = (e) => {
        setManualLocation(e.target.value)
    }

    const handleUpload = async () => {
        const URL = process.env.REACT_APP_API_URL
        const token = JSON.parse(localStorage.getItem('user')).token
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                authorization: `Bearer ${token}`,
            }
        }
        setIsUploading(true)
        try {
            const { data } = await axios.post(`${URL}/api/upload`, fileData, config)
            setIsUploading(false)
            setFoodInfo((pre) => ({
                ...pre, imageURL: data.secure_url
            }))
            toast.success('Uploaded!')
        } catch (error) {
            setIsUploading(false)
            toast.error(getErrorMessage(error))
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('file', file);
        setFileData(bodyFormData)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let newFoodInfo = { ...foodInfo, location:{...foodInfo.location}}
        if (!sameLocation) {
            const lat_lng = manualLocation.split(',')
            const lat = +lat_lng[0]
            const lng = +lat_lng[1]
            newFoodInfo.location.lat = lat
            newFoodInfo.location.lng = lng
        }
        if (foodId) {
            dispatch(updateFoodById(newFoodInfo))
                .unwrap()
                .then(() => {
                    toast.success('Food Updated')
                    navigate('/donations')

                })
                .catch((error) => {
                    toast.error(error)
                })
        } else {
            dispatch(createFood(newFoodInfo))
                .unwrap()
                .then(() => {
                    toast.success('Food added')
                    navigate('/donations')

                })
                .catch((error) => {
                    toast.error(error)
                })
        }
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
        <Container maxWidth='md' sx={{ mb: '32px' }}>
            <Grid container direction='column'>
                <Grid item container justifyContent='center'>
                    <img
                        src={donation_image}
                        alt='donation_pic'
                        style={{ height: '120px' }}
                    />
                </Grid>
                <Grid
                    item
                >
                    <Paper sx={{ p: '32px', background: '#fbf0e7' }}>
                        <Grid
                            container
                            direction='column'
                            rowGap={'1.5rem'}
                            component='form'
                            onSubmit={handleSubmit}
                            sx={{ width: '100%' }}
                        >
                            <Grid item sx={{ mb: '32px' }}>
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

                            {
                                showWarning && <Grid item>
                                    <Paper variant="outlined" sx={{ p: '1rem', background: '#ffebee' }}>
                                        <Typography sx={{ mb: '0.5rem' }}>
                                            Are you far away from the food location?
                                        </Typography>
                                        <Button
                                            onClick={() => {
                                                setShowWarning(false);
                                                setSameLocation(false);
                                            }
                                            }
                                            variant='outlined'
                                            size='small'
                                            sx={{ mr: '1rem' }}>
                                            yes
                                        </Button>
                                        <Button
                                            variant='outlined'
                                            size='small'
                                            onClick={() => setShowWarning(false)}
                                        >
                                            No
                                        </Button>
                                    </Paper>
                                </Grid>
                            }
                            <>
                                {
                                    sameLocation ? (
                                        <Grid item >
                                            <Button
                                                onClick={accessLocation}
                                                variant='contained'
                                                type="button"
                                                endIcon={<LocationOnIcon />}
                                            >
                                                Acces Location
                                            </Button>
                                        </Grid>
                                    ) : (
                                        <Grid item>
                                            <Paper variant='outlined' sx={{ p: '16px', background: '#ffebee' }}>
                                                <Typography variant='subtitle1' sx={{ fontWeight: '500' }}>
                                                    Go to <a href='https://www.google.com/maps' target="_blank">Google map</a> and copy your location value and paste in the location field.
                                                </Typography>
                                                <Typography variant='subtitle1'>Click <a href='#' target="_blank"> here</a> to get video description.</Typography>
                                            </Paper>
                                        </Grid>
                                    )

                                }
                            </>
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
                            {
                                sameLocation ? (
                                    <>
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
                                    </>
                                ) : (
                                    <Grid item>
                                        <TextField
                                            fullWidth
                                            id="outlined-basic"
                                            name='location'
                                            variant="outlined"
                                            label="Enter location value from google map"
                                            value={manualLocation}
                                            onChange={handleManualLocationChange}
                                        />
                                    </Grid>
                                )
                            }
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
                            <Grid item >
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    variant="outlined"
                                    label="How many people's food"
                                    placeholder="How many people's food"
                                    name='quantity'
                                    type='number'
                                    value={quantity}
                                    inputProps={{ min: 1, pattern: "[0-9]*" }}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item >
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    variant="outlined"
                                    label="image URL"
                                    placeholder="Image URL"
                                    name='imageURL'
                                    value={imageURL}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item>
                                {
                                    isUploading
                                        ? <CircularProgress />
                                        : <TextField
                                            fullWidth
                                            size='small'
                                            type='file'
                                            onChange={handleFileChange}
                                        />
                                }
                            </Grid>
                            <Grid item>
                                <Button variant='contained' size='small' onClick={handleUpload} disabled={isUploading}>Upload</Button>
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

export default FoodForm