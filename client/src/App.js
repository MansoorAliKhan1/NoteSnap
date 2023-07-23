import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import TweetsList from './pages/TweetList'
import Test from './pages/Test'

const App = () => {
	return (
		<div>

			<BrowserRouter>
            <Routes>
				<Route path="/login" exact element={<Login/>} />
				<Route path="/register" exact element={<Register/>} />
				<Route path="/dashboard" exact element={<Dashboard/>} />
                <Route path="/tweets" exact element={<TweetsList/>} />
                <Route path="/" exact element={<Home/>} />
				<Route path="/test" exact element={<Test/>}/>
                </Routes>
			</BrowserRouter>
		</div>
	)
}

export default App