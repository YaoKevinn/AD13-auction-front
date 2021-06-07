export const SET_ALL_AUCTIONS = 'SET_ALL_AUCTIONS';
export const SET_PRODUCTS_BY_AUCTIONID = 'SET_PRODUCTS_BY_AUCTIONID';

export const BASE_API_URL = 'https://app-tpo.herokuapp.com';

export const fetchAllAuctions = () => {
    return async dispatch => {
        let resData = [];
        const response = await fetch(
            BASE_API_URL+'/subastas', 
            {
                method: 'GET',
                heaeder: {
                    'Content-Type': 'application/json'
                }
            }
        ).then( res => res.json())
        .then( data => {
            resData = data;
        })
        .catch( err => console.log(err));

        dispatch({
            type: SET_ALL_AUCTIONS, auctions: resData
        })
    }
}

export const fetchAllProductsByAuctionId = (subastaId) => {
    return async dispatch => {
        let resData = [];
        const response = await fetch(
            BASE_API_URL+`/productos/${subastaId}`, 
            {
                method: 'GET',
                heaeder: {
                    'Content-Type': 'application/json'
                }
            }
        ).then( res => res.json())
        .then( data => {
            resData = data;
        })
        .catch( err => console.log(err));

        dispatch({
            type: SET_PRODUCTS_BY_AUCTIONID, products: resData
        })
    }
}