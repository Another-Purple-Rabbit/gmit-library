export const CHECK_SESSION = 'CHECK_SESSION';

export const checkSession = (sid) => {
    return {
        type: CHECK_SESSION,
        payload: sid
    }
}