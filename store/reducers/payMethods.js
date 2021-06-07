import { 
    SET_ALL_PAYMETHODS
} from '../actions/payMethods';

const initialState = {
    allPayMethods: [],
}

const payMethodsReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case SET_ALL_PAYMETHODS:
            return { allPayMethods: action.payMethods }  
        default:
            return state;
    }
}

export default payMethodsReducer;
