import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import DefaultText from '../../components/DefaultText';
import DefaultButton from '../../components/DefaultButton';
import Colors from '../../constants/Colors';

const NewPaymentScreen = props => {
 
    return (
        <View style={styles.screen}>
            <DefaultText style={styles.title}>Elegí un medio de pago: </DefaultText>
            <TouchableOpacity activeOpacity={0.6} style={styles.button}>
                <Ionicons name="ios-card-outline" size={24} color={Colors.WHITE}/>
                <View style={styles.buttonTextSection}>
                    <DefaultText style={styles.buttonText}>Tarjeta de crédito</DefaultText>
                </View>
            </TouchableOpacity>            
            <TouchableOpacity activeOpacity={0.6} style={styles.button}>
                <MaterialIcons name="account-balance" size={24} color={Colors.WHITE} />
                <View style={styles.buttonTextSection}>
                    <DefaultText style={styles.buttonText}>Cuenta bancaria</DefaultText>
                </View>
            </TouchableOpacity>
                <Image 
                    style={styles.image}
                    source={require('../../assets/payment.png')} 
                    resizeMode="contain"
                />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingVertical: 37,
        paddingHorizontal: 30,
        backgroundColor: Colors.WHITE
    },
    title: {
        fontSize: 16,
        marginBottom: 30,
    },
    button: {
        marginBottom: 14,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: Colors.SECONDARY_BLUE,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttonTextSection: {
        flex: 1,
    },
    buttonText: {
        color: Colors.WHITE,
        paddingHorizontal: 17,
        lineHeight: 25,
        fontSize: 17,
        lineHeight: 25,
        textAlign: 'center'
    },
    image: {
        flex: 1,
        width: '100%'
    }
})

NewPaymentScreen.navigationOptions = (navData) => {

    return {
        headerTitle: "Nuevo medio de pago",
    }
}

export default NewPaymentScreen;
