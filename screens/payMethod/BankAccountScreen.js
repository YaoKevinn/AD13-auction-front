import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Colors from '../../constants/Colors';

const BankAccountScreen = props => {
 
    return (
        <View style={styles.screen}>

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
})

BankAccountScreen.navigationOptions = (navData) => {

    return {
        headerTitle: "Nueva Cuenta",
    }
}

export default BankAccountScreen;
