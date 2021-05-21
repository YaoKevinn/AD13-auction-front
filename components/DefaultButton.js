import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

import Colors from '../constants/Colors';
import DefaultText from './DefaultText';

const DefaultButton = (props) => {

    return (
        <TouchableOpacity {...props} activeOpacity={0.6}>
            <View style={styles.button}>
                <DefaultText style={styles.defaultText}>
                    { props.children }
                </DefaultText>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 15,
        backgroundColor: Colors.black,
        alignItems: "center",
    },
    defaultText: {
        color: Colors.white,
        paddingHorizontal: 17,
        lineHeight: 25,
        fontSize: 17,
        lineHeight: 25,
    },
})

export default DefaultButton
