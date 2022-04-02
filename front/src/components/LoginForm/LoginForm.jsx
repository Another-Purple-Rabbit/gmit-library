import './LoginForm.css';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginError, eraseError } from '../../store/actions';
import { apiServ } from '../../utils';

const LoginForm = () => {
    const dispatch = useDispatch();
    const loc = useSelector((state) => state.locCollection);
    //const error = useSelector((state) => state.generalAppData.displayError);
    const logField = useRef(null);
    const passField = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${apiServ}/api/users/auth`, {
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({username: logField.current.value, password: passField.current.value})})
        .then(response => response.json())
        .then(data => {
            if (data.sid) { 
                dispatch(eraseError());
                localStorage.setItem('sid', data.sid);
            }
            else {dispatch(loginError(data))}
        })
        .catch(error => console.log(error));
    }

    return (<div className="login_wrapper">
        <form onSubmit={handleSubmit}>
            <div><label htmlFor='login'>{loc.loginLabel}: </label><input ref={logField} name='login' /></div>
            <div><label htmlFor='pass'>{loc.passwordLabel}: </label><input ref={passField} type='password' name='pass' /></div>
            {null && <div className='errWrap'>fdfsd</div>}
            <div><button>{loc.loginButton}</button></div>
        </form>
    </div>);
}

export default LoginForm;