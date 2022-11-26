import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate()

    async function registerUser(e) {
        e.preventDefault()
        console.log({ email })
        const userData = {
            email: email
        }
        //call the reegister api to register the user
        const url = `http://localhost:5000/signin`
        let registerreduser = '';
        try {
            registerreduser = await axios.post(url, userData);
        } catch (error) {
            alert(error.response.data.message)
        }

        // alert(registerreduser.data.message);
        localStorage.setItem('user', JSON.stringify(registerreduser.data.user))
        navigate('/welcome')
        console.log(registerreduser);
    }
    return (
        <div className="App">
            <h1>Login</h1>
            <form className='mainForm' style={{ padding: "10px", border: "1px solid black", display: 'flex', flexDirection: "column", gap: "20px" }}>
                <input type="text" name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit" onClick={registerUser}>Submit</button>
            </form>
            <p onClick={() => navigate('/register')}>register</p>
        </div>
    )
}

export default Login
