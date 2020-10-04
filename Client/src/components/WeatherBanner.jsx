import React, { useState, useEffect, useCallback } from 'react'
import styles from './WeatherBanner.module.css'
import axios from 'axios'
import { useInterval } from '../hooks/useInterval'

function WeatherBanner() {
    const [weatherData, setWeatherData] = useState([])
    const [time, setTime] = useState('')
    const [day, setDay] = useState('')
    const [city, setCity] = useState("São Paulo")


    const handleTime = useCallback( () => {
        const weekDay = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"]
        const date = new Date()
        let hour = String(date.getHours())
        let min = String(date.getMinutes())
        if (min.length === 1) {
            min = `0${min}`
        }
        if (hour.length === 1) {
            hour = `0${hour}`
        }

        setDay(weekDay[date.getDay()])
        setTime(`${hour}:${min}`)

    },[])

    useInterval(() => {
        handleTime()
    }, 60000);

    const getCity = async () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
            let url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`
            const { data } = await axios(url)
            setCity(data.city)
        })
    }

    const weatherFetch = useCallback(async (cityName) => {
        try {
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&APPID=e1e6c46a413f8e705380a3b99caacb6e`
            handleTime()
            const { data } = await axios(weatherUrl)
            setWeatherData([data])
        } catch (e) {
            console.log(e)
        }
    }, [handleTime])



    useEffect(() => {
        const fetcher = async () => {
            await getCity()
            await weatherFetch(city)
        }
        fetcher()
    }, [city, weatherFetch])
    return (
        <div>
            <div className={styles.imgContainer}>
                {weatherData.length ?
                    <>
                        <div className={styles.infoContainer}>
                            <h1 className={styles.cityName}>{weatherData[0].name}</h1>
                            <h1 className={styles.timeNow}>{time}</h1>
                            <h3 className={styles.dataInfo}>{day}</h3>

                        </div>
                        <div>
                            <h1 className={styles.weatherStatus}>{weatherData[0].weather[0].description}</h1>
                            <div className={styles.weatherTemp}>
                                <h1>{Math.round(weatherData[0].main.temp)}º</h1>
                                <div className={styles.weatherIcon}><img src={require(`../images/${weatherData[0].weather[0].icon}.png`)} alt="" /></div>
                            </div>
                        </div>
                    </>
                    : ''}
            </div>
        </div>
    )
}

export default WeatherBanner
