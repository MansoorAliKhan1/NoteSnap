import '../App.css';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
    let hsitory = useNavigate();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function registerUser(event) {
        const response = await fetch('http:localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    name, email, password
                }
            )
        })
        const data = await response.JSON()
    }
        return (
            <>
                <div>
                    <h3>Register</h3>
                    <form onSubmit={registerUser}>
                        <input value={name}
                            onChange={
                                (e) => setName(e.target.value)
                            }
                            type="text"
                            placeholder="Name"></input><br />
                        <input value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email"></input><br />
                        <input value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"></input><br />
                        <button type="submit">Register</button>
                    </form>
                </div>
            </>
        );
    }

    export default Register