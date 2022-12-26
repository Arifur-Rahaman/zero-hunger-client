import React, {useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import park_icon from '../assets/park-icon.png'
import Loader from '../components/Loader';


const Map = ({parks}) => {
    
    const [center, setCenter] = useState(null)

    const getCenter = (position) => {
        const newCenter = {}
        newCenter.lat = position.coords.latitude;
        newCenter.lng = position.coords.longitude;
        setCenter(newCenter);
    }
    const handleError = (err) => {
        console.log(err)
    }

    useEffect(() => {
        navigator.geolocation.watchPosition(getCenter, handleError);
    }, [])

    const containerStyle = {
        width: '100%',
        height: '400px'
    };

    const onLoad = marker => {
        //console.log('marker: ', marker)
    }
    const getSelectedPlacedetail = (place) => {
        //Here we ge clicket marker place
    }

    if(!center){
        return <Loader/>
    }
    return (
        <div style={{ padding: '20px' }}>
            <LoadScript
                googleMapsApiKey= {process.env.REACT_APP_GOOGLE_MAP_API_KEY}
                
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={14}
                >
                    { /* Child components, such as markers, info windows, etc. */}
                    <Marker
                        onLoad={onLoad}
                        position={center}

                    />
                    {
                        parks?.map(park => {
                            const position = park.location
                            return (
                                position && <Marker
                                    key={park._id}
                                    onLoad={onLoad}
                                    position={position}
                                    icon={park_icon}
                                    onClick={() => getSelectedPlacedetail(park)}
                                />
                            )
                        })
                    }
                </GoogleMap>
            </LoadScript>

        </div>
    );
};

export default Map;