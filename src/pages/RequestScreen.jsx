import { Button, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import { getRequest } from '../features/request/requestSlice'
function RequestScreen() {
    const { foodId } = useParams()
    const dispatch = useDispatch()
    const { requests, isLoading } = useSelector((state) => state.request)
    useEffect(() => {
        dispatch(getRequest(foodId))
    }, [foodId, dispatch])

    if (isLoading) {
        <Loader />
    }
    if (requests.length === 0) {
        return <Grid container spacing={4} sx={{ p: '0 32px' }}>
            <Grid item>
                <p>No request found</p>
            </Grid>
        </Grid>
    }
    return (
        <Grid container spacing={4} sx={{ p: '0 32px' }}>
            {
                requests.map(request => (
                    <Grid item md={3}>
                        <Paper sx={{ padding: '20px' }}>
                            <Typography variant='subtitle1'>{request?.motivation}</Typography>
                            <Typography variant='subtitle1'>pending</Typography>
                            <Button sx={{ mt: '8px' }} variant='contained'>Confirm</Button>
                        </Paper>
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default RequestScreen