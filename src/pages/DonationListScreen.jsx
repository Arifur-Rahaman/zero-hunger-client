import { Grid, Typography, Paper, Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import { getUserFoods } from '../features/foods/foodSlice'

function DonationListScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, userFoods } = useSelector(state => state.food)
    useEffect(() => {
        dispatch(getUserFoods())
    }, [dispatch])

    const handleClick = (foodId)=>{
        navigate(`/request/${foodId}`)
    }
    
    if(isLoading){
        return <Loader/>
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
                                <Paper sx={{ padding: '20px' }}>
                                    <Typography variant='subtitle1'>{food.foodName}</Typography>
                                    <Typography variant='subtitle1'>{food.description}</Typography>
                                    <Typography variant='subtitle1'>{food.area}</Typography>
                                    <Typography variant='subtitle1'>{food.address}</Typography>
                                    <Button
                                        sx={{ mt: '8px' }}
                                        variant='contained'
                                        onClick={()=>handleClick(food._id)}
                                    >
                                        View Request
                                    </Button>
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