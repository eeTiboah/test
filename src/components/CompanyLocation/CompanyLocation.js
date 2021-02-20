import React, {useEffect, useState} from 'react'
import {fetchCompanies} from '../../api'
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react'
import InfoWindowEx from './LocationInfo'
import useCurrentLocation from '../../useCurrentLocation'
import './CompanyLocation.css'

const CompanyLocation = ({google}) => {


    const [companies, setCompanies] = useState([])
    const {userLocation} = useCurrentLocation()
    const [userData, setUserData] = useState(0)

    const [orderPlace, setOrderPlace] = useState()
    const [orderSummary,setOrderSummary] = useState([])
    const [info, setInfo] = useState(
        {
            showingInfoWindow: false, 
            activeMarker: {},        
            selectedPlace: {}
        })
        
    useEffect(() => {
        async function getCompanies(){
            const comp = await fetchCompanies()
            setCompanies(comp)
        }
        getCompanies()
    }, [])

    const onMarkerClick = (props, marker, e) => {
        setInfo({
          selectedPlace: props.place_,
          activeMarker: marker,
          showingInfoWindow: true
        });
      };

    //   console.log(userLocation)

    const orderWater = place => {
        setOrderPlace(place)
      };

    function calcDistance (fromLat, fromLng, toLat, toLng) {
        return google.maps.geometry.spherical.computeDistanceBetween(
          new google.maps.LatLng(fromLat, fromLng), new google.maps.LatLng(toLat, toLng));
     }

    const renderMarker = () => {
        return companies.map(comp => {
            const distance = calcDistance(5.926478,-0.973106,comp.companyInfo.lat,comp.companyInfo.lng)
            console.log(distance)
            const marker = 
                <Marker
                key={ comp.id }
                onClick = {onMarkerClick}
                place_={comp}
                name = { comp.name }
                position = {{lat: comp.companyInfo.lat, lng: comp.companyInfo.lng }} />
            return marker
          })
    }

    const handleSubmit = (event) => {
       console.log(event)

    } 
    // console.log(orderSummary)


    const returnPrice = (orderPrice,userData) => {
        if (orderPrice && userData){
            let result = (orderPrice * userData).toFixed(2)
            return result
        }
        return;
    }

    return (
        <div>
            <h1>AQUA TECH</h1>
            {userLocation.lat !==0 || userLocation.lng !==0 ? 
            <Map
            google={google}
            style={{height: '60vh', width: '100%' }}
            zoom={18}
            initialCenter={{ lat: 5.926478, lng: -0.973106}}
            
            >
                {renderMarker()}
                <Marker 
                    icon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                    position={{ lat: 5.926478, lng: -0.973106}}
                />
                <InfoWindowEx
                    marker={info.activeMarker}
                    visible={info.showingInfoWindow}>
                <>
                    <p>
                        {info.selectedPlace.name}
                    </p>
                    <p> Water quantity: {info.selectedPlace.quantity} litres</p>
                    <p>Unit price: {info.selectedPlace.unit_price}ghs per litre</p>
                    <button type="button" onClick={() => orderWater(info.selectedPlace)}>
                        Order Water
                    </button>
                </>
                </InfoWindowEx>
            </Map> 
            : (
                <p>Loading............</p>
            )
            }

            <div  className="form-display">
            {orderPlace &&
                <>
                    <div>
                        <h3>{orderPlace.name} has {orderPlace.quantity} litres of water available</h3>
                        <p>The rate is {orderPlace.unit_price}ghs per litre</p>
                    </div>
                    <p>How many litres of water do you want?</p>
                    <div className="form-info">
                        <div>
                            <label htmlFor="waterValue">Quantity</label>
                            <input type="number" value={userData} id="waterValue" onChange={(e)=>setUserData(e.target.value)} />
                        </div>
                    </div>
                    <button onClick={handleSubmit}>
                        Submit
                    </button>

                </>
            }   

            {(orderPlace && userData!==0) && <p>{userData} * {orderPlace.unit_price} = {returnPrice(orderPlace.unit_price, userData)}ghs</p>}
                
             </div>

             <div className="order-summary">
                 <h2>Order Summary</h2>
                    {orderSummary && orderSummary.map((value, index) => {
                        return (
                            <p key={index}>
                        {userData} litres of water ordered on {value.dayName} at {value.orderTime}
                            </p>
                        )
                    })}
             </div>
            
        </div>
    )
}


export default GoogleApiWrapper({
    apiKey:  'AIzaSyDXMchBW8zxbs1kQdwXXNBYKGYO73nksU4'
  })(CompanyLocation);