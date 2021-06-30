import { 
    LOGIN,
    SET_ALL_PAYMETHODS,
    ADD_CARD_PAYMETHOD,
    ADD_ACCOUNT_PAYMETHOD,
    EDIT_CARD_PAYMETHOD,
    EDIT_ACCOUNT_PAYMETHOD,
    DELETE_PAYMETHOD,
    ASSIGN_PAYMETHOD,
    SET_USER_PRODUCT_LIST,
    SIGN_OUT,
    UPDATE_PROFILE
} from '../actions/auth';
import User from '../../models/User';

const initialState = {
    loggedUser: {
        admitido: 'si',
        apellido: 'Yao',
        categoria: 'platino',
        contraseña: 'ofvLC34Frs',
        direccion: null,
        documento: '94744232',
        estado: 'activo',
        fechanacimiento: 'Sat Aug 17 00:00:00 1996',
        foto: null,
        identificador: 64,
        mail: 'kevin85817@gmail.com',
        mediodepagopreferido: 1,
        metododepago: [
            24,
            23,
            1,
            3,
            6,
            22,
            19,
        ],
        nombre: 'Kevin',
        numeroPais: 1,
        recuperarcontrasenia: false,
        subastaasignada: null,
        verificador: 1,
    },
    userLoggedIn: true,
    allPayMethods: [],
    allUserProducts: []
}

const authReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case LOGIN:
            console.log(action.user);
            return { ...state, loggedUser: action.user, userLoggedIn: true }  
        case SET_ALL_PAYMETHODS:
            return { ...state, allPayMethods: action.payMethods }  
        case ADD_CARD_PAYMETHOD: 
            const newPayMethods = [...state.allPayMethods];
            newPayMethods.push({
                cvv: action.card.CodigoSeguridad,
                estado: false,
                moneda: action.card.Moneda,
                numero: action.card.Numero,
                tipo: action.card.Tipo,
                vencimiento: new Date(action.card.FechaDeVencimiento).toISOString(),
                identificador: action.card.identificador,
                nombrecompleto: action.card.NombreCompleto
            })
            const newUser = {...state.loggedUser};
            newUser.metododepago.push(action.card.identificador);
            return { ...state, allPayMethods: newPayMethods, loggedUser: newUser }
        case ADD_ACCOUNT_PAYMETHOD:
            const newPayMethodsList = [...state.allPayMethods];
            newPayMethodsList.push({
                cvv: null,
                estado: false,
                moneda: action.card.Moneda,
                numero: action.card.Numero,
                tipo: action.card.Tipo,
                vencimiento: null,
                identificador: action.card.identificadorCuenta,
            })
            const newUser2 = {...state.loggedUser};
            newUser2.metododepago.push(action.card.identificadorCuenta);
            return { ...state, allPayMethods: newPayMethodsList, loggedUser: newUser2 }
        case EDIT_CARD_PAYMETHOD: 
            const newPayMethodsList2 = [...state.allPayMethods];
            newPayMethodsList2.forEach( method => {
                if ( method.identificador === action.card.IdentificadorTarjeta ) {
                        method.cvv = action.card.CodigoSeguridad,
                        method.estado = false,
                        method.moneda = action.card.Moneda,
                        method.numero = action.card.Numero,
                        method.tipo = action.card.Tipo,
                        method.vencimiento = new Date(action.card.FechaDeVencimiento).toISOString(),
                        method.identificador = action.card.IdentificadorTarjeta,
                        method.nombrecompleto = action.card.NombreCompleto
                }
            })
            return { ...state, allPayMethods: newPayMethodsList2 }
        case DELETE_PAYMETHOD: 
            let newPayMethodsList3 = [...state.allPayMethods];
            const newList = newPayMethodsList3.filter(method => method.identificador !== action.identificador);
            const newUser3 = {...state.loggedUser};
            newUser3.metododepago.filter(method => method.identificador !== action.identificador);
            return { ...state, allPayMethods: newList, loggedUser: newUser3 }
        case ASSIGN_PAYMETHOD: 
            const newUser4 = { ...state.loggedUser };
            newUser4.mediodepagopreferido = action.idMetodoDePago
            return { ...state, loggedUser: newUser4 }
        case EDIT_ACCOUNT_PAYMETHOD: 
            const newPayMethodsList4 = [...state.allPayMethods];
            newPayMethodsList4.forEach( method => {
                if ( method.identificador === action.account.IdentificadorCuenta ) {
                        method.numero = action.account.Numero,
                        method.identificador = action.account.IdentificadorCuenta;
                }
            })
            return { ...state, allPayMethods: newPayMethodsList4 }
        case SET_USER_PRODUCT_LIST: 
            return { ...state, allUserProducts: action.allUserProducts }
        case UPDATE_PROFILE: 
            return { ...state, loggedUser: action.user }
        case SIGN_OUT:
            return { ...state, loggedUser: {}, userLoggedIn: false, allPayMethods: [] }
        default:
            return state;
    }
}

export default authReducer;

// TEST USER
// {
//     admitido: 'si',
//     apellido: 'Yao',
//     categoria: 'platino',
//     contraseña: 'ofvLC34Frs',
//     direccion: null,
//     documento: '94744232',
//     estado: 'activo',
//     fechanacimiento: 'Sat Aug 17 00:00:00 1996',
//     foto: null,
//     identificador: 62,
//     mail: 'kevin85817@gmail.com',
//     mediodepagopreferido: 3,
//     metododepago: Array [
//       1,
//       3,
//       6,
//       22,
//       19,
//     ],
//     nombre: 'Kevin',
//     numeroPais: 1,
//     recuperarcontrasenia: false,
//     subastaasignada: null,
//     verificador: 1,
// }