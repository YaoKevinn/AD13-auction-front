export const LOGIN = 'LOGIN';
export const SET_ALL_PAYMETHODS = 'SET_ALL_PAYMETHODS';
export const ADD_CARD_PAYMETHOD = 'ADD_CARD_PAYMETHOD';
export const ADD_ACCOUNT_PAYMETHOD = 'ADD_ACCOUNT_PAYMETHOD';
export const EDIT_CARD_PAYMETHOD = 'EDIT_CARD_PAYMETHOD';
export const EDIT_ACCOUNT_PAYMETHOD = 'EDIT_ACCOUNT_PAYMETHOD';
export const DELETE_PAYMETHOD = 'DELETE_PAYMETHOD';
export const ASSIGN_PAYMETHOD = 'ASSIGN_PAYMETHOD';
export const SIGN_OUT = 'SIGN_OUT';

export const BASE_API_URL = 'https://app-tpo.herokuapp.com';

export const login = (mail, password, navigation, openErrorModal) => {
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
        .then( res => res.json() )
        .then( data => {
            console.log( 'ÉXITO: API /login: Iniciar sesion' ); 
            console.log( 'Resultado del usuario: \n', data);
            resData = data;
            if ( data.statusCode && data.statusCode === 204 ) {
                openErrorModal('Usuario o contaseña inválida, por favor vuelva a intentar nuevamente.')
            }
            if ( data.identificador ) {
                navigation.replace('HomeScreen')
            }
        })
        .catch( err => {
            console.log( 'FALLO: API /login: Iniciar sesion =>', err);
            openErrorModal('Error en iniciar sesión, volvé a intentar más tarde.');
        });

        dispatch({
            type: LOGIN, user: resData
        })
    }
}

export const fetchAllPayMethods = (idUsuario) => {
    return async dispatch => {
        let resData = [];
        const response = await fetch(BASE_API_URL+`/MetodosDePago/${idUsuario}`, {
            method: 'GET',
            heaeder: {
                'Content-Type': 'application/json'
            }
        })
        .then( res => res.json())
        .then( data => {
            console.log('ÉXITO: API /MetodosDePago/{id} Lista de metodos de pago')
            console.log(data);
            resData = data;
        })
        .catch( err => console.log( 'FALLO: API /MetodosDePago/{id} Lista de metodos de pago =>', err));
        // const resData = await response.json();
        // console.log(resData);
        dispatch({
            type: SET_ALL_PAYMETHODS, payMethods: resData
        })
    }
}