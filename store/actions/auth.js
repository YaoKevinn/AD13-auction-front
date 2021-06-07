export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';

export const BASE_API_URL = 'https://app-tpo.herokuapp.com';

export const login = (mail, password) => {
    return async dispatch => {
        let resData = {};
        const response = await fetch(BASE_API_URL+'/login', {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Mail: mail,
                Password: password
            })
        })
        .then( res => res.json())
        .then( data => {
            console.log(data);
            resData = data;
        })
        .catch( err => console.log(err));
        // const resData = await response.json();
        // console.log(resData);
        dispatch({
            type: LOGIN, user: resData
        })
    }
}

