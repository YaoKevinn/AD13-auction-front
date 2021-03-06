export const SET_ALL_AUCTIONS = 'SET_ALL_AUCTIONS';
export const SET_PRODUCTS_BY_AUCTIONID = 'SET_PRODUCTS_BY_AUCTIONID';
export const UPDATE_PRODUCT_OFFERPRICE = 'UPDATE_PRODUCT_OFFERPRICE';
export const CLEAR_CURRENT_PRODUCT = 'CLEAR_CURRENT_PRODUCT';
export const SET_USER_AUCTIONS = 'SET_USER_AUCTIONS';
export const SET_HISTORY_IN_CURRENT_AUCTION = 'SET_HISTORY_IN_CURRENT_AUCTION';

export const BASE_API_URL = 'https://app-tpo.herokuapp.com';

export const fetchAllAuctions = () => {
    return async dispatch => {
        let resData = [];
        const response = await fetch(
            BASE_API_URL+'/subastas', 
            {
                method: 'GET',
                header: {
                    'Content-Type': 'application/json'
                }
            }
        ).then( res => res.json())
        .then( data => {
            console.log('ÉXITO: API /subastas Listas de subastas')
            if ( data.length ) {
                resData = data;
            }
        })
        .catch( err => console.log( 'FALLO: API /subastas Listas de subastas =>', err) );

        dispatch({
            type: SET_ALL_AUCTIONS, auctions: resData
        })
    }
}

export const fetchAllProductsByAuctionId = (subastaId) => {
    return async dispatch => {
        let resData = [];
        const response = await fetch(
            BASE_API_URL+`/productosSubastas/${subastaId}`, 
            {
                method: 'GET',
                heaeder: {
                    'Content-Type': 'application/json'
                }
            }
        ).then( res => res.json())
        .then( data => {
            console.log('ÉXITO: API /productosSubastas/{id} Listas de productos por idSubasta')
            console.log('ProductosSubastas: \n', data);
            resData = data;
            // console.log(data[0].productos);
        })
        .catch( err => console.log( 'FALLO: API /productosSubastas/{id} Listas de productos por idSubasta =>', err));

        dispatch({
            type: SET_PRODUCTS_BY_AUCTIONID, products: resData[0].productos, auctionId: subastaId
        })
    }
}

export const fetchUserAuctions = (userId) => {
    return async dispatch => {
        let resData = {};
        let subastaArray = [];
        const response = await fetch(
            BASE_API_URL+`/historial/${userId}`, 
            {
                method: 'GET',
                heaeder: {
                    'Content-Type': 'application/json'
                }
            }
        ).then( res => res.json())
        .then( data => {
            console.log('ÉXITO: API /historial ', data.length)
            console.log(data);
            resData = data;
        })
        .catch( err => console.log( 'FALLO: API /historial  =>', err) );

        dispatch({
            type: SET_USER_AUCTIONS, userAuctions: resData
        })
    }
}

export const setHistoryInCurrentAuction = (userId, auctionId) => {
    return async dispatch => {
        let resData = [];
        const response = await fetch(
            BASE_API_URL+`/historialSubasta`, 
            {
                method: 'POST',
                body: JSON.stringify({
                    'UserID': userId,
                    'SubastaID': auctionId
                }),
                header: {
                    'Content-Type': 'application/json'
                }
            }
        ).then( res => res.json())
        .then( data => {
            console.log('ÉXITO: API /historialSubasta \n', data)
            if ( !data.length ) {
                resData.push(resData.subastas);
            } else {
                resData = data;
            }
        })
        .catch( err => console.log( 'FALLO: API /historialSubasta =>', err) );

        dispatch({
            type: SET_HISTORY_IN_CURRENT_AUCTION, historyInCurrentAuction: resData
        })
    }
}

// export const updateCurrentOfferPrice = (idSubasta, idProducto, importeActual) => {
//    return dispatch => {
//         dispatch({type: UPDATE_PRODUCT_OFFERPRICE, idSubasta, idProducto, importeActual})
//    }
// }