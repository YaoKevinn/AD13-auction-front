import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/HeaderButton';


const UserHistoryScreen = props => {
 
    return (
        <View style={styles.screen}>
            <Text> UserHistoryScreenComponent </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
})

UserHistoryScreen.navigationOptions = (navData) => {

    return {
        headerTitle: "Historial",
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu" iconName="ios-menu" onPress={ () => {
                    navData.navigation.toggleDrawer();
                }} />
            </HeaderButtons>
        )
    }
}


export default UserHistoryScreen;
