import { Box, Button, Grid, Modal, Paper, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import CallIcon from '@mui/icons-material/Call';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import PlaceIcon from '@mui/icons-material/Place';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Badge from '../components/Badge'
import { getRequestByVolunteer } from '../features/request/requestSlice'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';
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

function RequestListScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { volunteerRequests } = useSelector(state => state.request)
  const [contactInfo, setContactInfo] = useState({})
  const [open, setOpen] = useState(false)
  useEffect(() => {
    dispatch(getRequestByVolunteer())
  }, [dispatch])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleContactView = (request) => {
    const info = {
      name: request.donor.name,
      email: request.donor.email,
      phone: request.donor.phone,
      address: request.donor.address,
    }
    setContactInfo(info)
    handleOpen()
  }

  return (
    <Grid container spacing={4} sx={{ p: '0 32px' }}>
      {
        volunteerRequests.map(request => (
          <Grid item md={3} key={request._id}>
            <Paper>
              <img
                src={request.food.imageURL}
                alt='food'
                style={{ width: '100%', height: '300px', borderRadius: '10px 10px 0 0' }}
              />
              <Stack gap='6px' alignItems='flex-start' sx={{ padding: '16px' }}>
                <Typography variant='h6'>
                  Donated by Mr. {request?.donor?.name}
                </Typography>
                <Stack direction='row' alignItems='center' spacing={0.5}>
                  <LunchDiningIcon sx={{ fontSize: '16px' }} />
                  <Typography variant='subtitle1' sx={{ mr: '4px' }}>
                    {request?.food?.foodName}
                  </Typography>
                </Stack>
                <Stack
                  direction='row'
                  alignItems='center'
                  spacing={0.5}
                >
                  <PlaceIcon sx={{ fontSize: '16px' }} />
                  <Typography variant='subtitle2'>
                    {request?.food?.area}
                  </Typography>

                </Stack>
                <Typography
                  variant='body2'
                  sx={{
                    border: '1px solid gray',
                    p: '2px 4px'
                  }}
                >
                  {request.motivation}
                </Typography>
                <Typography variant='body2'>
                  Updated At {new Date(request.updatedAt).toDateString()}
                </Typography >
                <Typography variant='subtitle2' sx={{ textTransform: 'capitalize', mb: '16px' }}>
                  <Badge bg={request?.status === 'confirmed' ? 'primary' : request?.status === 'denied' ? 'error' : 'warning'}>
                    {request.status}
                  </Badge>
                </Typography>
                <>
                  {
                    request.status === 'confirmed'
                      ? (
                        <Button
                          sx={{ mt: '8px' }}
                          variant='contained'
                          endIcon={<CallIcon />}
                          onClick={() => { handleContactView(request) }}
                        >
                          Contact
                        </Button>
                      ) : (
                        <Stack direction={'row'} columnGap='8px'>
                          <Button
                            variant='contained'
                            endIcon={<EditIcon/>}
                    
                          >
                            Edit
                          </Button>
                          <Button
                            endIcon={<CancelIcon />}
                            color={request.status === 'pending' ? "error" : "primary"}

                            variant='contained'
                            disabled={request.status === 'denied'}
                          >
                            Cancel
                          </Button>
                        </Stack>
                      )
                  }
                </>
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

export default RequestListScreen