import React, { useState } from 'react';
import { Text, View, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import DefaultModal from './DefaultModal';
import DefaultText from './DefaultText';
import Colors from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons'; 


const DrawerContent = props => {

    const userLoggedIn = useSelector(state => state.auth.userLoggedIn);
    const loggedUser = useSelector(state => state.auth.loggedUser);

    const [ modalOpen, setModalOpen ] = useState(false)

    return (
        <View style={styles.drawer}>
            {
                !userLoggedIn ? (
                    <TouchableOpacity 
                        onPress={ ()=>{ props.navigation.navigate('Login') } } 
                        activeOpacity={0.5}
                    >
                        <View style={{...styles.button, ...styles.loginButton}}>
                            <DefaultText style={styles.loginButtonText}>Iniciar sesión</DefaultText>
                        </View>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.profile}>
                        <FontAwesome name="user-circle-o" size={60} color={Colors.PRIMARY_BLUE} />
                        <DefaultText>{loggedUser.nombre} {loggedUser.apellido}</DefaultText>
                        <DefaultText>{loggedUser.categoria}</DefaultText>
                    </View>
                )
            }
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
                onPress={ ()=>{ 
                    if ( userLoggedIn ) {
                        props.navigation.navigate('PayMethod') 
                    } else {
                        setModalOpen(true);
                    }
                }} 
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
            <DefaultModal 
                title="Para ver tus métodos de pago, necesitás iniciar sesión primero."
                modalVisible={modalOpen}
                options={['Confirmar']}
                actions={[() => {
                    setModalOpen(false);
                }]}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    drawer: {
        flex: 1,
        paddingTop: '15%'
    },
    profile: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100
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
    loginButton: {
        justifyContent: 'center', 
        backgroundColor: Colors.SECONDARY_BLUE,
        borderColor: Colors.SECONDARY_BLUE
    },
    loginButtonText: {
        color: Colors.WHITE
    },
    arrow: {
        position: 'absolute',
        bottom: -16,
        right: 0,
        fontSize: 22,
    }
})

export default DrawerContent
