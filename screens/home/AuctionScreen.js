import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const AuctionScreen = props => {

    return (
        <View style={styles.screen}>
            <Text> textInComponent </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
})

export default AuctionScreen
