import React from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';
import useLocation from '../hooks/useLocation';
import { Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const containerStyle = {
    width: '100%',
    height: '400px'
};

const Map = () => {
    const location = useLocation()
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
    })
    const { foods } = useSelector(state => state.food)

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onLoad = marker => {
        //console.log('marker: ', marker)
    }
    const handleMarkerClick = (food) => {
        handleOpen(true)
    }

    if (!location?.loaded || !isLoaded) {
        return <Loader />
    }

    if (location.error) {
        return <p>{location?.error?.message}</p>
    }
    return (
        <div style={{ padding: '20px' }}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={location.coordinates}
                zoom={14}
            >
                {
                    foods?.map(food => {
                        const position = food.location
                        return (
                            position && <MarkerF
                                key={food._id}
                                onLoad={onLoad}
                                position={position}
                                onClick={() => handleMarkerClick(food)}
                            />
                        )
                    })
                }
            </GoogleMap>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default Map;