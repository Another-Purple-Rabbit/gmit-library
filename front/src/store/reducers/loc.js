import(`../loc/${process.env.REACT_APP_LANG}.js`).then(res => console.log(res.default));

export const locCollection = (state = {
    loginLabel: 'Login',
    passwordLabel: 'Password',
    loginButton: 'Sign in',
    errors: {
        userNotFound: 'User not found!',
        userInvalidPass: 'Invalid password!' 
    },
}, action) => {
    return state;
}