import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity, Image, Animated, ImageBackground, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as authActions from '../../store/actions/auth';

import { Ionicons, MaterialIcons, FontAwesome  } from "@expo/vector-icons";
import DefaultText from '../../components/DefaultText';
import DefaultButton from '../../components/DefaultButton';
import DefaultTextInput from '../../components/DefaultTextInput';
import DefaultModal from '../../components/DefaultModal';
import Colors from '../../constants/Colors';
import FlipCard from 'react-native-flip-card'
import Urls from '../../constants/Urls';
import { useSelector, useDispatch } from 'react-redux';

const BankAccountScreen = props => {

    const isEditing = props.navigation.getParam('isEditing');
    const oldPayMethod = props.navigation.getParam('payMethod');

    const [ flip, setFlip ] = useState(false);

    const [ accountNumberInput, setAccountNumberInput ] = useState(isEditing ? oldPayMethod.numero : '');

    const [ modalOpen, setModalOpen ] = useState(false);
    const [ fetchResult, setFetchResult ] = useState(false);
    const [ modalMessage, setModalMessage ] = useState('');

    const currency = props.navigation.getParam('currency');
    const tipo = props.navigation.getParam('tipo');
    const userId = useSelector(state => state.auth.loggedUser.identificador);
    const dispatch = useDispatch();

    const createNewBankAccount = () => {
        let ok = true;
        if ( accountNumberInput.length === 0 ) {
            setModalOpen(true);
            setModalMessage('Error en agregar nueva cuenta, verificá los datos ingresados antes de continuar');
            ok = false;
        }
        if ( ok ) {
            fetch(Urls.BASE_API_URL+'/MetodosDePago/cuenta', {
                method: 'POST',
                header: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Tipo: tipo,
                    Moneda: currency,
                    Numero: accountNumberInput,
                    IdentificadorUsuario: userId,
                })
            })
            .then( res => res.json() )
            .then( data => {
                console.log('Éxito API /MetodosDePago/cuenta Agregar cuenta');
                console.log(data);
                dispatch({type: authActions.ADD_ACCOUNT_PAYMETHOD, card: {
                    Tipo: tipo,
                    Moneda: currency,
                    Numero: accountNumberInput,
                    IdentificadorUsuario: userId,
                    IdentificadorCuenta: data.identificador,
                }})
                setFetchResult(true);
                setModalOpen(true);
                setModalMessage('Cuenta agregada con éxito!');
            })
            .catch( err => { console.log('Fallo API /MetodosDePago/cuenta Agregar cuenta de credito =>', err) } )
        }
    }

    const editAccount = () => {
        let ok = true;
        if (accountNumberInput.length === 0 ) {
            setModalOpen(true);
            setModalMessage('Error en editar cuenta, verificá el dato ingresados antes de continuar');
            ok = false;
        }
        if ( ok ) {
            fetch(Urls.BASE_API_URL+'/MetodosDePago/ModificarCuenta', {
                method: 'PUT',
                header: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Tipo: tipo,
                    Moneda: currency,
                    Numero: accountNumberInput,
                    IdentificadorCuenta: oldPayMethod.identificador,
                })
            })
            .then( res => res.json() )
            .then( data => {
                console.log('Éxito API /MetodosDePago/ModificarCuenta Editar cuenta');
                console.log(data);
                if ( data.statusCode && data.statusCode === 204 ) {
                    dispatch({type: authActions.EDIT_ACCOUNT_PAYMETHOD, account: {
                        Numero: accountNumberInput,
                        IdentificadorCuenta: oldPayMethod.identificador,
                    }})
                    setFetchResult(true);
                    setModalOpen(true);
                    setModalMessage('Cuenta modificada con éxito!');
                } else {
                    setModalOpen(true);
                    setModalMessage('Error en modificar cuenta, intentá más tarde');
                }
            })
            .catch( err => { console.log('Fallo API /MetodosDePago/ModificarCuenta Editar cuenta de credito =>', err) } )
        }
    }

    
    const assignAsPreferred = () => {
        fetch(Urls.BASE_API_URL+'/MetodosDePago/AgregarPreferido', {
            method: 'PUT',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                idMetodoDePago: oldPayMethod.identificador,
                idUsuario: userId
            })
        })
        .then( res => res.json() )
        .then( data => {
            console.log('Éxito API /MetodosDePago/AgregarPreferido Settear cuenta preferida');
            console.log(data);
            if ( data.statusCode && data.statusCode === 204 ) {
                dispatch({ type: authActions.ASSIGN_PAYMETHOD, idMetodoDePago: oldPayMethod.identificador })
                setFetchResult(true);
                setModalOpen(true);
                setModalMessage('¡Método de pago preferido asignado con éxito!');
            } else {
                setModalOpen(true);
                setModalMessage('Error en asignar cuenta preferida, intentá más tarde');
            }
        })
        .catch( err => { console.log('Fallo API /MetodosDePago/AgregarPreferido Settear cuenta preferida =>', err) } )
    }

    const removePayMethod = () => {
        fetch(Urls.BASE_API_URL+'/MetodosDePago/Eliminar', {
                        method: 'DELETE',
                        header: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            Identificador: oldPayMethod.identificador
                        })
                    })
                    .then( res => res.json() )
                    .then( data => {
                        console.log('Éxito API /MetodosDePago/Eliminar Eliminar cuenta');
                        console.log(data);
                        if ( data.statusCode && data.statusCode === 204 ) {
                            dispatch({ type: authActions.DELETE_PAYMETHOD, identificador: oldPayMethod.identificador })
                            setFetchResult(true);
                            setModalOpen(true);
                            setModalMessage('Cuenta Eliminada con éxito!');
                        } else {
                            setModalOpen(true);
                            setModalMessage('Error en eliminar cuenta, intentá más tarde');
                        }
                    })
                    .catch( err => { console.log('Fallo API /MetodosDePago/Eliminar Eliminar cuenta =>', err) } )
    }

    return (
        <View style={styles.screen}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={styles.touchableScreen}>
            <ScrollView style={styles.scroll}>

            <View style={styles.inputSection}>
                <View style={styles.row}>
                    <View style={styles.rowItem}>
                        <DefaultText>CBU/ALIAS</DefaultText>
                        <DefaultTextInput 
                            placeholder="CBU/ALIAS" 
                            value={accountNumberInput}
                            onChangeText={(text) => setAccountNumberInput(text)}
                            onFocus={() => {
                                setFlip(false);
                            }}
                        />
                    </View>
                </View>
            </View>
            <DefaultButton onPress={ () => {
                isEditing ? editAccount() : createNewBankAccount();
            }}>{ isEditing ? 'Modificar' : 'Agregar' }</DefaultButton>
                        {
                isEditing ? (
                    <>
                        <DefaultButton style={styles.assignBtn} onPress={ () => {
                            assignAsPreferred();
                        }}>
                            Asignar como preferida
                        </DefaultButton>
                        <DefaultButton style={styles.removeBtn} onPress={ () => {
                            removePayMethod();
                        }}>
                            Eliminar
                        </DefaultButton>
                    </>
                ) : null
            }
            <DefaultModal 
                title={modalMessage}
                modalVisible={modalOpen}
                options={['Confirmar']}
                actions={[() => { fetchResult ? props.navigation.popToTop() : setModalOpen(false) }]}
            />
            </ScrollView>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 50,
        paddingHorizontal: 30,
        backgroundColor: Colors.WHITE,
    },
    touchableScreen: {
        flex: 1,
    },
    scroll: {
        flex: 1
    },
    card: {
        width: '100%',
        maxHeight: 200,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        flex: 1
    },
    faceCard: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        overflow: 'hidden'
    },
    backCard: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        overflow: 'hidden'

    },
    inputSection: {
        overflow: 'hidden',
        marginTop: 50,
        marginBottom: 20
    },
    logo: {
        width: 60,
        height: 30,
        position: 'absolute',
        right: 20,
        top: 20
    },
    cardInfo: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 25
    },
    cardName: {
        color: '#787679',
        marginBottom: 8,
        marginTop: 45
    },
    cardNumber: {
        color:'#787679',
        marginBottom: 12,
        letterSpacing: 4,
        fontSize: 19,
    },
    cardExpireDate: {
        color: '#787679'
    },
    cardSecurityCode: {
        alignSelf: 'flex-end',
        letterSpacing: 2,
        position: 'relative',
        bottom: 6,
        left: 14
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 15
    },
    rowItem: {
        flex: 1,
    },
    rowLeftItem: {
        flex: 1,
        marginRight: 5
    },
    rowRightItem: {
        flex: 1,
        marginLeft: 5
    },
    assignBtn: {
        marginVertical: 5,
        backgroundColor: '#CCC',
        flex: 1
    },
    removeBtn: {
        flex: 1,
        backgroundColor: Colors.SECONDARY_RED
    },

})

BankAccountScreen.navigationOptions = (navData) => {

    return {
        headerTitle: "Nueva Cuenta",
    }
}

export default BankAccountScreen;
