import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/HeaderButton';

const PayMethodScreen = props => {
 
    return (
        <View style={styles.screen}>
            <Text> payMethodScreenComponent </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
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
