import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const DefaultText = props => {

    return (
        <View>
            <Text style={{...styles.text, ...props.style}}>{props.children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'poppins-regular'
    }
})

export default DefaultText
