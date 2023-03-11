import { useState, useEffect } from 'react';
import axios from 'axios';
const App = () => {
	const [value, setValue] = useState('');
	const [countries, setCountries] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState(null)
	const [weather, setWeather] = useState(null)
	const [icon, setIcon] = useState(null)
	const [wind, setWind] = useState(null)

	const OPEN_WEATHER_API = '9bff46656e2c3127fa9854fb99e74a0f';

	useEffect(() => {
		// console.log('effect run, countries now', countries)
		if (value) {
			console.log('fetching countries...')
			axios
				.get(`https://restcountries.com/v3.1/all`)
				.then(response => {
					// console.log('respo', response.data.map(maat => maat.name.common))
					setCountries(response.data)
					console.log('...done.')
				})
		}
		// eslint-disable-next-line
	}, [value])


	const handleChange = (event) => {
		setValue(event.target.value)
		setSelectedCountry(null)
	}

	const filteredCountries = value
		? countries.filter((country) =>
		country.name.common.toLowerCase().includes(value.toLowerCase())
		)
		: []

	const getWeather = (maa) => {
		axios
			.get(`https://api.openweathermap.org/data/2.5/weather?q=${maa}&units=metric&appid=${OPEN_WEATHER_API}`)
			.then(response => {
				console.log('taa', response.data)
				setWeather(response.data.main.temp)
				setWind(response.data.wind.speed)
				if (response.data.weather[0].id >= 200 && response.data.weather[0].id < 300) {
					setIcon(`https://openweathermap.org/img/wn/11d@2x.png`)
				}
				else if (response.data.weather[0].id >= 300 && response.data.weather[0].id < 400) {
					setIcon(`https://openweathermap.org/img/wn/09d@2x.png`)

				}
				else if (response.data.weather[0].id >= 500 && response.data.weather[0].id < 600) {
					setIcon(`https://openweathermap.org/img/wn/10d@2x.png`)

				}
				else if (response.data.weather[0].id >= 600 && response.data.weather[0].id < 700) {
					setIcon(`https://openweathermap.org/img/wn/13d@2x.png`)

				}
				else if (response.data.weather[0].id >= 700 && response.data.weather[0].id < 800) {
					setIcon(`https://openweathermap.org/img/wn/50d@2x.png`)

				}
				else if (response.data.weather[0].id >= 800) {
					setIcon(`https://openweathermap.org/img/wn/01d@2x.png`)

				}
				else if (response.data.weather[0].id > 800 && response.data.weather[0].id < 810) {
					setIcon(`https://openweathermap.org/img/wn/02d@2x.png`)
				}
			})
	}

	const showData = (maat) => {
		console.log(maat)
		setSelectedCountry(maat)
		getWeather(maat.capital)
	}

	console.log('hahaha', weather)
	console.log('MAA', selectedCountry)
	// console.log('countries', filteredCountries)
	// console.log('hihi', filteredCountries[0].flags.alt)

	return (
		<div>
			find countries <input value={value} onChange={handleChange} />
			{!selectedCountry ? (
				<div>
				{filteredCountries.length > 10 ? (
					<p>Too many matches, specify another filter</p>
				) : filteredCountries.length === 1 ? (
					<>
					{showData(filteredCountries[0])}
					<div>
						<h2>{filteredCountries[0].name.common}</h2>
						<div>capital {filteredCountries[0].capital}</div>
						<div>area {filteredCountries[0].area}</div>
						<h4>languages:</h4>
						<ul>
							{Object.values(filteredCountries[0].languages).map((kielet => (
								<li key={kielet}>{kielet}</li>
							)))}
						</ul>

						<img
							src={filteredCountries[0].flags.png}
							alt={filteredCountries[0].flags.alt}
							style={{ border: '2px solid'}}
						/>
						<h3>Weather in {filteredCountries[0].capital}</h3>
						<div>temperature {weather} Celcius</div>
						<img src={icon} alt={weather} />
						<div>wind {wind} m/s</div>
					</div>
					</>
				) : (
					filteredCountries.map(maat => (
						<div key={maat.name.common}>
							{maat.name.common}
							<button onClick={() => showData(maat)}>show</button>
						</div>
					))
				)}
			</div>
			) : (
				<div>
				<h2>{selectedCountry.name.common}</h2>
				<div>capital {selectedCountry.capital}</div>
				<div>area {selectedCountry.area}</div>
				<h4>languages:</h4>
				<ul>
					{Object.values(selectedCountry.languages).map((kielet => (
						<li key={kielet}>{kielet}</li>
					)))}
				</ul>

				<img
					src={selectedCountry.flags.png}
					alt={selectedCountry.flags.alt}
					style={{ border: '2px solid'}}
				/>
				<h3>Weather in {selectedCountry.capital}</h3>
				<div>temperature {weather} Celcius</div>
				<img src={icon} alt={weather} />
				<div>wind {wind} m/s</div>
			</div>
			)}

		</div>
	)
}

export default App;
