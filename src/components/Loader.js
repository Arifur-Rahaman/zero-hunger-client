import { Box } from '@mui/material'
import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

function Loader() {
    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}
        >
            <CircularProgress/>
        </Box>
    )
}

export default Loader