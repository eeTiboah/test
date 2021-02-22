import React, {useEffect, useState} from 'react'
import {fetchCompanies} from '../../api'
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react'
import InfoWindowEx from './LocationInfo'
import useCurrentLocation from '../../useCurrentLocation'
import './CompanyLocation.css'
import axios from 'axios'


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
    let price;
    let newCompanies = [];
        
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



    const orderWater = place => {
        setOrderPlace(place)
      };

     const rad = function(x) {
        return x * Math.PI / 180;
      };
      
      const calcDistance = function(p1, p2, p3, p4) {
        const R = 6378137; 
        const dLat = rad(p3 - p1);
        const dLong = rad(p4 - p2);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(rad(p1)) * Math.cos(rad(p3)) *
          Math.sin(dLong / 2) * Math.sin(dLong / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d;
      };

    

    const renderMarker = () => {
        return companies.map(comp => {
            const distance = calcDistance(5.926478,-0.973106,comp.companyInfo.lat,comp.companyInfo.lng)
            if (distance <= 100){
                newCompanies.push(comp)
            }
            const marker = distance <=100 ? (
                <Marker
                key={ comp.id }
                onClick = {onMarkerClick}
                place_={comp}
                name = { comp.name }
                position = {{lat: comp.companyInfo.lat, lng: comp.companyInfo.lng }} />
            )
                :

                <Marker
                key={ comp.id }
                onClick = {onMarkerClick}
                place_={comp}
                name = { comp.name }
                icon = "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                position = {{lat: comp.companyInfo.lat, lng: comp.companyInfo.lng }} />
            return marker
          })
    }

    newCompanies = newCompanies.map(item => {
        return item.quantity.sort((a, b) => b - a)
    })

    const handleSubmit = async (data,price, place) => {
       const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday","Saturday"]
       const day = days[new Date().getDay()]
       const newData = data
       const newPrice = price
       const orderInfo = {
           day,
           data: newData,
           price: newPrice,
           place
       }
       setOrderSummary(order => [...order, orderInfo])
       setUserData(0)
    //    const options = {
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Access-Control-Allow-Origin": "*",
    //         Authorization: 'Basic cGd1YWN0a3o6amVraGFwem4=' },
    //     body: `{"Type":"1","From":"WATRE.IO","To":"233265578245","Content":"Order complete"}`,
    //     json: true}
    //     await axios.post('https://smsc.hubtel.com/v1/messages/send', options).then(res => console.log(res)).catch(err => console.error(err))
    } 

    const returnPrice = (orderPrice,userData) => {
        if (orderPrice && userData){
            let result = (orderPrice * userData).toFixed(2)
            price = result
            return result
        }
        return;
    }

    return (
        <div>
            <div className="map">
            <div className="map_item">
            {userLocation.lat !==0 || userLocation.lng !==0 ? 
            <Map
            google={google}
            style={{height: '60vh', width: '45%', position: 'absolute', left: '30px', top: '50px' }}
            zoom={17}
            initialCenter={{ lat: 5.926478, lng: -0.973106}}
            
            >
                {renderMarker()}
                <Marker 
                    icon = "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
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
                <p>Loading....</p>
            )
            }
            </div>
            <>
            <div className="map_item">
             {
                newCompanies && newCompanies.map(item => {
                    return (
                        <div className='row' key={item.id}>
                            <div className='column'>
                                <div className='blue-column'>
                                {item.name}
                                </div>
                            </div>
                                <div className='column'>
                                <div className='green-column'>
                                {item.quantity}
                                </div>
                            </div>
                        </div>
                    )
                })
             }
                <p>Legend</p>
                    <div className='row'>
                        <div className='column'>
                            <div className='blue-column'>
                            <img src="https://maps.google.com/mapfiles/ms/icons/blue-dot.png" alt="blue location marker" />
                            </div>
                        </div>
                            <div className='column'>
                            <div className='green-column'>
                                User Location
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='column'>
                            <div className='blue-column'>
                            <img src="https://maps.google.com/mapfiles/ms/icons/red-dot.png" alt="red location marker" />
                            </div>
                        </div>
                            <div className='column'>
                            <div className='green-column'>
                                Suppliers in 100m radius
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='column'>
                            <div className='blue-column'>
                            <img src="https://maps.google.com/mapfiles/ms/icons/yellow-dot.png" alt="yellow location marker" />
                            </div>
                        </div>
                            <div className='column'>
                            <div className='green-column'>
                                Suppliers far from user
                            </div>
                        </div>
                    </div>
            </div>
            </>
            </div>
            <div className='order_stuff summary_row'>
                        <div className='summary_column'>
                            <div className='blue-column'>
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
                        <button onClick={() => handleSubmit(userData, price, orderPlace.name)}>
                            Get Water
                        </button>

                    </>
                }   

                {(orderPlace && userData!==0) && <p>{userData} * {orderPlace.unit_price} = {returnPrice(orderPlace.unit_price, userData)}ghs</p>}
                            </div>
                        </div>
                            <div className='summary_column'>
                            <div className='green-column'>
                            <h2>Order Summary</h2>
                        {orderSummary && orderSummary.map((value, index) => {
                            return (
                                <p key={index}>
                            {value.data} litres of water ordered on {value.day} at {value.price}ghs from {value.place}
                                </p>
                            )
                        })}
                            </div>
                        </div>
                    </div>
            
        </div>
    )
}


export default GoogleApiWrapper({
    apiKey:  'AIzaSyDXMchBW8zxbs1kQdwXXNBYKGYO73nksU4'
  })(CompanyLocation);