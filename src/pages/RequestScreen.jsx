import { Box, Button, Grid, Modal, Paper, Rating, Typography } from '@mui/material'
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import { Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Badge from '../components/Badge'
import Loader from '../components/Loader'
import { confirmRequest, getRequest } from '../features/request/requestSlice'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
};

function RequestScreen() {
    const { foodId } = useParams()
    const dispatch = useDispatch()
    const { requests, isLoading } = useSelector((state) => state.request)
    const [contactInfo, setContactInfo] = useState({})
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        dispatch(getRequest(foodId))
    }, [foodId, dispatch])

    const handleConfirm = (request) => {
        dispatch(confirmRequest(request))
            .unwrap()
            .then(() => {
                toast.success('Confirmed successfully!')
            })
            .catch((error) => {
                toast.error(error)
            })
    }

    const handleContactView = (request) => {
        const info = {
            name: request.volunteer.name,
            email: request.volunteer.email,
            phone: request.volunteer.phone,
            address: request.volunteer.address,
        }
        setContactInfo(info)
        handleOpen()
    }

    if (isLoading) {
        return <Loader />
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
                            <Stack gap='6px' alignItems='flex-start'>
                                {/* Volunteer Profile Start*/}
                                <Stack direction='row' alignItems={'center'} columnGap='16px' sx={{ mb: '8px' }}>
                                    <img
                                        src={request.volunteer.imageURL}
                                        alt='volunteer_img'
                                        style={{
                                            width: '42px',
                                            height: '42px',
                                            borderRadius: '100px'
                                        }}

                                    />
                                    <Box>
                                        <Typography variant='h6'>
                                            Mr. {request?.volunteer?.name}
                                        </Typography>
                                        <Stack direction='row' columnGap={'8px'}>
                                            <Rating name="read-only" size='small' value={4} readOnly />
                                            <Typography>5 food served</Typography>
                                        </Stack>

                                    </Box>
                                </Stack>
                                <Typography>
                                    Updated at {new Date(request.updatedAt).toDateString()}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    sx={{ mb: '8px' }}
                                >
                                    <Badge
                                        bg={request?.status === 'confirmed' ? 'primary' : 'warning'}
                                    >
                                        {request?.status}
                                    </Badge>
                                </Typography>
                                <Box sx={{border:'1px solid #ccc'}}>
                                    <Typography variant='body1'>
                                        {request?.motivation}
                                    </Typography>
                                </Box>
                                {
                                    request.status === 'confirmed'
                                        ? <Button
                                            variant='contained'
                                            endIcon={<CallIcon />}
                                            onClick={() => { handleContactView(request) }}
                                        >
                                            Contact Info
                                        </Button>
                                        : <Button
                                            onClick={() => handleConfirm(request)}
                                            sx={{ mt: '8px' }}
                                            variant='contained'
                                            disabled={request.status === 'denied'}
                                        >
                                            Confirm
                                        </Button>
                                }

                            </Stack>
                        </Paper>
                    </Grid>
                ))
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Paper sx={{ padding: '20px' }}>
                        <Stack gap='8px'>
                            <Typography variant='h6'>Mr. {contactInfo.name}</Typography>
                            <Stack direction='row' alignItems='center' columnGap='8px'>
                                <EmailIcon sx={{ fontSize: '18px' }} />
                                <Typography variant='subtitle1'>{contactInfo.email}</Typography>
                            </Stack>
                            <Stack direction='row'>
                                <CallIcon />
                                <Typography>{contactInfo.phone}</Typography>
                            </Stack>
                            <Stack direction='row'>
                                <LocationOnIcon />
                                <Typography>{contactInfo.address}</Typography>
                            </Stack>
                            <Button variant='contained' onClick={handleClose}>Close</Button>
                        </Stack>
                    </Paper>
                </Box>
            </Modal>
        </Grid>
    )
}

export default RequestScreen