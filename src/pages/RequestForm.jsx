import { Button, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { makeRequest } from '../features/request/requestSlice'
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import PlaceIcon from '@mui/icons-material/Place';
import Location from '../components/Location'
function RequestForm() {
    const [motivation, setMotivation] = useState('')
    const { selectedFood } = useSelector(state => state.food)
    const {isLoading} = useSelector(state=>state.request)
    const { donor, _id } = selectedFood
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleInputChange = (e) => {
        setMotivation(e.target.value)
    }
    useEffect(() => {
        if (Object.keys(selectedFood).length === 0) {
            navigate('/foods')
        }
    }, [selectedFood, navigate])
    const handleSubmit = (e) => {
        dispatch(makeRequest({ motivation, donor, food: _id }))
            .unwrap()
            .then(() => {
                toast.success('Request sent!')
                navigate('/requests')
            })
            .catch((error) => {
                toast.error(error)
            })
        e.preventDefault()
    }
    return (
        <Container>
            <Grid
                container
                sx={{ p: '0 32px' }}
                component='form'
                onSubmit={handleSubmit}
                spacing={1}
                direction='column'
            >
                <Grid item>
                    <Typography variant='h6'>
                        Food {selectedFood._id}
                    </Typography>
                </Grid>
                <Grid item container alignItems='center' columnGap='4px'>
                    <LunchDiningIcon sx={{ fontSize: '18px' }} />
                    <Typography variant='subtitle1'>
                        {selectedFood.foodName}
                    </Typography>
                </Grid>
                <Grid item container alignItems='center' columnGap='4px'>
                    <PlaceIcon sx={{ fontSize: '18px' }} />
                    <Typography variant='body1'>
                        {selectedFood.area}
                    </Typography>

                </Grid>
                <Grid item>
                    <Typography>{selectedFood.address}</Typography>
                </Grid>
                <Grid item>
                    <Location position={selectedFood.location} />
                </Grid>
                <Grid item sx={{mt:'16px'}}>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        size='small'
                        variant="outlined"
                        onChange={handleInputChange}
                        name='motivation'
                        value={motivation}
                        multiline
                        rows={6}
                        placeholder='What is your motivation'
                    />
                </Grid>
                <Grid item>
                    {
                        isLoading
                        ? <CircularProgress/>
                        : <Button type='submit' variant='contained'>Submit</Button>
                    }
                </Grid>
            </Grid>
        </Container>

    )
}

export default RequestForm