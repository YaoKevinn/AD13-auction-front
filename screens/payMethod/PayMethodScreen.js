import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';

import HeaderButton from '../../components/HeaderButton';
import DefaultButton from '../../components/DefaultButton';
import DefaultText from '../../components/DefaultText';
import Divider from '../../components/Divider';
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Colors } from 'react-native/Libraries/NewAppScreen';

const PayMethodScreen = props => {

    const userId = useSelector(state => state.auth.loggedUser.identificador);
    const userLoggedIn = useSelector(state => state.auth.loggedUser.identificador);
    const idPreferredPayMethod = useSelector(state => state.auth.loggedUser.mediodepagopreferido);
    const payMethodsList = useSelector(state => state.auth.allPayMethods);
    const dispatch = useDispatch();

    const [ refreshing, setRefreshing ] = useState(false);


    useEffect(() => {
        if ( userLoggedIn ) {
            dispatch(authActions.fetchAllPayMethods(userId))
        }
    }, [dispatch])

    const getCardCompany = (method) => {
        if ( method.tipo === 'credito' || method.tipo === 'debito' ) {
            switch (method.numero[0]) {
                case '4':
                    return 'visa'
                case '5':
                    return 'mastercard'
                case '3':
                    return 'amex'
                default:
                    return 'card';
            }
        } else if ( method.tipo === 'cuenta' ) {
            return 'bank'
        } 
    }

    const getPayMethodType = (method) => {
        switch (method.tipo) {
            case 'cuenta':
                return 'Cuenta'            
            case 'credito':
                return 'Crédito'            
            case 'debito':
                return 'Débito'
            default:
                return ''
        }
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(authActions.fetchAllPayMethods(userId));
        wait(2000).then(() => setRefreshing(false));
      }, []);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    return (
        <View style={styles.screen}>
            <DefaultButton
                onPress={() => {
                    props.navigation.navigate('NewPaymentScreen');
                }}
            >
                Agregar medio de pago
            </DefaultButton>
            <Divider style={styles.divider} />
            <ScrollView 
                style={styles.methodsSection}
                refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    title='actualizando...'
                />
            }
            >
                {
                    payMethodsList.length === 0 ? (
                        <DefaultText style={styles.noMethodText}>No tenés ningún medio de pago ingresado.</DefaultText>
                    ) : (
                        <>
                            {
                                payMethodsList.map( payMethod => {
                                    return (
                                        <TouchableOpacity 
                                            style={styles.payMethod} 
                                            key={payMethod.identificador}
                                            onPress={ () => {
                                                const screen = payMethod.tipo === 'cuenta' ? 'BankAccountScreen' : 'CreditCardScreen';
                                                props.navigation.navigate(screen, {
                                                    payMethod: payMethod,
                                                    isEditing: true,
                                                    tipo: payMethod.tipo,
                                                    currency: payMethod.moneda
                                                })
                                            }}
                                        >
                                            <View style={styles.payMethodInfo}>
                                                <View style={ payMethod.estado ? styles.status : styles.pendingStatus}></View>
                                                {
                                                    getCardCompany(payMethod) === 'visa' ? (
                                                        <Image style={styles.logo} source={require('../../assets/visa.png')} />
                                                    ) : null
                                                }
                                                {
                                                    getCardCompany(payMethod) === 'mastercard' ? (
                                                        <Image style={styles.logo} source={require('../../assets/mastercard.png')} />
                                                    ) : null
                                                }                                                
                                                {
                                                    getCardCompany(payMethod) === 'amex' ? (
                                                        <Image style={styles.logo} source={require('../../assets/amex.png')} />
                                                    ) : null
                                                }                                                
                                                {
                                                    getCardCompany(payMethod) === 'card' ? (
                                                        <Image style={styles.logo} source={require('../../assets/card.png')} />
                                                    ) : null
                                                }
                                                {
                                                    getCardCompany(payMethod) === 'bank' ? (
                                                        <Image style={styles.logo} source={require('../../assets/bank.png')} />
                                                    ) : null
                                                }
                                                <DefaultText>{getPayMethodType(payMethod) + ' '} ...{payMethod.numero.slice(-4)}</DefaultText>
                                                <DefaultText>{ ' - ' + payMethod.moneda }</DefaultText>
                                            </View>
                                            {
                                                idPreferredPayMethod === payMethod.identificador ? (
                                                    <AntDesign style={styles.preferred} name="checkcircle" size={24} color="#07D39B" />
                                                ) : null
                                            }
                                            <Ionicons style={styles.arrow} name="ios-arrow-forward" size={24} />
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </>
                    )
                }
            </ScrollView>
            {/* <DefaultButton onPress={() => {
                props.navigation.navigate('HomeScreen');
            }}>Volver a la subasta</DefaultButton> */}
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 65,
        paddingBottom: 54,
        paddingHorizontal: 30,
        alignItems: 'center',
        width: '100%'
    },
    divider: {
        marginVertical: 46,
        width: 250
    },
    methodsSection: {
        flex: 1,
        width: '100%'
    },
    noMethodText: {
        fontSize: 17,
        lineHeight: 25.5,
        paddingHorizontal: 50,
        textAlign: 'center',
        position: 'relative',
        top: -100
    },
    methodsContainer: {
        flex: 1
    },
    payMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 18,
        borderWidth: 1,
        borderColor: Colors.BLACK,
        marginBottom: 25
    },
    payMethodInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    status: {
        width: 10,
        height: 10,
        backgroundColor: '#90C7A6',
        borderRadius: 10
    },
    pendingStatus: {
        width: 10,
        height: 10,
        backgroundColor: '#E0E5A6',
        borderRadius: 10
    },
    logo: {
        width: 40,
        height: 20,
        marginHorizontal: 10
    },
    preferred: {
        position: 'absolute',
        right: 50
    }
})



PayMethodScreen.navigationOptions = (navData) => {

    return {
        headerTitle: "Medios de pago",
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu" iconName="ios-menu" onPress={ () => {
                    navData.navigation.toggleDrawer();
                }} />
            </HeaderButtons>
        )
    }
}

export default PayMethodScreen;


// "identificador": 1,
// "tipo": "credito",
// "estado": true,
// "moneda": "ARS",
// "numero": 123,
// "vencimiento": "Mon Jan 12 00:00:00 2026",
// "cvv": 123