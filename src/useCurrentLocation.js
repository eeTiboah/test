import React, {useState, useEffect, useCallback} from 'react'

const useCurrentLocation = () => {
    const [userLocation, setUserLocation] = useState({
        lat:0,
        lng:0
    })

    const handleSuccess = useCallback(async (position) => {
        const { latitude, longitude } = await position.coords;
        setUserLocation({
        ...userLocation,
        lat: latitude,
        lng: longitude
        });
    },[])

    const getPosition = useCallback(() => {
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(handleSuccess, handleError)
        } else {
            alert("Sorry. Geolocation is not supported by the browser")
        }
    },[])

    const handleError = () => {
        if (navigator.permissions) {
        navigator.permissions.query({ name: 'geolocation' }).then(res => {
        if (res.state === 'denied') {
            alert('Enable location permissions for this website in your browser settings.')
        }})
        } else {
            alert('Unable to access your location. Kindly turn location on manually.')
        }
     }


    useEffect(() => {
        getPosition()
    }, [])

    return {userLocation}
}
export default useCurrentLocation