import { 
    SET_ALL_AUCTIONS, 
    SET_PRODUCTS_BY_AUCTIONID,
    UPDATE_PRODUCT_OFFERPRICE,
    CLEAR_CURRENT_PRODUCT
} from '../actions/auctions';

const initialState = {
    allAuctions: [],
    productsInCurrentAuction: [],
    currentAuctionId: 0
}

const auctionsReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case SET_ALL_AUCTIONS:
            return { ...state, allAuctions: action.auctions }  
        case SET_PRODUCTS_BY_AUCTIONID:
            return { ...state, productsInCurrentAuction: action.products, currentAuctionId: action.auctionId }
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
