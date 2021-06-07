import React, { Component } from 'react'
import { ProgressViewIOS } from 'react-native';
import { Text, View, StyleSheet, TextInput } from 'react-native'

import Colors from '../constants/Colors';

const DefaultTextInput = (props) => {

    return (
        <View style={{...styles.inputField, ...props.style}}>
            <TextInput 
                keyboardType={props.keyboardType}
                placeholder={props.placeholder}
                value={props.value}
                onChangeText={props.onChangeText ? props.onChangeText : null}
                onKeyPress={props.onKeyPress ? props.onKeyPress : null}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputField: {
        paddingVertical: 14,
        paddingHorizontal: 17,
        borderWidth: 1,
        borderColor: Colors.BLACK,
        fontSize: 17,
        lineHeight: 25,
    },
})

export default DefaultTextInput