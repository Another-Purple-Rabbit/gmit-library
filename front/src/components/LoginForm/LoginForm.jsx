import './LoginForm.css';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authUser } from './usersSlice';

const LoginForm = () => {
    const dispatch = useDispatch();    
    const loc = useSelector((state) => state.langCollection.stringCollection);
    const error = useSelector((state) => state.userCollection.error)
    
    let errorString = '';
    switch(error) {
        case 'UIP': errorString = loc.errors.userInvalidPass; break;
        case 'UNF': errorString = loc.errors.userNotFound; break;
        default: break;
    }
    
    const logField = useRef(null);
    const passField = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(authUser({username: logField.current.value, password: passField.current.value}));
    }

    return (<div className="login_wrapper">
        <form onSubmit={handleSubmit}>
            <div><label htmlFor='login'>{loc.loginLabel}: </label><input ref={logField} name='login' /></div>
            <div><label htmlFor='pass'>{loc.passwordLabel}: </label><input ref={passField} type='password' name='pass' /></div>
            {error && <div className='errWrap'>{errorString}</div>}
            <div><button>{loc.loginButton}</button></div>
        </form>
    </div>);
}

export default LoginForm;