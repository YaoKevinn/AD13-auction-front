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

const CreditCardScreen = props => {

    const currency = props.navigation.getParam('currency');
    const tipo = props.navigation.getParam('tipo');
    const isEditing = props.navigation.getParam('isEditing');
    const oldPayMethod = props.navigation.getParam('payMethod');
    
    const userId = useSelector(state => state.auth.loggedUser.identificador);
    const dispatch = useDispatch();

    const getExpiredDate = (date) => {
        const dateObj = new Date(date);
        const monthString = dateObj.getMonth().toString();
        const yearString = dateObj.getFullYear().toString();
        if ( monthString.length === 1 ) {
            return '0' + monthString + '/' + yearString.slice(-2);
        } else {
            return monthString + '/' + yearString.slice(-2);
        }
    }

    const [ flip, setFlip ] = useState(false);

    const [ cardNumberInput, setCardNumberInput ] = useState(isEditing ? oldPayMethod.numero : '');
    const [ nameInput, setNameInput ] = useState(isEditing ? oldPayMethod.nombrecompleto : '');
    const [ expiredDateInput, setExpiredDateInput ] = useState(isEditing ? getExpiredDate(oldPayMethod.vencimiento) : '');
    const [ securityCodeInput, setSecurityCodeInput ] = useState(isEditing ? oldPayMethod.cvv : '');

    const [ cardNumber, setCardNumber ] = useState(isEditing ? oldPayMethod.numero : '****************');
    const [ name, setName ] = useState(isEditing ? oldPayMethod.nombrecompleto : 'Nombre completo');
    const [ expiredDate, setExpiredDate ] = useState(isEditing ? getExpiredDate(oldPayMethod.vencimiento) : '**/**');
    const [ securityCode, setSecurityCode ] = useState(isEditing ? oldPayMethod.cvv : '***');

    const [ modalOpen, setModalOpen ] = useState(false);
    const [ fetchResult, setFetchResult ] = useState(false);
    const [ modalMessage, setModalMessage ] = useState('');

    const handleNameChange = (text) => {
        setNameInput(text);
        setName(text);
    }

    const handleCardNumberChange = (text) => {
        const strLength = text.length;
        setCardNumberInput(text);
        if ( text[0] && text[0] === '3' ) {
            setCardNumber(text+"*".repeat(15 - strLength));
            if ( securityCode === '***' ) {
                setSecurityCode('****');
            }
        } else {
            setCardNumber(text+"*".repeat(16 - strLength));
            if ( securityCode === '****' ) {
                setSecurityCode('***');
            }
        }
    }    
    const handleExpiredDateChange = (text) => {
        const cleanText = text.replace('/', '');
        if ( cleanText.length === 0 ) {
            setExpiredDate('')
            setExpiredDateInput('')
        } else if ( cleanText.length === 1) {
            setExpiredDate(cleanText + "*/**");
            setExpiredDateInput(text);
        } else if ( cleanText.length === 2) {
            setExpiredDate(cleanText + "/**");
            setExpiredDateInput(text);
        } else if ( cleanText.length === 3) {
            setExpiredDate(cleanText.slice(0, 2) + "/" + cleanText.slice(-1) + '*');
            setExpiredDateInput(cleanText.slice(0, 2) + "/" +  cleanText.slice(-1));
        } else if ( cleanText.length === 4) {
            setExpiredDate(cleanText.slice(0, 2) + "/" + cleanText.slice(-2));
            setExpiredDateInput(cleanText.slice(0, 2) + "/" + cleanText.slice(-2));
        }

    }    
    const handleSecurityCodeChange = (text) => {
        const strLength = text.length;
        setSecurityCodeInput(text);
        if ( cardNumber[0] && cardNumber[0] === '3' ) {
            setSecurityCode(text + "*".repeat(4 - strLength));
        } else {
            setSecurityCode(text + "*".repeat(3 - strLength));
        }

    }

    const createNewCard = () => {
        let ok = true;
        if ( cardNumberInput.length < 15 || nameInput === '' || ( cardNumber[0] === '3' && securityCodeInput.length < 4 ) || ( cardNumber[0] !== '3' && securityCodeInput.length < 3 ) || expiredDateInput.length < 5 ) {
            setModalOpen(true);
            setModalMessage('Error en agregar nueva tarjeta, verificá los datos ingresados antes de continuar');
            ok = false;
        }
        if ( ok ) {
            const formatedExpiredDate = '20'+expiredDateInput.slice(-2)+'-'+expiredDateInput.slice(0, 2)+'-01';
            console.log(formatedExpiredDate);
            fetch(Urls.BASE_API_URL+'/MetodosDePago/tarjeta', {
                method: 'POST',
                header: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Tipo: tipo,
                    Moneda: currency,
                    Numero: cardNumberInput,
                    IdentificadorUsuario: userId,
                    FechaDeVencimiento: formatedExpiredDate,
                    CodigoSeguridad: securityCodeInput,
                    NombreCompleto: nameInput
                })
            })
            .then( res => res.json() )
            .then( data => {
                console.log('Éxito API /MetodosDePago/tarjeta Agregar tarjeta');
                console.log(data);
                if ( data.statusCode && data.statusCode === 204 ) {
                    dispatch({type: authActions.ADD_CARD_PAYMETHOD, card: {
                        Tipo: tipo,
                        Moneda: currency,
                        Numero: cardNumberInput,
                        IdentificadorTarjeta: data.identificador,
                        FechaDeVencimiento: formatedExpiredDate,
                        CodigoSeguridad: securityCodeInput,
                        NombreCompleto: nameInput
                    }})
                    setFetchResult(true);
                    setModalOpen(true);
                    setModalMessage('¡Tarjeta agregada con éxito!');
                } else {
                    setModalOpen(true);
                    setModalMessage('Error en agregar tarjeta, intentá más tarde');
                }
            })
            .catch( err => { console.log('Fallo API /MetodosDePago/tarjeta Agregar tarjeta de credito =>', err) } )
        }
    }

    const editCard = () => {
        let ok = true;
        if ( cardNumberInput.length < 15 || nameInput === '' || ( cardNumber[0] === '3' && securityCodeInput.length < 4 ) || ( cardNumber[0] !== '3' && securityCodeInput.length < 3 ) || expiredDateInput.length < 5 ) {
            setModalOpen(true);
            setModalMessage('Error en editar nueva tarjeta, verificá los datos ingresados antes de continuar');
            ok = false;
        }
        if ( ok ) {
            const formatedExpiredDate = '20'+expiredDateInput.slice(-2)+'-'+expiredDateInput.slice(0, 2)+'-01';
            console.log(formatedExpiredDate);
            fetch(Urls.BASE_API_URL+'/MetodosDePago/ModificarTarjeta', {
                method: 'PUT',
                header: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Tipo: tipo,
                    Moneda: currency,
                    Numero: cardNumberInput,
                    IdentificadorTarjeta: oldPayMethod.identificador,
                    FechaDeVencimiento: formatedExpiredDate,
                    CodigoSeguridad: securityCodeInput,
                    NombreCompleto: nameInput
                })
            })
            .then( res => res.json() )
            .then( data => {
                console.log('Éxito API /MetodosDePago/ModificarTarjeta Editar tarjeta');
                console.log(data);
                if ( data.statusCode && data.statusCode === 204 ) {
                    dispatch({type: authActions.EDIT_CARD_PAYMETHOD, card: {
                        Tipo: tipo,
                        Moneda: currency,
                        Numero: cardNumberInput,
                        IdentificadorTarjeta: oldPayMethod.identificador,
                        FechaDeVencimiento: formatedExpiredDate,
                        CodigoSeguridad: securityCodeInput,
                        NombreCompleto: nameInput
                    }})
                    setFetchResult(true);
                    setModalOpen(true);
                    setModalMessage('¡Tarjeta modificada con éxito!');
                } else {
                    setModalOpen(true);
                    setModalMessage('Error en modificar tarjeta, intentá más tarde');
                }
            })
            .catch( err => { console.log('Fallo API /MetodosDePago/ModificarTarjeta Editar tarjeta de credito =>', err) } )
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
            console.log('Éxito API /MetodosDePago/AgregarPreferido Settear tarjeta preferida');
            console.log(data);
            if ( data.statusCode && data.statusCode === 204 ) {
                dispatch({ type: authActions.ASSIGN_PAYMETHOD, idMetodoDePago: oldPayMethod.identificador })
                setFetchResult(true);
                setModalOpen(true);
                setModalMessage('¡Método de pago preferido asignado con éxito!');
            } else {
                setModalOpen(true);
                setModalMessage('Error en asignar tarjeta preferida, intentá más tarde');
            }
        })
        .catch( err => { console.log('Fallo API /MetodosDePago/AgregarPreferido Settear tarjeta preferida =>', err) } )
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
                        console.log('Éxito API /MetodosDePago/Eliminar Eliminar tarjeta');
                        console.log(data);
                        if ( data.statusCode && data.statusCode === 204 ) {
                            dispatch({ type: authActions.DELETE_PAYMETHOD, identificador: oldPayMethod.identificador })
                            setFetchResult(true);
                            setModalOpen(true);
                            setModalMessage('¡Tarjeta Eliminada con éxito!');
                        } else {
                            setModalOpen(true);
                            setModalMessage('Error en eliminar tarjeta, intentá más tarde');
                        }
                    })
                    .catch( err => { console.log('Fallo API /MetodosDePago/Eliminar Eliminar tarjeta de credito =>', err) } )
    }

    return (
        <View style={styles.screen}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={styles.touchableScreen}>
            <ScrollView style={styles.scroll}>
            <FlipCard
                style={styles.card}
                friction={8}
                perspective={0}
                flipHorizontal={true}
                flipVertical={false}
                flip={flip}
            >
                {/* Face Side */}
                <ImageBackground source={require('../../assets/black-creditcards.jpg')} style={styles.faceCard}>
                    {
                        cardNumber[0] === '4' ? (
                            <Image source={require('../../assets/visa.png')} style={styles.logo}/>
                        ) : null
                    }
                    {
                        cardNumber[0] === '5' ? (
                            <Image source={require('../../assets/mastercard.png')} style={styles.logo}/>
                        ) : null
                    }                    
                    {
                        cardNumber[0] === '3' ? (
                            <Image source={require('../../assets/amex.png')} style={styles.logo}/>
                        ) : null
                    }
                    <View style={styles.cardInfo}>
                        <DefaultText style={styles.cardName}>{name}</DefaultText>
                        {
                            cardNumberInput[0] === '3' ? (
                                <DefaultText style={styles.cardNumber}>{cardNumber.slice(0, 4)+' '+cardNumber.slice(4, 10)+' '+cardNumber.slice(-5)}</DefaultText>
                            ) : (
                                <DefaultText style={styles.cardNumber}>{cardNumber.slice(0, 4)+' '+cardNumber.slice(4, 8)+' '+cardNumber.slice(8, 12)+' '+cardNumber.slice(-4)}</DefaultText>
                            )
                        }
                        <DefaultText style={styles.cardExpireDate}>{expiredDate}</DefaultText>
                    </View>
                </ImageBackground>
                {/* Back Side */}
                <View style={styles.backCard}>
                <ImageBackground source={require('../../assets/black-creditcards-back.jpg')} style={styles.faceCard}>
                    <View style={styles.cardInfo}>
                        <DefaultText style={styles.cardSecurityCode}>{securityCode}</DefaultText>
                    </View>
                </ImageBackground>
                </View>
            </FlipCard>
            <View style={styles.inputSection}>
                <View style={styles.row}>
                    <View style={styles.rowItem}>
                        <DefaultText>Nombre completo</DefaultText>
                        <DefaultTextInput 
                            placeholder="Ej: Marira Gomez" 
                            value={nameInput}
                            onChangeText={(text) => handleNameChange(text)}
                            onFocus={() => {
                                setFlip(false);
                            }}
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <View  style={styles.rowItem}>
                        <DefaultText>Número de tarjeta</DefaultText>
                        <DefaultTextInput 
                            placeholder="Ej: 1234 5678 9012 3456" 
                            value={cardNumberInput}
                            onChangeText={(text) => handleCardNumberChange(text)}
                            keyboardType="number-pad"
                            onFocus={() => {
                                setFlip(false);
                            }}
                            maxLength={cardNumberInput[0] === '3' ? 15 : 16}
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.rowLeftItem}>
                        <DefaultText>Vencimiento</DefaultText>
                        <DefaultTextInput 
                            placeholder="Ej: MM/AA" 
                            value={expiredDateInput}
                            onChangeText={(text) => handleExpiredDateChange(text)}
                            keyboardType="number-pad"
                            onFocus={() => {
                                setFlip(false);
                            }}
                        />
                    </View>
                    <View style={styles.rowRightItem}>
                        <DefaultText>Código de seguridad</DefaultText>
                        <DefaultTextInput 
                            placeholder="Ej: 123" 
                            value={securityCodeInput}
                            onChangeText={(text) => handleSecurityCodeChange(text)}
                            keyboardType="number-pad"
                            onFocus={() => {
                                setFlip(true);
                            }}
                            maxLength={cardNumberInput[0] === '3' ? 4 : 3}
                            secureTextEntry={true}
                        />
                    </View>
                </View>
            </View>
            <DefaultButton onPress={ () => {
                isEditing ? editCard() : createNewCard();
            }}>
                { isEditing ? 'Modificar' : 'Agregar' }
            </DefaultButton>
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
        flex: 1,
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
        flex: 2.5,
        overflow: 'hidden',
        marginTop: 220,
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
    btnRow: {
        flexDirection: 'row'
    }

})

CreditCardScreen.navigationOptions = (navData) => {

    return {
        headerTitle: "Nueva Tarjeta",
    }
}

export default CreditCardScreen;
