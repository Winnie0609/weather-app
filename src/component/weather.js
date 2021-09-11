import React, { useState, useEffect } from "react"
import PieChart from "./PieChart"
// import BarChart from "./BarChart"
// import Test from "../Test"

function WeatherCard() {
  const [query, setQuery] = useState('')
  const [isCityExist, setIsCityExist] = useState(true)
  const [isMultiCity, setIsMultiCity] = useState(false)
  const [multiCity, setMultiCity] = useState([])
  const [weatherData, setWeatherData] = useState([])
  const [weatherForecast, setWeatherForecast] = useState([])
 
  const api = `https://www.metaweather.com/api/location`
  
  async function getCity(e) {
    e.preventDefault()
    setWeatherData([])

    let formattedQuery = query.trim()
    setQuery(formattedQuery)
    // console.log(query)

    if(query === "") {
      window.alert('Please Key in a City :)')
    }

    try {
      const searchApi = `${api}/search/?query=${query}`
      const res = await fetch(searchApi)
      const data = await res.json()
      setIsCityExist(true)

      if (data.length === 1) {
        // console.log(data)
        setCityWoied(data[0].woeid)

      } else if (data.length > 1) {
        // console.log(data)
        setMultiCity(data)
        setIsMultiCity(true)
        // console.log('more than 1 city')
        
      } else {
        // console.log('no city found')
        setIsCityExist(false)
      }
    }
    catch(err) {
      console.error(err)
      setQuery('taipei')
      setIsCityExist(false)
    }
  }

  function setCityWoied(woeid) {
    getWeatherData(woeid)
    setIsMultiCity(false)
  }
  
  async function getWeatherData(woeidID) {
    const weatherDataApi = `${api}/${woeidID}`
    if (woeidID) {
      const res = await fetch(weatherDataApi)
      const data = await res.json()
      setWeatherData(data)
      setWeatherForecast(data.consolidated_weather)
      // console.log(data)
      // console.log(data.consolidated_weather)
    }
  } 

  useEffect(() => {
    setCityWoied(2306179)
  },[])

  return (
    <>
      {/* <Test /> */}
      <h1>Weather</h1>
      <form onSubmit = {getCity}>
        <input
          type="text"
          placeholder="check weather"
          name={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button tyoe="submit">Search</button>
      </form>

      {isCityExist ?
        isMultiCity ? 
          <>
            {multiCity.map((city) => (
              <p key={city.woeid} onClick={() => setCityWoied(city.woeid)}>{city.title}</p>
            ))}
          </>
          :
            weatherData.woeid ? 
              <>
                <p>{weatherData.title}</p>
                {weatherForecast.map((day) => (
                  <div key={day.id}>
                    <PieChart value={day.humidity}/>
                    <p>{day.applicable_date}</p>
                    <p>{day.humidity}</p>
                    <p>{day.max_temp}</p>
                    <p>{day.min_temp}</p>
                    <p>{day.weather_state_name}</p>
                    <hr/>
                  </div>
                ))}
              </>
              :
              <>
                Loading...
              </>
        :
        <h1>City not Found</h1>
      }

      {/* <PieChart />
      <BarChart /> */}
    </>
  )
}

export default WeatherCard