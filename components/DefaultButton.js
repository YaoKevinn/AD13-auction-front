import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

import Colors from '../constants/Colors';
import DefaultText from './DefaultText';

const DefaultButton = (props) => {

    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress} activeOpacity={0.6}>
            <View style={{...styles.button, ...props.style}}>
                <DefaultText style={ props.whiteButton ? styles.whiteBtnText : styles.defaultText}>
                    { props.children }
                </DefaultText>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    button: {
        paddingVertical: 15,
        backgroundColor: Colors.SECONDARY_BLUE,
        alignItems: "center",
    },
    defaultText: {
        color: Colors.WHITE,
        paddingHorizontal: 17,
        lineHeight: 25,
        fontSize: 17,
        lineHeight: 25,
    },
    whiteBtnText: {
        color: Colors.SECONDARY_BLUE,
        paddingHorizontal: 17,
        lineHeight: 25,
        fontSize: 17,
        lineHeight: 25,
    }
})

export default DefaultButton


{/* 
    COMPONENT EXAMPLE
    
    <DefaultModal 
    modalVisible={true}
    title={'Para poder ver u ofertar, tenés que agregar un medio de pago'}
    options={['Cancelar', 'Agregar']}
    actions={[
        () => {console.log('Confirm pressed')},
        () => {console.log('Close pressed')}
    ]}
    /> 
*/}