import { Grid, Paper, Typography } from '@mui/material'
import React from 'react'

function Foods() {
    const foods = [
        {
            id: '1',
            name: 'Robiul Alam',
            phone: '0177777777',
            address: '13-B/B second colony Mirpur1',
            description: 'Food for 10 person'
        },
        {
            id: '2',
            name: 'Robiul Alam',
            phone: '0177777777',
            address: '13-B/B second colony Mirpur1',
            description: 'Food for 10 person'
        },
        {
            id: '3',
            name: 'Robiul Alam',
            phone: '0177777777',
            address: '13-B/B second colony Mirpur1',
            description: 'Food for 10 person'
        },
        {
            id: '4',
            name: 'Robiul Alam',
            phone: '0177777777',
            address: '13-B/B second colony Mirpur1',
            description: 'Food for 10 person'
        },
        {
            id: '5',
            name: 'Robiul Alam',
            phone: '0177777777',
            address: '13-B/B second colony Mirpur1',
            description: 'Food for 10 person'
        },
        {
            id: '6',
            name: 'Robiul Alam',
            phone: '0177777777',
            address: '13-B/B second colony Mirpur1',
            description: 'Food for 10 person'
        },
        {
            id: '7',
            name: 'Robiul Alam',
            phone: '0177777777',
            address: '13-B/B second colony Mirpur1',
            description: 'Food for 10 person'
        },
        {
            id: '8',
            name: 'Robiul Alam',
            phone: '0177777777',
            address: '13-B/B second colony Mirpur1',
            description: 'Food for 10 person'
        },
    ]
  return (
    <Grid container spacing={4} sx={{p: '0 32px'}}>
        { 
            foods.map(food=>(
                <Grid item md={3}>
                    <Paper sx={{padding: '20px'}}>
                        <Typography variant='subtitle1'>Donor: {food.name}</Typography>
                        <Typography variant='subtitle1'>Phone: {food.phone}</Typography>
                        <Typography variant='subtitle1'>Address: {food.address}</Typography>
                        <Typography variant='subtitle1'>Description: {food.description}</Typography>
                    </Paper>
                </Grid>
            ))
        }
    </Grid>
  )
}

export default Foods