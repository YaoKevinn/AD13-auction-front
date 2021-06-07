import { 
    LOGIN
} from '../actions/auth';
import User from '../../models/User';

const initialState = {
    loggedUser: new User(),
}

const authReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case LOGIN:
            return { loggedUser: action.user }  
        default:
            return state;
    }
}

export default authReducer;