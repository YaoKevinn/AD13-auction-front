import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

const OfferSuccessScreen = () => {

        return (
            <View style={styles.screen}>
                <Text> textInComponent </Text>
            </View>
        )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.WHITE
    }
})

OfferSuccessScreen.navigationOptions = (navData) => {
    return {
        headerTitle: '',
        headerLeft: () => null,
        headerStyle: {
            backgroundColor: Colors.WHITE,
            shadowColor: Colors.WHITE
        }
    }
}

export default OfferSuccessScreen
