import React, { useState, useEffect } from "react"
import * as dayjs from 'dayjs'
import PieChart from "./PieChart"
import BarChart from "./BarChart"

function WeatherCard() {
  const [query, setQuery] = useState('')
  const [isCityExist, setIsCityExist] = useState(true)
  const [isMultiCity, setIsMultiCity] = useState(false)
  const [multiCity, setMultiCity] = useState([])
  const [weatherData, setWeatherData] = useState([])
  const [weatherForecast, setWeatherForecast] = useState([])
  const [barChartData, setBarChartData] = useState([])
  const [isMinTemp, setIsMinTemp] = useState(true)
 
  const api = `https://www.metaweather.com/api/location`
  
  async function getCity(e) {
    e.preventDefault()
    setWeatherData([])

    let formattedQuery = query.trim()
    setQuery(formattedQuery)

    if(query === "") {
      window.alert('Please Key in a City :)')
    }

    try {
      const searchApi = `${api}/search/?query=${query}`
      const res = await fetch(searchApi)
      const data = await res.json()
      setIsCityExist(true)

      if (data.length === 1) {
        setCityWoied(data[0].woeid)

      } else if (data.length > 1) {
        setMultiCity(data)
        setIsMultiCity(true)
        
      } else {
        setIsCityExist(false)
      }
    }
    catch(err) {
      console.error(err)
      setIsCityExist(false)
    }
  }

  function setCityWoied(woeid) {
    getWeatherData(woeid)
    setIsMultiCity(false)
    setIsMinTemp(true)
    setBarChartData([])
  }
  
  async function getWeatherData(woeidID) {
    const weatherDataApi = `${api}/${woeidID}`
    if (woeidID) {
      const res = await fetch(weatherDataApi)
      const data = await res.json()

      setWeatherData(data)
      setWeatherForecast(data.consolidated_weather)
            
      if(data.consolidated_weather.length > 0) {
        getBarChartData(data.consolidated_weather)
      }
    }
  } 

  function getBarChartData(weatherForecast) {
    const data = weatherForecast.map((day) => {
      return {
        day: dayjs(day.applicable_date).format('ddd'),
        temp: isMinTemp ? day.min_temp.toFixed(0) : day.max_temp.toFixed(0),
        type: isMinTemp ? 'min_temp' : 'max_temp'
      }
    })
    setBarChartData(data)
  }

  useEffect(() => {
    getWeatherData(2306179)
  },[])

  useEffect(() => {
    getBarChartData(weatherForecast)
  },[isMinTemp])

  return (
    <div className="weather">
      <div className="section_one">
        <div className="section_one_header">
        <span>It's</span> 
          {weatherForecast.length > 0 ? 
             <span>{weatherForecast[0].weather_state_name.toLowerCase()}</span> 
             :
             <span>light rain</span>
          }
          <span>in</span> 
          <form onSubmit = {getCity}>
            <input
              type="text"
              spellCheck="false"
              name={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
          <span>.</span>
        </div>
        {weatherData.woeid && 
          <p className="subtitle city">{weatherData.title}, {weatherData.parent.title}</p>
        }
      </div>

      {isCityExist ?
        isMultiCity ? 
          <div className="country_list">
            {multiCity.map((city) => (
              <p key={city.woeid} onClick={() => setCityWoied(city.woeid)}>{city.title}</p>
            ))}
          </div>
          :
            weatherForecast.length > 0 ? 
              <>
                <div>
                  <p className="subtitle">Today, {dayjs(weatherForecast[0].applicable_date).format("MMM DD")}</p>
                  <div className="section_one_content">
                    <img
                      src={`https://www.metaweather.com/static/img/weather/${weatherForecast[0].weather_state_abbr}.svg`}
                      alt={weatherForecast[0].weather_state_name}
                    />
                    <div className="section_one_temp">
                      <p>{weatherForecast[0].the_temp.toFixed(0)}°</p>
                      <p>{weatherForecast[0].min_temp.toFixed(0)} °/ {weatherForecast[0].max_temp.toFixed(0)}°</p>
                    </div>
                    
                    <PieChart value={weatherForecast[0].humidity}  width={'20%'} height={'20%'}/>
                    
                  </div>
                </div>

                <div className="line"/>

                <div className="section_two">
                  <p className="subtitle">Daily</p>

                  <div className="section_two_content">
                    {weatherForecast.slice(1,weatherForecast.length).map((day) => (
                      <div key={day.id} className="section_two_item">
                        <p>{dayjs(day.applicable_date).format("ddd")}</p>
                        <img
                          src={`https://www.metaweather.com/static/img/weather/${day.weather_state_abbr}.svg`}
                          alt={day.weather_state_name}
                        />
                        <p>{day.min_temp.toFixed(0)}° / {day.max_temp.toFixed(0)}°</p>
                        <PieChart value={day.humidity} width={'50%'} height={'50%'}/>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="line"/>

                <div className="section_three">
                  <div className="section_three_content">
                    <p className="subtitle">Temperature of the days</p>
                    <div>
                      <button className={isMinTemp ? "active" : ""} onClick={() => {setIsMinTemp(true)}}><span>min</span></button>
                      <button className={!isMinTemp ? "active" : ""} onClick={() => {setIsMinTemp(false)}}><span>max</span></button>
                    </div>
                  </div>

                  <BarChart data={barChartData}/>

                </div>
              </>
              :
              <div className="loading">
                <p>Loading...</p>
              </div>
        :
        <p className="city-not-found">City not found. Maybe you can find another beautiful city.</p>
      }
    </div>
  )
}

export default WeatherCard