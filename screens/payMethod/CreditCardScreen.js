import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity, Image, Animated, ImageBackground, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { Ionicons, MaterialIcons, FontAwesome  } from "@expo/vector-icons";
import DefaultText from '../../components/DefaultText';
import DefaultButton from '../../components/DefaultButton';
import DefaultTextInput from '../../components/DefaultTextInput';
import Colors from '../../constants/Colors';
import FlipCard from 'react-native-flip-card'

const CreditCardScreen = props => {
 
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
            >
                {/* Face Side */}
                <ImageBackground source={require('../../assets/black-creditcards.jpg')} style={styles.faceCard}>
                    <Image source={require('../../assets/amex.png')} style={styles.logo}/>
                    <View style={styles.cardInfo}>
                        <DefaultText style={styles.cardName}>Leandro Brizuela</DefaultText>
                        <DefaultText style={styles.cardNumber}>5412 3456 7891 0123</DefaultText>
                        <DefaultText style={styles.cardExpireDate}>10/21</DefaultText>
                    </View>
                </ImageBackground>
                {/* Back Side */}
                <View style={styles.backCard}>
                <ImageBackground source={require('../../assets/black-creditcards-back.jpg')} style={styles.faceCard}>
                    <View style={styles.cardInfo}>
                        <DefaultText style={styles.cardSecurityCode}>123</DefaultText>
                    </View>
                </ImageBackground>
                </View>
            </FlipCard>
            <View style={styles.inputSection}>
                <View style={styles.row}>
                    <View style={styles.rowItem}>
                        <DefaultText>Nombre completo</DefaultText>
                        <DefaultTextInput placeholder="Ej: Marira Gomez" />
                    </View>
                </View>
                <View style={styles.row}>
                    <View  style={styles.rowItem}>
                        <DefaultText>Número de tarjeta</DefaultText>
                        <DefaultTextInput placeholder="Ej: 1234 5678 9012 3456" />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.rowLeftItem}>
                        <DefaultText>Vencimiento</DefaultText>
                        <DefaultTextInput placeholder="Ej: 10/03" />
                    </View>
                    <View style={styles.rowRightItem}>
                        <DefaultText>Código de seguridad</DefaultText>
                        <DefaultTextInput placeholder="Ej: 123" />
                    </View>
                </View>
            </View>
            <DefaultButton onPress={ () => {
                props.navigation.popToTop();
            }}>Agregar</DefaultButton>
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
        letterSpacing: 6,
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
        left: 8
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

})

CreditCardScreen.navigationOptions = (navData) => {

    return {
        headerTitle: "Nueva Tarjeta",
    }
}

export default CreditCardScreen;
