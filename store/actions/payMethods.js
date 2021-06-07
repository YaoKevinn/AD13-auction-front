export const SET_ALL_PAYMETHODS = 'SET_ALL_PAYMETHODS';

export const BASE_API_URL = 'https://app-tpo.herokuapp.com';

export const fetchAllPayMethods = () => {
    return async dispatch => {
        let resData = [];
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
            method: 'GET',
            heaeder: {
                'Content-Type': 'application/json'
            }
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
            type: SET_ALL_PAYMETHODS, payMethods: resData
        })
    }
}