import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'

import HeaderButton from '../../components/HeaderButton';
import DefaultButton from '../../components/DefaultButton';
import DefaultText from '../../components/DefaultText';
import Divider from '../../components/Divider';
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Colors } from 'react-native/Libraries/NewAppScreen';

const DetailProductScreen = props => {

    const product = props.navigation.getParam('product');
    console.log(product);

    return (
        <View style={styles.screen}>

        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    }
})



DetailProductScreen.navigationOptions = (navData) => {

    return {
        headerTitle: "Detalle",
    }
}

export default DetailProductScreen;