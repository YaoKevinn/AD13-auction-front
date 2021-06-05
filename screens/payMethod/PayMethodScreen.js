import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/HeaderButton';
import DefaultButton from '../../components/DefaultButton';
import DefaultText from '../../components/DefaultText';
import Divider from '../../components/Divider';
import { Ionicons } from "@expo/vector-icons";
import { Colors } from 'react-native/Libraries/NewAppScreen';

const PayMethodScreen = props => {

    const methodsList = [''];
 
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
            <View style={styles.methodsSection}>
                {
                    methodsList.length === 0 ? (
                        <DefaultText style={styles.noMethodText}>No tenés ningún medio de pago ingresado.</DefaultText>
                    ) : (
                        <>
                            <TouchableOpacity style={styles.payMethod}>
                                <View style={styles.payMethodInfo}>
                                    <View style={styles.status}></View>
                                    <Image style={styles.logo} source={require('../../assets/visa.png')} />
                                    <DefaultText>Tarjeta 1989</DefaultText>
                                </View>
                                <Ionicons style={styles.arrow} name="ios-arrow-forward" size={24} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.payMethod}>
                                <View style={styles.payMethodInfo}>
                                    <View style={styles.status}></View>
                                    <Image style={styles.logo} source={require('../../assets/mastercard.png')} />
                                    <DefaultText>Tarjeta 1989</DefaultText>
                                </View>
                                <Ionicons style={styles.arrow} name="ios-arrow-forward" size={24} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.payMethod}>
                                <View style={styles.payMethodInfo}>
                                    <View style={styles.status}></View>
                                    <Image style={styles.logo} source={require('../../assets/amex.png')} />
                                    <DefaultText>Tarjeta 1989</DefaultText>
                                </View>
                                <Ionicons style={styles.arrow} name="ios-arrow-forward" size={24} />
                            </TouchableOpacity>
                        </>
                    )
                }
            </View>
            <DefaultButton>Volver a la subasta</DefaultButton>
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
        justifyContent: 'flex-start',
        alignItems: 'center',
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
    logo: {
        width: 40,
        height: 20,
        marginHorizontal: 10
    },
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
