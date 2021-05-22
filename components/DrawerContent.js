import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import DefaultText from './DefaultText';

import Colors from '../constants/Colors';

const DrawerContent = props => {

    return (
        <View style={styles.drawer}>
            <TouchableOpacity 
                onPress={ ()=>{ props.navigation.navigate('Home') } } 
                activeOpacity={0.5}
            >
                <View style={styles.button}>
                    <DefaultText>Home</DefaultText>
                    <DefaultText style={styles.arrow}>{'>'}</DefaultText>
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={ ()=>{ props.navigation.navigate('Profile') } } 
                activeOpacity={0.5}
            >
                <View style={styles.button}>
                    <DefaultText>Mi Perfil</DefaultText>
                    <DefaultText style={styles.arrow}>{'>'}</DefaultText>
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={ ()=>{ props.navigation.navigate('PayMethod') } } 
                activeOpacity={0.5}
            >
                <View style={styles.button}>
                    <DefaultText>Medios de pago</DefaultText>
                    <DefaultText style={styles.arrow}>{'>'}</DefaultText>
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={ ()=>{ props.navigation.navigate('PublishProduct') } } 
                activeOpacity={0.5}
            >
                <View style={styles.button}>
                    <DefaultText>Publicar producto</DefaultText>
                    <DefaultText style={styles.arrow}>{'>'}</DefaultText>
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={ ()=>{ props.navigation.navigate('UserHistory') } } 
                activeOpacity={0.5}
            >
                <View style={styles.button}>
                    <DefaultText>Historial</DefaultText>
                    <DefaultText style={styles.arrow}>{'>'}</DefaultText>
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={ ()=>{ props.navigation.navigate('Login') } } 
                activeOpacity={0.5}
            >
                <View style={styles.button}>
                    <DefaultText>Iniciar sesión</DefaultText>
                    <DefaultText style={styles.arrow}>{'>'}</DefaultText>
                </View>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    drawer: {
        flex: 1,
        paddingTop: '15%'
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 17,
        paddingVertical: 16,
        borderWidth: 1,
        borderColor: Colors.black,
        marginHorizontal: 18,
        marginVertical: 15
    },
    arrow: {
        position: 'absolute',
        bottom: -16,
        right: 0,
        fontSize: 22,
    }
})

export default DrawerContent
