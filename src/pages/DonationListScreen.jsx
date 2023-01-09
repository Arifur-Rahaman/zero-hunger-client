import { Grid, Typography, Paper, Button, Stack} from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Badge from '../components/Badge'
import Loader from '../components/Loader'
import { getUserFoods } from '../features/foods/foodSlice'

function DonationListScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, userFoods } = useSelector(state => state.food)
    useEffect(() => {
        dispatch(getUserFoods())
    }, [dispatch])

    const handleClick = (foodId) => {
        navigate(`/request/${foodId}`)
    }

    if (isLoading) {
        return <Loader />
    }
    return (
        <Grid container sx={{ p: '0 32px' }} direction='column'>
            <Grid item>
                <Typography variant='h4'>
                    My Donations
                </Typography>
            </Grid>
            <Grid item>
                <Grid container spacing={4} sx={{ p: '32px 0' }}>
                    {
                        userFoods.map(food => (
                            <Grid item md={3} key={food._id}>
                                <Paper sx={{
                                    padding: '20px',
                                }}
                                >
                                    <Stack alignItems='flex-start' gap='4px'>
                                        <Typography variant='h6'>{food.foodName}</Typography>
                                        <Typography variant='body1'>{food.description}</Typography>
                                        <Typography variant='body2'>{food.area}</Typography>
                                        <Typography variant='subtitle2'>{food.address}</Typography>
                                        <Typography variant='body2' sx={{ mb: '4px' }}>
                                            <Badge
                                                bg= {food.status==='booked'? 'primary': 'warning'}
                                            >
                                                {food.status}
                                            </Badge>
                                        </Typography>
                                        <Button
                                            sx={{ mt: '8px' }}
                                            variant='contained'
                                            onClick={() => handleClick(food._id)}
                                        >
                                            View Request
                                        </Button>
                                    </Stack>
                                </Paper>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}

export default DonationListScreen