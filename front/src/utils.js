export const apiServ = 'http://localhost:9000';

export const checkSession = async (sid) => {
    const sessionIsValid = await fetch(`${apiServ}/api/users/session/check`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({sid})
    })
    .then(response => response.json())
    .then(data => data.sid);
    return sessionIsValid;
}