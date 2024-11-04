import React, { useState } from 'react'
import './App.css'
import search from "./assets/serachicon.png"
import sunimg from  "./assets/sunicon.png"
import snowicon from "./assets/cloudicon.png"
import humidity from  "./assets/humidityicon.png"
import wind from   "./assets/Wind.png"
import drizimg from  "./assets/drizicon.png"
import rainimg from "./assets/rainicon.png"

const WeatherDetails=({icon,temp,city,
                       country,lat,log,
                      hum,win})=>{
  return(
    <>
    <div className='snow'>
      <img src={icon} alt='snow-img' width="150px"/>
    </div>

    <div className='temp'>{temp}°C</div>

    <div className='city'>{city}</div>

    <div className='country'>{country}</div>

    <div className='cord'>

        <div>
          <span className='lat'>Latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className='log'>longitude</span>
          <span>{log}</span>
        </div>

       </div>

       <div className='data-container'>

          <div className='element'>

            <img src={humidity} alt='Humidity' 
            width="60px" className='humidity'/>

               <div className='data'>

                <div className='Humidity-per'>{hum}%</div>
                <div className='text'>Humidity</div>

               </div>
          </div>

          <div className='element'>

            <img src={wind} alt='Humidity' 
            width="60px" className='wind'/>

               <div className='data'>

                <div className='wind-per'>{win} km/h</div>
                <div className='text'>Wind speed</div>
                
               </div>
          </div>
        </div>

    </>
  )
}


function App() {

  const [Icon,updateSnow]=useState(snowicon)
  const[Temp,updateTemp]=useState(0)
  const[City,updateCity]=useState("chennai")
  const[Country,updateLocation]=useState("In")
  const[Latitude,updateLatitide]=useState(0)
  const[Longitude,updateLogitude]=useState(0)
  const[HumidityIcon,updateHumidity]=useState(0)
  const[WindIcon,updateWind]=useState(0)
  const[text,updateText]=useState("Chennai")

  const[cityNotFound,updatecityNotFound]=useState(false)
  const[loading,updateloading]=useState(false)



  const weatherIconMap={
    "01d":sunimg,
    "01n":sunimg,
    "02d":snowicon,
    "02n":snowicon,
    "03d":drizimg,
    "03n":drizimg,
    "04d":drizimg,
    "04n":drizimg,
    "09d":rainimg,
    "09n":rainimg,
    "10d":rainimg,
    "10n":rainimg,
    "13d":snowicon,
    "13n":snowicon,
  }

  const searchapi=async()=>{
    updateloading(true)
    let api_key="696f0f4d6415a7206511b79133a2e689"
  
let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`
  
  try{
    let res=await fetch(url)
    let data=await res.json()
    
    if (data.cod ==="404"){
      console.error("City not found")
      updatecityNotFound(true)
      updateloading(false)
      return
    }

    updateHumidity(data.main.humidity)
    updateWind(data.wind.speed)
    updateTemp(Math.floor(data.main.temp))
    updateCity(data.name)
    updateLatitide(data.coord.lat)
    updateLogitude(data.coord.lon)
    updateLocation(data.sys.Country)
    const weatherIconCode=data.weather[0].icon
    updateSnow(weatherIconMap[weatherIconCode])
    updatecityNotFound(false)
    }
  catch(error){
    console.error("An error oocured",error.message)
  }
  finally{
       updateloading(false)
  }
}

  const handlecity=(e)=>{
    updateText(e.target.value)
}

const handlekeydown=(e)=>{
        if(e.key==="Enter"){
          searchapi()
        }
}

  return (
    <>
    <div className='container'>

       <div className='input-container'>

          <input type="text" placeholder="enter the city"
           className='cityInput' onChange={handlecity}
           value={text} onKeyDown={handlekeydown}/>

          <div className='Search-icon' 
                onClick={()=>{searchapi()}}>
                  <img src={search} alt='search' width="40px" />
          </div>

       </div>

       <WeatherDetails icon={Icon} temp={Temp} 
           city={City} country={Country} 
           lat={Latitude} log={Longitude} 
           hum={HumidityIcon} win={WindIcon}/>
        
        <p className='copyright'>
              Designed by <span>Vishnu</span>
       </p>

    </div>
    </>
  )
}

export default App

