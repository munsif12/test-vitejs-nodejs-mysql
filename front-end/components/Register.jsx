import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate()

    async function registerUser(e) {
        e.preventDefault()
        console.log({ name, email })
        const userData = {
            name: name,
            email: email
        }
        //call the reegister api to register the user
        const url = `http://localhost:5000/register`
        const registerreduser = await axios.post(url, userData);
        if (registerreduser.status !== 200) {
            alert("error")
        }
        navigate('/login')
        // alert(registerreduser.data.message)
        console.log(registerreduser);
    }
    return (
        <div className="App">
            <h1>Regsiter</h1>
            <form className='mainForm' style={{ padding: "10px", border: "1px solid black", display: 'flex', flexDirection: "column", gap: "20px" }}>
                <input type="text" name="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit" onClick={registerUser}>Submit</button>
            </form>
            <p onClick={() => navigate('/login')}>Login</p>
        </div>
    )
}

export default Register