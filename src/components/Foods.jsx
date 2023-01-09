import { Button, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getFoods, setSelectedFood } from '../features/foods/foodSlice'
import SendIcon from '@mui/icons-material/Send';
import Loader from './Loader'

function Foods() {
    const { foods, isLoading } = useSelector(state => state.food)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getFoods())
    }, [dispatch])

    const handleClick = (food) => {
        dispatch(setSelectedFood(food))
        navigate(`/foods/${food._id}`)
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <Grid container spacing={4} sx={{ p: '0 32px' }}>
            {
                foods.map(food => {
                    if (food.status === 'available') {
                        return (
                            <Grid item md={3} key={food._id}>
                                <Paper sx={{ padding: '20px' }}>
                                    <Typography variant='subtitle1'>{food.foodName}</Typography>
                                    <Typography variant='subtitle1'>{food.description}</Typography>
                                    <Typography variant='subtitle1'>{food.area}</Typography>
                                    <Typography variant='subtitle1'>{food.address}</Typography>
                                    <Button
                                        sx={{ mt: '8px' }}
                                        variant='contained'
                                        onClick={() => handleClick(food)}
                                        endIcon={<SendIcon/>}
                                    >
                                        Make Request
                                    </Button>
                                </Paper>
                            </Grid>
                        )
                    } else{
                        return null
                    }
                })
            }
        </Grid>
    )
}

export default Foods