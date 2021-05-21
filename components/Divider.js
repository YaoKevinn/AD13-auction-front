import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const Divider = (props) => {

        return (
            <View style={{...props.style, ...styles.divider}}></View>
        )
}

const styles = StyleSheet.create({
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#E8E6E6'
    }
})

export default Divider
