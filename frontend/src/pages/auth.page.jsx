import React, { useState, useContext } from 'react';
import AuthContext from '../context/auth-context';
import './auth.styles.css';
import { sendRequest } from '../graphql/request-sender';

const AuthPage = () => {

    const { login } = useContext(AuthContext);

    const userCredentialsInitialValue = {
        email: '',
        password: ''
    }

    const [userCredentials, setUserCredentials] = useState(userCredentialsInitialValue);

    const [isLogin, setIsLogin] = useState(true);

    const handleChange = event => {
        const { id, value } = event.target;
        setUserCredentials({ ...userCredentials, [id]: value })
    }

    const handleSwitchMode = () => {
        setIsLogin(prevLogin => !prevLogin);
    }

    const handleSubmit = async event => {

        try {
            event.preventDefault();
            const { email, password } = userCredentials;

            if (email.trim().length === 0 || password.trim().length === 0) {
                alert('Please enter your credentials!');
                return;
            }

            let queryName = 'login';

            //By default it sends a login request
            let requestBody = {
                query: `#graphql
                    query {
                        login(loginInput: {email:"${email}", password:"${password}"}) {
                        userId
                        token
                        tokenExpiration
                        }
                    }
                `,
            }

            if (!isLogin) {
                queryName = 'createUser';
                //sends a create user request
                requestBody = {
                    query: `#graphql
                        mutation {
                            createUser(userInput: {email:"${email}", password: "${password}"}) {
                                _id
                                email
                                password
                            }
                        } 
                    `
                }
            }

            const res = await sendRequest(requestBody, queryName);
            if (res) {
                if (isLogin) {
                    login(res);
                } else {
                    alert(`User ${res.email} created successfully!`)
                    setIsLogin(true);
                    setUserCredentials(userCredentialsInitialValue);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={userCredentials.email} onChange={handleChange} />
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={userCredentials.password} onChange={handleChange} />
            </div>

            <div className="form-actions">
                <button type="submit">{isLogin ? 'Login' : 'SignUp'}</button>
                <button type="button" onClick={handleSwitchMode}>Switch to {isLogin ? 'SignUp' : 'Login'}</button>
            </div>
        </form>
    );
}

export default AuthPage;