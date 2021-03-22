import { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import { encryptStorage, decryptStorage } from '../helpers/encryptStorage';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [signup, setSignup] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const user = decryptStorage('user');
    const isLoggedIn = user || loggedIn;

    const joinChatta = (e) => {
        e.preventDefault();
        setSignup(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const authObject = {
            'Project-ID': process.env.REACT_APP_PROJECT_ID,
            'User-Name': username,
            'User-Secret': password,
        }
        axios({
            method: 'GET',
            url: 'https://api.chatengine.io/chats',
            headers: authObject,
        })
            .then(() => {
                encryptStorage('user', { username, password });
                setLoggedIn(true);
            })
            .catch((error) => setError('Oops, incorrect credentials.'));
    };

    if(isLoggedIn) return <Redirect to="/" />;;

    if(signup) return <Redirect to="/signup" />

    return (
        <div className='wrapper'>
            <div className='form'>
                <h1 className='title'>Welcome To Chatta</h1>
                <form onSubmit={handleSubmit}>
                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} className='input' placeholder='username' required />
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='input' placeholder='password' required />
                    <div align='center'>
                        <button type='submit' className='button'>
                            <span>Enter Chatta</span>
                        </button>
                    </div>
                    <div align='center'>
                        <button className='button' onClick={joinChatta}>
                            <span>Join Chatta</span>
                        </button>
                    </div>
                    <h2 className='error'>{error}</h2>
                </form>
            </div>
        </div>
    )
}

export default withRouter(LoginForm);
