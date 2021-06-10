import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Image, ImageBackground, TouchableOpacity, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import * as auctionsActions from '../../store/actions/auctions';

import DefaultText from '../../components/DefaultText';
import DefaultButton from '../../components/DefaultButton';
import DefaultModal from '../../components/DefaultModal';
import OfferSuccessModal from '../../components/OfferSuccessModal';
import Colors from '../../constants/Colors';
import Urls from '../../constants/Urls'


const AuctionItemScreen = props => {

    const dispatch = useDispatch();
    const loggedUser = useSelector(state => state.auth.loggedUser);

    const product = props.navigation.getParam('product');
    const currency = props.navigation.getParam('currency');
    const auctionId = props.navigation.getParam('auctionId');

    const [ inputAmount, setInputAmount ] = useState(0);
    const [ currentPercentage, setCurrentPercentage ] = useState(0);
    const [ openModal, setOpenModal ] = useState(false);
    const [ openOfferSuccessModal, setOpenOfferSuccessModal ] = useState(false);
    const [ errorModalOpen, setErrorModalOpen ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState(false);

    const [ timeCounter, setTimeCounter ] = useState(5);

    // const intervalRef = setInterval(  () => {
    //     if ( timeCounter === 0 ) {
    //         clearInterval(intervalRef);
    //     }
    //     setTimeCounter(timeCounter - 1);
    //     console.log(timeCounter);
    // }, 1000)

    const changePriceByPercentage = (percentage) => {
        setInputAmount( (product.pujaactual + (product.preciobase * percentage)).toFixed(2) );
    }

    const changePriceByKeyPress = (text) => {
        if ( !(inputAmount === '' && text === '0') ) {
            setCurrentPercentage(0);
            setInputAmount(text);
        }
    }

    const createAnOffer = () => {
        let minOfferValue = 0;
        let maxOfferValue = 0;
        let okForOffer = true;
        if ( product.preciobase ) {
            minOfferValue = product.pujaactual + product.preciobase * 0.01;
            maxOfferValue = product.pujaactual + product.preciobase * 0.2;
        }
        if ( inputAmount === '' ) {
            setErrorModalOpen(true);
            setErrorMessage('Introduzca un valor para ofertar');
            okForOffer = false;
        } else if ( product.preciobase && (parseFloat(inputAmount) < minOfferValue || ( maxOfferValue && parseFloat(inputAmount) > maxOfferValue)) ) {
            setErrorModalOpen(true);
            setErrorMessage(`El valor de oferta debe ser entre ${currency} ${minOfferValue.toFixed(2)} y ${currency} ${maxOfferValue.toFixed(2)}`);
            okForOffer = false;
        }
        
        if ( okForOffer ) {
            console.log({
                idProducto: product.identificador,
                idUsuario: loggedUser.identificador,
                Importe: parseFloat(inputAmount)
            })
            fetch(Urls.BASE_API_URL+'/pujar', {
                method: 'POST',
                header: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    idProducto: product.identificador,
                    idUsuario: loggedUser.identificador,
                    Importe: parseFloat(inputAmount)
                })
            })
            .then( res => res.json() )
            .then( data => {
                console.log('Éxito API /pujar Ofertar producto');
                console.log(data)
                if ( data.statusCode && data.statusCode === 204 ) {
                    setOpenModal(true);
                    dispatch({type: auctionsActions.UPDATE_PRODUCT_OFFERPRICE, idProducto: product.identificador, importeActual: parseFloat(inputAmount)});
                    setInputAmount('');
                    setCurrentPercentage(0)
                } else if (  data.statusCode && data.statusCode === 405 && data.importeActual ) {
                    setErrorModalOpen(true);
                    setErrorMessage(`El valor de oferta es inferior a la actual.`);
                    dispatch({type: auctionsActions.UPDATE_PRODUCT_OFFERPRICE, idProducto: product.identificador, importeActual: parseFloat(data.importeActual)});
                } else if ( data.statusCode && data.statusCode === 406 ) {
                    setErrorModalOpen(true);
                    setErrorMessage(`Para ofertar es necesario que configures un medio de pago`);
                } else {
                    setErrorModalOpen(true);
                    setErrorMessage(`Error en ofertar el producto, intentá nuevamente`);
                }
            })
            .catch( err => {
                console.log('Fallo API /pujar Ofertar producto =>', err);
            })
        }

    }

    return (
        <KeyboardAvoidingView 
            style={styles.screen}
            behavior="position"
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss() } style={styles.detailSection}>
                <ScrollView style={styles.scroll}>

                
                <View style={styles.headerRow}>
                    <DefaultText style={styles.title}>Descripción</DefaultText>
                    <DefaultText style={styles.title}>Nº Pieza: {product.identificador}</DefaultText>
                </View>

                <DefaultText style={styles.description}>{ product.esarte ? product.dataarte.historia : product.descripcioncompleta }</DefaultText>

                <View style={styles.especification}>
                    <View style={styles.dataRow}>
                        <DefaultText style={styles.title}>Dueño/a: </DefaultText>
                        <DefaultText style={styles.data}>{product.nombreduenio}</DefaultText>
                    </View>
                    <View style={styles.dataRow}>
                        <DefaultText style={styles.title}>Precio base: </DefaultText>
                        <DefaultText style={styles.data}>{currency} {product.preciobase}</DefaultText>
                    </View>
                    <View style={styles.dataRow}>
                        <DefaultText style={styles.title}>Oferta actual: </DefaultText>
                        <DefaultText style={styles.data}>{currency} { product.pujaactual || 0 }</DefaultText>
                    </View>
                    <View style={styles.dataRow}>
                        <DefaultText style={styles.title}>Oferta mínima: </DefaultText>
                        <DefaultText style={styles.data}>{currency} { (product.pujaminima || 0) + product.pujaactual }</DefaultText>
                    </View>
                </View>

                <View style={styles.inputSection}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="$0"
                        keyboardType="number-pad"
                        value={String(inputAmount)}
                        onChangeText={(text) => changePriceByKeyPress(text)}
                    />
                    <DefaultText style={styles.currencyLabel}>{currency}</DefaultText>
                </View>

                <View style={styles.percentages}>
                    <TouchableOpacity 
                        activeOpacity={0.6} 
                        onPress={() => {
                            changePriceByPercentage(0.01);
                            setCurrentPercentage(1);
                        }}
                        style={currentPercentage >= 1 ? styles.selected : styles.percentage}
                    >
                        <DefaultText style={currentPercentage >= 1 ? styles.selectedNumberText : styles.numberText}>+1%</DefaultText>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        activeOpacity={0.6} 
                        onPress={() => {
                            changePriceByPercentage(0.05);
                            setCurrentPercentage(5);
                        }}
                        style={currentPercentage >= 5 ? styles.selected : styles.percentage}
                    >
                        <DefaultText style={currentPercentage >= 5 ? styles.selectedNumberText : styles.numberText}>+5%</DefaultText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.6} 
                        onPress={() =>{
                            changePriceByPercentage(0.1);
                            setCurrentPercentage(10);
                        }}
                        style={currentPercentage >= 10 ? styles.selected : styles.percentage}
                    >
                        <DefaultText style={currentPercentage >= 10 ? styles.selectedNumberText : styles.numberText}>+10%</DefaultText>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        activeOpacity={0.6} 
                        onPress={() => {
                            changePriceByPercentage(0.2);
                            setCurrentPercentage(20);
                        }}
                        style={currentPercentage === 20 ? styles.selected : styles.percentage}
                    >
                        <DefaultText style={currentPercentage >= 20 ? styles.selectedNumberText : styles.numberText}>+20%</DefaultText>
                    </TouchableOpacity>
                </View>

                <DefaultButton 
                    style={styles.button} 
                    onPress={() => {
                        createAnOffer();
                    }}
                >
                    Ofertar
                </DefaultButton>
                <DefaultModal 
                    title={'Oferta hecha con éxito!'}
                    modalVisible={openModal}
                    options={['Aceptar']}
                    actions={[() => {
                        setOpenModal(false);
                    }]}
                />                
                <DefaultModal 
                    title={errorMessage}
                    modalVisible={errorModalOpen}
                    options={['Aceptar']}
                    actions={[() => {
                        setErrorModalOpen(false);
                    }]}
                />
                <OfferSuccessModal 
                    modalVisible={openOfferSuccessModal}
                    onPress={() => {
                        setOpenOfferSuccessModal(false);
                        props.navigation.goBack();
                    }}
                />
            </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        paddingTop: 170,
        overflow: 'visible'
    },
    // HEADER
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        paddingVertical: 27,
        paddingHorizontal: 17
    },
    headerBackground: {
        width: '100%',
        height: 260,
        backgroundColor: 'rgba(0,0,0,0.6)',
        zIndex: 0
    },
    // MAIN
    detailSection: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
    },
    scroll: {
        height: '100%',
        paddingTop: 37,
        paddingHorizontal: 20,

    },  
    scrollDescription:{
        height: 100
    },    
    especification: {
        justifyContent: 'space-between',
        marginBottom: 50,
        width: '100%'
    },
    dataRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 6
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 36,
        width: '100%'
    },
    title: {
        fontFamily: 'poppins-500',
        fontSize: 15,
        lineHeight: 18
    },
    data: {
        fontFamily: 'poppins-300',
        fontSize: 14,
        lineHeight: 18,
    },
    description: {
        fontFamily: 'poppins-300',
        fontSize: 14,
        lineHeight: 18,
        marginBottom: 36
    },
    inputSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        position: 'relative'
    },
    currencyLabel: {
        position: 'absolute',
        bottom: -15,
        right: 0
    },
    input: {
        borderBottomWidth: 1,
        width: 230,
        fontSize: 28,
        paddingBottom: 5,
        textAlign: 'left'
    },
    percentages: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 230,
        overflow: 'visible',
        marginBottom: 50,
    },
    percentage: {
        width: 55,
        height: 18,
        backgroundColor: '#bbb',
        alignItems: 'center',
        borderRadius: 3
    },
    button: {
        width: 230,
        alignSelf: 'center',
        borderRadius: 20,
        marginBottom: 50
    },
    numberText: {
        color: Colors.WHITE,
        fontSize: 12
    },
    selectedNumberText: {
        // color: '#75b9f7',
        color: Colors.WHITE,
        fontFamily: 'poppins-700',
        fontSize: 12
    },
    selected: {
        width: 55,
        height: 18,
        borderRadius: 3,
        alignItems: 'center',
        // borderColor: '#75b9f7',
        backgroundColor: '#73bcff'
    }
})

AuctionItemScreen.navigationOptions = (navData) => {

    const product = navData.navigation.getParam('product');

    return {
        headerTitle: '',
        headerBackground: () => (
            <ImageBackground
                style={styles.headerBackground}
                source={{ uri: (product.imagenes && product.imagenes.lenght !== 0 ? product.imagenes[0] : 'https://i.etsystatic.com/12182965/r/il/11e980/2001588984/il_570xN.2001588984_qtts.jpg') }}
            >
                  {/* <View style={modalOpened ? styles.overlay : null}>
                </View> */}
            </ImageBackground> 
        ),
    }
}


export default AuctionItemScreen
