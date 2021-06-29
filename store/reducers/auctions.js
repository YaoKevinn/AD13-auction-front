import { 
    SET_ALL_AUCTIONS, 
    SET_PRODUCTS_BY_AUCTIONID,
    UPDATE_PRODUCT_OFFERPRICE,
    CLEAR_CURRENT_PRODUCT,
    SET_USER_AUCTIONS,
    SET_HISTORY_IN_CURRENT_AUCTION
} from '../actions/auctions';

const initialState = {
    allAuctions: [],
    currentAuctionId: 0,
    productsInCurrentAuction: [],
    userAuctions: {},
    historyInCurrentAuction: {},
}

const auctionsReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case SET_ALL_AUCTIONS:
            return { ...state, allAuctions: action.auctions }  
        case SET_PRODUCTS_BY_AUCTIONID:
            return { ...state, productsInCurrentAuction: action.products, currentAuctionId: action.auctionId }
        case SET_USER_AUCTIONS:
            return { ...state, userAuctions: action.userAuctions }
        case SET_HISTORY_IN_CURRENT_AUCTION:
            return { ...state, historyInCurrentAuction: action.historyInCurrentAuction }
        case UPDATE_PRODUCT_OFFERPRICE:
            const newProductsList = [...state.productsInCurrentAuction];
            newProductsList.forEach( product => {
                if ( product.identificador === action.idProducto ) {
                    product.pujaactual = action.importeActual;
                }
            })
            return { ...state, productsInCurrentAuction: newProductsList }
        case CLEAR_CURRENT_PRODUCT:
            return { ...state, currentAuctionId: 0, productsInCurrentAuction: [] }
        default:
            return state;
    }
}

export default auctionsReducer;
