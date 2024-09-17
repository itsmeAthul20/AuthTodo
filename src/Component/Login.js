import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../Config';
import styles from './Login.module.css';

const Login = () => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    const loginfunc = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, user, pass)
            .then(() => {
                console.log("logged in");
                alert("Logged In");
                navigate('/Landing');
            })
            .catch((error) => console.log("failed to log in", error));
    };

    return (
        <div className={styles['login-container']}>
            <div className={styles.Login}>
                <h2>Login</h2>
                <form onSubmit={loginfunc}>
                    <input
                        placeholder="Username"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                    />
                    <input
                        placeholder="Password"
                        type="password"
                        onChange={(e) => setPass(e.target.value)}
                        value={pass}
                    />
                    <button type="submit">Login</button>
                </form>
                <p className={styles.bottom}>Don't have an account? <Link className={styles.link1} to="/signup">Sign Up</Link></p>
            </div>
        </div>
    );
};

export default Login;
