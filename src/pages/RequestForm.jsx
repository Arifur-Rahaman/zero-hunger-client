import { Button, Grid, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { makeRequest } from '../features/request/requestSlice'

function RequestForm() {
    const [motivation, setMotivation] = useState('')
    const {selectedFood} = useSelector(state=>state.food)
    const {donor, _id} = selectedFood
    const dispatch = useDispatch()
    const handleInputChange = (e) => {
        setMotivation(e.target.value)
    }
    const handleSubmit = (e) => {
        dispatch(makeRequest({motivation, donor, food: _id}))
        .unwrap()
        .then(()=>{
            toast.success('Request sent!')
        })
        e.preventDefault()
    }
    return (
        <Container>
            <Grid container
                sx={{ p: '0 32px' }}
                component='form'
                onSubmit={handleSubmit}
                spacing={2}
            >
                <Grid item>
                    <Typography variant='h6'>What is you motivation? </Typography>
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        size='small'
                        variant="outlined"
                        onChange={handleInputChange}
                        name='motivation'
                        value={motivation}
                    />
                </Grid>
                <Grid item>
                    <Button type='submit' variant='contained'>Submit</Button>
                </Grid>
            </Grid>
        </Container>

    )
}

export default RequestForm