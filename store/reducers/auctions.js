import { 
    SET_ALL_AUCTIONS, SET_PRODUCTS_BY_AUCTIONID
} from '../actions/auctions';

const initialState = {
    allAuctions: [],
    currentProductsByAuctionId: []
}

const auctionsReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case SET_ALL_AUCTIONS:
            return { allAuctions: action.auctions }  
        case SET_PRODUCTS_BY_AUCTIONID:
            return { currentProductsByAuctionId: products }
        default:
            return state;
    }
}

export default auctionsReducer;
