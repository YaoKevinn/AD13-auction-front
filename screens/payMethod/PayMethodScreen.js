import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/HeaderButton';
import DefaultButton from '../../components/DefaultButton';
import DefaultText from '../../components/DefaultText';
import Divider from '../../components/Divider';

const PayMethodScreen = props => {

    const methodsList = [];
 
    return (
        <View style={styles.screen}>
            <DefaultButton
                onPress={() => {
                    props.navigation.navigate('NewPaymentScreen');
                }}
            >
                Agregar medio de pago
            </DefaultButton>
            <Divider style={styles.divider} />
            <View style={styles.methodsSection}>
                {
                    methodsList.length === 0 ? (
                        <DefaultText style={styles.noMethodText}>No tiene ningún medio de pago ingresado.</DefaultText>
                    ) : (
                        <View></View>
                    )
                }
            </View>
            <DefaultButton>Volver a la subasta</DefaultButton>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 65,
        paddingBottom: 54,
        paddingHorizontal: 30,
        alignItems: 'center',
        width: '100%'
    },
    divider: {
        marginVertical: 46,
        width: 250
    },
    methodsSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    noMethodText: {
        fontSize: 17,
        lineHeight: 25.5,
        paddingHorizontal: 50,
        textAlign: 'center',
        position: 'relative',
        top: -100
    }
})



PayMethodScreen.navigationOptions = (navData) => {

    return {
        headerTitle: "Medios de pago",
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu" iconName="ios-menu" onPress={ () => {
                    navData.navigation.toggleDrawer();
                }} />
            </HeaderButtons>
        )
    }
}

export default PayMethodScreen;
