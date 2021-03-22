import { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';

const SignUpForm = () => {
    const initialState = {
        username: '',
        secret: '',
        first_name: '',
        last_name: ''
    }
    const [user, setUser] = useState(initialState);
    const [login, setLogin] = useState(false);
    const [signedUp, setSignedUp] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevVal) => {
            return {
                ...prevVal, [name]: value
            }
        });
        setError('');
    }

    const enterChatta = (e) => {
        e.preventDefault();
        setLogin(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const authObject = {
            'Private-Key': process.env.REACT_APP_PRIVATE_KEY,
        }
        axios({
            method: 'POST',
            url: 'https://api.chatengine.io/projects/people/',
            data: user,
            headers: authObject,
        })
            .then(() => {
                setSignedUp(true);
            })
            .catch((error) => setError('Oops, something went wrong.'));
    };

    if(signedUp) return <Redirect to="/login" />;
    if(login) return <Redirect to="/login" />;

    return (
        <div className='wrapper'>
            <div className='form'>
                <h1 className='title'>Welcome To Chatta</h1>
                <form onSubmit={handleSubmit}>
                    <input type='text' name='first_name' value={user.first_name} onChange={handleChange} className='input' placeholder='first name' required />
                    <input type='text' name='last_name' value={user.last_name} onChange={handleChange} className='input' placeholder='last name' required />
                    <input type='text' name='username' value={user.username} onChange={handleChange} className='input' placeholder='username' required />
                    <input type='password' name='secret' value={user.secret} onChange={handleChange} className='input' placeholder='password' required />
                    <div align='center'>
                        <button type='submit' className='button'>
                            <span>Join Chatta</span>
                        </button>
                    </div>
                    <div align='center'>
                        <button className='button' onClick={enterChatta}>
                            <span>Enter Chatta</span>
                        </button>
                    </div>
                    <h2 className='error'>{error}</h2>
                </form>
            </div>
        </div>
    )
}

export default withRouter(SignUpForm);
