import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Welcome() {
    const [userData, setUserData] = React.useState('')
    const [dbUsers, setDbUsers] = React.useState([])
    const navigate = useNavigate()
    console.log(userData)

    async function checkIfUserIsLoggedIn() {
        const logedin = JSON.parse(localStorage.getItem('user'))?.[0]
        if (!logedin) {
            navigate('/login')
        }
        const url = `http://localhost:5000/users`
        let users = '';
        try {
            users = await axios.get(url);
        } catch (error) {
            alert(error.response.data.message)
        }
        setDbUsers(users.data.users)
        setUserData(logedin)
    }

    const Logout = () => {
        localStorage.removeItem('user');
        navigate('/login')
    }

    useEffect(() => {
        checkIfUserIsLoggedIn()
    }, [])
    return (
        <div>

            <button onClick={Logout}>logout</button>
            <h1>Welcome {userData?.name ?? 'Your are not logedin'}</h1>

            {dbUsers.map((user) => {
                return <p style={{ textAlign: "start" }}>{`id:${user.id} ---------- name:${user.name} ---------- email : ${user.email}`}</p>
            })}
        </div>
    )
}

export default Welcome