import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import Tweets from './TweetList'
import TweetsList from './TweetList'
const Dashboard = () => {
	const navigate = useNavigate()
	const [quote, setQuote] = useState('')
	const [tempQuote, setTempQuote] = useState('')

	async function populateQuote() {
		const req = await fetch('http://16.171.26.159:1337/api/quote', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})

		const data = await req.json()
		if (data.status === 'ok') {
			setQuote(data.quote)
		} else {
			alert(data.error)
		}
	}

	useEffect(() => {
		const token = localStorage.getItem('token')
	
		if (token) {
			const user = jwt_decode(token)
			console.log(user);
			if(!user){
			localStorage.removeItem('token')
			navigate('/login')
			} else {
				populateQuote()
			}
		}
	}, [])
	function logOut(){
		localStorage.removeItem('token')
		navigate('/')
	}
	async function updateQuote(event) {
		event.preventDefault()

		const req = await fetch('http://16.171.26.159:1337/api/quote', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': localStorage.getItem('token'),
			},
			body: JSON.stringify({
				quote: tempQuote,
			}),
		})

		const data = await req.json()
		if (data.status === 'ok') {
			setQuote(tempQuote)
			setTempQuote('')
		} else {
			alert(data.error)
		}
	}

	return (
		<div>
			<h1>Your quote: {quote || 'No quote found'}</h1>
			<form onSubmit={updateQuote}>
				<input
					type="text"
					placeholder="Quote"
					value={tempQuote}
					onChange={(e) => setTempQuote(e.target.value)}
				/>
				<input type="submit" value="Update quote" />
			</form>
			<button onClick={logOut} className="home-button">logout</button>
			{/* <Tweets /> */}
		</div>

	)
}

export default Dashboard