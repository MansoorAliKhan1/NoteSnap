import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
function App() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate=useNavigate()
	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:1337/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email:email,
				password:password,
			}),
		})

		const data = await response.json()

		if (data.user) {
			console.log(data.user)
			localStorage.setItem('token', data.user)
			// alert('Login successful')
			// window.location.href = '/dashboard'
			navigate('/tweets')
			
		} else {
			alert('Please check your username and password')
		}
	}

	return (
		<div>
			{/* <h1>Login</h1> */}
			
			<form className="login" onSubmit={loginUser}>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
				/>
				<br />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				<br />
				<input type="submit" value="Login" />
				<Link to="/register" style={{textDecoration:'none',fontSize:'10px'}} >HaveNoAccount?Register</Link>
			</form>
		</div>
	)
}

export default App