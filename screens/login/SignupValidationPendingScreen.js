import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

import DefaultButton from '../../components/DefaultButton';
import DefaultText from '../../components/DefaultText';

const SignupValidationPendingScreen = () => {

        return (
            <View style={styles.screen}>
                {/* <Ionicons name="ios-mail-outline" size={28} /> */}
                <Text style={styles.mailIcon}>✉</Text>
                <DefaultText style={styles.primaryText}>Estás en proceso de validación de cuenta</DefaultText>
                <DefaultText style={styles.secondaryText}>En cuanto lo hagamos, te enviaremos un mail para que continues con el registro</DefaultText>
                <DefaultButton style={styles.button} onPress={()=>{
                    props.navigation.popToTop();
                }}>
                    Finalizar
                </DefaultButton>
            </View>
        )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mailIcon: {
        fontSize: 25
    },  
    primaryText: {
        fontSize: 23,
        fontFamily: 'poppins-500',
        lineHeight: 34,
        textAlign: 'center',
        marginHorizontal: '10%',
        marginBottom: 63
    },
    secondaryText: {
        fontSize: 17,
        fontFamily: 'poppins-300',
        textAlign: 'center',
        marginHorizontal: '10%',
        marginBottom: 85
    },
    button: {
        width: '100%'
    }
})

SignupValidationPendingScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Validación'
    }
}

export default SignupValidationPendingScreen
